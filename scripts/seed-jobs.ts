import { PrismaClient } from '@prisma/client';
import { fetchJobsFromMuse, MUSE_CATEGORIES } from '../src/lib/job-apis/themuse';
import { fetchJobsFromRemotive, REMOTIVE_CATEGORIES } from '../src/lib/job-apis/remotive';
import { fetchJobsFromUSAJobs, USAJOBS_KEYWORDS } from '../src/lib/job-apis/usajobs';

const prisma = new PrismaClient();

// Adzuna API credentials
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

// Popular career searches to build a diverse job database
const JOB_SEARCHES = [
  // Technology
  { query: 'software engineer', location: 'US' },
  { query: 'data scientist', location: 'US' },
  { query: 'web developer', location: 'US' },
  { query: 'product manager', location: 'US' },
  { query: 'UX designer', location: 'US' },
  { query: 'devops engineer', location: 'US' },
  { query: 'cybersecurity', location: 'US' },
  { query: 'cloud architect', location: 'US' },

  // Healthcare
  { query: 'registered nurse', location: 'US' },
  { query: 'physician assistant', location: 'US' },
  { query: 'medical assistant', location: 'US' },
  { query: 'pharmacist', location: 'US' },
  { query: 'physical therapist', location: 'US' },

  // Finance & Business
  { query: 'financial analyst', location: 'US' },
  { query: 'accountant', location: 'US' },
  { query: 'business analyst', location: 'US' },
  { query: 'marketing manager', location: 'US' },
  { query: 'sales representative', location: 'US' },
  { query: 'human resources', location: 'US' },

  // Education & Training
  { query: 'teacher', location: 'US' },
  { query: 'corporate trainer', location: 'US' },
  { query: 'instructional designer', location: 'US' },

  // Creative & Media
  { query: 'graphic designer', location: 'US' },
  { query: 'content writer', location: 'US' },
  { query: 'video editor', location: 'US' },
  { query: 'social media manager', location: 'US' },

  // Engineering & Manufacturing
  { query: 'mechanical engineer', location: 'US' },
  { query: 'electrical engineer', location: 'US' },
  { query: 'civil engineer', location: 'US' },
  { query: 'project manager', location: 'US' },

  // Service & Hospitality
  { query: 'customer service', location: 'US' },
  { query: 'restaurant manager', location: 'US' },

  // Remote jobs
  { query: 'remote software developer', location: 'Remote' },
  { query: 'remote customer support', location: 'Remote' },
  { query: 'remote writer', location: 'Remote' },

  // Additional major cities
  { query: 'software engineer', location: 'New York, NY' },
  { query: 'software engineer', location: 'San Francisco, CA' },
  { query: 'software engineer', location: 'Austin, TX' },
  { query: 'software engineer', location: 'Seattle, WA' },
  { query: 'software engineer', location: 'Boston, MA' },
  { query: 'data analyst', location: 'New York, NY' },
  { query: 'marketing manager', location: 'Los Angeles, CA' },
  { query: 'nurse', location: 'Chicago, IL' },
];

async function fetchJobsFromAdzuna(query: string, location: string, page: number = 1) {
  try {
    const country = 'us';
    const resultsPerPage = 50; // Max per request
    const url = `${ADZUNA_BASE_URL}/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(query)}&where=${encodeURIComponent(location)}`;

    console.log(`Fetching: ${query} in ${location} (page ${page})...`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Adzuna jobs to our format
    const transformedJobs = data.results.map((job: AdzunaJob) => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      type: job.contract_type || 'Full-time',
      salary: job.salary_min && job.salary_max
        ? `$${Math.round(job.salary_min / 1000)}k - $${Math.round(job.salary_max / 1000)}k`
        : null,
      description: job.description.substring(0, 5000), // Limit description length
      tags: job.category ? [job.category.label] : [],
      postedAt: new Date(job.created),
      sourceUrl: job.redirect_url,
      externalId: job.id,
      source: 'Adzuna',
    }));

    return transformedJobs;
  } catch (error) {
    console.error(`Error fetching jobs for "${query}":`, error);
    return [];
  }
}

async function saveJobsToDatabase(jobs: any[]) {
  let savedCount = 0;
  let skippedCount = 0;

  for (const job of jobs) {
    try {
      // Check if job already exists
      const existing = await prisma.job.findFirst({
        where: {
          externalId: job.externalId,
          source: job.source,
        },
      });

      if (!existing) {
        await prisma.job.create({
          data: job,
        });
        savedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error saving job ${job.title}:`, error);
    }
  }

  return { savedCount, skippedCount };
}

async function seedJobs() {
  console.log('🌱 Starting multi-source job database seeding...\n');

  let totalSaved = 0;
  let totalSkipped = 0;
  let searchesCompleted = 0;

  // 1. Seed from Adzuna
  if (ADZUNA_APP_ID && ADZUNA_APP_KEY) {
    console.log('📡 Fetching from Adzuna...\n');

    for (const search of JOB_SEARCHES) {
      const jobs = await fetchJobsFromAdzuna(search.query, search.location);

      if (jobs.length > 0) {
        const { savedCount, skippedCount } = await saveJobsToDatabase(jobs);
        totalSaved += savedCount;
        totalSkipped += skippedCount;
        console.log(`  ✓ Adzuna: ${search.query} - Saved ${savedCount}, skipped ${skippedCount}\n`);
      }

      searchesCompleted++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  } else {
    console.log('⚠️  Adzuna API credentials not configured, skipping...\n');
  }

  // 2. Seed from The Muse
  console.log('📡 Fetching from The Muse...\n');
  for (const category of MUSE_CATEGORIES.slice(0, 10)) { // Limit to avoid too many requests
    const jobs = await fetchJobsFromMuse(category);

    if (jobs.length > 0) {
      const { savedCount, skippedCount } = await saveJobsToDatabase(jobs);
      totalSaved += savedCount;
      totalSkipped += skippedCount;
      console.log(`  ✓ The Muse: ${category} - Saved ${savedCount}, skipped ${skippedCount}\n`);
    }

    searchesCompleted++;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 3. Seed from Remotive (remote jobs)
  console.log('📡 Fetching from Remotive...\n');
  for (const category of REMOTIVE_CATEGORIES.slice(0, 10)) {
    const jobs = await fetchJobsFromRemotive(category);

    if (jobs.length > 0) {
      const { savedCount, skippedCount } = await saveJobsToDatabase(jobs);
      totalSaved += savedCount;
      totalSkipped += skippedCount;
      console.log(`  ✓ Remotive: ${category} - Saved ${savedCount}, skipped ${skippedCount}\n`);
    }

    searchesCompleted++;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 4. Seed from USAJobs (government jobs)
  const USAJOBS_API_KEY = process.env.USAJOBS_API_KEY;
  if (USAJOBS_API_KEY) {
    console.log('📡 Fetching from USAJobs...\n');
    for (const keyword of USAJOBS_KEYWORDS.slice(0, 8)) {
      const jobs = await fetchJobsFromUSAJobs(keyword, 'United States');

      if (jobs.length > 0) {
        const { savedCount, skippedCount } = await saveJobsToDatabase(jobs);
        totalSaved += savedCount;
        totalSkipped += skippedCount;
        console.log(`  ✓ USAJobs: ${keyword} - Saved ${savedCount}, skipped ${skippedCount}\n`);
      }

      searchesCompleted++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } else {
    console.log('⚠️  USAJobs API credentials not configured, skipping...\n');
  }

  console.log('\n✅ Multi-source job seeding completed!');
  console.log(`📊 Total jobs saved: ${totalSaved}`);
  console.log(`⏭️  Total duplicates skipped: ${totalSkipped}`);
  console.log(`🔍 Total searches: ${searchesCompleted}`);

  // Get final count by source
  const totalJobsInDb = await prisma.job.count();
  console.log(`💾 Total jobs in database: ${totalJobsInDb}`);

  const jobsBySource = await prisma.$queryRaw`
    SELECT source, COUNT(*) as count
    FROM jobs
    GROUP BY source
    ORDER BY count DESC
  ` as Array<{ source: string; count: bigint }>;

  console.log('\n📊 Jobs by Source:');
  jobsBySource.forEach((row) => {
    console.log(`   ${row.source || 'Unknown'}: ${row.count}`);
  });
  console.log('');
}

// Run the seeding script
seedJobs()
  .catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
