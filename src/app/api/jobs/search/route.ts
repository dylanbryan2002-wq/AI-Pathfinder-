import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchJobsFromMuse } from '@/lib/job-apis/themuse';
import { fetchJobsFromRemotive } from '@/lib/job-apis/remotive';
import { fetchJobsFromUSAJobs } from '@/lib/job-apis/usajobs';

// Adzuna API integration
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || '';
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || '';
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';

interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
    area: string[];
  };
  description: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
  category?: {
    label: string;
  };
  created: string;
  redirect_url: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const resultsPerPage = parseInt(searchParams.get('results_per_page') || '20');
    const source = searchParams.get('source') || 'all'; // all, adzuna, themuse, remotive, usajobs

    // If no query or location specified, fetch from database (for "All Jobs" tab)
    if (!query && !location) {
      console.log('Fetching all jobs from database...');
      const dbJobs = await prisma.job.findMany({
        orderBy: { postedAt: 'desc' },
        take: 100, // Show more jobs at once
        skip: (page - 1) * 100,
      });

      const totalCount = await prisma.job.count();

      // Truncate descriptions to prevent showing too much text
      const truncatedJobs = dbJobs.map(job => ({
        ...job,
        description: job.description.length > 200
          ? job.description.substring(0, 200) + '...'
          : job.description
      }));

      console.log(`Database results: ${truncatedJobs.length} jobs (total: ${totalCount})`);

      return NextResponse.json({
        results: truncatedJobs,
        count: totalCount,
        mean: null,
        source: 'database',
      });
    }

    // If specific source requested, fetch only from that source
    if (source !== 'all') {
      return await fetchFromSpecificSource(source, query || 'career', location || 'US', page, resultsPerPage);
    }

    // Fetch from multiple sources in parallel
    const [adzunaJobs, museJobs, remotiveJobs, usaJobs] = await Promise.all([
      fetchFromAdzuna(query || 'career', location || 'US', page, resultsPerPage),
      location?.toLowerCase().includes('remote') ? fetchJobsFromMuse(query || 'career', location) : [],
      location?.toLowerCase().includes('remote') ? fetchJobsFromRemotive() : [],
      fetchJobsFromUSAJobs(query || 'career', location || 'US', page),
    ]);

    // Combine all results
    const allJobs = [...adzunaJobs, ...museJobs, ...remotiveJobs, ...usaJobs];

    console.log('Job API results:', {
      adzuna: adzunaJobs.length,
      muse: museJobs.length,
      remotive: remotiveJobs.length,
      usaJobs: usaJobs.length,
      total: allJobs.length
    });

    // Remove duplicates based on title and company
    const uniqueJobs = allJobs.reduce((acc, job) => {
      const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
      if (!acc.has(key)) {
        acc.set(key, job);
      }
      return acc;
    }, new Map());

    const transformedJobs = Array.from(uniqueJobs.values());

    // Sync to database for caching
    if (page === 1 && transformedJobs.length > 0) {
      await syncJobsToDatabase(transformedJobs);
    }

    return NextResponse.json({
      results: transformedJobs.slice(0, resultsPerPage),
      count: transformedJobs.length,
      mean: null,
      sources: {
        adzuna: adzunaJobs.length,
        themuse: museJobs.length,
        remotive: remotiveJobs.length,
        usajobs: usaJobs.length,
      },
    });

  } catch (error: any) {
    console.error('Job search error:', error);

    // Fallback to database on error
    try {
      const fallbackJobs = await prisma.job.findMany({
        orderBy: { postedAt: 'desc' },
        take: 20,
      });

      return NextResponse.json({
        results: fallbackJobs,
        count: fallbackJobs.length,
        mean: null,
        source: 'database_fallback',
        error: 'Using cached jobs due to API error',
      });
    } catch (dbError) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch jobs' },
        { status: 500 }
      );
    }
  }
}

async function fetchFromSpecificSource(
  source: string,
  query: string,
  location: string,
  page: number,
  resultsPerPage: number
) {
  let jobs: any[] = [];

  switch (source) {
    case 'adzuna':
      jobs = await fetchFromAdzuna(query, location, page, resultsPerPage);
      break;
    case 'themuse':
      jobs = await fetchJobsFromMuse(query, location, page);
      break;
    case 'remotive':
      jobs = await fetchJobsFromRemotive(query);
      break;
    case 'usajobs':
      jobs = await fetchJobsFromUSAJobs(query, location, page);
      break;
    default:
      jobs = [];
  }

  if (jobs.length > 0 && page === 1) {
    await syncJobsToDatabase(jobs);
  }

  return NextResponse.json({
    results: jobs,
    count: jobs.length,
    mean: null,
    source,
  });
}

async function fetchFromAdzuna(
  query: string,
  location: string,
  page: number,
  resultsPerPage: number
) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.log('Adzuna API credentials not configured');
    return [];
  }

  try {
    const country = 'us';
    const url = `${ADZUNA_BASE_URL}/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(query)}&where=${encodeURIComponent(location)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results.map((job: AdzunaJob) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      type: job.contract_type || 'Full-time',
      salary: job.salary_min && job.salary_max
        ? `$${Math.round(job.salary_min / 1000)}k - $${Math.round(job.salary_max / 1000)}k`
        : null,
      description: job.description,
      tags: job.category ? [job.category.label] : [],
      postedAt: new Date(job.created),
      sourceUrl: job.redirect_url,
      externalId: job.id,
      source: 'Adzuna',
    }));
  } catch (error) {
    console.error('Error fetching from Adzuna:', error);
    return [];
  }
}

async function syncJobsToDatabase(jobs: any[]) {
  try {
    // Only sync jobs that don't already exist
    for (const job of jobs) {
      const existing = await prisma.job.findFirst({
        where: {
          externalId: job.externalId,
          source: job.source,
        },
      });

      if (!existing) {
        await prisma.job.create({
          data: {
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary,
            description: job.description.substring(0, 5000), // Limit description length
            tags: job.tags,
            postedAt: job.postedAt,
            sourceUrl: job.sourceUrl,
            externalId: job.externalId,
            source: job.source,
          },
        });
      }
    }
  } catch (error) {
    console.error('Error syncing jobs to database:', error);
    // Don't throw - syncing is optional
  }
}
