'use client';

import styled from 'styled-components';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Logo as LogoComponent } from '@/components/Logo';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-bottom: 80px;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    width: 28px;
    height: 28px;
  }
`;

const ContentArea = styled.div`
  padding: 1.5rem 1rem;
`;

const MatchBadge = styled.div<{ $percentage: number }>`
  background: ${({ $percentage, theme }) =>
    $percentage >= 75
      ? theme.colors.match.high
      : $percentage >= 50
      ? theme.colors.match.medium
      : theme.colors.match.low};
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  display: inline-block;
  margin-bottom: 1rem;
`;

const CareerTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const MatchDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: 1rem;
`;

const CareerMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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
  margin-bottom: 2rem;
`;

const Button = styled.button<{ $variant: 'try' | 'commit' | 'added' | 'committed' }>`
  flex: 1;
  padding: 1rem 1.5rem;
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
          opacity: 0.8;
        `;
      case 'committed':
        return `
          background: ${theme.colors.button.commit};
          color: white;
          opacity: 0.9;
        `;
    }
  }}
`;

const SectionHeading = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin: 0 0 1rem 0;
`;

const MatchButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const MatchButton = styled.button<{ $active?: boolean }>`
  background: #E5E7EB;
  border: 2px solid ${({ $active }) => ($active ? '#4A90E2' : '#E5E7EB')};
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
  margin-bottom: 2rem;
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
  padding-left: 0;
  margin: 0 auto;
  max-width: 600px;
  text-align: left;
  list-style-position: inside;

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

const ReadMoreLink = styled.button`
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
  gap: 0.5rem;
  margin: 1rem auto 0;

  &:hover {
    opacity: 0.8;
  }
`;

const SalaryChart = styled.div`
  background: #F9FAFB;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
  margin-bottom: 2rem;
`;

const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const ChartNotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const ChartNote = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const JobCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const JobTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

const JobCompany = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.primary.blue};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: 0.5rem;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const JobDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CareersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CareerCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function CareerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const careerId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [career, setCareer] = useState<any>(null);
  const [userActions, setUserActions] = useState<any>({});
  const [similarCareers, setSimilarCareers] = useState<any[]>([]);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [showFullDayInLife, setShowFullDayInLife] = useState(false);

  useEffect(() => {
    fetchCareerDetails();
  }, [careerId]);

  const fetchCareerDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/careers/${careerId}`);
      const data = await response.json();

      if (response.ok) {
        setCareer(data.career);
        setUserActions(data.userActions);
        setSimilarCareers(data.similarCareers || []);
        setRelatedJobs(data.relatedJobs || []);
      }
    } catch (error) {
      console.error('Failed to fetch career details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: 'try' | 'commit' | 'bookmark') => {
    try {
      const response = await fetch('/api/user/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, careerId }),
      });

      if (response.ok) {
        fetchCareerDetails();
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={() => router.back()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </BackButton>
          <LogoWrapper>
            <LogoComponent />
          </LogoWrapper>
        </Header>
        <ContentArea>
          <LoadingMessage>Loading career details...</LoadingMessage>
        </ContentArea>
      </PageContainer>
    );
  }

  if (!career) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={() => router.back()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </BackButton>
          <LogoWrapper>
            <LogoComponent />
          </LogoWrapper>
        </Header>
        <ContentArea>
          <LoadingMessage>Career not found</LoadingMessage>
        </ContentArea>
      </PageContainer>
    );
  }

  // Parse JSON fields with error handling
  let dayInLifeList = [];
  try {
    dayInLifeList = career.dayInLifeList ? (typeof career.dayInLifeList === 'string' ? JSON.parse(career.dayInLifeList) : career.dayInLifeList) : [];
  } catch (e) {
    console.error('Error parsing dayInLifeList:', e);
    dayInLifeList = [];
  }

  let salaryRange = null;
  try {
    salaryRange = career.salaryRange ? (typeof career.salaryRange === 'string' ? JSON.parse(career.salaryRange) : career.salaryRange) : null;
  } catch (e) {
    console.error('Error parsing salaryRange:', e);
    salaryRange = null;
  }

  // Create salary data for visualization
  // Always show bell curve - use salaryRange if available, otherwise use avgSalary or defaults
  let salaryData = [];

  // Create evenly spaced salary data - 7 points with mean ALWAYS at position 50 (center)
  // Positions: 10, 23.33, 36.67, 50 (MEAN/CENTER), 63.33, 76.67, 90
  // Spacing: 13.33 units between each point (80 total span / 6 intervals)

  if (salaryRange) {
    const meanSalary = salaryRange.percentiles?.[2] || ((salaryRange.min + salaryRange.max) / 2) || 50;
    const minSalary = salaryRange.percentiles?.[0] || salaryRange.min || Math.round(meanSalary * 0.6);
    const maxSalary = salaryRange.percentiles?.[4] || salaryRange.max || Math.round(meanSalary * 1.8);

    // Calculate step size: mean is at position 50 (center), we need 3 steps before and 3 after
    // Total range from min to max, divided by 6 intervals
    const salaryRange_span = maxSalary - minSalary;
    const step = salaryRange_span / 6;

    // Calculate salary values in thousands
    const salaries = [
      minSalary,
      minSalary + step,
      minSalary + step * 2,
      minSalary + step * 3,
      minSalary + step * 4,
      minSalary + step * 5,
      maxSalary
    ];

    salaryData = [
      { label: `${Math.round(salaries[0] / 1000)}k-`, value: salaries[0], position: 10 },
      { label: `${Math.round(salaries[1] / 1000)}k`, value: salaries[1], position: 23.33 },
      { label: `${Math.round(salaries[2] / 1000)}k`, value: salaries[2], position: 36.67 },
      { label: `${Math.round(salaries[3] / 1000)}k`, value: salaries[3], position: 50 },
      { label: `${Math.round(salaries[4] / 1000)}k`, value: salaries[4], position: 63.33 },
      { label: `${Math.round(salaries[5] / 1000)}k`, value: salaries[5], position: 76.67 },
      { label: `${Math.round(salaries[6] / 1000)}k+`, value: salaries[6], position: 90 },
    ];
  } else if (career.avgSalary) {
    // Use avgSalary to create a distribution, centered at position 50
    // Parse the avgSalary string - could be like "$64k", "64000", etc.
    let avgValue = parseInt(career.avgSalary.replace(/[^0-9]/g, '')) || 50000;

    // If the value seems too small (like 64 from "64k"), multiply by 1000
    if (avgValue < 1000) {
      avgValue = avgValue * 1000;
    }

    const step = avgValue * 0.2; // 20% increments around the mean

    // Calculate salary values
    const salaries = [
      avgValue - step * 3,
      avgValue - step * 2,
      avgValue - step,
      avgValue,
      avgValue + step,
      avgValue + step * 2,
      avgValue + step * 3
    ];

    salaryData = [
      { label: `${Math.round(salaries[0] / 1000)}k-`, value: salaries[0], position: 10 },
      { label: `${Math.round(salaries[1] / 1000)}k`, value: salaries[1], position: 23.33 },
      { label: `${Math.round(salaries[2] / 1000)}k`, value: salaries[2], position: 36.67 },
      { label: `${Math.round(salaries[3] / 1000)}k`, value: salaries[3], position: 50 },
      { label: `${Math.round(salaries[4] / 1000)}k`, value: salaries[4], position: 63.33 },
      { label: `${Math.round(salaries[5] / 1000)}k`, value: salaries[5], position: 76.67 },
      { label: `${Math.round(salaries[6] / 1000)}k+`, value: salaries[6], position: 90 },
    ];
  } else {
    // Default salary distribution centered at position 50
    salaryData = [
      { label: '30k-', value: 30, position: 10 },
      { label: '40k', value: 40, position: 23.33 },
      { label: '45k', value: 45, position: 36.67 },
      { label: '50k', value: 50, position: 50 },
      { label: '60k', value: 60, position: 63.33 },
      { label: '70k', value: 70, position: 76.67 },
      { label: '80k+', value: 80, position: 90 },
    ];
  }

  // Mean is ALWAYS at position 50 (center of chart)
  const meanPosition = 50;

  // Calculate standard deviation based on salary range
  // A wider range means more spread (larger stdDev)
  const minPos = salaryData[0]?.position || 10;
  const maxPos = salaryData[salaryData.length - 1]?.position || 90;
  const salarySpan = maxPos - minPos;
  // Standard deviation is roughly 1/6 of the total span for a normal distribution
  const calculatedStdDev = salarySpan / 6;

  // Generate bell curve path dynamically based on actual salary data
  const generateBellCurvePath = () => {
    const points: string[] = [];
    for (let x = 0; x <= 100; x += 2) {
      const mean = meanPosition;
      const stdDev = calculatedStdDev;
      const height = 150;
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
      const y = 180 - (Math.exp(exponent) * height);
      points.push(`${x * 5},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Get match description - use match reason if available, otherwise generate generic text
  const matchDescription = userActions.matchReason || career.description ||
    `Your need to be around people, love of teaching, and love to work with kids has aligned perfectly with ${career.title}.`;

  const displayedDayInLife = showFullDayInLife ? dayInLifeList : dayInLifeList.slice(0, 3);

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => router.back()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </BackButton>
        <LogoWrapper>
          <LogoComponent />
        </LogoWrapper>
        <BookmarkButton onClick={() => handleAction('bookmark')}>
          <svg viewBox="0 0 24 24" fill={userActions.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </BookmarkButton>
      </Header>

      <ContentArea>
        {userActions.matchPercentage && (
          <MatchBadge $percentage={userActions.matchPercentage}>
            {userActions.matchPercentage}% match
          </MatchBadge>
        )}

        <CareerTitle>{career.title}</CareerTitle>

        <MatchDescription>
          <strong>The Match:</strong> {matchDescription}
        </MatchDescription>

        <CareerMeta>
          {career.avgSalary && (
            <MetaItem>
              <MetaLabel>Avg. Salary:</MetaLabel>
              <span>{career.avgSalary}</span>
            </MetaItem>
          )}
          {career.requirements && (
            <MetaItem>
              <MetaLabel>Typical Requirements:</MetaLabel>
              <span>{career.requirements}</span>
            </MetaItem>
          )}
        </CareerMeta>

        <ButtonContainer>
          <Button
            $variant={userActions.isTrying ? 'added' : 'try'}
            onClick={() => handleAction('try')}
          >
            {userActions.isTrying ? (
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
            $variant={userActions.isCommitted ? 'committed' : 'commit'}
            onClick={() => handleAction('commit')}
          >
            {userActions.isCommitted ? (
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

        <SectionHeading>See how you match in these different areas</SectionHeading>
        <MatchButtonsGrid>
          <MatchButton $active={true}>Interest</MatchButton>
          <MatchButton>Goals</MatchButton>
          <MatchButton>Skills</MatchButton>
          <MatchButton>Location</MatchButton>
          <MatchButton>Personality</MatchButton>
          <MatchButton>Values</MatchButton>
        </MatchButtonsGrid>

        {dayInLifeList.length > 0 && (
          <DayInLifeCard>
            <DayInLifeTitle>A day in the life</DayInLifeTitle>
            <DayInLifeSubtitle>
              Here's what a day in the life can look like as a {career.title.toLowerCase()}
            </DayInLifeSubtitle>
            <DayInLifeList>
              {displayedDayInLife.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </DayInLifeList>
            {dayInLifeList.length > 3 && !showFullDayInLife && (
              <ReadMoreLink onClick={() => setShowFullDayInLife(true)}>
                Read more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ReadMoreLink>
            )}
          </DayInLifeCard>
        )}

        {salaryData.length > 0 && (
          <SalaryChart>
            <ChartContainer>
              <ChartSVG viewBox="0 0 500 220" preserveAspectRatio="xMidYMid meet">
                {/* Arrow marker definitions */}
                <defs>
                  <marker
                    id="arrow-start"
                    markerWidth="4"
                    markerHeight="4"
                    refX="4"
                    refY="2"
                    orient="auto"
                  >
                    <path d="M 0 2 L 4 0 L 4 4 Z" fill="#000000" />
                  </marker>
                  <marker
                    id="arrow-end"
                    markerWidth="4"
                    markerHeight="4"
                    refX="0"
                    refY="2"
                    orient="auto"
                  >
                    <path d="M 4 2 L 0 0 L 0 4 Z" fill="#000000" />
                  </marker>
                </defs>
                {/* Bell curve path */}
                <path
                  d={generateBellCurvePath()}
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                  markerStart="url(#arrow-start)"
                  markerEnd="url(#arrow-end)"
                />
                {/* Data points and vertical lines */}
                {salaryData.map((data: any, index: number) => {
                  const x = (data.position / 100) * 500;
                  const mean = meanPosition;
                  const stdDev = calculatedStdDev;
                  const height = 150;
                  const exponent = -Math.pow(data.position - mean, 2) / (2 * Math.pow(stdDev, 2));
                  const y = 180 - (Math.exp(exponent) * height);

                  return (
                    <g key={index}>
                      <line x1={x} y1={y} x2={x} y2="180" stroke="#E5E7EB" strokeWidth="1.5" />
                      <circle cx={x} cy={y} r="5" fill="#5DD9FC" />
                    </g>
                  );
                })}
                {/* Labels */}
                {salaryData.map((data: any, index: number) => {
                  const x = (data.position / 100) * 500;
                  return (
                    <text key={`label-${index}`} x={x} y="205" fontSize="14" fontWeight="500" textAnchor="middle" fill="#000000">
                      {data.label}
                    </text>
                  );
                })}
              </ChartSVG>
            </ChartContainer>
            <ChartNotesContainer>
              <ChartNote><strong>*In Thousands</strong></ChartNote>
              <ChartNote><strong>*Click on the curve to explore what factors lead to that income level.</strong></ChartNote>
            </ChartNotesContainer>
          </SalaryChart>
        )}

        {relatedJobs.length > 0 && (
          <Section>
            <SectionTitle>Related Jobs ({relatedJobs.length})</SectionTitle>
            <JobsGrid>
              {relatedJobs.map((job) => (
                <JobCard key={job.id} onClick={() => job.sourceUrl && window.open(job.sourceUrl, '_blank')}>
                  <JobTitle>{job.title}</JobTitle>
                  <JobCompany>{job.company}</JobCompany>
                  <JobMeta>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <span>{job.salary}</span>
                      </>
                    )}
                  </JobMeta>
                  <JobDescription>
                    {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </JobDescription>
                </JobCard>
              ))}
            </JobsGrid>
          </Section>
        )}

        {similarCareers.length > 0 && (
          <Section>
            <SectionTitle>Similar Careers</SectionTitle>
            <CareersGrid>
              {similarCareers.map((similarCareer) => (
                <CareerCard key={similarCareer.id} onClick={() => router.push(`/careers/${similarCareer.id}`)}>
                  <CareerTitle>{similarCareer.title}</CareerTitle>
                  {similarCareer.avgSalary && (
                    <JobCompany>{similarCareer.avgSalary}</JobCompany>
                  )}
                  {similarCareer.description && (
                    <JobDescription>{similarCareer.description.substring(0, 100)}...</JobDescription>
                  )}
                </CareerCard>
              ))}
            </CareersGrid>
          </Section>
        )}
      </ContentArea>
    </PageContainer>
  );
}
