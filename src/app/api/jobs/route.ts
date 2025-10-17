import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/jobs - Get all jobs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const location = searchParams.get('location');

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { postedAt: 'desc' },
      take: 50, // Limit to 50 results
    });

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      tags,
      postedAt,
      sourceUrl,
      externalId,
      source,
    } = body;

    if (!title || !company || !location || !description) {
      return NextResponse.json(
        { error: 'Title, company, location, and description are required' },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type: type || 'Full-time',
        salary,
        description,
        tags,
        postedAt: postedAt ? new Date(postedAt) : new Date(),
        sourceUrl,
        externalId,
        source,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error: any) {
    console.error('Create job error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
