import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/user/actions - Handle user actions (try, commit, bookmark)
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
    const body = await request.json();
    const { action, careerId, jobId, type } = body;

    switch (action) {
      case 'try':
        if (!careerId) {
          return NextResponse.json(
            { error: 'Career ID is required' },
            { status: 400 }
          );
        }

        // Check if already trying
        const existing = await prisma.triedCareer.findUnique({
          where: {
            userId_careerId: { userId, careerId },
          },
        });

        if (existing) {
          // Remove if already trying (toggle off)
          await prisma.triedCareer.delete({
            where: { id: existing.id },
          });
          return NextResponse.json({ action: 'removed', tried: false });
        } else {
          // Add to tried careers
          const tried = await prisma.triedCareer.create({
            data: {
              userId,
              careerId,
              progress: 0,
            },
          });
          return NextResponse.json({ action: 'added', tried: true, data: tried });
        }

      case 'commit':
        if (!careerId) {
          return NextResponse.json(
            { error: 'Career ID is required' },
            { status: 400 }
          );
        }

        // Check if already committed
        const existingCommitment = await prisma.committedCareer.findUnique({
          where: { userId },
        });

        if (existingCommitment && existingCommitment.careerId === careerId) {
          // Remove commitment (toggle off)
          await prisma.committedCareer.delete({
            where: { id: existingCommitment.id },
          });
          return NextResponse.json({ action: 'uncommitted', committed: false });
        } else if (existingCommitment) {
          // Update to new career
          const updated = await prisma.committedCareer.update({
            where: { id: existingCommitment.id },
            data: { careerId },
          });
          return NextResponse.json({ action: 'updated', committed: true, data: updated });
        } else {
          // Create new commitment
          const commitment = await prisma.committedCareer.create({
            data: {
              userId,
              careerId,
            },
          });

          // Trigger action steps generation in background (non-blocking)
          fetch(`${request.nextUrl.origin}/api/action-steps/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              cookie: request.headers.get('cookie') || '',
            },
            body: JSON.stringify({ careerId }),
          }).catch(err => console.error('Failed to generate action steps:', err));

          return NextResponse.json({ action: 'committed', committed: true, data: commitment });
        }

      case 'bookmark':
        if (!type || (!careerId && !jobId)) {
          return NextResponse.json(
            { error: 'Type and target ID are required' },
            { status: 400 }
          );
        }

        const targetId = careerId || jobId;

        // Check if already bookmarked
        const existingBookmark = await prisma.bookmark.findUnique({
          where: {
            userId_type_targetId: { userId, type, targetId },
          },
        });

        if (existingBookmark) {
          // Remove bookmark (toggle off)
          await prisma.bookmark.delete({
            where: { id: existingBookmark.id },
          });
          return NextResponse.json({ action: 'removed', bookmarked: false });
        } else {
          // Add bookmark
          const bookmark = await prisma.bookmark.create({
            data: {
              userId,
              type,
              targetId,
            },
          });
          return NextResponse.json({ action: 'added', bookmarked: true, data: bookmark });
        }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('User actions API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}

// GET /api/user/actions - Get user's actions
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

    const [triedCareers, committedCareer, bookmarks] = await Promise.all([
      prisma.triedCareer.findMany({
        where: { userId },
        include: { career: true },
      }),
      prisma.committedCareer.findUnique({
        where: { userId },
        include: { career: true },
      }),
      prisma.bookmark.findMany({
        where: { userId },
      }),
    ]);

    return NextResponse.json({
      triedCareers,
      committedCareer,
      bookmarks,
    });
  } catch (error: any) {
    console.error('Get user actions error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
