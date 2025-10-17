import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get user's chat messages
    const messages = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 50, // Limit to last 50 messages for analysis
    });

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'No chat history found. Please have a conversation with AI Pathfinder first.' },
        { status: 400 }
      );
    }

    // Get all careers from database
    const careers = await prisma.career.findMany();

    if (careers.length === 0) {
      return NextResponse.json(
        { error: 'No careers found in database' },
        { status: 500 }
      );
    }

    // Analyze conversation and extract user profile
    const analysisPrompt = `Analyze this career counseling conversation and extract the user's profile:

Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join('\n\n')}

Based on this conversation, extract and return a JSON object with:
{
  "interests": ["list of interests mentioned"],
  "skills": ["list of skills mentioned or implied"],
  "values": ["list of values mentioned (e.g., work-life balance, helping others, creativity)"],
  "personality": ["personality traits mentioned or implied"],
  "goals": ["career goals mentioned"],
  "workStyle": ["preferred work environment, remote/office, team/solo, etc."]
}

Only include information explicitly mentioned or strongly implied in the conversation. Return valid JSON only.`;

    const analysisResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are a career counseling analyst. Extract user profile data from conversations and return only valid JSON.' },
        { role: 'user', content: analysisPrompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const profileData = JSON.parse(analysisResponse.choices[0].message.content || '{}');

    // Update user profile with extracted data
    await prisma.user.update({
      where: { id: userId },
      data: {
        interestData: profileData.interests || [],
        skillsData: profileData.skills || [],
        valuesData: profileData.values || [],
        personalityData: profileData.personality || [],
        goalsData: profileData.goals || [],
      },
    });

    // Generate career matches
    const matchingPrompt = `Based on this user profile, rank these careers by match percentage (0-100):

User Profile:
${JSON.stringify(profileData, null, 2)}

Careers:
${careers.map(c => `ID: ${c.id}, Title: ${c.title}, Description: ${c.description}`).join('\n\n')}

For each career, provide:
1. Match percentage (0-100)
2. Brief explanation of why they match (2-3 sentences)
3. Breakdown by category (interest, skills, values, personality, goals) as percentages

Return a JSON array sorted by match percentage (highest first):
[
  {
    "careerId": "career_id",
    "matchPercentage": 95,
    "matchReason": "explanation of match",
    "breakdown": {
      "interest": 98,
      "skills": 92,
      "values": 95,
      "personality": 94,
      "goals": 96
    }
  }
]

Return valid JSON only. Include all careers, even with low matches.`;

    const matchingResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are a career matching expert. Analyze user profiles and match them with careers. Return only valid JSON.' },
        { role: 'user', content: matchingPrompt },
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    const matchesData = JSON.parse(matchingResponse.choices[0].message.content || '{"matches":[]}');
    const matches = matchesData.matches || matchesData;

    // Save career matches to database
    // First, delete existing matches for this user
    await prisma.careerMatch.deleteMany({
      where: { userId },
    });

    // Create new matches
    const careerMatches = await Promise.all(
      matches.slice(0, 10).map(async (match: any) => {
        return prisma.careerMatch.create({
          data: {
            userId,
            careerId: match.careerId,
            matchPercentage: Math.round(match.matchPercentage),
            matchReason: match.matchReason,
            matchData: match.breakdown || {},
          },
          include: {
            career: true,
          },
        });
      })
    );

    return NextResponse.json({
      message: 'Career matches generated successfully',
      profileData,
      matches: careerMatches,
      totalMatches: careerMatches.length,
    });

  } catch (error: any) {
    console.error('Career matching error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while matching careers' },
      { status: 500 }
    );
  }
}
