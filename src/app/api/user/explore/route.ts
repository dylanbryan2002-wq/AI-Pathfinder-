import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/user/explore - Get user's explore list
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        triedCareers: {
          include: {
            career: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const exploreCareers = user.triedCareers.map((tc) => ({
      id: tc.id,
      careerId: tc.careerId,
      career: tc.career,
      addedAt: tc.createdAt,
    }));

    return NextResponse.json({ exploreCareers });
  } catch (error) {
    console.error('Error fetching explore list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch explore list' },
      { status: 500 }
    );
  }
}

// POST /api/user/explore - Add career to explore list
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

    // Add to explore list (or update if already exists)
    const triedCareer = await prisma.triedCareer.upsert({
      where: {
        userId_careerId: {
          userId: user.id,
          careerId,
        },
      },
      create: {
        userId: user.id,
        careerId,
        progress: 0,
      },
      update: {
        updatedAt: new Date(),
      },
      include: {
        career: true,
      },
    });

    return NextResponse.json({
      message: 'Career added to explore list',
      triedCareer,
    });
  } catch (error) {
    console.error('Error adding to explore list:', error);
    return NextResponse.json(
      { error: 'Failed to add career to explore list' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/explore - Remove career from explore list
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const careerId = searchParams.get('careerId');

    if (!careerId) {
      return NextResponse.json({ error: 'Career ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove from explore list
    await prisma.triedCareer.deleteMany({
      where: {
        userId: user.id,
        careerId,
      },
    });

    return NextResponse.json({
      message: 'Career removed from explore list',
    });
  } catch (error) {
    console.error('Error removing from explore list:', error);
    return NextResponse.json(
      { error: 'Failed to remove career from explore list' },
      { status: 500 }
    );
  }
}
