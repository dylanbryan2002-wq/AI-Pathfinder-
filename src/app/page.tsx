'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
import ActionSteps from '@/components/ActionSteps';

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F7;
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
  justify-content: center;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ExploreIcon = styled.span`
  font-size: 40px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #4a5568;
`;

const ExploreList = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem 2rem 1rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ExploreTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
  text-align: center;
`;

const ExploreSubtitle = styled.p`
  font-size: 14px;
  color: #4a5568;
  text-align: center;
  margin-bottom: 24px;
`;

const CareerListItem = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const WaveDecoration = styled.div`
  margin-top: 40px;
  padding: 20px 0;
  display: flex;
  justify-content: center;

  svg {
    width: 100%;
    height: 60px;
    opacity: 0.4;
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
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ExploreButton = styled.button`
  background: linear-gradient(135deg, #5DD9FC 0%, #4A90E2 100%);
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
  color: #4a5568;
  font-size: 20px;
`;

const ActionPlanHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const ActionPlanTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

const ActionPlanSubtitle = styled.p`
  font-size: 18px;
  color: #4a5568;
`;

const CareerCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CareerTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

const CareerMeta = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #718096;
  margin-bottom: 16px;
`;

const CareerDescription = styled.p`
  font-size: 15px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #5DD9FC 0%, #4A90E2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const UndoButton = styled.button`
  background: #E5E7EB;
  color: #4a5568;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #D1D5DB;
    transform: translateY(-2px);
  }
`;

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [committedCareer, setCommittedCareer] = useState<any>(null);
  const [career, setCareer] = useState<any>(null);
  const [exploreList, setExploreList] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserData();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Check for committed career first
      const actionsResponse = await fetch('/api/user/actions');
      const actionsData = await actionsResponse.json();

      if (actionsResponse.ok && actionsData.committedCareer) {
        // User has committed career - show action plan
        setCommittedCareer(actionsData.committedCareer);

        // Get career details
        const careerResponse = await fetch(`/api/careers/${actionsData.committedCareer.careerId}`);
        const careerData = await careerResponse.json();

        if (careerResponse.ok) {
          setCareer(careerData.career);
        }
      } else {
        // No committed career - fetch explore list
        const exploreResponse = await fetch('/api/user/explore');
        const exploreData = await exploreResponse.json();

        if (exploreResponse.ok) {
          setExploreList(exploreData.exploreCareers || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUncommit = async () => {
    try {
      await fetch('/api/user/commit', {
        method: 'DELETE',
      });

      // Refresh to show explore list
      window.location.reload();
    } catch (error) {
      console.error('Failed to uncommit:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Container>
        <Header>
          <Logo />
        </Header>
        <Content>
          <Loading>Loading...</Loading>
        </Content>
        <Navigation />
      </Container>
    );
  }

  // Not authenticated - show welcome message
  if (!session?.user) {
    return (
      <Container>
        <Header>
          <Logo />
        </Header>
        <Content>
          <EmptyState>
            <EmptyIcon>👋</EmptyIcon>
            <EmptyTitle>Welcome to Pathfinder</EmptyTitle>
            <EmptyText>
              Discover your ideal career path with AI-powered guidance. Get matched with careers that align with your skills and goals.
            </EmptyText>
            <ExploreButton onClick={() => router.push('/login')}>
              Get Started
            </ExploreButton>
          </EmptyState>
        </Content>
        <Navigation />
      </Container>
    );
  }

  // User has committed career - show action plan
  if (committedCareer && career) {
    return (
      <Container>
        <Header>
          <Logo />
        </Header>
        <Content>
          <ActionPlanHeader>
            <ActionPlanTitle>You're set on becoming a {career.title}</ActionPlanTitle>
            <ActionPlanSubtitle>Here's your next steps towards making this a reality!</ActionPlanSubtitle>
          </ActionPlanHeader>

          <CareerCard>
            <CareerTitle>{career.title}</CareerTitle>
            <CareerMeta>
              {career.education && <span>{career.education}</span>}
              {career.growth && (
                <>
                  <span>•</span>
                  <span>{career.growth} growth</span>
                </>
              )}
            </CareerMeta>
            <CareerDescription>{career.description}</CareerDescription>
            <QuickActions>
              <Button onClick={() => router.push(`/careers/${career.id}`)}>
                View Career Details
              </Button>
              <UndoButton onClick={handleUncommit}>
                Undo Commitment
              </UndoButton>
            </QuickActions>
          </CareerCard>

          <ActionSteps
            careerId={career.id}
            actionPlan={committedCareer.actionSteps}
            onUpdate={fetchUserData}
          />
        </Content>
        <Navigation />
      </Container>
    );
  }

  // User has explore list - show it
  if (exploreList.length > 0) {
    return (
      <Container>
        <Header>
          <Logo />
        </Header>
        <Content>
          <PageTitle>
            <Title>
              <span>Your Explore list</span>
              <ExploreIcon>🔍</ExploreIcon>
            </Title>
            <Subtitle>Try them out!</Subtitle>
          </PageTitle>

          <ExploreList>
            <ExploreTitle>Try them out!</ExploreTitle>
            <ExploreSubtitle>Click on anyone to explore</ExploreSubtitle>
            {exploreList.map((item) => (
              <CareerListItem
                key={item.careerId}
                onClick={() => router.push(`/careers/${item.careerId}`)}
              >
                {item.career.title}
              </CareerListItem>
            ))}
          </ExploreList>
        </Content>
        <Navigation />
      </Container>
    );
  }

  // Empty state - no committed career and no explore list
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Content>
        <EmptyState>
          <EmptyIcon>🎯</EmptyIcon>
          <EmptyTitle>No Action Plan Yet</EmptyTitle>
          <EmptyText>
            Go to jobs page to explore jobs that you want to try out or commit to!
          </EmptyText>
          <ExploreButton onClick={() => router.push('/jobs')}>
            Go to Jobs Page
          </ExploreButton>
        </EmptyState>
      </Content>
      <Navigation />
    </Container>
  );
}
