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

    // Get user profile data including recent chat messages
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        skillsData: true,
        goalsData: true,
        workExperience: true,
        interestData: true,
        valuesData: true,
        personalityData: true,
        messages: {
          take: 50, // Get last 50 messages for context
          orderBy: { createdAt: 'desc' },
          select: {
            role: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    // Extract key insights from chat history
    const chatContext = user?.messages
      .reverse() // Put in chronological order
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    // Build context for AI
    const userContext = {
      skills: user?.skillsData || [],
      goals: user?.goalsData || [],
      experience: user?.workExperience || [],
      interests: user?.interestData || [],
      values: user?.valuesData || [],
      personality: user?.personalityData || [],
      chatHistory: chatContext || 'No chat history available',
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

**IMPORTANT**: Review the user's chatHistory above carefully to understand:
- Their financial situation (debts, savings, financial constraints)
- Their current experience level and background
- Their goals, motivations, and "why" behind this career choice
- Their personality, work style, and preferences
- Any challenges or limiting beliefs they've mentioned
- Their available time and resources

Use these insights to create a truly personalized action plan that addresses their specific situation.

# ACTION PLAN STRUCTURE

Create a personalized action plan using these 8 step categories. Intelligently select which categories to include based on the user's situation and the career requirements:

**1. Get Out of Debt**
- Only include if the user mentioned financial struggles or debt in their profile
- Help them create a basic debt reduction plan before investing in career development

**2. Save Some Money**
- Include if the career transition requires financial resources (courses, certifications, relocation)
- Tailor the savings goal to what they'll actually need

**3. Certification** (Choose relevant sub-types if needed)
- Schooling (college, university, graduate programs)
- Company certifications (Google, AWS, Microsoft, etc.)
- Professional associations (CPA, PMP, PHR, etc.)
- Government certifications (security clearances, licenses)
- Learning platforms (Coursera, Udemy, LinkedIn Learning)
- Non-profits (free training programs)
- Trade certifications (apprenticeships, vocational)

**4. Networking** (Select tactics that fit the user's personality and career)
- Volunteering in relevant organizations
- Social media (LinkedIn, Twitter/X professional presence)
- College/university resources (alumni networks, career services)
- Informational interviews
- Industry conferences and events (use Eventbrite, Meetup)
- Professional associations
- Online communities (Reddit, Discord, Slack groups)
- Job shadows and mentorship programs

**5. Self Advertising** (Help them build visibility)
- Social media presence (LinkedIn posts, Twitter threads)
- Personal website or portfolio
- Speaking at events or webinars
- Writing articles or blog posts
- Freelancing to build reputation
- Contributing to open source (for tech careers)

**6. Apply** (**MANDATORY - Always include this**)
- Resume help (tailoring for ATS, highlighting relevant experience)
- CV help (for academic/research roles)
- Cover letter strategies
- Side door approaches (see #8 for specific tactics)

**7. Practicing**
- Include if the career requires hands-on skills
- Projects, portfolios, practice problems, mock interviews
- Specific to the career (coding projects, design portfolio, case studies, etc.)

**8. Use Side Door Approaches** (Creative application tactics - include 2-3 relevant ones)
- Video business cards sent to hiring managers
- Reaching out directly to hiring managers on LinkedIn
- Creating fake billboards or creative campaigns
- Sending personalized packages or portfolios
- Attending company events and networking before applying
- Finding internal referrals through mutual connections
- Contributing to company's open source projects (tech)
- Engaging with company content and building relationships

# GUIDELINES

- **Not all categories are required** - only include what's relevant for this specific user and career
- **"Apply" is mandatory** - always include job application steps
- **Order logically** - arrange steps in the sequence that makes sense for this user's journey
- **Typically 5-8 steps total**, but can be 3-12 depending on complexity and user's current situation
- **Tailor everything** - descriptions, timeframes, and resources should be personalized to:
  - User's current financial situation
  - User's experience level and background
  - User's goals and motivations from their profile
  - Specific career requirements
  - User's personality and preferences

# RESOURCES

For each step, suggest 2-4 specific, actionable resources. Examples:
- Online platforms (Coursera, LinkedIn Learning, Udemy, etc.)
- Professional associations and their websites
- Specific books or articles
- Networking sites (Eventbrite, Meetup, industry-specific platforms)
- Job boards (LinkedIn, Indeed, industry-specific boards)
- Portfolio platforms (GitHub, Behance, Dribbble, etc.)

Format as JSON:
{
  "steps": [
    {
      "title": "Step title (concise, action-oriented)",
      "description": "Detailed description of what to do and why it matters for this specific user and career",
      "timeframe": "1-2 weeks" or "2-4 weeks" or "1-2 months" or "2-3 months",
      "resources": ["Specific Resource 1", "Specific Resource 2", "Specific Resource 3"],
      "completed": false
    }
  ],
  "timeline": "Total estimated time (e.g., '6-8 months')",
  "nextMilestone": "Description of first major milestone they'll reach"
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
