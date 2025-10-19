'use client';

import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
import { useState } from 'react';

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

const HeaderIcons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const IconButton = styled.button`
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

const ContentArea = styled.div`
  padding: 1rem;
`;

const ModeSelector = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ModeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary.blue : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.text.secondary};

  &:hover {
    color: ${({ $active }) => ($active ? 'white' : '#000000')};
  }
`;

const PageTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const CareerListCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const CareerListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const CareerListTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CareerListMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-top: 0.75rem;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

const ActionPlanCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1rem;
`;

const CommittedCareerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E5E7EB;
`;

const CommittedIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const CommittedInfo = styled.div`
  flex: 1;
`;

const CommittedTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
`;

const CommittedMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StepItem = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: ${({ $completed, theme }) =>
    $completed ? theme.colors.background.primary : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ $completed, theme }) =>
    $completed ? theme.colors.status.success : '#E5E7EB'};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const StepNumber = styled.div<{ $completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $completed, theme }) =>
    $completed ? theme.colors.status.success : theme.colors.primary.blue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
    opacity: 0.3;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin-bottom: 1.5rem;
  }
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.button.commit};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.875rem 2rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

// Mock data
const tryingCareers = [
  {
    id: '1',
    title: 'Youth Development Leader',
    matchPercentage: 97,
    progress: 35,
  },
  {
    id: '2',
    title: 'Highschool Teacher',
    matchPercentage: 95,
    progress: 20,
  },
];

const committedCareer = {
  id: '3',
  title: 'Nonprofit Program Manager',
  matchPercentage: 93,
};

const actionSteps = [
  {
    id: 1,
    title: 'Complete Program Management Certificate',
    description: 'Enroll in online certificate program from Stanford University. Estimated completion: 6 months.',
    completed: true,
  },
  {
    id: 2,
    title: 'Volunteer at Local Nonprofit',
    description: 'Gain hands-on experience by volunteering 10 hours/week at Bay Area Youth Services.',
    completed: true,
  },
  {
    id: 3,
    title: 'Network with Nonprofit Leaders',
    description: 'Attend monthly nonprofit networking events and connect with 5 program managers on LinkedIn.',
    completed: false,
  },
  {
    id: 4,
    title: 'Tailor Resume for Nonprofit Sector',
    description: 'Highlight relevant skills and experience. Use our AI resume tool to optimize for program manager roles.',
    completed: false,
  },
  {
    id: 5,
    title: 'Apply to Target Organizations',
    description: 'Submit applications to 10 nonprofit organizations that align with your values and goals.',
    completed: false,
  },
];

export default function HomePage() {
  const [mode, setMode] = useState<'explore' | 'committed'>('explore');

  return (
    <PageContainer>
      <Header>
        <Logo />
        <HeaderIcons>
          <IconButton>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </IconButton>
          <IconButton>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </IconButton>
        </HeaderIcons>
      </Header>

      <ContentArea>
        <ModeSelector>
          <ModeButton $active={mode === 'explore'} onClick={() => setMode('explore')}>
            Explore
          </ModeButton>
          <ModeButton $active={mode === 'committed'} onClick={() => setMode('committed')}>
            Committed
          </ModeButton>
        </ModeSelector>

        {mode === 'explore' ? (
          <>
            <PageTitle>Careers You're Trying</PageTitle>

            {tryingCareers.length > 0 ? (
              tryingCareers.map((career) => (
                <CareerListCard key={career.id} onClick={() => window.location.href = `/careers/${career.id}`}>
                  <CareerListHeader>
                    <CareerListTitle>{career.title}</CareerListTitle>
                    <CareerListMeta>{career.matchPercentage}% match</CareerListMeta>
                  </CareerListHeader>
                  <CareerListMeta>Exploration progress</CareerListMeta>
                  <ProgressBar>
                    <ProgressFill $progress={career.progress} />
                  </ProgressBar>
                </CareerListCard>
              ))
            ) : (
              <EmptyState>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3>No careers in exploration yet</h3>
                <p>
                  Visit the careers page to find careers that match your interests, skills, and goals. Click "Try" to start exploring!
                </p>
                <CTAButton onClick={() => window.location.href = '/careers'}>
                  Explore Careers
                </CTAButton>
              </EmptyState>
            )}
          </>
        ) : (
          <>
            <PageTitle>Your Career Path</PageTitle>

            {committedCareer ? (
              <ActionPlanCard>
                <CommittedCareerHeader>
                  <CommittedIcon>🎯</CommittedIcon>
                  <CommittedInfo>
                    <CommittedTitle>{committedCareer.title}</CommittedTitle>
                    <CommittedMeta>{committedCareer.matchPercentage}% match • Action Plan</CommittedMeta>
                  </CommittedInfo>
                </CommittedCareerHeader>

                <StepsList>
                  {actionSteps.map((step) => (
                    <StepItem key={step.id} $completed={step.completed}>
                      <StepNumber $completed={step.completed}>
                        {step.completed ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                          </svg>
                        ) : (
                          step.id
                        )}
                      </StepNumber>
                      <StepContent>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </StepContent>
                    </StepItem>
                  ))}
                </StepsList>
              </ActionPlanCard>
            ) : (
              <EmptyState>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>No committed career yet</h3>
                <p>
                  When you're ready to fully commit to a career path, we'll create a personalized action plan to help you achieve your goals.
                </p>
                <CTAButton onClick={() => window.location.href = '/careers'}>
                  Find Your Career
                </CTAButton>
              </EmptyState>
            )}
          </>
        )}
      </ContentArea>

      <Navigation />
    </PageContainer>
  );
}
