'use client';

import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';

const Card = styled.div`
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

const CardHeader = styled.div`
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
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CareerTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
`;

const MatchDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: 1rem;
`;

const ExpandedSection = styled.div`
  margin-top: 1.5rem;
`;

const SectionHeading = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin: 1.5rem 0 1rem 0;
`;

const MatchButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const MatchButton = styled.button`
  background: #E5E7EB;
  border: 2px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.875rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
    background: white;
  }
`;

const DayInLifeCard = styled.div`
  background: #F5F5F7;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DayInLifeTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin: 0 0 0.5rem 0;
`;

const DayInLifeSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: 0 0 1rem 0;
`;

const DayInLifeList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;

  li {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SalaryChart = styled.div`
  background: #F5F5F7;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 200px;
  margin-bottom: 1rem;
`;

const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const ChartNote = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0.5rem 0 0 0;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CareerMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetaLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant: 'try' | 'commit' | 'added' | 'committed' }>`
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'try':
        return `
          background: ${theme.colors.button.try};
          color: ${theme.colors.text.primary};
          &:hover {
            opacity: 0.9;
            transform: scale(1.02);
          }
        `;
      case 'commit':
        return `
          background: ${theme.colors.button.commit};
          color: white;
          &:hover {
            opacity: 0.9;
            transform: scale(1.02);
          }
        `;
      case 'added':
        return `
          background: ${theme.colors.button.try};
          color: ${theme.colors.text.primary};
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'committed':
        return `
          background: ${theme.colors.button.commitGradient};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.button.commit};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: ${({ theme }) => theme.transitions.fast};
  width: 100%;
  margin: 0.5rem 0;

  &:hover {
    opacity: 0.8;
  }
`;

interface CareerCardProps {
  id: string;
  matchPercentage: number;
  title: string;
  matchDescription: string;
  salary?: string;
  requirements?: string;
  onTry?: () => void;
  onCommit?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  isTried?: boolean;
  isCommitted?: boolean;
}

export function CareerCard({
  id,
  matchPercentage,
  title,
  matchDescription,
  salary,
  requirements,
  onTry,
  onCommit,
  onBookmark,
  isBookmarked = false,
  isTried = false,
  isCommitted = false,
}: CareerCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    window.location.href = `/careers/${id}`;
  };

  return (
    <Card onClick={handleCardClick}>
      <CardHeader>
        <MatchBadge $percentage={matchPercentage}>{matchPercentage}% match</MatchBadge>
        <BookmarkButton onClick={onBookmark}>
          <svg viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </BookmarkButton>
      </CardHeader>

      <CareerTitle>{title}</CareerTitle>

      <MatchDescription>
        <strong>The Match:</strong>{' '}
        {showFullDescription ? matchDescription : truncateText(matchDescription, 100)}
      </MatchDescription>

      {(salary || requirements) && (
        <CareerMeta>
          {salary && (
            <MetaItem>
              <MetaLabel>Avg. Salary:</MetaLabel>
              <span>{salary}</span>
            </MetaItem>
          )}
          {requirements && (
            <MetaItem>
              <MetaLabel>Typical Requirements:</MetaLabel>
              <span>{requirements}</span>
            </MetaItem>
          )}
        </CareerMeta>
      )}

      {showFullDescription && (
        <ExpandedSection>
          <SectionHeading>See how you match in these different areas</SectionHeading>
          <MatchButtonsGrid>
            <MatchButton>Interest</MatchButton>
            <MatchButton>Goals</MatchButton>
            <MatchButton>Skills</MatchButton>
            <MatchButton>Location</MatchButton>
            <MatchButton>Personality</MatchButton>
            <MatchButton>Values</MatchButton>
          </MatchButtonsGrid>

          <DayInLifeCard>
            <DayInLifeTitle>A day in the life</DayInLifeTitle>
            <DayInLifeSubtitle>Here's what a day in the life can look like as a youth development leader</DayInLifeSubtitle>
            <DayInLifeList>
              <li>Design and lead programs that help young people build leadership, teamwork, and life skills.</li>
              <li>Mentor and coach youth one-on-one or in small groups to set goals and overcome challenges.</li>
              <li>Organize events and projects like workshops, volunteer days, and community initiatives.</li>
            </DayInLifeList>
          </DayInLifeCard>

          <SalaryChart>
            <ChartContainer>
              <ChartSVG viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Bell curve path */}
                <path
                  d="M 20,180 Q 80,120 120,80 Q 160,50 200,40 Q 240,50 280,80 Q 320,120 380,180"
                  stroke="#00BFFF"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Data points */}
                <circle cx="80" cy="120" r="6" fill="#00BFFF" />
                <circle cx="120" cy="80" r="6" fill="#00BFFF" />
                <circle cx="200" cy="40" r="6" fill="#00BFFF" />
                <circle cx="280" cy="80" r="6" fill="#00BFFF" />
                <circle cx="320" cy="120" r="6" fill="#00BFFF" />
                {/* Vertical line at median */}
                <line x1="200" y1="40" x2="200" y2="180" stroke="#00BFFF" strokeWidth="2" />
                {/* Labels */}
                <text x="80" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">30-</text>
                <text x="120" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">40</text>
                <text x="200" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">50</text>
                <text x="280" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">70</text>
                <text x="320" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">80</text>
                <text x="360" y="195" fontSize="12" textAnchor="middle" fill="#6B7280">90+</text>
              </ChartSVG>
            </ChartContainer>
            <ChartNote><strong>*In Thousands</strong></ChartNote>
            <ChartNote><strong>*Click on the curve to explore what factors lead to that income level.</strong></ChartNote>
          </SalaryChart>
        </ExpandedSection>
      )}

      {matchDescription.length > 100 && (
        <ReadMoreButton onClick={() => setShowFullDescription(!showFullDescription)}>
          {showFullDescription ? 'Show less' : 'Read more'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d={showFullDescription ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </ReadMoreButton>
      )}

      <ButtonContainer>
        <Button
          $variant={isTried ? 'added' : 'try'}
          onClick={onTry}
        >
          {isTried ? (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Added
            </>
          ) : (
            'Try'
          )}
        </Button>

        <Button
          $variant={isCommitted ? 'committed' : 'commit'}
          onClick={onCommit}
        >
          {isCommitted ? (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              Committed
            </>
          ) : (
            'Commit'
          )}
        </Button>
      </ButtonContainer>
    </Card>
  );
}
