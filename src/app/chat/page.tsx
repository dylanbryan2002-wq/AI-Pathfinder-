'use client';

import styled from 'styled-components';
import { Navigation } from '@/components/Navigation';
import { ChatInterface } from '@/components/ChatInterface';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-bottom: 80px; /* Space for navigation */
`;

export default function ChatPage() {
  return (
    <PageContainer>
      <ChatInterface />
      <Navigation />
    </PageContainer>
  );
}
