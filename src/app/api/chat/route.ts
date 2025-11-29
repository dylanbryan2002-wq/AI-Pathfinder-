import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';
import { getSystemPromptWithContext } from '@/lib/ai-prompts';

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

    // Fetch user profile data if userId is provided
    let userContext = '';
    if (userId) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            name: true,
            personalityData: true,
            skillsData: true,
            goalsData: true,
            valuesData: true,
            interestData: true,
            workExperience: true,
          },
        });

        if (user) {
          userContext = `User Profile Context:
- Name: ${user.name || 'Not provided'}
- Personality Data: ${user.personalityData ? JSON.stringify(user.personalityData) : 'Not yet assessed'}
- Skills: ${user.skillsData ? JSON.stringify(user.skillsData) : 'Not yet provided'}
- Goals: ${user.goalsData ? JSON.stringify(user.goalsData) : 'Not yet provided'}
- Values: ${user.valuesData ? JSON.stringify(user.valuesData) : 'Not yet provided'}
- Interests: ${user.interestData ? JSON.stringify(user.interestData) : 'Not yet provided'}
- Work Experience: ${user.workExperience ? JSON.stringify(user.workExperience) : 'Not yet provided'}`;
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    }

    // Get system prompt from centralized prompts file
    const systemPrompt = getSystemPromptWithContext(userContext);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1500,
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

// GET endpoint to fetch chat history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Fetch recent messages (limit to last 50)
    const messages = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 50,
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ messages });

  } catch (error: any) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
