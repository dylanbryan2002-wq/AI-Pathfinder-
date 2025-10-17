import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/user/profile - Get complete user profile with all data
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

    // Fetch comprehensive user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        careerMatches: {
          include: {
            career: true,
          },
          orderBy: {
            matchPercentage: 'desc',
          },
          take: 5, // Top 5 matches
        },
        triedCareers: {
          include: {
            career: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        committedCareer: {
          include: {
            career: true,
          },
        },
        bookmarks: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // Just to check if user has chatted
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const profileData = {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      progressScore: user.progressScore || 50,

      // Psychometric data
      interests: (user.interestData as any) || [],
      skills: (user.skillsData as any) || [],
      values: (user.valuesData as any) || [],
      personality: (user.personalityData as any) || [],
      goals: (user.goalsData as any) || [],
      workExperience: (user.workExperience as any) || [],

      // Career data
      careerMatches: user.careerMatches,
      triedCareers: user.triedCareers,
      committedCareer: user.committedCareer,
      bookmarks: user.bookmarks,

      // Stats
      stats: {
        totalMatches: user.careerMatches.length,
        careersExploring: user.triedCareers.length,
        hasCommittedCareer: !!user.committedCareer,
        totalBookmarks: user.bookmarks.length,
        hasChatHistory: user.messages.length > 0,
      },
    };

    return NextResponse.json(profileData);

  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, bio, avatar } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      },
    });

  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
