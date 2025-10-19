import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { transcript, voice } = await request.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    // Send transcript to existing chat API
    const chatResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body: JSON.stringify({
        message: transcript,
      }),
    });

    if (!chatResponse.ok) {
      throw new Error('Failed to get chat response');
    }

    const chatData = await chatResponse.json();
    const aiResponse = chatData.response;

    // Convert AI response to speech using Rime
    const rimeResponse = await fetch('https://users.rime.ai/v1/rime-tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RIME_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: aiResponse,
        speaker: voice || process.env.RIME_DEFAULT_VOICE || 'vespera',
        modelId: 'mist',
        speedAlpha: 1.0,
        reduceLatency: true,
      }),
    });

    if (!rimeResponse.ok) {
      console.error('Rime API error:', await rimeResponse.text());
      throw new Error('Failed to generate speech');
    }

    // Get audio data from Rime
    const audioBuffer = await rimeResponse.arrayBuffer();

    return NextResponse.json({
      transcript,
      response: aiResponse,
      audioUrl: `data:audio/mp3;base64,${Buffer.from(audioBuffer).toString('base64')}`,
    });
  } catch (error) {
    console.error('Error in voice agent:', error);
    return NextResponse.json(
      { error: 'Failed to process voice request' },
      { status: 500 }
    );
  }
}
