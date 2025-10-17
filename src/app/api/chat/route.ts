import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, userId } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // System prompt for AI Pathfinder
    const systemPrompt = `You are AI Pathfinder, a career advisor helping users discover their ideal career path. Your role is to:

1. Have empathetic conversations to understand the user's interests, skills, values, personality, and goals
2. Ask thoughtful questions to gather psychometric data
3. Provide career recommendations based on the user's profile
4. Explain career matches and help users explore different career options
5. Be encouraging and supportive throughout the career discovery process

Key guidelines:
- Be conversational and friendly, not robotic
- Ask open-ended questions to understand the user better
- Provide specific, actionable career advice
- Reference real career data when discussing job prospects
- Help users understand why certain careers match their profile
- Encourage exploration before commitment

When providing career recommendations, consider:
- Interest alignment
- Skills match
- Values compatibility
- Personality fit
- Location preferences
- Salary expectations
- Work-life balance needs`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    // Store messages in database if userId is provided
    if (userId) {
      try {
        // Store user message
        await prisma.message.create({
          data: {
            userId,
            role: 'user',
            content: messages[messages.length - 1].content,
          },
        });

        // Store assistant message
        await prisma.message.create({
          data: {
            userId,
            role: 'assistant',
            content: assistantMessage,
          },
        });
      } catch (dbError) {
        console.error('Error storing messages:', dbError);
        // Continue even if DB storage fails
      }
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
