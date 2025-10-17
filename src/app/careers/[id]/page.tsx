'use client';

import styled from 'styled-components';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-bottom: 2rem;
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

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  flex: 1;
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

const ContentArea = styled.div`
  padding: 1rem;
`;

const MatchBadge = styled.div<{ $percentage: number }>`
  background: ${({ $percentage, theme }) =>
    $percentage >= 75
      ? theme.colors.match.high
      : $percentage >= 50
      ? theme.colors.match.medium
      : theme.colors.match.low};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  display: inline-block;
  margin-bottom: 1rem;
`;

const CareerTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem 0;
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

const MatchAnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const AnalysisButton = styled.button`
  background: ${({ theme }) => theme.colors.background.card};
  border: 2px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.blue};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const AnalysisIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const AnalysisLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DayInLifeCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 2rem;
`;

const DayInLifeText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: 1rem;
`;

const ChatButton = styled.button`
  background: ${({ theme }) => theme.colors.button.commit};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SalaryCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 2rem;
`;

const SalaryCurve = styled.div`
  position: relative;
  height: 200px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const SalaryBar = styled.div<{ $height: number; $active?: boolean }>`
  width: 40px;
  height: ${({ $height }) => $height}%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary.gradient : theme.colors.primary.blue};
  border-radius: ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0 0;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const SalaryLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 0.5rem;
`;

const SalaryValue = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.text.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  white-space: nowrap;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  position: sticky;
  bottom: 1rem;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const Button = styled.button<{ $variant: 'try' | 'commit' | 'added' | 'committed' }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
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
  color: ${({ theme}) => theme.colors.text.secondary};
`;

// Mock data for career details
const careerDetails: { [key: string]: any } = {
  '1': {
    title: 'Youth Development Leader',
    matchPercentage: 97,
    dayInLife: 'As a Youth Development Leader, you start your day by preparing engaging activities for the youth center. You spend time mentoring teenagers, organizing community programs, and coordinating with parents and schools. Your afternoon involves leading group workshops on life skills, career exploration, and personal development. You wrap up by documenting progress and planning the next week\'s activities.',
    salaryData: [
      { label: '10%', value: 45000, height: 40 },
      { label: '25%', value: 52000, height: 55 },
      { label: 'Median', value: 64000, height: 80, active: true },
      { label: '75%', value: 78000, height: 95 },
      { label: '90%', value: 92000, height: 100 },
    ],
    avgSalary: '$64k',
    requirements: 'Experience working with kids',
    education: 'Bachelor\'s degree',
    growth: '+12% (5 years)',
  },
  '2': {
    title: 'Highschool Teacher',
    matchPercentage: 95,
    dayInLife: 'Your day begins with preparing lesson plans and setting up the classroom. You teach 5-6 classes throughout the day, engaging students in various subjects and fostering critical thinking. Between classes, you meet with students who need extra help, grade assignments, and collaborate with other teachers. After school, you participate in faculty meetings and parent-teacher conferences.',
    salaryData: [
      { label: '10%', value: 42000, height: 35 },
      { label: '25%', value: 48000, height: 50 },
      { label: 'Median', value: 58000, height: 75, active: true },
      { label: '75%', value: 70000, height: 90 },
      { label: '90%', value: 82000, height: 100 },
    ],
    avgSalary: '$58k',
    requirements: 'Teaching certification',
    education: 'Bachelor\'s + Teaching License',
    growth: '+8% (5 years)',
  },
  '3': {
    title: 'Nonprofit Program Manager',
    matchPercentage: 93,
    dayInLife: 'You begin by reviewing program metrics and planning strategic initiatives. Your morning involves meeting with stakeholders, funders, and community partners to discuss program impact. The afternoon is spent overseeing program implementation, supporting staff, and ensuring quality service delivery. You also handle budgeting, grant writing, and reporting to demonstrate program effectiveness.',
    salaryData: [
      { label: '10%', value: 48000, height: 42 },
      { label: '25%', value: 58000, height: 60 },
      { label: 'Median', value: 72000, height: 85, active: true },
      { label: '75%', value: 88000, height: 95 },
      { label: '90%', value: 105000, height: 100 },
    ],
    avgSalary: '$72k',
    requirements: 'Program management experience',
    education: 'Bachelor\'s or Master\'s degree',
    growth: '+15% (5 years)',
  },
};

const analysisCategories = [
  { id: 'interest', label: 'Interest', icon: '🎯' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'personality', label: 'Personality', icon: '🧠' },
  { id: 'values', label: 'Values', icon: '💎' },
];

export default function CareerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const careerId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [career, setCareer] = useState<any>(null);
  const [userActions, setUserActions] = useState<any>({});
  const [similarCareers, setSimilarCareers] = useState<any[]>([]);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number | null>(null);

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
        setSimilarCareers(data.similarCareers);
        setRelatedJobs(data.relatedJobs);
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
          <HeaderTitle>Loading...</HeaderTitle>
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
          <HeaderTitle>Career Not Found</HeaderTitle>
        </Header>
      </PageContainer>
    );
  }

  // Parse JSON fields
  const dayInLifeList = career.dayInLifeList ? (typeof career.dayInLifeList === 'string' ? JSON.parse(career.dayInLifeList) : career.dayInLifeList) : [];
  const salaryRange = career.salaryRange ? (typeof career.salaryRange === 'string' ? JSON.parse(career.salaryRange) : career.salaryRange) : null;

  // Create salary data for visualization
  const salaryData = salaryRange ? [
    { label: '10%', value: salaryRange.percentiles?.[0] || salaryRange.min, height: 40 },
    { label: '25%', value: salaryRange.percentiles?.[1] || salaryRange.min, height: 55 },
    { label: 'Median', value: salaryRange.percentiles?.[2] || ((salaryRange.min + salaryRange.max) / 2), height: 80, active: true },
    { label: '75%', value: salaryRange.percentiles?.[3] || salaryRange.max, height: 95 },
    { label: '90%', value: salaryRange.percentiles?.[4] || salaryRange.max, height: 100 },
  ] : [];

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => router.back()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </BackButton>
        <HeaderTitle>{career.title}</HeaderTitle>
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

        <Section>
          <SectionTitle>Why This Match?</SectionTitle>
          <MatchAnalysisGrid>
            {analysisCategories.map((category) => (
              <AnalysisButton key={category.id} onClick={() => {/* TODO: Open AI chat overlay */}}>
                <AnalysisIcon>{category.icon}</AnalysisIcon>
                <AnalysisLabel>{category.label}</AnalysisLabel>
              </AnalysisButton>
            ))}
          </MatchAnalysisGrid>
        </Section>

        {(career.dayInLife || dayInLifeList.length > 0) && (
          <Section>
            <SectionTitle>A Day in the Life</SectionTitle>
            <DayInLifeCard>
              {career.dayInLife && <DayInLifeText>{career.dayInLife}</DayInLifeText>}
              {dayInLifeList.length > 0 && (
                <ul style={{ paddingLeft: '1.5rem', margin: '1rem 0' }}>
                  {dayInLifeList.map((item: string, index: number) => (
                    <li key={index} style={{ marginBottom: '0.5rem', color: '#4a5568' }}>{item}</li>
                  ))}
                </ul>
              )}
              <ChatButton onClick={() => router.push('/chat')}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                Ask me more about this
              </ChatButton>
            </DayInLifeCard>
          </Section>
        )}

        {(career.avgSalary || salaryData.length > 0) && (
          <Section>
            <SectionTitle>Salary Information</SectionTitle>
            <SalaryCard>
              {salaryData.length > 0 && (
                <SalaryCurve>
                  {salaryData.map((data: any, index: number) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SalaryBar
                        $height={data.height}
                        $active={data.active}
                        onMouseEnter={() => setSelectedSalary(index)}
                        onMouseLeave={() => setSelectedSalary(null)}
                      >
                        {(selectedSalary === index || data.active) && (
                          <SalaryValue>${(data.value / 1000).toFixed(0)}k</SalaryValue>
                        )}
                      </SalaryBar>
                      <SalaryLabel>{data.label}</SalaryLabel>
                    </div>
                  ))}
                </SalaryCurve>
              )}

              <InfoGrid>
                {career.avgSalary && (
                  <InfoItem>
                    <InfoLabel>Avg. Salary:</InfoLabel>
                    <InfoValue>{career.avgSalary}</InfoValue>
                  </InfoItem>
                )}
                {career.growth && (
                  <InfoItem>
                    <InfoLabel>Growth (5yr):</InfoLabel>
                    <InfoValue>{career.growth}</InfoValue>
                  </InfoItem>
                )}
                {career.education && (
                  <InfoItem>
                    <InfoLabel>Education:</InfoLabel>
                    <InfoValue>{career.education}</InfoValue>
                  </InfoItem>
                )}
                {career.requirements && (
                  <InfoItem>
                    <InfoLabel>Requirements:</InfoLabel>
                    <InfoValue>{career.requirements}</InfoValue>
                  </InfoItem>
                )}
              </InfoGrid>
            </SalaryCard>
          </Section>
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
      </ContentArea>
    </PageContainer>
  );
}
