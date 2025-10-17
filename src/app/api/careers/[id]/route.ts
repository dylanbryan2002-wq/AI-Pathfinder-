import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/careers/[id] - Get career details with related data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: careerId } = await params;

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

    // Get session for user-specific data
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let userActions = {
      isTrying: false,
      isCommitted: false,
      isBookmarked: false,
      matchPercentage: null as number | null,
    };

    if (userId) {
      // Check if user is trying this career
      const tryingCareer = await prisma.triedCareer.findUnique({
        where: {
          userId_careerId: {
            userId,
            careerId,
          },
        },
      });

      // Check if user is committed to this career
      const committedCareer = await prisma.committedCareer.findFirst({
        where: {
          userId,
          careerId,
        },
      });

      // Check if user bookmarked this career
      const bookmark = await prisma.bookmark.findFirst({
        where: {
          userId,
          type: 'career',
          targetId: careerId,
        },
      });

      // Get match percentage if exists
      const match = await prisma.careerMatch.findUnique({
        where: {
          userId_careerId: {
            userId,
            careerId,
          },
        },
      });

      userActions = {
        isTrying: !!tryingCareer,
        isCommitted: !!committedCareer,
        isBookmarked: !!bookmark,
        matchPercentage: match?.matchPercentage || null,
      };
    }

    // Get similar careers
    const similarCareers = await prisma.career.findMany({
      where: {
        id: { not: careerId },
      },
      take: 4,
      orderBy: { title: 'asc' },
    });

    // Fetch related jobs
    const careerTitle = career.title.toLowerCase();
    let relatedJobs: any[] = [];

    try {
      const cachedJobs = await prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: careerTitle } },
            { description: { contains: careerTitle } },
          ],
        },
        take: 6,
        orderBy: { postedAt: 'desc' },
      });

      relatedJobs = cachedJobs;

      if (cachedJobs.length < 3) {
        const jobSearchUrl = new URL(`${request.nextUrl.origin}/api/jobs/search`);
        jobSearchUrl.searchParams.set('q', career.title);
        jobSearchUrl.searchParams.set('results_per_page', '6');

        const jobResponse = await fetch(jobSearchUrl.toString());
        if (jobResponse.ok) {
          const jobData = await jobResponse.json();
          relatedJobs = jobData.results || [];
        }
      }
    } catch (error) {
      console.error('Error fetching related jobs:', error);
    }

    return NextResponse.json({
      career,
      userActions,
      similarCareers,
      relatedJobs,
    });
  } catch (error: any) {
    console.error('Error fetching career details:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch career details' },
      { status: 500 }
    );
  }
}
