'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 80px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
`;

const CommittedCareerSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
`;

const CareerCard = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 16px;
  padding: 2rem;
  border-left: 5px solid #667eea;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CareerTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
`;

const CareerDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProgressLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.75rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #718096;
  text-align: right;
`;

const ViewPlanButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const QuickLinkCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const QuickLinkIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const QuickLinkTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const QuickLinkDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.75rem;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1.5rem;
`;

const ExploreButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: white;
  font-size: 1.25rem;
`;

const QuickActionSection = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid #667eea;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuickActionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuickActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.25rem;
`;

const QuickActionSubtitle = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
`;

const QuickActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [committedCareer, setCommittedCareer] = useState<any>(null);
  const [careerDetails, setCareerDetails] = useState<any>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      fetchCommittedCareer();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  const fetchCommittedCareer = async () => {
    try {
      setLoading(true);

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Fetch user actions to get committed career
      const actionsRes = await fetch('/api/user/actions', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!actionsRes.ok) {
        if (actionsRes.status === 401) {
          // User not authenticated - this is okay for the home page
          console.log('User not authenticated');
        } else {
          console.error('Failed to fetch actions', actionsRes.status);
        }
        setLoading(false);
        return;
      }

      const actionsData = await actionsRes.json();

      if (actionsData.committedCareer) {
        setCommittedCareer(actionsData.committedCareer);

        // Fetch career details
        const careerController = new AbortController();
        const careerTimeoutId = setTimeout(() => careerController.abort(), 5000); // 5 second timeout

        const careerRes = await fetch(`/api/careers/${actionsData.committedCareer.careerId}`, {
          cache: 'no-store',
          signal: careerController.signal,
        });

        clearTimeout(careerTimeoutId);

        if (careerRes.ok) {
          const careerData = await careerRes.json();
          setCareerDetails(careerData.career);
        } else {
          console.error('Failed to fetch career details');
        }
      }
    } catch (error) {
      console.error('Error fetching committed career:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request timed out');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!committedCareer?.actionSteps?.steps) return 0;
    const completed = committedCareer.actionSteps.steps.filter((s: any) => s.completed).length;
    const total = committedCareer.actionSteps.steps.length;
    return Math.round((completed / total) * 100);
  };

  if (status === 'loading' || loading) {
    return (
      <Container>
        <Content>
          <Loading>Loading...</Loading>
        </Content>
        <Navigation />
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>AI Pathfinder</Title>
          <Subtitle>
            {session?.user
              ? `Welcome back, ${session.user.name?.split(' ')[0] || 'there'}!`
              : 'Your AI-powered career guidance platform'}
          </Subtitle>
        </Header>

        {session?.user ? (
          <>
            {committedCareer && careerDetails && (
              <QuickActionSection>
                <QuickActionText>
                  <QuickActionTitle>🎯 Your Action Plan</QuickActionTitle>
                  <QuickActionSubtitle>
                    {committedCareer.actionSteps?.steps ? 
                      `${committedCareer.actionSteps.steps.filter((s: any) => s.completed).length} of ${committedCareer.actionSteps.steps.length} steps completed` 
                      : 'Ready to get started'}
                  </QuickActionSubtitle>
                </QuickActionText>
                <QuickActionButton onClick={() => router.push('/action-plan')}>
                  View Action Plan
                </QuickActionButton>
              </QuickActionSection>
            )}

            {committedCareer && careerDetails ? (
              <CommittedCareerSection>
                <SectionTitle>Your Committed Career</SectionTitle>
                <CareerCard onClick={() => router.push(`/careers/${careerDetails.id}`)}>
                  <CareerTitle>{careerDetails.title}</CareerTitle>
                  <CareerDescription>{careerDetails.description}</CareerDescription>

                  {committedCareer.actionSteps?.steps && committedCareer.actionSteps.steps.length > 0 && (
                    <ProgressSection>
                      <ProgressLabel>Action Plan Progress</ProgressLabel>
                      <ProgressBar>
                        <ProgressFill $progress={calculateProgress()} />
                      </ProgressBar>
                      <ProgressText>
                        {committedCareer.actionSteps.steps.filter((s: any) => s.completed).length} of {committedCareer.actionSteps.steps.length} steps completed ({calculateProgress()}%)
                      </ProgressText>
                      <ViewPlanButton onClick={(e) => {
                        e.stopPropagation();
                        router.push('/action-plan');
                      }}>
                        View Full Action Plan
                      </ViewPlanButton>
                    </ProgressSection>
                  )}
                </CareerCard>
              </CommittedCareerSection>
            ) : (
              <EmptyState>
                <EmptyStateIcon>🎯</EmptyStateIcon>
                <EmptyStateTitle>No Committed Career Yet</EmptyStateTitle>
                <EmptyStateText>
                  Explore our career recommendations and commit to the one that's right for you!
                </EmptyStateText>
                <ExploreButton onClick={() => router.push('/careers')}>
                  Explore Careers
                </ExploreButton>
              </EmptyState>
            )}

            <QuickLinksGrid>
              <QuickLinkCard onClick={() => router.push('/chat')}>
                <QuickLinkIcon>💬</QuickLinkIcon>
                <QuickLinkTitle>Chat with AI</QuickLinkTitle>
                <QuickLinkDescription>
                  Get personalized career advice
                </QuickLinkDescription>
              </QuickLinkCard>

              <QuickLinkCard onClick={() => router.push('/careers')}>
                <QuickLinkIcon>🎯</QuickLinkIcon>
                <QuickLinkTitle>Browse Careers</QuickLinkTitle>
                <QuickLinkDescription>
                  Explore career opportunities
                </QuickLinkDescription>
              </QuickLinkCard>

              <QuickLinkCard onClick={() => router.push('/jobs')}>
                <QuickLinkIcon>💼</QuickLinkIcon>
                <QuickLinkTitle>Find Jobs</QuickLinkTitle>
                <QuickLinkDescription>
                  Search job listings
                </QuickLinkDescription>
              </QuickLinkCard>

              <QuickLinkCard onClick={() => router.push('/profile')}>
                <QuickLinkIcon>👤</QuickLinkIcon>
                <QuickLinkTitle>My Profile</QuickLinkTitle>
                <QuickLinkDescription>
                  View your progress
                </QuickLinkDescription>
              </QuickLinkCard>
            </QuickLinksGrid>
          </>
        ) : (
          <EmptyState>
            <EmptyStateIcon>👋</EmptyStateIcon>
            <EmptyStateTitle>Welcome to AI Pathfinder</EmptyStateTitle>
            <EmptyStateText>
              Discover your ideal career path with AI-powered guidance. Get matched with careers that align with your skills and goals.
            </EmptyStateText>
            <ExploreButton onClick={() => router.push('/login')}>
              Get Started
            </ExploreButton>
          </EmptyState>
        )}
      </Content>

      <Navigation />
    </Container>
  );
}
