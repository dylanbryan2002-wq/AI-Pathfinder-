'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';

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
  gap: 1.5rem;
`;

const LogoCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const LogoText = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #7CFC00 0%, #7CFC00 20%, #00CED1 40%, #4A90E2 70%, #5DD9FC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* White outline effect */
  position: relative;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background: none;
    -webkit-text-fill-color: #fff;
    -webkit-text-stroke: 3px #fff;
  }
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
    $isAi ? theme.colors.background.secondary : '#007AFF'};
  color: ${({ $isAi, theme }) =>
    $isAi ? theme.colors.text.primary : '#FFFFFF'};
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
    $active ? '#EF4444' : theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.white};
  position: relative;

  ${({ $active }) => $active && `
    animation: pulse 1.5s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? '#DC2626' : theme.colors.text.primary};
    transform: scale(1.05);
  }
`;

const VoiceIndicator = styled.div`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
`;

const VoiceDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const VoiceText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

interface Message {
  id: string;
  content: string;
  isAi: boolean;
}

export function ChatInterface() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const careerParam = searchParams?.get('career');
  const isNewChat = searchParams?.get('new') === 'true';

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
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [isInVoiceConversation, setIsInVoiceConversation] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isInVoiceConversationRef = useRef(false);
  const isAiSpeakingRef = useRef(false);
  const isRecordingRef = useRef(false);
  const persistentMicStreamRef = useRef<MediaStream | null>(null);
  const interruptAnalyserRef = useRef<AnalyserNode | null>(null);
  const interruptAudioContextRef = useRef<AudioContext | null>(null);

  // Handle new chat from career page
  useEffect(() => {
    if (isNewChat && careerParam) {
      // Start fresh conversation about specific career
      setMessages([
        {
          id: '1',
          content: `I see you're interested in learning more about ${careerParam}. What specific aspects would you like to explore? I can discuss day-to-day responsibilities, required skills, career growth, salary expectations, or anything else you'd like to know!`,
          isAi: true,
        },
      ]);
      setHistoryLoaded(true); // Prevent loading old history
    }
  }, [isNewChat, careerParam]);

  // Load chat history when user logs in
  useEffect(() => {
    if (session?.user?.id && !historyLoaded && !isNewChat) {
      loadChatHistory();
    }
  }, [session?.user?.id, isNewChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Auto-update career matches every 4 messages (2 exchanges)
  useEffect(() => {
    // Only auto-update if:
    // 1. User is signed in
    // 2. We have more than 4 messages (at least 2 exchanges)
    // 3. Message count is divisible by 4 (every 2 exchanges)
    // 4. Not currently matching
    if (
      session?.user &&
      messages.length > 4 &&
      messages.length % 4 === 0 &&
      !isMatching
    ) {
      console.log('🔄 Auto-updating career matches in background...');
      // Update silently without showing success message
      handleMatchCareers(false);
    }
  }, [messages.length, session?.user, isMatching]);

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
          // Replace welcome messages with loaded history
          setMessages(loadedMessages);
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

  const handleMatchCareers = async (showSuccessMessage = true) => {
    if (!session?.user) {
      if (showSuccessMessage) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: 'Please sign in to get career matches.',
          isAi: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      return;
    }

    setIsMatching(true);

    try {
      const response = await fetch('/api/match-careers', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✨ Career matches updated:', data.totalMatches, 'matches');

        if (showSuccessMessage) {
          const topMatch = data.matches[0];
          const successMessage: Message = {
            id: Date.now().toString(),
            content: `🎉 Great news! I've analyzed our conversation and found ${data.totalMatches} career matches for you!\n\nYour top match is "${topMatch?.career.title}" with a ${topMatch?.matchPercentage}% match!\n\n${topMatch?.matchReason}\n\nHead over to the Careers page to explore all your personalized matches and take the next steps!`,
            isAi: true,
          };
          setMessages(prev => [...prev, successMessage]);

          // Redirect to careers page after 3 seconds
          setTimeout(() => {
            window.location.href = '/careers';
          }, 3000);
        }
      } else {
        if (showSuccessMessage) {
          const errorMessage: Message = {
            id: Date.now().toString(),
            content: `Sorry, I couldn't generate matches: ${data.error}`,
            isAi: true,
          };
          setMessages(prev => [...prev, errorMessage]);
        } else {
          console.error('Background match update failed:', data.error);
        }
      }
    } catch (error) {
      console.error('Error matching careers:', error);
      if (showSuccessMessage) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: 'Sorry, I had trouble generating career matches. Please try again.',
          isAi: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsMatching(false);
    }
  };

  const toggleVoiceRecording = async () => {
    if (isInVoiceConversationRef.current) {
      // Exit voice conversation mode
      console.log('Exiting voice conversation mode');
      stopRecording();
      stopInterruptMonitoring();
      stopPersistentMicrophone(); // Stop the persistent mic stream
      setIsInVoiceConversation(false);
      isInVoiceConversationRef.current = false;
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    } else {
      // Start voice conversation with AI greeting
      console.log('Starting voice conversation mode');
      await startVoiceConversation();
    }
  };

  const startVoiceConversation = async () => {
    console.log('🎬 === STARTING VOICE CONVERSATION MODE === 🎬');
    setIsInVoiceConversation(true);
    isInVoiceConversationRef.current = true;
    setIsLoading(true);

    console.log('📡 About to call startInterruptMonitoring...');
    // Start monitoring for interruptions
    await startInterruptMonitoring();
    console.log('✅ Returned from startInterruptMonitoring');

    try {
      // Simple, short greeting that fits Rime's limits
      const greeting = "Hello! I'm ready to help you explore career options. What would you like to know?";

      // Add AI greeting to chat
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: greeting,
        isAi: true,
      };
      setMessages(prev => [...prev, aiMessage]);

      // Convert greeting to speech
      const ttsResponse = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: greeting,
          voice: 'vespera',
          speedAlpha: 1.0,
          reduceLatency: true,
          modelId: 'mist',
        }),
      });

      if (ttsResponse.ok) {
        const ttsData = await ttsResponse.json();

        // Play greeting and then start listening
        await playAudioAndThenListen(ttsData.audioUrl);
      } else {
        console.error('TTS failed, starting to listen anyway');
        // If TTS fails, just start listening
        await startRecording();
      }
    } catch (error) {
      console.error('Error starting voice conversation:', error);
      setIsInVoiceConversation(false);
      isInVoiceConversationRef.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  const interruptAI = () => {
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      console.log('🛑 User interrupted AI - stopping audio playback');
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      isAiSpeakingRef.current = false;
      setIsAiSpeaking(false);
    }
  };

  const startInterruptMonitoring = async () => {
    try {
      console.log('🎤 Setting up interrupt monitoring with persistent microphone...');

      // Get or reuse persistent microphone access
      if (!persistentMicStreamRef.current) {
        console.log('Requesting persistent microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        persistentMicStreamRef.current = stream;
        console.log('✓ Persistent microphone access granted');
      } else {
        console.log('✓ Using existing persistent microphone stream');
      }

      // Setup audio analysis for interrupt detection
      const audioContext = new AudioContext();
      interruptAudioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(persistentMicStreamRef.current);
      const analyser = audioContext.createAnalyser();
      interruptAnalyserRef.current = analyser;

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);

      console.log('👂 Interrupt monitoring audio context created and connected');

      // Start monitoring for voice
      monitorForInterruption();
    } catch (error) {
      console.error('❌ Failed to start interrupt monitoring:', error);
    }
  };

  const stopInterruptMonitoring = () => {
    // Close the audio context but keep the microphone stream active
    if (interruptAudioContextRef.current) {
      interruptAudioContextRef.current.close();
      interruptAudioContextRef.current = null;
    }
    interruptAnalyserRef.current = null;
    console.log('👂 Interrupt monitoring stopped (mic stream kept alive)');
  };

  const stopPersistentMicrophone = () => {
    if (persistentMicStreamRef.current) {
      persistentMicStreamRef.current.getTracks().forEach(track => track.stop());
      persistentMicStreamRef.current = null;
      console.log('🎤 Persistent microphone stream stopped');
    }
  };

  const monitorForInterruption = () => {
    if (!interruptAnalyserRef.current) {
      console.log('⚠️ No interrupt analyser available');
      return;
    }

    const analyser = interruptAnalyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const INTERRUPT_THRESHOLD = 35; // Lower threshold for better detection
    const INTERRUPT_DURATION = 250; // 250ms of speech to trigger interrupt

    let soundStart: number | null = null;

    const checkForVoice = () => {
      // Only monitor when in conversation mode
      if (!isInVoiceConversationRef.current) {
        console.log('👋 Conversation mode ended, stopping interrupt monitor');
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      // Log audio level every 2 seconds for debugging
      if (Math.random() < 0.01) {
        console.log('🎧 Interrupt monitor audio level:', average.toFixed(1), '| AI speaking:', isAiSpeakingRef.current);
      }

      // Only interrupt if AI is actually speaking
      if (isAiSpeakingRef.current && average > INTERRUPT_THRESHOLD) {
        if (soundStart === null) {
          soundStart = Date.now();
          console.log('🎤 Detected potential user speech while AI is talking (level:', average.toFixed(1), ')');
        } else if (Date.now() - soundStart > INTERRUPT_DURATION) {
          console.log('🛑 User is speaking - interrupting AI!');
          interruptAI();
          // Start recording immediately
          startRecording();
          soundStart = null; // Reset
          return;
        }
      } else {
        soundStart = null;
      }

      requestAnimationFrame(checkForVoice);
    };

    console.log('🔊 Starting interrupt voice detection loop');
    checkForVoice();
  };

  const playAudioAndThenListen = async (audioUrl: string) => {
    return new Promise<void>((resolve) => {
      try {
        console.log('Creating audio element...');
        console.log('Audio URL length:', audioUrl.length);
        console.log('Audio URL preview:', audioUrl.substring(0, 50));

        const audio = new Audio();
        audio.volume = 1.0;
        audio.src = audioUrl;
        currentAudioRef.current = audio;
        isAiSpeakingRef.current = true;
        setIsAiSpeaking(true);

        audio.onloadedmetadata = () => {
          console.log('Audio loaded, duration:', audio.duration, 'seconds');
        };

        audio.oncanplay = () => {
          console.log('Audio can play');
        };

        audio.onended = async () => {
          console.log('AI finished speaking, starting to listen...');
          currentAudioRef.current = null;
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);
          // Wait a brief moment then start recording (reduced for faster response)
          await new Promise(r => setTimeout(r, 200));
          await startRecording();
          resolve();
        };

        audio.onerror = async (e) => {
          console.error('Audio playback error:', e);
          console.error('Audio error object:', audio.error);
          currentAudioRef.current = null;
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);
          console.log('Audio failed, skipping to listening...');
          await startRecording();
          resolve();
        };

        audio.onpause = () => {
          console.log('Audio paused');
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);
        };

        console.log('Attempting to play audio...');
        audio.play()
          .then(() => {
            console.log('✓ Audio is playing!');
          })
          .catch(async (err) => {
            console.error('Play failed:', err.name, err.message);
            if (err.name === 'NotAllowedError') {
              console.log('Autoplay blocked by browser - this is normal');
              alert('Browser blocked audio autoplay. The AI has greeted you in the chat. Click OK to start talking!');
            }
            currentAudioRef.current = null;
            await startRecording();
            resolve();
          });
      } catch (error) {
        console.error('Error in playAudioAndThenListen:', error);
        startRecording();
        resolve();
      }
    });
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording... Voice conversation mode:', isInVoiceConversationRef.current);

      // Interrupt AI if speaking
      interruptAI();

      // ALWAYS get a fresh microphone stream for better audio quality
      console.log('Requesting fresh microphone stream for recording...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100 // Higher sample rate for better quality
        }
      });
      console.log('✓ Fresh microphone stream obtained');

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Setup audio context for VAD (separate from interrupt monitoring)
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;

      analyser.fftSize = 2048;
      source.connect(analyser);

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processVoiceInput(audioBlob);

        // Cleanup stream and audio context
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        console.log('✓ Recording stopped, stream cleaned up');
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      isRecordingRef.current = true;
      setInputValue('Listening...');

      // Start VAD monitoring
      console.log('🎙️ Recording started, starting VAD monitoring...');
      monitorSilence();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      isRecordingRef.current = false;
      setInputValue('');

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    }
  };

  const monitorSilence = () => {
    if (!analyserRef.current) {
      console.log('No analyser available for VAD');
      return;
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const SILENCE_THRESHOLD = 20; // Even lower threshold = more sensitive to speech
    const SILENCE_DURATION = 3000; // 3 seconds of silence before stopping
    const MIN_RECORDING_DURATION = 1000; // Minimum 1 second of recording

    let silenceStart: number | null = null;
    const recordingStartTime = Date.now();

    const checkAudioLevel = () => {
      // Check using ref instead of state to avoid closure issues
      if (!isRecordingRef.current) {
        console.log('VAD stopped - recording is false');
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      // Log audio level every 100 checks to avoid spam
      if (Math.random() < 0.01) {
        console.log('Audio level:', average.toFixed(2));
      }

      if (average < SILENCE_THRESHOLD) {
        if (silenceStart === null) {
          silenceStart = Date.now();
          console.log('🔇 Silence started');
        } else {
          const silenceDuration = Date.now() - silenceStart;
          const recordingDuration = Date.now() - recordingStartTime;

          // Only stop if we've been recording for at least MIN_RECORDING_DURATION
          // AND we've had silence for SILENCE_DURATION
          if (silenceDuration > SILENCE_DURATION && recordingDuration > MIN_RECORDING_DURATION) {
            console.log('🔇 Silence detected for 3.0s (recorded for ' + (recordingDuration / 1000).toFixed(1) + 's) - auto-stopping recording');
            stopRecording();
            return;
          }
        }
      } else {
        if (silenceStart !== null) {
          console.log('🎤 Voice detected (level: ' + average.toFixed(1) + '), resetting silence timer');
        }
        silenceStart = null;
      }

      requestAnimationFrame(checkAudioLevel);
    };

    console.log('Starting VAD monitoring');
    checkAudioLevel();
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    setIsLoading(true);
    setInputValue('Processing...');

    try {
      // Check if audio blob has content
      console.log('📦 Audio blob size:', audioBlob.size, 'bytes');

      if (audioBlob.size < 1000) {
        console.warn('⚠️ Audio blob too small, likely no speech - skipping');
        setInputValue('');
        setIsLoading(false);

        // If in voice conversation, just start listening again
        if (isInVoiceConversationRef.current) {
          console.log('🔄 No speech detected, continuing to listen...');
          await new Promise(r => setTimeout(r, 500));
          await startRecording();
        }
        return;
      }

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);

      await new Promise((resolve) => {
        reader.onloadend = resolve;
      });

      const base64Audio = reader.result as string;

      // Send to voice processing API with conversation context
      const response = await fetch('/api/voice/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio: base64Audio,
          voice: 'vespera',
          speedAlpha: 1.0,
          reduceLatency: true,
          modelId: 'mist',
          messages: messages.map(msg => ({
            role: msg.isAi ? 'assistant' : 'user',
            content: msg.content,
          })),
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add user's transcribed message
        const userMessage: Message = {
          id: Date.now().toString(),
          content: data.transcript,
          isAi: false,
        };
        setMessages(prev => [...prev, userMessage]);

        // Add AI response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isAi: true,
        };
        setMessages(prev => [...prev, aiMessage]);

        // Play AI response audio and continue listening if in voice conversation
        console.log('Voice conversation mode ref:', isInVoiceConversationRef.current);
        if (data.audioUrl && isInVoiceConversationRef.current) {
          console.log('✓ Continuing voice conversation - will play audio and listen again');
          await playAudioAndThenListen(data.audioUrl);
        } else if (data.audioUrl) {
          console.log('Single voice interaction - just playing audio');
          playAudio(data.audioUrl);
        }

        setInputValue('');
      } else {
        console.error('❌ Voice API returned error status:', response.status);

        let error;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          error = await response.json();
          console.error('Error response body:', error);
        } else {
          const textError = await response.text();
          console.error('Error response (text):', textError);
          error = { error: textError };
        }

        setInputValue('');

        // Check if it's a "no speech detected" error
        const errorMessage = error.error || error.message || '';
        if (errorMessage.includes('No speech detected')) {
          console.log('⚠️ No speech detected in audio - continuing conversation...');
          console.log('💡 Tip: Speak louder and closer to your microphone, or check your mic settings');

          // If in voice conversation, just start listening again without stopping
          if (isInVoiceConversationRef.current) {
            await new Promise(r => setTimeout(r, 500));
            await startRecording();
            return;
          }
        } else {
          console.error('❌ Other error:', errorMessage);
        }

        // For other errors, show alert and stop conversation
        alert(`Error: ${errorMessage || 'Failed to process voice'}`);
        if (isInVoiceConversationRef.current) {
          setIsInVoiceConversation(false);
          isInVoiceConversationRef.current = false;
        }
      }
    } catch (error) {
      console.error('Error processing voice:', error);
      setInputValue('');
      alert('Failed to process voice. Please try again.');
      if (isInVoiceConversationRef.current) {
        setIsInVoiceConversation(false);
        isInVoiceConversationRef.current = false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl: string) => {
    try {
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      currentAudioRef.current = audio;
      isAiSpeakingRef.current = true;
      setIsAiSpeaking(true);

      audio.onended = () => {
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      audio.onerror = () => {
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      audio.onpause = () => {
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      audio.play().catch(() => {
        console.log('Autoplay blocked, but audio is ready');
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      isAiSpeakingRef.current = false;
      setIsAiSpeaking(false);
    }
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoCircle>
            <Image
              src="/logo-icon.jpeg"
              alt="AI Pathfinder Logo"
              width={70}
              height={70}
              style={{ objectFit: 'cover', background: 'transparent' }}
            />
          </LogoCircle>
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
        {isAiSpeaking && !isRecording && (
          <VoiceIndicator style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <VoiceText>AI is speaking... (Click mic button to interrupt and speak)</VoiceText>
          </VoiceIndicator>
        )}

        {isInVoiceConversation && !isRecording && !isLoading && !isAiSpeaking && (
          <VoiceIndicator style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
            </svg>
            <VoiceText>Voice mode active - Ready to listen</VoiceText>
          </VoiceIndicator>
        )}

        {isRecording && (
          <VoiceIndicator>
            <VoiceDot />
            <VoiceText>Listening... (Speak now or stay silent to continue)</VoiceText>
          </VoiceIndicator>
        )}

        {session?.user && messages.length > 2 && !isRecording && (
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            disabled={isLoading}
          />

          <VoiceButton
            $active={isRecording || isInVoiceConversation}
            onClick={toggleVoiceRecording}
            disabled={isLoading}
            title={isInVoiceConversation ? "End voice conversation" : "Start voice conversation"}
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
