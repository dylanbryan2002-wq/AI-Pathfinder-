'use client';

import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { CareerCard } from '@/components/CareerCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const ContentArea = styled.div`
  padding: 1rem;
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

export default function CareersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [triedCareers, setTriedCareers] = useState<Set<string>>(new Set());
  const [committedCareer, setCommittedCareer] = useState<string | null>(null);
  const [bookmarkedCareers, setBookmarkedCareers] = useState<Set<string>>(new Set());

  // Mock match percentages and descriptions (in production, these would come from AI analysis)
  const mockMatches: { [key: string]: { percentage: number; description: string } } = {
    'Youth Development Leader': {
      percentage: 97,
      description: 'Your need to be around people, love of teaching, and love to work with kids matched you with Youth Development Leader.',
    },
    'High School Teacher': {
      percentage: 95,
      description: 'Your passion for education, strong communication skills, and desire to make a difference matched you with High School Teacher.',
    },
    'Nonprofit Program Manager': {
      percentage: 93,
      description: 'Your organizational skills, passion for social impact, and leadership experience matched you with Nonprofit Program Manager.',
    },
    'Social Worker': {
      percentage: 90,
      description: 'Your empathy, problem-solving abilities, and desire to help others matched you with Social Worker.',
    },
    'Community Organizer': {
      percentage: 88,
      description: 'Your advocacy skills, community engagement experience, and passion for social justice matched you with Community Organizer.',
    },
  };

  useEffect(() => {
    fetchCareers();
    fetchUserActions();
  }, []);

  const fetchUserActions = async () => {
    try {
      const response = await fetch('/api/user/actions');

      if (response.ok) {
        const data = await response.json();

        // Set tried careers
        const triedIds = new Set<string>(data.triedCareers.map((tc: any) => tc.careerId as string));
        setTriedCareers(triedIds);

        // Set committed career
        if (data.committedCareer) {
          setCommittedCareer(data.committedCareer.careerId);
        }

        // Set bookmarked careers
        const bookmarkedIds = new Set<string>(
          data.bookmarks
            .filter((b: any) => b.type === 'career')
            .map((b: any) => b.targetId as string)
        );
        setBookmarkedCareers(bookmarkedIds);
      } else if (response.status === 401) {
        // User not authenticated, that's okay - they just won't have saved actions
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Error fetching user actions:', error);
    }
  };

  const fetchCareers = async () => {
    try {
      setLoading(true);

      // Fetch user's career matches
      const matchesResponse = await fetch('/api/user/career-matches');

      if (matchesResponse.ok) {
        const matchesData = await matchesResponse.json();

        // Map matches to career cards
        const careersWithMatches = matchesData.matches.map((match: any) => ({
          id: match.career.id,
          title: match.career.title,
          description: match.career.description,
          matchPercentage: match.matchPercentage,
          matchDescription: match.matchReason,
          avgSalary: match.career.avgSalary,
          requirements: match.career.requirements,
          education: match.career.education,
          growth: match.career.growth,
        }));

        setCareers(careersWithMatches);
      } else if (matchesResponse.status === 404) {
        // No matches found, show empty state or use mock data
        const response = await fetch('/api/careers');
        const data = await response.json();

        // Add mock match data to careers
        const careersWithMatches = data.careers.map((career: any) => ({
          ...career,
          matchPercentage: mockMatches[career.title]?.percentage || 85,
          matchDescription: mockMatches[career.title]?.description || 'Your profile matches well with this career path.',
        }));

        setCareers(careersWithMatches);
      } else {
        // Error or not authenticated - show mock data
        const response = await fetch('/api/careers');
        const data = await response.json();

        const careersWithMatches = data.careers.map((career: any) => ({
          ...career,
          matchPercentage: mockMatches[career.title]?.percentage || 85,
          matchDescription: mockMatches[career.title]?.description || 'Your profile matches well with this career path.',
        }));

        setCareers(careersWithMatches);
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTry = async (careerId: string) => {
    try {
      const response = await fetch('/api/user/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'try',
          careerId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTriedCareers((prev) => {
          const newSet = new Set(prev);
          if (data.tried) {
            newSet.add(careerId);
          } else {
            newSet.delete(careerId);
          }
          return newSet;
        });
      } else {
        console.error('Error trying career:', data.error);
        if (response.status === 401) {
          // Redirect to login if not authenticated
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Error trying career:', error);
    }
  };

  const handleCommit = async (careerId: string) => {
    try {
      const response = await fetch('/api/user/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'commit',
          careerId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state based on response
        if (data.action === 'committed' || data.action === 'updated') {
          setCommittedCareer(careerId);
          // Redirect to home page after committing
          router.push('/');
        } else if (data.action === 'uncommitted') {
          setCommittedCareer(null);
        }
      } else {
        console.error('Error committing to career:', data.error);
        if (response.status === 401) {
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Error committing to career:', error);
    }
  };

  const handleBookmark = async (careerId: string) => {
    try {
      const response = await fetch('/api/user/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'bookmark',
          careerId,
          type: 'career',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookmarkedCareers((prev) => {
          const newSet = new Set(prev);
          if (data.bookmarked) {
            newSet.add(careerId);
          } else {
            newSet.delete(careerId);
          }
          return newSet;
        });
      } else {
        console.error('Error bookmarking career:', data.error);
        if (response.status === 401) {
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Error bookmarking career:', error);
    }
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

      <ContentArea>
        {loading ? (
          <EmptyState>
            <h3>Loading careers...</h3>
          </EmptyState>
        ) : activeTab === 'recommended' ? (
          careers.length > 0 ? (
            careers.map((career) => (
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
            ))
          ) : (
            <EmptyState>
              <h3>No recommendations yet</h3>
              <p>
                Sorry no recommendations yet, have a conversation with ai pathfinder to get a
                recommended list of careers.
              </p>
            </EmptyState>
          )
        ) : (
          <EmptyState>
            <h3>All Jobs</h3>
            <p>Job listings coming soon...</p>
          </EmptyState>
        )}
      </ContentArea>

      <Navigation />
    </PageContainer>
  );
}
