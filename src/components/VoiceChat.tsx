'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const VoiceSelector = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.blue};
    box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.1);
  }
`;

const VisualizationContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const MicrophoneButton = styled.button<{ $isActive: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.status.error : theme.colors.primary.gradient};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const StatusText = styled.div<{ $isActive: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $isActive }) => ($isActive ? '#EF4444' : '#6B7280')};
`;

const TranscriptionBox = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const TranscriptionLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const TranscriptionText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const EmptyTranscription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-style: italic;
`;

const ErrorBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  color: #DC2626;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AudioPlayer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: white;
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const AudioInfo = styled.div`
  flex: 1;
  color: white;
`;

const AudioLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.9;
  margin-bottom: 0.25rem;
`;

const AudioTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceChat({ isOpen, onClose }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('vespera');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const roomRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const availableVoices = [
    { id: 'vespera', name: 'Vespera (Default)' },
    { id: 'aurora', name: 'Aurora' },
    { id: 'orion', name: 'Orion' },
    { id: 'nova', name: 'Nova' },
  ];

  const startRecording = async () => {
    try {
      setError(''); // Clear any previous errors

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create MediaRecorder to capture audio
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;

          setIsProcessing(true);

          try {
            // Send audio to backend for transcription and processing
            const response = await fetch('/api/voice/process', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audio: base64Audio,
                voice: selectedVoice,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              setTranscript(data.transcript);
              setAiResponse(data.response);
              setAudioUrl(data.audioUrl);

              // Try to play audio automatically
              if (data.audioUrl) {
                try {
                  const audio = new Audio(data.audioUrl);
                  audioRef.current = audio;
                  await audio.play();
                  console.log('Audio playback started successfully');
                } catch (audioError: any) {
                  console.error('Audio playback error:', audioError);
                  // Browser blocked autoplay - user can click play button
                  console.log('Autoplay blocked - user must click play button');
                }
              } else {
                console.warn('No audio URL received from server');
              }
            } else {
              const error = await response.json();
              setError(error.error || 'Failed to process voice');
            }
          } catch (error) {
            console.error('Error processing voice:', error);
            setError('Failed to process voice. Please try again.');
          } finally {
            setIsProcessing(false);
          }
        };

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      mediaRecorder.start();
      roomRef.current = mediaRecorder as any;

      setIsRecording(true);
    } catch (error: any) {
      console.error('Error starting recording:', error);

      let errorMessage = 'Failed to start voice chat. ';

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow microphone access in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No microphone found. Please connect a microphone.';
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please check your microphone permissions and try again.';
      }

      setError(errorMessage);
    }
  };

  const stopRecording = async () => {
    if (roomRef.current) {
      const mediaRecorder = roomRef.current as any;
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      roomRef.current = null;
    }

    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = async () => {
    console.log('Play button clicked, audioUrl:', audioUrl ? 'present' : 'missing');

    if (!audioUrl) {
      setError('No audio available to play');
      return;
    }

    try {
      // If we already have an audio element, just replay it
      if (audioRef.current) {
        console.log('Replaying existing audio');
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        console.log('Audio playing successfully');
        return;
      }

      // Create a blob URL from the base64 data for better compatibility
      const base64Data = audioUrl.split(',')[1];
      const mimeType = audioUrl.match(/data:([^;]+);/)?.[1] || 'audio/mpeg';

      console.log('Converting base64 to blob, MIME type:', mimeType);

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      console.log('Created blob URL, size:', blob.size, 'bytes');

      const audio = new Audio();
      audio.src = blobUrl;
      audioRef.current = audio;

      audio.onended = () => {
        console.log('Audio playback ended');
        URL.revokeObjectURL(blobUrl); // Clean up
      };

      audio.onerror = (e) => {
        console.error('Audio element error:', e);
        setError('Audio format not supported by browser');
      };

      console.log('Starting audio playback...');
      await audio.play();
      console.log('Audio playing successfully');
    } catch (error: any) {
      console.error('Error in playAudio:', error);
      setError(`Could not play audio: ${error.message || error.name}`);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  return (
    <Modal $isOpen={isOpen}>
      <ModalContent>
        <Header>
          <Title>Voice Chat</Title>
          <CloseButton onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </CloseButton>
        </Header>

        <VoiceSelector>
          <Label htmlFor="voice-select">Select Voice</Label>
          <Select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            disabled={isRecording}
          >
            {availableVoices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </Select>
        </VoiceSelector>

        {error && (
          <ErrorBox>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {error}
          </ErrorBox>
        )}

        <VisualizationContainer>
          <MicrophoneButton $isActive={isRecording} onClick={toggleRecording} disabled={isProcessing}>
            {isRecording ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </MicrophoneButton>
          <StatusText $isActive={isRecording}>
            {isProcessing ? 'Processing...' : isRecording ? 'Listening...' : 'Tap to speak'}
          </StatusText>
        </VisualizationContainer>

        {transcript && (
          <TranscriptionBox>
            <TranscriptionLabel>You said:</TranscriptionLabel>
            <TranscriptionText>{transcript}</TranscriptionText>
          </TranscriptionBox>
        )}

        {aiResponse && (
          <>
            {audioUrl && (
              <AudioPlayer>
                <PlayButton onClick={playAudio}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </PlayButton>
                <AudioInfo>
                  <AudioLabel>AI Response Audio</AudioLabel>
                  <AudioTitle>Click to play Vespera's response</AudioTitle>
                </AudioInfo>
              </AudioPlayer>
            )}
            <TranscriptionBox>
              <TranscriptionLabel>AI Response:</TranscriptionLabel>
              <TranscriptionText>{aiResponse}</TranscriptionText>
            </TranscriptionBox>
          </>
        )}

        {!transcript && !aiResponse && (
          <TranscriptionBox>
            <EmptyTranscription>
              Click the microphone button to start talking with your AI career advisor
            </EmptyTranscription>
          </TranscriptionBox>
        )}
      </ModalContent>
    </Modal>
  );
}
