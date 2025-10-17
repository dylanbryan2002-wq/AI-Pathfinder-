'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.h1`
  font-family: 'Quicksand', -apple-system, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-transform: lowercase;
  letter-spacing: -0.5px;
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
  white-space: pre-wrap;
  word-wrap: break-word;

  p {
    margin: 0.5rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }
`;

const TypingIndicator = styled.div`
  max-width: 80%;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  align-self: flex-start;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TypingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.secondary};
  animation: typing 1.4s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 60%, 100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid #E5E7EB;
`;

const MatchButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.primary.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InputRow = styled.div`
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
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! My name is AI Pathfinder. Think of me like your personal career advisor. I can help you discover careers that match your interests, skills, and goals. What would you like to explore today?',
      isAi: true,
    },
    {
      id: '2',
      content: 'By the way, we can communicate through text, but most people find they get clearer recommendations and a faster match when they switch to voice mode. Feel free to ask me anything!',
      isAi: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Load chat history when user logs in
  useEffect(() => {
    if (session?.user?.id && !historyLoaded) {
      loadChatHistory();
    }
  }, [session?.user?.id]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const loadChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat?userId=${session?.user?.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          const loadedMessages: Message[] = data.messages.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            isAi: msg.role === 'assistant',
          }));
          // Append loaded messages after the welcome messages
          setMessages(prev => [...prev, ...loadedMessages]);
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setHistoryLoaded(true);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAi: false,
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.isAi ? 'assistant' : 'user',
              content: msg.content,
            })),
            {
              role: 'user',
              content: userMessage.content,
            },
          ],
          userId: session?.user?.id, // Pass user ID if authenticated
        }),
      });

      const data = await response.json();

      if (data.message) {
        // Add AI response to chat
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isAi: true,
        };
        setMessages(prev => [...prev, aiMessage]);
      } else if (data.error) {
        // Show error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Sorry, I encountered an error: ${data.error}. Please try again.`,
          isAi: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I had trouble connecting. Please check your internet connection and try again.',
        isAi: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        content: 'Hi there! My name is AI Pathfinder. Think of me like your personal career advisor. I can help you discover careers that match your interests, skills, and goals. What would you like to explore today?',
        isAi: true,
      },
      {
        id: '2',
        content: 'By the way, we can communicate through text, but most people find they get clearer recommendations and a faster match when they switch to voice mode. Feel free to ask me anything!',
        isAi: true,
      },
    ]);
    setInputValue('');
  };

  const handleMatchCareers = async () => {
    if (!session?.user) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Please sign in to get career matches.',
        isAi: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setIsMatching(true);

    try {
      const response = await fetch('/api/match-careers', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        const successMessage: Message = {
          id: Date.now().toString(),
          content: `Great news! I've analyzed our conversation and found ${data.totalMatches} career matches for you! Your top match is ${data.matches[0]?.career.title} with a ${data.matches[0]?.matchPercentage}% match. Check out the Careers page to see all your matches!`,
          isAi: true,
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: `Sorry, I couldn't generate matches: ${data.error}`,
          isAi: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error matching careers:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I had trouble generating career matches. Please try again.',
        isAi: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsMatching(false);
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
          <IconButton onClick={handleNewChat} title="Start new chat">
            {/* New Chat Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </IconButton>
          <IconButton onClick={() => window.location.href = '/bookmarks'} title="Bookmarks">
            {/* Bookmark Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </IconButton>
          {session?.user && (
            <IconButton onClick={() => window.location.href = '/api/auth/signout'} title="Sign out">
              {/* Logout Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </IconButton>
          )}
        </HeaderIcons>
      </Header>

      <ChatArea ref={chatAreaRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} $isAi={message.isAi}>
            {message.content}
          </MessageBubble>
        ))}
        {isLoading && (
          <TypingIndicator>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingIndicator>
        )}
      </ChatArea>

      <InputContainer>
        {session?.user && messages.length > 2 && (
          <MatchButton onClick={handleMatchCareers} disabled={isMatching}>
            {isMatching ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                  </path>
                </svg>
                Analyzing conversation...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                Get Career Matches
              </>
            )}
          </MatchButton>
        )}

        <InputRow>
          <ActionButton>
            {/* Plus Icon for file upload */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </ActionButton>

          <Input
            type="text"
            placeholder={isLoading ? "AI Pathfinder is thinking..." : "Ask me anything..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
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
        </InputRow>
      </InputContainer>
    </Container>
  );
}
