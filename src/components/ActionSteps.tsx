'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  margin-bottom: 28px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
`;

const Timeline = styled.p`
  font-size: 16px;
  color: #718096;
  margin-bottom: 16px;
`;

const ProgressSection = styled.div`
  margin-bottom: 24px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ProgressLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
`;

const ProgressPercentage = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 13px;
  color: #718096;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StepCard = styled.div<{ completed: boolean }>`
  border: 2px solid ${props => props.completed ? '#48bb78' : '#e2e8f0'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  background: ${props => props.completed ? 'rgba(72, 187, 120, 0.05)' : 'white'};

  &:hover {
    border-color: ${props => props.completed ? '#48bb78' : '#cbd5e0'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  min-width: 24px;
  cursor: pointer;
  margin-top: 2px;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3<{ completed: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.completed ? '#48bb78' : '#1a202c'};
  margin-bottom: 8px;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const StepDescription = styled.p`
  font-size: 15px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 12px;
`;

const StepMeta = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const TimeframeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
`;

const ResourcesList = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
`;

const ResourcesTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
`;

const ResourceItem = styled.div`
  font-size: 14px;
  color: #667eea;
  margin-bottom: 4px;

  &:before {
    content: '• ';
    margin-right: 6px;
  }
`;

const NextMilestone = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const MilestoneLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const MilestoneText = styled.div`
  font-size: 16px;
  color: #1a202c;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #718096;
`;

interface ActionStep {
  title: string;
  description: string;
  timeframe: string;
  resources: string[];
  completed: boolean;
}

interface ActionPlan {
  steps: ActionStep[];
  timeline: string;
  nextMilestone: string;
}

interface ActionStepsProps {
  careerId: string;
  actionPlan: ActionPlan | null;
  onUpdate?: () => void;
}

export default function ActionSteps({ careerId, actionPlan, onUpdate }: ActionStepsProps) {
  const [updating, setUpdating] = useState(false);

  if (!actionPlan || !actionPlan.steps || actionPlan.steps.length === 0) {
    return (
      <Container>
        <EmptyState>
          Your personalized action plan is being generated...
          <br />
          This may take a few moments.
        </EmptyState>
      </Container>
    );
  }

  const completedSteps = actionPlan.steps.filter(step => step.completed).length;
  const totalSteps = actionPlan.steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  const handleToggleStep = async (stepIndex: number) => {
    if (updating) return;

    const newCompletedState = !actionPlan.steps[stepIndex].completed;

    setUpdating(true);

    try {
      const response = await fetch('/api/action-steps/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId,
          stepIndex,
          completed: newCompletedState,
        }),
      });

      if (response.ok) {
        // Trigger parent component to refetch data
        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error('Failed to update step');
      }
    } catch (error) {
      console.error('Error updating step:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Your Action Plan</Title>
        <Timeline>Timeline: {actionPlan.timeline}</Timeline>
      </Header>

      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>Overall Progress</ProgressLabel>
          <ProgressPercentage>{progress}%</ProgressPercentage>
        </ProgressHeader>
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
        <ProgressStats>
          <span>{completedSteps} of {totalSteps} steps completed</span>
          <span>•</span>
          <span>{totalSteps - completedSteps} remaining</span>
        </ProgressStats>
      </ProgressSection>

      <StepsList>
        {actionPlan.steps.map((step, index) => (
          <StepCard key={index} completed={step.completed}>
            <StepHeader>
              <Checkbox
                type="checkbox"
                checked={step.completed}
                onChange={() => handleToggleStep(index)}
                disabled={updating}
              />
              <StepContent>
                <StepTitle completed={step.completed}>
                  {index + 1}. {step.title}
                </StepTitle>
                <StepDescription>{step.description}</StepDescription>
                <StepMeta>
                  <TimeframeBadge>
                    ⏱️ {step.timeframe}
                  </TimeframeBadge>
                </StepMeta>
                {step.resources && step.resources.length > 0 && (
                  <ResourcesList>
                    <ResourcesTitle>Resources:</ResourcesTitle>
                    {step.resources.map((resource, idx) => (
                      <ResourceItem key={idx}>{resource}</ResourceItem>
                    ))}
                  </ResourcesList>
                )}
              </StepContent>
            </StepHeader>
          </StepCard>
        ))}
      </StepsList>

      {actionPlan.nextMilestone && (
        <NextMilestone>
          <MilestoneLabel>Next Major Milestone</MilestoneLabel>
          <MilestoneText>{actionPlan.nextMilestone}</MilestoneText>
        </NextMilestone>
      )}
    </Container>
  );
}
