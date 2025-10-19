import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { AssemblyAI } from 'assemblyai';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { audio, voice } = await request.json();

    if (!audio) {
      return NextResponse.json(
        { error: 'Audio data is required' },
        { status: 400 }
      );
    }

    // Initialize Assembly AI client
    const assemblyai = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY || '',
    });

    // Convert base64 audio to buffer
    const audioBuffer = Buffer.from(audio.split(',')[1], 'base64');

    // Transcribe audio using Assembly AI
    console.log('Transcribing audio...');
    const transcript = await assemblyai.transcripts.transcribe({
      audio: audioBuffer,
    });

    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    const transcribedText = transcript.text || '';
    console.log('Transcription:', transcribedText);

    if (!transcribedText) {
      return NextResponse.json(
        { error: 'No speech detected in audio' },
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
        messages: [
          {
            role: 'user',
            content: transcribedText,
          },
        ],
        userId: session.user.id,
      }),
    });

    if (!chatResponse.ok) {
      throw new Error('Failed to get AI response');
    }

    const chatData = await chatResponse.json();
    const aiResponse = chatData.message;

    console.log('AI Response:', aiResponse);

    // Convert AI response to speech using Rime
    console.log('Generating speech with Rime...');
    const rimeResponse = await fetch('https://users.rime.ai/v1/rime-tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RIME_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: aiResponse,
        speaker: voice || process.env.RIME_DEFAULT_VOICE || 'vespera',
        modelId: 'mist',
        speedAlpha: 1.0,
        reduceLatency: false,
      }),
    });

    const contentType = rimeResponse.headers.get('content-type') || 'audio/mpeg';
    console.log('Rime API status:', rimeResponse.status);
    console.log('Rime response content-type:', contentType);

    if (!rimeResponse.ok) {
      const errorText = await rimeResponse.text();
      console.error('Rime API error:', errorText);
      throw new Error(`Failed to generate speech: ${errorText}`);
    }

    // Check if we got JSON instead of audio (error response)
    if (contentType.includes('application/json')) {
      const errorData = await rimeResponse.json();
      console.error('Rime returned JSON instead of audio:', errorData);
      throw new Error(`Rime API error: ${JSON.stringify(errorData)}`);
    }

    // Get audio data from Rime
    const audioArrayBuffer = await rimeResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioArrayBuffer).toString('base64');
    console.log('Rime audio generated, size:', audioArrayBuffer.byteLength, 'bytes', 'type:', contentType);

    return NextResponse.json({
      transcript: transcribedText,
      response: aiResponse,
      audioUrl: `data:${contentType};base64,${audioBase64}`,
    });
  } catch (error: any) {
    console.error('Error in voice processing:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process voice request' },
      { status: 500 }
    );
  }
}
