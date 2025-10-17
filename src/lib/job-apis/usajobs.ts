// USAJobs API Integration
// Docs: https://developer.usajobs.gov/API-Reference

const USAJOBS_API_KEY = process.env.USAJOBS_API_KEY;
const USAJOBS_USER_AGENT = process.env.USAJOBS_USER_AGENT;
const USAJOBS_BASE_URL = 'https://data.usajobs.gov/api/search';

interface USAJob {
  MatchedObjectId: string;
  PositionTitle: string;
  OrganizationName: string;
  PositionLocationDisplay: string;
  PositionSchedule: Array<{
    Name: string;
  }>;
  PositionRemuneration: Array<{
    MinimumRange: string;
    MaximumRange: string;
  }>;
  QualificationSummary: string;
  PositionStartDate: string;
  PositionEndDate: string;
  PublicationStartDate: string;
  ApplicationCloseDate: string;
  PositionFormattedDescription: Array<{
    Content: string;
  }>;
  JobCategory: Array<{
    Name: string;
  }>;
  PositionUri: string;
}

interface USAJobsResponse {
  SearchResult: {
    SearchResultItems: Array<{
      MatchedObjectId: string;
      MatchedObjectDescriptor: USAJob;
    }>;
    SearchResultCount: number;
    SearchResultCountAll: number;
  };
}

export async function fetchJobsFromUSAJobs(
  keyword?: string,
  location?: string,
  page: number = 1
) {
  if (!USAJOBS_API_KEY || !USAJOBS_USER_AGENT) {
    console.log('USAJobs API credentials not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      ResultsPerPage: '50',
      Page: page.toString(),
      ...(keyword && { Keyword: keyword }),
      ...(location && { LocationName: location }),
    });

    const url = `${USAJOBS_BASE_URL}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Authorization-Key': USAJOBS_API_KEY,
        'User-Agent': USAJOBS_USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error(`USAJobs API error: ${response.statusText}`);
    }

    const data: USAJobsResponse = await response.json();
    const items = data.SearchResult?.SearchResultItems || [];

    // Transform to our format
    const transformedJobs = items.map((item) => {
      const job = item.MatchedObjectDescriptor;

      let salary = null;
      if (job.PositionRemuneration && job.PositionRemuneration.length > 0) {
        const rem = job.PositionRemuneration[0];
        const min = parseInt(rem.MinimumRange) / 1000;
        const max = parseInt(rem.MaximumRange) / 1000;
        salary = `$${Math.round(min)}k - $${Math.round(max)}k`;
      }

      const description = job.PositionFormattedDescription && job.PositionFormattedDescription.length > 0
        ? job.PositionFormattedDescription[0].Content
        : job.QualificationSummary || '';

      return {
        title: job.PositionTitle,
        company: job.OrganizationName,
        location: job.PositionLocationDisplay,
        type: job.PositionSchedule && job.PositionSchedule.length > 0
          ? job.PositionSchedule[0].Name
          : 'Full-time',
        salary,
        description: description.substring(0, 5000),
        tags: job.JobCategory ? job.JobCategory.map((cat) => cat.Name) : [],
        postedAt: new Date(job.PublicationStartDate),
        sourceUrl: job.PositionUri,
        externalId: job.MatchedObjectId,
        source: 'USAJobs',
      };
    });

    return transformedJobs;
  } catch (error) {
    console.error('Error fetching from USAJobs:', error);
    return [];
  }
}

export const USAJOBS_KEYWORDS = [
  'software engineer',
  'data analyst',
  'cybersecurity',
  'nurse',
  'accountant',
  'engineer',
  'scientist',
  'analyst',
  'administrator',
  'specialist',
  'manager',
  'coordinator',
];
