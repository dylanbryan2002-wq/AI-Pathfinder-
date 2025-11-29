import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/user/commit - Commit to a career and generate action plan
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { careerId } = await req.json();

    if (!careerId) {
      return NextResponse.json({ error: 'Career ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if career exists
    const career = await prisma.career.findUnique({
      where: { id: careerId },
    });

    if (!career) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    // Generate action plan steps based on the career
    const actionSteps = generateActionSteps(career);

    // Create or update committed career
    const committedCareer = await prisma.committedCareer.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        careerId,
        actionSteps,
      },
      update: {
        careerId,
        actionSteps,
        updatedAt: new Date(),
      },
      include: {
        career: true,
      },
    });

    return NextResponse.json({
      message: 'Successfully committed to career',
      committedCareer,
    });
  } catch (error) {
    console.error('Error committing to career:', error);
    return NextResponse.json(
      { error: 'Failed to commit to career' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/commit - Uncommit from career
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete committed career
    await prisma.committedCareer.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: 'Successfully uncommitted from career',
    });
  } catch (error) {
    console.error('Error uncommitting from career:', error);
    return NextResponse.json(
      { error: 'Failed to uncommit from career' },
      { status: 500 }
    );
  }
}

// Helper function to generate action steps for a career
function generateActionSteps(career: any) {
  // This is a basic implementation - you can enhance this with AI or more sophisticated logic
  const steps = [
    {
      title: 'Research the career path',
      description: `Learn more about what it's like to be a ${career.title}. Read industry blogs, watch videos, and connect with professionals in the field.`,
      completed: false,
    },
    {
      title: 'Assess your current skills',
      description: `Evaluate your existing skills and identify gaps. Consider what additional training or education you might need for a ${career.title} role.`,
      completed: false,
    },
    {
      title: 'Get relevant experience',
      description: 'Look for volunteer opportunities, internships, or entry-level positions that will help you gain hands-on experience.',
      completed: false,
    },
    {
      title: 'Build your network',
      description: 'Connect with professionals in the field through LinkedIn, industry events, and professional organizations.',
      completed: false,
    },
    {
      title: 'Update your resume and portfolio',
      description: 'Tailor your resume to highlight relevant skills and experiences. Create a portfolio showcasing your work if applicable.',
      completed: false,
    },
    {
      title: 'Apply for positions',
      description: `Start applying for ${career.title} roles that match your experience level. Don't be discouraged by rejections - they're part of the process!`,
      completed: false,
    },
  ];

  // Add career-specific step if education requirements exist
  if (career.education) {
    steps.splice(2, 0, {
      title: 'Pursue required education',
      description: `${career.title} typically requires: ${career.education}. Research programs and create a plan to meet these requirements.`,
      completed: false,
    });
  }

  return steps;
}
