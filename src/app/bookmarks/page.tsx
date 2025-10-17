'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #718096;
  font-weight: 500;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#667eea' : 'white'};

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
  padding-right: 32px;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #718096;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;

const BookmarkedDate = styled.div`
  font-size: 13px;
  color: #a0aec0;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(229, 62, 62, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #718096;
  margin-bottom: 24px;
`;

const ExploreButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: white;
  font-size: 20px;
`;

const SalaryBadge = styled.span`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  color: #667eea;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
`;

export default function BookmarksPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'careers' | 'jobs'>('all');
  const [careers, setCareers] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalBookmarks: 0, careerCount: 0, jobCount: 0 });

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookmarks');
      const data = await response.json();

      if (response.ok) {
        setCareers(data.careers || []);
        setJobs(data.jobs || []);
        setStats(data.stats || { totalBookmarks: 0, careerCount: 0, jobCount: 0 });
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (bookmarkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Remove this bookmark?')) return;

    try {
      const response = await fetch('/api/bookmarks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookmarkId }),
      });

      if (response.ok) {
        fetchBookmarks();
      }
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  const filteredCareers = activeTab === 'jobs' ? [] : careers;
  const filteredJobs = activeTab === 'careers' ? [] : jobs;
  const hasBookmarks = careers.length > 0 || jobs.length > 0;

  if (loading) {
    return (
      <Container>
        <Navigation />
        <Content>
          <Loading>Loading your bookmarks...</Loading>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Navigation />
      <Content>
        <Header>
          <Title>My Bookmarks</Title>
          <Subtitle>Your saved careers and job opportunities</Subtitle>
        </Header>

        {hasBookmarks ? (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{stats.totalBookmarks}</StatValue>
                <StatLabel>Total Bookmarks</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.careerCount}</StatValue>
                <StatLabel>Careers Saved</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.jobCount}</StatValue>
                <StatLabel>Jobs Saved</StatLabel>
              </StatCard>
            </StatsGrid>

            <Tabs>
              <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
                All ({stats.totalBookmarks})
              </Tab>
              <Tab active={activeTab === 'careers'} onClick={() => setActiveTab('careers')}>
                Careers ({stats.careerCount})
              </Tab>
              <Tab active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')}>
                Jobs ({stats.jobCount})
              </Tab>
            </Tabs>

            <Grid>
              {filteredCareers.map((career) => (
                <Card key={career.id} onClick={() => router.push(`/careers/${career.id}`)}>
                  <CardTitle>{career.title}</CardTitle>
                  <CardMeta>
                    {career.avgSalary && <SalaryBadge>{career.avgSalary}</SalaryBadge>}
                    {career.education && <span>{career.education}</span>}
                    {career.growth && (
                      <>
                        <span>•</span>
                        <span>{career.growth} growth</span>
                      </>
                    )}
                  </CardMeta>
                  <CardDescription>{career.description}</CardDescription>
                  <CardFooter>
                    <BookmarkedDate>
                      Saved {new Date(career.bookmarkedAt).toLocaleDateString()}
                    </BookmarkedDate>
                    <RemoveButton onClick={(e) => handleRemoveBookmark(career.bookmarkId, e)}>
                      Remove
                    </RemoveButton>
                  </CardFooter>
                </Card>
              ))}

              {filteredJobs.map((job) => (
                <Card key={job.id} onClick={() => job.sourceUrl && window.open(job.sourceUrl, '_blank')}>
                  <CardTitle>{job.title}</CardTitle>
                  <CardMeta>
                    <span style={{ color: '#667eea', fontWeight: 600 }}>{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <SalaryBadge>{job.salary}</SalaryBadge>
                      </>
                    )}
                  </CardMeta>
                  <CardDescription>
                    {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </CardDescription>
                  <CardFooter>
                    <BookmarkedDate>
                      Saved {new Date(job.bookmarkedAt).toLocaleDateString()}
                    </BookmarkedDate>
                    <RemoveButton onClick={(e) => handleRemoveBookmark(job.bookmarkId, e)}>
                      Remove
                    </RemoveButton>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>🔖</EmptyIcon>
            <EmptyTitle>No Bookmarks Yet</EmptyTitle>
            <EmptyText>
              Start exploring careers and jobs, then bookmark the ones you're interested in!
            </EmptyText>
            <ExploreButton onClick={() => router.push('/careers')}>
              Explore Careers
            </ExploreButton>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
}
