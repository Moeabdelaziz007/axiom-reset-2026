'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

type VoiceState = 'idle' | 'listening' | 'speaking' | 'processing';

interface VoiceContextType {
    state: VoiceState;
    isSupported: boolean;
    speak: (text: string, voice?: string) => Promise<void>;
    startListening: () => void;
    stopListening: () => void;
    transcript: string;
    activeAgent: string | null;
    setActiveAgent: (agentId: string | null) => void;
}

const VoiceContext = createContext<VoiceContextType | null>(null);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<VoiceState>('idle');
    const [transcript, setTranscript] = useState('');
    const [activeAgent, setActiveAgent] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(false);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsSupported('speechSynthesis' in window && 'webkitSpeechRecognition' in window);
            synthRef.current = window.speechSynthesis;

            // Initialize speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    const current = event.resultIndex;
                    const result = event.results[current][0].transcript;
                    setTranscript(result);
                };

                recognition.onend = () => {
                    setState('idle');
                };

                recognition.onerror = () => {
                    setState('idle');
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    const speak = useCallback(async (text: string): Promise<void> => {
        if (!synthRef.current) return;

        return new Promise((resolve) => {
            // Cancel any ongoing speech
            synthRef.current?.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            // Try to find a good English voice
            const voices = synthRef.current?.getVoices() || [];
            const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Daniel') || v.lang.startsWith('en'));
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onstart = () => setState('speaking');
            utterance.onend = () => {
                setState('idle');
                resolve();
            };
            utterance.onerror = () => {
                setState('idle');
                resolve();
            };

            synthRef.current?.speak(utterance);
        });
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && state !== 'listening') {
            setTranscript('');
            setState('listening');
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error('Speech recognition error:', e);
                setState('idle');
            }
        }
    }, [state]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setState('idle');
        }
    }, []);

    return (
        <VoiceContext.Provider
            value={{
                state,
                isSupported,
                speak,
                startListening,
                stopListening,
                transcript,
                activeAgent,
                setActiveAgent,
            }}
        >
            {children}
        </VoiceContext.Provider>
    );
}

export function useVoice() {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error('useVoice must be used within VoiceProvider');
    }
    return context;
}

// TypeScript declarations for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }
}
