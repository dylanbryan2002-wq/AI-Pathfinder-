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

    const {
      text,
      voice,
      speedAlpha = 1.0,
      reduceLatency = false,
      modelId = 'mist'
    } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Validate speedAlpha range (0.5 to 2.0 is typical for TTS)
    const validatedSpeed = Math.max(0.5, Math.min(2.0, speedAlpha));

    // Validate modelId (mist is faster, v1 is higher quality)
    const validatedModel = ['mist', 'v1'].includes(modelId) ? modelId : 'mist';

    // Convert text to speech using Rime
    console.log('Generating speech with Rime...');
    console.log('TTS Settings:', {
      voice: voice || process.env.RIME_DEFAULT_VOICE || 'vespera',
      speedAlpha: validatedSpeed,
      reduceLatency,
      modelId: validatedModel
    });

    const rimeResponse = await fetch('https://users.rime.ai/v1/rime-tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RIME_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: text,
        speaker: voice || process.env.RIME_DEFAULT_VOICE || 'vespera',
        modelId: validatedModel,
        speedAlpha: validatedSpeed,
        reduceLatency: reduceLatency,
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

    // Check if we got JSON response (Rime returns JSON with audioContent field)
    let audioBase64: string;
    if (contentType.includes('application/json')) {
      const jsonData = await rimeResponse.json();
      console.log('Rime returned JSON response with audioContent field');

      if (!jsonData.audioContent) {
        console.error('Rime JSON response missing audioContent:', jsonData);
        throw new Error(`Rime API error: No audioContent in response`);
      }

      // audioContent is already base64 encoded
      audioBase64 = jsonData.audioContent;
      console.log('Rime audio extracted from JSON, size:', audioBase64.length, 'characters');
    } else {
      // Get raw audio data from Rime
      const audioArrayBuffer = await rimeResponse.arrayBuffer();
      audioBase64 = Buffer.from(audioArrayBuffer).toString('base64');
      console.log('Rime audio generated, size:', audioArrayBuffer.byteLength, 'bytes', 'type:', contentType);
    }

    // Determine actual audio format - Rime returns WAV format
    const actualContentType = contentType.includes('application/json') ? 'audio/wav' : contentType;

    return NextResponse.json({
      audioUrl: `data:${actualContentType};base64,${audioBase64}`,
    });
  } catch (error: any) {
    console.error('Error in TTS:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
