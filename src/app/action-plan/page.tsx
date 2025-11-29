'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import ActionSteps from '@/components/ActionSteps';

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F7;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
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

const Loading = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #4a5568;
  font-size: 20px;
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

export default function ActionPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [committedCareer, setCommittedCareer] = useState<any>(null);
  const [career, setCareer] = useState<any>(null);

  useEffect(() => {
    fetchActionPlan();
  }, []);

  const fetchActionPlan = async () => {
    try {
      setLoading(true);

      // Get user's committed career
      const actionsResponse = await fetch('/api/user/actions');
      const actionsData = await actionsResponse.json();

      if (actionsResponse.ok && actionsData.committedCareer) {
        setCommittedCareer(actionsData.committedCareer);

        // Get career details
        const careerResponse = await fetch(`/api/careers/${actionsData.committedCareer.careerId}`);
        const careerData = await careerResponse.json();

        if (careerResponse.ok) {
          setCareer(careerData.career);
        }
      }
    } catch (error) {
      console.error('Failed to fetch action plan:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <Container>
        <Navigation />
        <Content>
          <Loading>Loading your action plan...</Loading>
        </Content>
      </Container>
    );
  }

  if (!committedCareer || !career) {
    return (
      <Container>
        <Navigation />
        <Content>
          <EmptyState>
            <EmptyIcon>🎯</EmptyIcon>
            <EmptyTitle>No Action Plan Yet</EmptyTitle>
            <EmptyText>
              Commit to a career to get your personalized action plan!
            </EmptyText>
            <ExploreButton onClick={() => router.push('/careers')}>
              Explore Careers
            </ExploreButton>
          </EmptyState>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Navigation />
      <Content>
        <Header>
          <Title>You're set on becoming a {career.title}</Title>
          <Subtitle>Here's your next steps towards making this a reality!</Subtitle>
        </Header>

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
          </QuickActions>
        </CareerCard>

        <ActionSteps
          careerId={career.id}
          actionPlan={committedCareer.actionSteps}
          onUpdate={fetchActionPlan}
        />
      </Content>
    </Container>
  );
}
