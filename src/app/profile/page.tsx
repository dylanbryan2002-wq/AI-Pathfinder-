'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

const SettingsButton = styled.button`
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

const ProfileSection = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin: 0 auto 1rem;
`;

const UserName = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

const UserBio = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const ProgressSliderSection = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1.5rem;
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SliderLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MovingFromInput = styled.input`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 1.5rem;
  width: 100%;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.blue};
    box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const SliderContainer = styled.div`
  position: relative;
  padding: 1rem 0;
`;

const SliderTrack = styled.div<{ $isDragging?: boolean }>`
  position: relative;
  height: 12px;
  background: linear-gradient(90deg, #FF6B6B 0%, #FFB6B6 45%, #C8E6C9 55%, #81C784 100%);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  box-shadow: ${({ $isDragging }) => $isDragging ? '0 0 12px rgba(239, 68, 68, 0.4)' : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'};
  transition: box-shadow 0.2s ease;
`;

const SliderThumb = styled.div<{ $value: number; $isDragging?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $value }) => $value}%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: white;
  border: 3px solid #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: grab;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: ${({ $isDragging }) => $isDragging ? 'none' : 'left 0.1s ease, transform 0.1s ease'};
  z-index: 10;

  &:hover {
    transform: translate(-50%, -50%) scale(1.15);
  }

  &:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #6B7280;
  margin: 2rem 0 1.5rem 0;
  text-align: center;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const HighlightCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
`;

const HighlightValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const HighlightLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PsychometricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const PsychometricCard = styled.div<{ $gradient: string }>`
  background: ${({ $gradient }) => $gradient};
  border-radius: 24px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const PsychometricIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: 0.5rem;
`;

const PsychometricTitle = styled.h4`
  font-size: 2.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  margin: 0;
  text-align: center;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const PsychometricStatus = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ActionButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.button.commit};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 1rem 1.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  margin-top: 1.5rem;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const ActionPlanSection = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1.5rem;
`;

const ActionPlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ActionPlanTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.blue};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

const CommittedCareerCard = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary.blue};
`;

const CareerName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.gradient};
  transition: width 0.5s ease;
`;

const ProgressText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const NextStepCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  border: 1px solid #e2e8f0;
`;

const NextStepLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const NextStepTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const psychometricCategories = [
  {
    id: 'personality',
    title: 'Personality',
    icon: '🧠',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: '⚡',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #FBBF24 100%)'
  },
  {
    id: 'goals',
    title: 'Goals',
    icon: '🎯',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #93C5FD 0%, #7FE7A8 100%)'
  },
  {
    id: 'values',
    title: 'Values',
    icon: '💎',
    status: 'Completed',
    gradient: 'linear-gradient(135deg, #00E5CC 0%, #6B7280 100%)'
  },
  {
    id: 'interest',
    title: 'Interest',
    icon: '❤️',
    status: 'In Progress',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #00BFFF 100%)'
  },
  {
    id: 'beliefs',
    title: 'Beliefs',
    icon: '✨',
    status: 'Not Started',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #9CA3AF 100%)'
  },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [committedCareer, setCommittedCareer] = useState<any>(null);
  const [careerDetails, setCareerDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [movingFromText, setMovingFromText] = useState('My Toxic Work Environment');

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
      return;
    }
    fetchProfile();
    fetchCommittedCareer();
  }, [session, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommittedCareer = async () => {
    try {
      const actionsResponse = await fetch('/api/user/actions');
      const actionsData = await actionsResponse.json();

      if (actionsResponse.ok && actionsData.committedCareer) {
        setCommittedCareer(actionsData.committedCareer);

        // Fetch career details
        const careerResponse = await fetch(`/api/careers/${actionsData.committedCareer.careerId}`);
        const careerData = await careerResponse.json();

        if (careerResponse.ok) {
          setCareerDetails(careerData.career);
        }
      }
    } catch (error) {
      console.error('Error fetching committed career:', error);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPsychometricStatus = (data: any[], category: string) => {
    if (!data || data.length === 0) return 'Not Started';
    if (data.length < 3) return 'In Progress';
    return 'Completed';
  };

  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderValue(e.clientX);
  };

  const handleSliderMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderValue(e.clientX);
    }
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderValue = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderValue(percentage);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleSliderMouseMove);
      window.addEventListener('mouseup', handleSliderMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleSliderMouseMove);
        window.removeEventListener('mouseup', handleSliderMouseUp);
      };
    }
  }, [isDragging]);

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <Logo />
        </Header>
        <ContentArea>
          <ProfileSection>
            <p>Loading profile...</p>
          </ProfileSection>
        </ContentArea>
        <Navigation />
      </PageContainer>
    );
  }

  if (!profileData) {
    return (
      <PageContainer>
        <Header>
          <Logo />
        </Header>
        <ContentArea>
          <ProfileSection>
            <p>Profile not found</p>
          </ProfileSection>
        </ContentArea>
        <Navigation />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Logo />
        <SettingsButton onClick={() => window.location.href = '/api/auth/signout'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </SettingsButton>
      </Header>

      <ContentArea>
        <SectionTitle>Learn about you're</SectionTitle>
        <PsychometricGrid>
          {[
            {
              id: 'personality',
              title: 'Personality',
              gradient: 'linear-gradient(135deg, #EF4444 0%, #9333EA 100%)',
            },
            {
              id: 'skills',
              title: 'Skills',
              gradient: 'linear-gradient(135deg, #14B8A6 0%, #FBBF24 100%)',
            },
            {
              id: 'goals',
              title: 'Goals',
              gradient: 'linear-gradient(135deg, #A7F3D0 0%, #93C5FD 100%)',
            },
            {
              id: 'values',
              title: 'Values',
              gradient: 'linear-gradient(135deg, #8B5CF6 0%, #14B8A6 100%)',
            },
            {
              id: 'interest',
              title: 'Interest',
              gradient: 'linear-gradient(135deg, #1E40AF 0%, #A855F7 100%)',
            },
            {
              id: 'beliefs',
              title: 'Beliefs',
              gradient: 'linear-gradient(135deg, #FDE047 0%, #F9A8D4 100%)',
            },
          ].map((category) => (
            <PsychometricCard
              key={category.id}
              $gradient={category.gradient}
            >
              <PsychometricTitle>{category.title}</PsychometricTitle>
            </PsychometricCard>
          ))}
        </PsychometricGrid>
      </ContentArea>

      <Navigation />
    </PageContainer>
  );
}
