// Remotive API Integration
// Docs: https://remotive.com/api-documentation

const REMOTIVE_BASE_URL = 'https://remotive.com/api/remote-jobs';

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
  tags: string[];
}

export async function fetchJobsFromRemotive(category?: string) {
  try {
    // Remotive API is free and doesn't require authentication
    const params = new URLSearchParams({
      limit: '50',
      ...(category && { category }),
    });

    const url = `${REMOTIVE_BASE_URL}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Remotive API error: ${response.statusText}`);
    }

    const data = await response.json();
    const jobs: RemotiveJob[] = data.jobs || [];

    // Transform to our format
    const transformedJobs = jobs.map((job) => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || 'Remote',
      type: job.job_type || 'Full-time',
      salary: job.salary || null,
      description: job.description.substring(0, 5000),
      tags: job.tags || [job.category],
      postedAt: new Date(job.publication_date),
      sourceUrl: job.url,
      externalId: job.id.toString(),
      source: 'Remotive',
    }));

    return transformedJobs;
  } catch (error) {
    console.error('Error fetching from Remotive:', error);
    return [];
  }
}

export const REMOTIVE_CATEGORIES = [
  'software-dev',
  'customer-support',
  'design',
  'marketing',
  'sales',
  'product',
  'business',
  'data',
  'devops',
  'finance',
  'hr',
  'legal',
  'operations',
  'quality-assurance',
  'teaching',
  'writing',
  'all',
];
