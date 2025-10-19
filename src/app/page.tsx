'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  text-align: center;
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
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 16px;
  padding: 2rem;
  border-left: 5px solid ${({ theme }) => theme.colors.primary.blue};
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
  background: ${({ theme }) => theme.colors.primary.gradient};
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #718096;
  text-align: right;
`;

const ViewPlanButton = styled.button`
  background: ${({ theme }) => theme.colors.button.commit};
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
  background: ${({ theme }) => theme.colors.button.commit};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.25rem;
`;

const QuickActionSection = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.blue};
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
  background: ${({ theme }) => theme.colors.button.commit};
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
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
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
