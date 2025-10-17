import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/action-steps/generate - Generate personalized action plan for committed career
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { careerId } = await request.json();

    if (!careerId) {
      return NextResponse.json(
        { error: 'Career ID is required' },
        { status: 400 }
      );
    }

    // Get career details
    const career = await prisma.career.findUnique({
      where: { id: careerId },
    });

    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    // Get user profile data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        skillsData: true,
        goalsData: true,
        workExperience: true,
        interestData: true,
      },
    });

    // Build context for AI
    const userContext = {
      skills: user?.skillsData || [],
      goals: user?.goalsData || [],
      experience: user?.workExperience || [],
      interests: user?.interestData || [],
    };

    // Generate action plan with OpenAI
    const careerRequirements = career.requirements || 'Not specified';
    const careerEducation = career.education || 'Not specified';

    const prompt = `You are a career counselor creating a personalized action plan for someone committing to become a ${career.title}.

Career Details:
- Title: ${career.title}
- Description: ${career.description}
- Requirements: ${careerRequirements}
- Education: ${careerEducation}

User Profile:
${JSON.stringify(userContext, null, 2)}

Create a comprehensive, personalized 6-12 month action plan with 8-12 specific, actionable steps. Each step should:
1. Be concrete and measurable
2. Build progressively (easier steps first, harder later)
3. Include estimated timeframe
4. Be tailored to their current skills and experience
5. Lead directly to career entry

Format as JSON:
{
  "steps": [
    {
      "title": "Step title (concise, action-oriented)",
      "description": "Detailed description of what to do and why",
      "timeframe": "1-2 weeks" or "2-4 weeks" or "1-2 months",
      "resources": ["Resource 1", "Resource 2"],
      "completed": false
    }
  ],
  "timeline": "Total estimated time (e.g., '6-8 months')",
  "nextMilestone": "Description of first major milestone"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career counselor who creates practical, personalized action plans. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const actionPlan = JSON.parse(completion.choices[0].message.content || '{}');

    // Update committed career with action steps
    await prisma.committedCareer.updateMany({
      where: {
        userId,
        careerId,
      },
      data: {
        actionSteps: actionPlan,
      },
    });

    return NextResponse.json({
      message: 'Action plan generated successfully',
      actionPlan,
    });
  } catch (error: any) {
    console.error('Error generating action steps:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate action plan' },
      { status: 500 }
    );
  }
}
