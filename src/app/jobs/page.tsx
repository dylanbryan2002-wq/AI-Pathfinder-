'use client';

import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
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
  overflow-y: visible;
  padding: 1rem;
  padding-bottom: 320px;
  margin-bottom: -300px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownChip = styled.button<{ $active: boolean; $hasSelection: boolean }>`
  background: ${({ $hasSelection, theme }) =>
    $hasSelection ? theme.colors.primary.blue : theme.colors.background.card};
  color: ${({ $hasSelection, theme }) =>
    $hasSelection ? 'white' : theme.colors.text.primary};
  border: 2px solid ${({ $hasSelection, theme }) =>
    $hasSelection ? theme.colors.primary.blue : '#E5E7EB'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }

  svg {
    width: 12px;
    height: 12px;
    transition: ${({ theme }) => theme.transitions.fast};
    transform: ${({ $active }) => $active ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 250px;
  background: #FFFFFF;
  border: 2px solid #4A90E2;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
`;

const DropdownSearch = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-bottom: 2px solid #E5E7EB;
  outline: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: #000000;
  background: #FFFFFF;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const DropdownOption = styled.div<{ $selected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $selected }) =>
    $selected ? '#E0F2FE' : '#FFFFFF'};
  color: #000000;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &:hover {
    background: #F0F9FF;
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
  'Internship',
];

// Common job roles/career types
const roleOptions = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'Designer',
  'Marketing Manager',
  'Sales Representative',
  'Business Analyst',
  'Project Manager',
  'Accountant',
  'Teacher',
  'Nurse',
  'Engineer',
  'Consultant',
  'Writer',
  'Customer Service',
  'Human Resources',
  'Operations Manager',
  'Financial Analyst',
  'Research Scientist',
  'Social Worker',
];

// Common US locations
const locationOptions = [
  'Remote',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'Charlotte, NC',
  'San Francisco, CA',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Washington, DC',
  'Nashville, TN',
  'Portland, OR',
  'Atlanta, GA',
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

  // Dropdown states
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [roleSearchQuery, setRoleSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

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
  }, [searchQuery, activeFilter, activeTab, selectedRole, selectedLocation]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsRoleDropdownOpen(false);
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch user's explore list to initialize tried careers
      const exploreResponse = await fetch('/api/user/explore');
      if (exploreResponse.ok) {
        const exploreData = await exploreResponse.json();
        const triedIds = new Set<string>(exploreData.exploreCareers.map((item: any) => item.careerId as string));
        setTriedCareers(triedIds);
      }

      // Fetch user's committed career
      const actionsResponse = await fetch('/api/user/actions');
      if (actionsResponse.ok) {
        const actionsData = await actionsResponse.json();
        if (actionsData.committedCareer) {
          setCommittedCareer(actionsData.committedCareer.careerId);
        }
      }

      // Fetch careers for recommended tab
      const careersResponse = await fetch('/api/careers');
      const careersData = await careersResponse.json();

      // Generate match percentages for all careers (70-97%)
      const careersWithMatches = careersData.careers
        .map((career: any, index: number) => ({
          ...career,
          matchPercentage: mockMatches[career.title]?.percentage || (97 - (index * 2)), // Decreasing match from 97%
          matchDescription: mockMatches[career.title]?.description || 'Your profile matches well with this career path.',
        }))
        .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage) // Sort by match percentage descending
        .slice(0, 10); // Top 10 for recommended
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

      const queryString = params.toString();
      console.log('Fetching jobs with query:', queryString || '(empty)');
      console.log('Active filter:', activeFilter);
      console.log('Search query:', searchQuery);

      const jobsResponse = await fetch(`/api/jobs/search?${queryString}`);
      const jobsData = await jobsResponse.json();
      console.log('Jobs received from API:', jobsData.results?.length || 0, 'jobs');
      console.log('Full API response:', jobsData);
      setJobs(jobsData.results || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleTry = async (careerId: string) => {
    try {
      if (triedCareers.has(careerId)) {
        // Remove from explore list
        await fetch(`/api/user/explore?careerId=${careerId}`, {
          method: 'DELETE',
        });
        setTriedCareers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(careerId);
          return newSet;
        });
      } else {
        // Add to explore list
        await fetch('/api/user/explore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ careerId }),
        });
        setTriedCareers((prev) => {
          const newSet = new Set(prev);
          newSet.add(careerId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error updating explore list:', error);
    }
  };

  const handleCommit = async (careerId: string) => {
    try {
      if (committedCareer === careerId) {
        // Uncommit - delete committed career
        await fetch('/api/user/commit', {
          method: 'DELETE',
        });
        setCommittedCareer(null);
      } else {
        // Commit to career - create action plan and redirect
        const response = await fetch('/api/user/commit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ careerId }),
        });

        if (response.ok) {
          // Redirect to home page which will show the action plan
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('Error committing to career:', error);
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
        <Logo />
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

      {activeTab === 'all' && (
        <FiltersRow>
          {/* All Jobs Filter - First */}
          <FilterChip
            $active={activeFilter === 'All Jobs'}
            onClick={() => setActiveFilter('All Jobs')}
          >
            All Jobs
          </FilterChip>

          {/* Role/Type of Job Dropdown */}
          <DropdownWrapper data-dropdown>
            <DropdownChip
              $active={isRoleDropdownOpen}
              $hasSelection={!!selectedRole}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Role dropdown clicked, current state:', isRoleDropdownOpen);
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsLocationDropdownOpen(false);
              }}
            >
              {selectedRole || 'Type of role'}
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </DropdownChip>
            <DropdownMenu $isOpen={isRoleDropdownOpen}>
              <DropdownSearch
                type="text"
                placeholder="Search roles..."
                value={roleSearchQuery}
                onChange={(e) => setRoleSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {roleOptions
                .filter(role =>
                  role.toLowerCase().includes(roleSearchQuery.toLowerCase())
                )
                .map((role) => (
                  <DropdownOption
                    key={role}
                    $selected={selectedRole === role}
                    onClick={() => {
                      setSelectedRole(role === selectedRole ? '' : role);
                      setIsRoleDropdownOpen(false);
                      setRoleSearchQuery('');
                    }}
                  >
                    {role}
                  </DropdownOption>
                ))}
            </DropdownMenu>
          </DropdownWrapper>

          {/* Location Dropdown */}
          <DropdownWrapper data-dropdown>
            <DropdownChip
              $active={isLocationDropdownOpen}
              $hasSelection={!!selectedLocation}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Location dropdown clicked, current state:', isLocationDropdownOpen);
                setIsLocationDropdownOpen(!isLocationDropdownOpen);
                setIsRoleDropdownOpen(false);
              }}
            >
              {selectedLocation || 'Location'}
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </DropdownChip>
            <DropdownMenu $isOpen={isLocationDropdownOpen}>
              <DropdownSearch
                type="text"
                placeholder="Search locations..."
                value={locationSearchQuery}
                onChange={(e) => setLocationSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {locationOptions
                .filter(location =>
                  location.toLowerCase().includes(locationSearchQuery.toLowerCase())
                )
                .map((location) => (
                  <DropdownOption
                    key={location}
                    $selected={selectedLocation === location}
                    onClick={() => {
                      setSelectedLocation(location === selectedLocation ? '' : location);
                      setIsLocationDropdownOpen(false);
                      setLocationSearchQuery('');
                    }}
                  >
                    {location}
                  </DropdownOption>
                ))}
            </DropdownMenu>
          </DropdownWrapper>

          {/* Remaining Filter Chips */}
          {filterCategories.slice(1).map((filter) => (
            <FilterChip
              key={filter}
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </FiltersRow>
      )}

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

            {jobs.map((job, index) => (
              <JobCard key={job.id || `job-${index}`}>
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

                {job.tags && job.tags.length > 0 && (
                  <JobTags>
                    {job.tags.map((tag: string, tagIndex: number) => (
                      <Tag key={`${job.id}-tag-${tagIndex}`}>{tag}</Tag>
                    ))}
                  </JobTags>
                )}

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
