// The Muse API Integration
// Docs: https://www.themuse.com/developers/api/v2

const THEMUSE_API_KEY = process.env.THEMUSE_API_KEY;
const THEMUSE_BASE_URL = 'https://www.themuse.com/api/public';

interface MuseJob {
  id: number;
  name: string;
  company: {
    name: string;
  };
  locations: Array<{
    name: string;
  }>;
  contents: string;
  publication_date: string;
  refs: {
    landing_page: string;
  };
  categories: Array<{
    name: string;
  }>;
  levels: Array<{
    name: string;
  }>;
}

interface MuseResponse {
  results: MuseJob[];
  page_count: number;
  total: number;
}

export async function fetchJobsFromMuse(
  query?: string,
  location?: string,
  page: number = 1
) {
  // The Muse API is free and doesn't require an API key

  try {
    const params = new URLSearchParams({
      page: page.toString(),
      descending: 'true',
      ...(query && { category: query }),
      ...(location && { location }),
    });

    // Note: The Muse API doesn't require API key in URL, it's free to use
    const url = `${THEMUSE_BASE_URL}/jobs?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`The Muse API error: ${response.statusText}`);
    }

    const data: MuseResponse = await response.json();

    // Transform to our format
    const transformedJobs = data.results.map((job) => ({
      title: job.name,
      company: job.company.name,
      location: job.locations.length > 0 ? job.locations[0].name : 'Remote',
      type: job.levels.length > 0 ? job.levels[0].name : 'Full-time',
      salary: null, // The Muse doesn't provide salary data
      description: job.contents.substring(0, 5000),
      tags: job.categories.map((cat) => cat.name),
      postedAt: new Date(job.publication_date),
      sourceUrl: job.refs.landing_page,
      externalId: job.id.toString(),
      source: 'TheMuse',
    }));

    return transformedJobs;
  } catch (error) {
    console.error('Error fetching from The Muse:', error);
    return [];
  }
}

export const MUSE_CATEGORIES = [
  'Engineering',
  'Data Science',
  'Design',
  'Marketing',
  'Product Management',
  'Sales',
  'Customer Service',
  'HR',
  'Finance',
  'Operations',
  'Content',
  'Social Media',
  'Copywriting',
  'Education',
  'Healthcare',
];
