import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/careers - Get all careers or user's career matches
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const recommended = searchParams.get('recommended') === 'true';

    if (userId && recommended) {
      // Get user's career matches
      const matches = await prisma.careerMatch.findMany({
        where: { userId },
        include: {
          career: true,
        },
        orderBy: {
          matchPercentage: 'desc',
        },
      });

      return NextResponse.json({ careers: matches });
    }

    // Get all careers
    const careers = await prisma.career.findMany({
      orderBy: { title: 'asc' },
    });

    return NextResponse.json({ careers });
  } catch (error: any) {
    console.error('Careers API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/careers - Create a new career
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      avgSalary,
      salaryRange,
      requirements,
      education,
      growth,
      dayInLife,
      dayInLifeList,
      onetCode,
      blsCode,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const career = await prisma.career.create({
      data: {
        title,
        description,
        avgSalary,
        salaryRange,
        requirements,
        education,
        growth,
        dayInLife,
        dayInLifeList,
        onetCode,
        blsCode,
      },
    });

    return NextResponse.json({ career }, { status: 201 });
  } catch (error: any) {
    console.error('Create career error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
