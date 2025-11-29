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
  z-index: ${({ theme }) => theme.zIndex.modal};
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
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

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #E5E7EB;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.blue};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.blue};
    cursor: pointer;
    border: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const SliderValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.25rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary.blue};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  margin-bottom: 1rem;
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

const AiSpeakingIndicator = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  svg {
    animation: soundWave 1s ease-in-out infinite;
  }

  @keyframes soundWave {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
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
  const [speedAlpha, setSpeedAlpha] = useState(1.0);
  const [reduceLatency, setReduceLatency] = useState(true);
  const [modelId, setModelId] = useState('mist');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isInConversationMode, setIsInConversationMode] = useState(false);

  console.log('VoiceChat rendered, isOpen:', isOpen);

  const roomRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAiSpeakingRef = useRef<boolean>(false);
  const isInConversationModeRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isRecordingRef = useRef<boolean>(false);

  const availableVoices = [
    { id: 'vespera', name: 'Vespera (Warm & Professional)', description: 'Balanced, friendly female voice' },
    { id: 'aurora', name: 'Aurora (Energetic)', description: 'Bright, enthusiastic female voice' },
    { id: 'orion', name: 'Orion (Deep & Calm)', description: 'Deep, authoritative male voice' },
    { id: 'nova', name: 'Nova (Clear & Neutral)', description: 'Clear, neutral voice' },
  ];

  const qualityModels = [
    { id: 'mist', name: 'Mist (Fast)', description: 'Lower latency, good quality' },
    { id: 'v1', name: 'V1 (High Quality)', description: 'Higher quality, slower generation' },
  ];

  const interruptAI = () => {
    // Stop any currently playing audio
    if (audioRef.current) {
      console.log('🛑 User interrupted AI - stopping audio playback');
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      isAiSpeakingRef.current = false;
      setIsAiSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      setError(''); // Clear any previous errors

      // Interrupt AI if speaking
      interruptAI();

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Create MediaRecorder to capture audio
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      // Setup audio context for VAD (Voice Activity Detection)
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;

      analyser.fftSize = 2048;
      source.connect(analyser);

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
                speedAlpha: speedAlpha,
                reduceLatency: reduceLatency,
                modelId: modelId,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              setTranscript(data.transcript);
              setAiResponse(data.response);
              setAudioUrl(data.audioUrl);

              // Play audio and automatically start listening again if in conversation mode
              if (data.audioUrl) {
                console.log('🔄 Playing AI response...');
                await playAudioAndThenListen(data.audioUrl);
              } else {
                console.warn('No audio URL received from server');
              }
            } else {
              const error = await response.json();
              setError(error.error || 'Failed to process voice');
              setIsInConversationMode(false);
              isInConversationModeRef.current = false;
            }
          } catch (error) {
            console.error('Error processing voice:', error);
            setError('Failed to process voice. Please try again.');
            setIsInConversationMode(false);
            isInConversationModeRef.current = false;
          } finally {
            setIsProcessing(false);
          }
        };
      };

      // Start recording
      mediaRecorder.start();
      roomRef.current = mediaRecorder as any;

      setIsRecording(true);
      isRecordingRef.current = true;

      // Start monitoring silence for auto-stop
      console.log('🎙️ Recording started, starting VAD...');
      monitorSilence();
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

    // Stop media stream tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsRecording(false);
    isRecordingRef.current = false;
  };

  const monitorSilence = () => {
    if (!analyserRef.current) {
      console.log('No analyser available for VAD');
      return;
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const SILENCE_THRESHOLD = 30; // Adjust for sensitivity
    const SILENCE_DURATION = 800; // 0.8 seconds of silence (faster response)

    let silenceStart: number | null = null;

    const checkAudioLevel = () => {
      // Check using ref instead of state
      if (!isRecordingRef.current) {
        console.log('VAD stopped - recording is false');
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      console.log('Audio level:', average); // Debug log

      if (average < SILENCE_THRESHOLD) {
        if (silenceStart === null) {
          silenceStart = Date.now();
          console.log('Silence started');
        } else if (Date.now() - silenceStart > SILENCE_DURATION) {
          console.log('🔇 Silence detected for 0.8s - auto-stopping recording');
          stopRecording();
          return;
        }
      } else {
        if (silenceStart !== null) {
          console.log('Sound detected, resetting silence timer');
        }
        silenceStart = null;
      }

      requestAnimationFrame(checkAudioLevel);
    };

    console.log('Starting VAD monitoring');
    checkAudioLevel();
  };

  const toggleRecording = () => {
    if (isRecording || isInConversationMode) {
      // Stop conversation mode
      console.log('🛑 Stopping conversation mode');
      stopRecording();
      setIsInConversationMode(false);
      isInConversationModeRef.current = false;
      interruptAI(); // Also stop any playing audio
    } else {
      // Start conversation mode
      console.log('🎙️ Starting continuous conversation mode');
      setIsInConversationMode(true);
      isInConversationModeRef.current = true;
      startRecording();
    }
  };

  const playAudioAndThenListen = async (audioUrl: string) => {
    return new Promise<void>((resolve) => {
      try {
        console.log('🔊 Playing AI response and will listen after...');

        // Convert base64 to blob for better compatibility
        const base64Data = audioUrl.split(',')[1];
        const mimeType = audioUrl.match(/data:([^;]+);/)?.[1] || 'audio/wav';

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);

        const audio = new Audio();
        audio.src = blobUrl;
        audio.volume = 1.0;
        audioRef.current = audio;
        isAiSpeakingRef.current = true;
        setIsAiSpeaking(true);

        audio.onloadedmetadata = () => {
          console.log('Audio loaded, duration:', audio.duration, 'seconds');
        };

        audio.onended = async () => {
          console.log('✅ AI finished speaking');
          URL.revokeObjectURL(blobUrl);
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);

          // If in conversation mode, automatically start listening again
          if (isInConversationModeRef.current) {
            console.log('🎤 Auto-starting recording for next turn...');
            await new Promise(r => setTimeout(r, 200)); // Brief pause (reduced for speed)
            await startRecording();
          }
          resolve();
        };

        audio.onerror = async (e) => {
          console.error('Audio playback error:', e);
          URL.revokeObjectURL(blobUrl);
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);

          // Still continue listening even if playback failed
          if (isInConversationModeRef.current) {
            await startRecording();
          }
          resolve();
        };

        audio.onpause = () => {
          isAiSpeakingRef.current = false;
          setIsAiSpeaking(false);
        };

        // Play the audio
        audio.play().catch(async (err) => {
          console.error('Play failed:', err);
          if (err.name === 'NotAllowedError') {
            setError('Browser blocked audio. Please click play or allow audio.');
          }
          // Continue listening even if audio failed
          if (isInConversationModeRef.current) {
            await startRecording();
          }
          resolve();
        });
      } catch (error) {
        console.error('Error in playAudioAndThenListen:', error);
        if (isInConversationModeRef.current) {
          startRecording();
        }
        resolve();
      }
    });
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
      audio.volume = 1.0; // Ensure volume is at max
      audioRef.current = audio;
      isAiSpeakingRef.current = true;
      setIsAiSpeaking(true);

      audio.onloadedmetadata = () => {
        console.log('Manual play: Audio metadata loaded - duration:', audio.duration, 'seconds');
      };

      audio.onended = () => {
        console.log('Manual play: Audio playback ended');
        URL.revokeObjectURL(blobUrl); // Clean up
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      audio.onerror = (e) => {
        console.error('Manual play: Audio element error:', e);
        console.error('Manual play: Audio error details:', audio.error);
        if (audio.error) {
          console.error('Manual play: Error code:', audio.error.code);
          console.error('Manual play: Error message:', audio.error.message);
        }
        setError('Audio format not supported by browser');
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      audio.onplay = () => {
        console.log('Manual play: Audio started playing');
        isAiSpeakingRef.current = true;
        setIsAiSpeaking(true);
      };

      audio.onpause = () => {
        console.log('Manual play: Audio paused');
        isAiSpeakingRef.current = false;
        setIsAiSpeaking(false);
      };

      console.log('Manual play: Starting audio playback...');
      await audio.play();
      console.log('Manual play: Audio playing successfully');
    } catch (error: any) {
      console.error('Error in playAudio:', error);
      setError(`Could not play audio: ${error.message || error.name}`);
    }
  };

  // Cleanup on unmount or when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Clean up when modal closes
      if (isRecording) {
        stopRecording();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsInConversationMode(false);
      isInConversationModeRef.current = false;
      setTranscript('');
      setAiResponse('');
      setError('');
    }

    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isOpen]);

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

        <SettingsGrid>
          <SettingItem>
            <Label htmlFor="speed-slider">
              Speech Speed: {speedAlpha.toFixed(1)}x
            </Label>
            <Slider
              id="speed-slider"
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speedAlpha}
              onChange={(e) => setSpeedAlpha(parseFloat(e.target.value))}
              disabled={isRecording}
            />
            <SliderValue>
              {speedAlpha < 0.8 ? 'Slower' : speedAlpha > 1.2 ? 'Faster' : 'Normal'}
            </SliderValue>
          </SettingItem>

          <SettingItem>
            <Label htmlFor="model-select">Quality</Label>
            <Select
              id="model-select"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              disabled={isRecording}
            >
              {qualityModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Select>
            <SliderValue>{qualityModels.find(m => m.id === modelId)?.description}</SliderValue>
          </SettingItem>
        </SettingsGrid>

        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            checked={reduceLatency}
            onChange={(e) => setReduceLatency(e.target.checked)}
            disabled={isRecording}
          />
          Reduce latency (faster response, may reduce quality slightly)
        </CheckboxLabel>

        {isAiSpeaking && !isRecording && (
          <AiSpeakingIndicator>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            AI is speaking... (Click mic to interrupt)
          </AiSpeakingIndicator>
        )}

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
            {isProcessing
              ? 'Processing...'
              : isRecording
                ? 'Listening...'
                : isInConversationMode
                  ? 'Continuous mode - Tap to stop'
                  : 'Tap to start conversation'
            }
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
