import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/bookmarks - Get all user bookmarks with full data
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get all bookmarks
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Separate career and job bookmarks
    const careerBookmarks = bookmarks.filter(b => b.type === 'career');
    const jobBookmarks = bookmarks.filter(b => b.type === 'job');

    // Fetch full career data
    const careerIds = careerBookmarks.map(b => b.targetId);
    const careers = await prisma.career.findMany({
      where: { id: { in: careerIds } },
    });

    // Fetch full job data
    const jobIds = jobBookmarks.map(b => b.targetId);
    const jobs = await prisma.job.findMany({
      where: { id: { in: jobIds } },
    });

    // Map bookmarks to full data
    const careersWithBookmarks = careerBookmarks.map(bookmark => {
      const career = careers.find(c => c.id === bookmark.targetId);
      return {
        bookmarkId: bookmark.id,
        bookmarkedAt: bookmark.createdAt,
        ...career,
      };
    }).filter(c => c.id); // Filter out any null careers

    const jobsWithBookmarks = jobBookmarks.map(bookmark => {
      const job = jobs.find(j => j.id === bookmark.targetId);
      return {
        bookmarkId: bookmark.id,
        bookmarkedAt: bookmark.createdAt,
        ...job,
      };
    }).filter(j => j.id); // Filter out any null jobs

    return NextResponse.json({
      careers: careersWithBookmarks,
      jobs: jobsWithBookmarks,
      stats: {
        totalBookmarks: bookmarks.length,
        careerCount: careersWithBookmarks.length,
        jobCount: jobsWithBookmarks.length,
      },
    });
  } catch (error: any) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookmarks - Remove a bookmark
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { bookmarkId } = await request.json();

    if (!bookmarkId) {
      return NextResponse.json(
        { error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    // Verify bookmark belongs to user before deleting
    const bookmark = await prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId) {
      return NextResponse.json(
        { error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({
      where: { id: bookmarkId },
    });

    return NextResponse.json({
      message: 'Bookmark removed successfully',
    });
  } catch (error: any) {
    console.error('Error removing bookmark:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to remove bookmark' },
      { status: 500 }
    );
  }
}
