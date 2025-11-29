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
      model: 'gpt-4o',
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

    // STEP 1: Identify the user's primary career field/industry
    const fieldIdentificationPrompt = `Based on this user profile, identify their top 1-2 primary career fields or industries they should explore:

User Profile:
${JSON.stringify(profileData, null, 2)}

Available careers to consider:
${careers.map(c => `ID: ${c.id}, Title: ${c.title}, Description: ${c.description}`).join('\n\n')}

Analyze the user's interests, skills, values, and goals to determine which 1-2 career fields would be most appropriate.

Return a JSON object with:
{
  "primaryField": "the main career field/industry (e.g., Technology, Healthcare, Education, Creative Arts, Business, etc.)",
  "secondaryField": "optional secondary field if the user has diverse interests",
  "reasoning": "brief explanation of why these fields were chosen"
}

Return valid JSON only.`;

    const fieldResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a career counselor specializing in identifying appropriate career fields for individuals. Return only valid JSON.' },
        { role: 'user', content: fieldIdentificationPrompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const fieldData = JSON.parse(fieldResponse.choices[0].message.content || '{}');
    console.log(`🎯 Identified career fields: ${fieldData.primaryField}${fieldData.secondaryField ? ` and ${fieldData.secondaryField}` : ''}`);

    // STEP 2: Filter careers to only those in the identified fields
    const filterPrompt = `Filter this list of careers to only include those that belong to these fields:

Primary Field: ${fieldData.primaryField}
${fieldData.secondaryField ? `Secondary Field: ${fieldData.secondaryField}` : ''}

All Careers:
${careers.map(c => `ID: ${c.id}, Title: ${c.title}, Description: ${c.description}`).join('\n\n')}

Return a JSON object with an array of career IDs that match the specified fields:
{
  "careerIds": ["id1", "id2", "id3", ...]
}

Only include careers that are clearly related to ${fieldData.primaryField}${fieldData.secondaryField ? ` or ${fieldData.secondaryField}` : ''}. Be selective - it's better to have fewer, more relevant careers than to include unrelated ones.

Return valid JSON only.`;

    const filterResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a career taxonomy expert. Filter careers to match specified fields. Return only valid JSON.' },
        { role: 'user', content: filterPrompt },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const filterData = JSON.parse(filterResponse.choices[0].message.content || '{"careerIds":[]}');
    const filteredCareers = careers.filter(c => filterData.careerIds.includes(c.id));

    console.log(`🔍 Filtered from ${careers.length} to ${filteredCareers.length} careers in relevant fields`);

    // If we have too few careers, fall back to all careers
    const careersToMatch = filteredCareers.length >= 10 ? filteredCareers : careers;

    // STEP 3: Generate career matches from the filtered set
    const matchingPrompt = `Based on this user profile, rank these careers by match percentage (0-100):

User Profile:
${JSON.stringify(profileData, null, 2)}

Careers (all in ${fieldData.primaryField}${fieldData.secondaryField ? ` or ${fieldData.secondaryField}` : ''} field):
${careersToMatch.map(c => `ID: ${c.id}, Title: ${c.title}, Description: ${c.description}`).join('\n\n')}

For each career, provide:
1. Match percentage (0-100) based on how well it fits the user's interests, skills, values, personality, and goals
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

Return valid JSON only.`;

    const matchingResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a career matching expert. Analyze user profiles and match them with careers based on interests, skills, values, personality, and goals. Return only valid JSON.' },
        { role: 'user', content: matchingPrompt },
      ],
      temperature: 0.5,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const matchesData = JSON.parse(matchingResponse.choices[0].message.content || '{"matches":[]}');
    let matches = matchesData.matches || matchesData;

    // Ensure matches is an array
    if (!Array.isArray(matches)) {
      matches = [];
    }

    // Sort by match percentage
    matches.sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);

    // Save career matches to database
    // First, delete existing matches for this user
    await prisma.careerMatch.deleteMany({
      where: { userId },
    });

    // Create new matches (top 10)
    const careerMatches = [];
    for (const match of matches.slice(0, 10)) {
      try {
        const careerMatch = await prisma.careerMatch.create({
          data: {
            userId,
            careerId: match.careerId,
            matchPercentage: Math.round(match.matchPercentage),
            matchReason: match.matchReason || 'Match based on your profile',
            matchData: match.breakdown || {},
          },
          include: {
            career: true,
          },
        });
        careerMatches.push(careerMatch);
      } catch (err) {
        console.error(`Failed to create match for career ${match.careerId}:`, err);
        // Continue with other matches
      }
    }

    console.log(`✅ Generated ${careerMatches.length} career matches for user ${userId}`);

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
