'use client';

import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { CareerCard } from '@/components/CareerCard';
import { useState, useEffect } from 'react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-bottom: 80px;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 3px solid #4A9BFF;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
`;

const LogoText = styled.h1`
  font-family: 'Quicksand', -apple-system, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-transform: lowercase;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: 0 1rem;
  gap: 2rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  cursor: pointer;
  position: relative;
  transition: ${({ theme }) => theme.transitions.fast};

  ${({ $active, theme }) =>
    $active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${theme.colors.primary.blue};
      border-radius: 2px 2px 0 0;
    }
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SearchSection = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.75rem 1rem;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const SearchIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const FilterButton = styled.button`
  background: ${({ theme }) => theme.colors.background.card};
  border: 2px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary.blue : theme.colors.background.card};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.text.primary};
  border: 2px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary.blue : '#E5E7EB'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const ContentArea = styled.div`
  padding: 1rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SortButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const JobCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1rem;
  transition: ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const MatchBadge = styled.div<{ $percentage: number }>`
  background: ${({ $percentage, theme }) =>
    $percentage >= 75
      ? theme.colors.match.high
      : $percentage >= 50
      ? theme.colors.match.medium
      : theme.colors.match.low};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const CompanyLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

const JobInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
`;

const CompanyName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MetaBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const JobDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0.75rem 0;
`;

const JobTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const JobFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
`;

const Salary = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ApplyButton = styled.button`
  background: ${({ theme }) => theme.colors.button.commit};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.625rem 1.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

// Mock career recommendations data
const recommendedCareers = [
  {
    id: '1',
    matchPercentage: 97,
    title: 'Youth Development Leader',
    matchDescription: 'Your need to be around people, love of teaching, and love to work with kids matched you with Youth Development Leader.',
    salary: '64k',
    requirements: 'Experience working with kids',
  },
  {
    id: '2',
    matchPercentage: 95,
    title: 'Highschool Teacher',
    matchDescription: 'Your need to be around people, love of teaching, and love to work with kids matched you with Highschool Teacher.',
    salary: '58k',
    requirements: 'Teaching certification',
  },
  {
    id: '3',
    matchPercentage: 93,
    title: 'Nonprofit Program Manager',
    matchDescription: 'Your organizational skills, passion for social impact, and leadership experience matched you with Nonprofit Program Manager.',
    salary: '72k',
    requirements: 'Program management experience',
  },
];

// Mock job postings data
const allJobs = [
  {
    id: '1',
    title: 'Youth Program Coordinator',
    company: 'Community Centers Inc',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$55k - $68k',
    posted: '2 days ago',
    description: 'Join our team to develop and implement engaging youth programs. Work directly with teens to provide mentorship, life skills training, and career exploration opportunities.',
    tags: ['Youth Development', 'Program Management', 'Community Outreach'],
  },
  {
    id: '2',
    title: 'High School Teacher - English',
    company: 'Oakland Public Schools',
    location: 'Oakland, CA',
    type: 'Full-time',
    salary: '$52k - $72k',
    posted: '5 days ago',
    description: 'Seeking passionate educator to teach English Literature and Writing to high school students. Develop curriculum, assess student progress, and foster love of learning.',
    tags: ['Education', 'Curriculum Development', 'Mentoring'],
  },
  {
    id: '3',
    title: 'Nonprofit Program Manager',
    company: 'Bay Area Youth Services',
    location: 'Berkeley, CA',
    type: 'Full-time',
    salary: '$68k - $82k',
    posted: '1 week ago',
    description: 'Lead program development and implementation for youth-focused nonprofit. Manage team, oversee budgets, and measure program impact. Experience with grant writing preferred.',
    tags: ['Nonprofit', 'Leadership', 'Grant Writing'],
  },
  {
    id: '4',
    title: 'Community Outreach Coordinator',
    company: 'Local Arts Foundation',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$48k - $62k',
    posted: '3 days ago',
    description: 'Coordinate community engagement initiatives and build partnerships with local organizations to expand arts access.',
    tags: ['Community Engagement', 'Arts', 'Partnership Development'],
  },
  {
    id: '5',
    title: 'Education Specialist',
    company: 'Tech Education Nonprofit',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $75k',
    posted: '1 week ago',
    description: 'Design and deliver technology education programs for underserved communities. Curriculum development experience required.',
    tags: ['Education', 'Technology', 'Curriculum Design'],
  },
];

const filterCategories = [
  'All Jobs',
  'Full-time',
  'Part-time',
  'Remote',
  'On-site',
  'Entry Level',
  'Mid Level',
  'Senior',
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Jobs');
  const [careers, setCareers] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [triedCareers, setTriedCareers] = useState<Set<string>>(new Set());
  const [committedCareer, setCommittedCareer] = useState<string | null>(null);
  const [bookmarkedCareers, setBookmarkedCareers] = useState<Set<string>>(new Set());

  // Mock match data for careers
  const mockMatches: { [key: string]: { percentage: number; description: string } } = {
    'Youth Development Leader': {
      percentage: 97,
      description: 'Your need to be around people, love of teaching, and love to work with kids matched you with Youth Development Leader.',
    },
    'High School Teacher': {
      percentage: 95,
      description: 'Your passion for education and desire to make a difference matched you with High School Teacher.',
    },
    'Nonprofit Program Manager': {
      percentage: 93,
      description: 'Your organizational skills and passion for social impact matched you with Nonprofit Program Manager.',
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Refetch jobs when search query or filter changes
    if (activeTab === 'all') {
      fetchJobs();
    }
  }, [searchQuery, activeFilter, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch careers for recommended tab
      const careersResponse = await fetch('/api/careers');
      const careersData = await careersResponse.json();
      const careersWithMatches = careersData.careers
        .slice(0, 3) // Top 3 for recommended
        .map((career: any) => ({
          ...career,
          matchPercentage: mockMatches[career.title]?.percentage || 85,
          matchDescription: mockMatches[career.title]?.description || 'Your profile matches well with this career path.',
        }));
      setCareers(careersWithMatches);

      // Fetch initial jobs
      await fetchJobs();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append('q', searchQuery);
      }

      // Add filter-based parameters
      if (activeFilter !== 'All Jobs') {
        if (activeFilter === 'Remote') {
          params.append('location', 'Remote');
        } else if (activeFilter === 'Full-time' || activeFilter === 'Part-time') {
          // Adzuna will filter by contract type in the description
          params.append('q', `${searchQuery || 'career'} ${activeFilter}`);
        }
      }

      const jobsResponse = await fetch(`/api/jobs/search?${params.toString()}`);
      const jobsData = await jobsResponse.json();
      setJobs(jobsData.results || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleTry = (careerId: string) => {
    setTriedCareers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(careerId)) {
        newSet.delete(careerId);
      } else {
        newSet.add(careerId);
      }
      return newSet;
    });
  };

  const handleCommit = (careerId: string) => {
    if (committedCareer === careerId) {
      setCommittedCareer(null);
    } else {
      setCommittedCareer(careerId);
    }
  };

  const handleBookmark = (careerId: string) => {
    setBookmarkedCareers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(careerId)) {
        newSet.delete(careerId);
      } else {
        newSet.add(careerId);
      }
      return newSet;
    });
  };

  return (
    <PageContainer>
      <Header>
        <Logo>
          <LogoIcon>pf</LogoIcon>
          <LogoText>pathfinder</LogoText>
        </Logo>
        <BookmarkButton>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </BookmarkButton>
      </Header>

      <TabContainer>
        <Tab $active={activeTab === 'recommended'} onClick={() => setActiveTab('recommended')}>
          Recommended
        </Tab>
        <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All Jobs
        </Tab>
      </TabContainer>

      <SearchSection>
        <SearchBar>
          <SearchIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterButton>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </FilterButton>
        </SearchBar>
      </SearchSection>

      <FiltersRow>
        {filterCategories.map((filter) => (
          <FilterChip
            key={filter}
            $active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </FilterChip>
        ))}
      </FiltersRow>

      <ContentArea>
        {loading ? (
          <EmptyState>
            <h3>Loading...</h3>
          </EmptyState>
        ) : activeTab === 'recommended' ? (
          <>
            <ResultsHeader>
              <ResultsCount>{careers.length} careers matched</ResultsCount>
            </ResultsHeader>
            {careers.map((career) => (
              <CareerCard
                key={career.id}
                id={career.id}
                matchPercentage={career.matchPercentage}
                title={career.title}
                matchDescription={career.matchDescription}
                salary={career.avgSalary}
                requirements={career.requirements}
                onTry={() => handleTry(career.id)}
                onCommit={() => handleCommit(career.id)}
                onBookmark={() => handleBookmark(career.id)}
                isTried={triedCareers.has(career.id)}
                isCommitted={committedCareer === career.id}
                isBookmarked={bookmarkedCareers.has(career.id)}
              />
            ))}
          </>
        ) : (
          <>
            <ResultsHeader>
              <ResultsCount>{jobs.length} jobs found</ResultsCount>
              <SortButton>
                Sort by
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </SortButton>
            </ResultsHeader>

            {jobs.map((job) => (
              <JobCard key={job.id}>
                <JobHeader>
                  <CompanyLogo>{job.company.charAt(0)}</CompanyLogo>
                  <JobInfo>
                    <JobTitle>{job.title}</JobTitle>
                    <CompanyName>{job.company}</CompanyName>
                    <JobMeta>
                      <MetaBadge>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </MetaBadge>
                      <MetaBadge>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.type}
                      </MetaBadge>
                      <MetaBadge>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(job.postedAt).toLocaleDateString()}
                      </MetaBadge>
                    </JobMeta>
                  </JobInfo>
                  <BookmarkButton>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </BookmarkButton>
                </JobHeader>

                <JobDescription>{job.description}</JobDescription>

                <JobTags>
                  {job.tags.map((tag: string) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </JobTags>

                <JobFooter>
                  <Salary>{job.salary}</Salary>
                  <ApplyButton>Apply Now</ApplyButton>
                </JobFooter>
              </JobCard>
            ))}
          </>
        )}
      </ContentArea>

      <Navigation />
    </PageContainer>
  );
}
