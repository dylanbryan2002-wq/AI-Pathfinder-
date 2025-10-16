'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 2px solid #E5E7EB;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
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

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div<{ $isAi: boolean }>`
  max-width: 80%;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ $isAi, theme }) =>
    $isAi ? theme.colors.background.secondary : theme.colors.primary.green};
  color: ${({ $isAi, theme }) =>
    $isAi ? theme.colors.text.primary : theme.colors.text.primary};
  align-self: ${({ $isAi }) => ($isAi ? 'flex-start' : 'flex-end')};
  box-shadow: ${({ theme }) => theme.shadows.card};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const InputContainer = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  outline: none;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.blue};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const ActionButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const VoiceButton = styled(ActionButton)<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.voice.blob : theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.white};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary.blue : theme.colors.text.primary};
    transform: scale(1.05);
  }
`;

interface Message {
  id: string;
  content: string;
  isAi: boolean;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi Jerry, My name is Ai pathfinder. Think of me like your personal career advisor. What are the different ways I can help you today?',
      isAi: true,
    },
    {
      id: '2',
      content: 'By the way, we can communicate through text, but most people find they get clearer recommendations and a faster match when they switch to voice mode. Check out what I can do on there!',
      isAi: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAi: false,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // TODO: Send to AI API
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Container>
      <Header>
        <Logo>
          <IconButton>
            {/* Hamburger Menu */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </IconButton>
          <LogoText>ai-pathfinder</LogoText>
        </Logo>
        <HeaderIcons>
          <IconButton>
            {/* Bookmark Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </IconButton>
        </HeaderIcons>
      </Header>

      <ChatArea>
        {messages.map((message) => (
          <MessageBubble key={message.id} $isAi={message.isAi}>
            {message.content}
          </MessageBubble>
        ))}
      </ChatArea>

      <InputContainer>
        <ActionButton>
          {/* Plus Icon for file upload */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </ActionButton>

        <Input
          type="text"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <ActionButton>
          {/* Microphone Icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </ActionButton>

        <VoiceButton
          $active={isVoiceMode}
          onClick={() => setIsVoiceMode(!isVoiceMode)}
        >
          {/* Voice/Audio Icon */}
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </VoiceButton>
      </InputContainer>
    </Container>
  );
}
