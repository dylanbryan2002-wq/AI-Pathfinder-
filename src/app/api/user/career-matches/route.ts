import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/user/career-matches - Get user's career matches
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch career matches for this user
    const matches = await prisma.careerMatch.findMany({
      where: { userId },
      include: {
        career: true,
      },
      orderBy: {
        matchPercentage: 'desc',
      },
    });

    if (matches.length === 0) {
      return NextResponse.json(
        { error: 'No career matches found. Please chat with AI Pathfinder and click "Get Career Matches".' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      matches,
      totalMatches: matches.length,
    });
  } catch (error: any) {
    console.error('Get career matches error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
