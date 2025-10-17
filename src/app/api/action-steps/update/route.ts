import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/action-steps/update - Update action step completion status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { careerId, stepIndex, completed } = await request.json();

    if (!careerId || stepIndex === undefined) {
      return NextResponse.json(
        { error: 'Career ID and step index are required' },
        { status: 400 }
      );
    }

    // Get committed career
    const committedCareer = await prisma.committedCareer.findFirst({
      where: {
        userId,
        careerId,
      },
    });

    if (!committedCareer) {
      return NextResponse.json(
        { error: 'Committed career not found' },
        { status: 404 }
      );
    }

    // Parse action steps
    const actionSteps = committedCareer.actionSteps as any;

    if (!actionSteps || !actionSteps.steps || !actionSteps.steps[stepIndex]) {
      return NextResponse.json(
        { error: 'Invalid step index' },
        { status: 400 }
      );
    }

    // Update step completion
    actionSteps.steps[stepIndex].completed = completed;

    // Calculate progress
    const completedSteps = actionSteps.steps.filter((step: any) => step.completed).length;
    const totalSteps = actionSteps.steps.length;
    const progress = Math.round((completedSteps / totalSteps) * 100);

    // Update database
    await prisma.committedCareer.updateMany({
      where: {
        userId,
        careerId,
      },
      data: {
        actionSteps,
      },
    });

    return NextResponse.json({
      message: 'Step updated successfully',
      progress,
      completedSteps,
      totalSteps,
    });
  } catch (error: any) {
    console.error('Error updating action step:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update action step' },
      { status: 500 }
    );
  }
}
