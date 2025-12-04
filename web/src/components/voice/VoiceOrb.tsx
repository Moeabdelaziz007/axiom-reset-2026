'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoice } from '@/context/VoiceContext';

export function VoiceOrb() {
    const { state, isSupported, startListening, stopListening, activeAgent } = useVoice();

    if (!isSupported) return null;

    const handleClick = () => {
        if (state === 'listening') {
            stopListening();
        } else if (state === 'idle') {
            startListening();
        }
    };

    // Dynamic sizing based on state
    const orbSize = state === 'listening' ? 80 : state === 'speaking' ? 72 : 64;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            {/* Outer glow rings */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: state === 'listening'
                        ? 'radial-gradient(circle, rgba(57,255,20,0.4) 0%, transparent 70%)'
                        : state === 'speaking'
                            ? 'radial-gradient(circle, rgba(57,255,20,0.6) 0%, transparent 60%)'
                            : 'radial-gradient(circle, rgba(57,255,20,0.2) 0%, transparent 70%)',
                }}
                animate={{
                    scale: state === 'idle' ? [1, 1.3, 1] : state === 'listening' ? [1, 1.5, 1] : [1, 1.2, 1],
                    opacity: state === 'idle' ? [0.3, 0.5, 0.3] : [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: state === 'listening' ? 0.8 : 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Secondary pulse ring */}
            {state !== 'idle' && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#39FF14]/50"
                    animate={{
                        scale: [1, 2, 2],
                        opacity: [0.6, 0, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            )}

            {/* Main Orb */}
            <motion.button
                onClick={handleClick}
                className="relative flex items-center justify-center rounded-full transition-colors"
                style={{
                    width: orbSize,
                    height: orbSize,
                    background: state === 'speaking'
                        ? 'linear-gradient(135deg, #39FF14 0%, #00ff88 100%)'
                        : 'linear-gradient(135deg, #1a1a2e 0%, #0f1117 100%)',
                    border: `2px solid ${state === 'idle' ? 'rgba(57,255,20,0.3)' : 'rgba(57,255,20,0.8)'}`,
                    boxShadow: state === 'idle'
                        ? '0 0 20px rgba(57,255,20,0.2), inset 0 0 20px rgba(57,255,20,0.05)'
                        : '0 0 40px rgba(57,255,20,0.5), inset 0 0 30px rgba(57,255,20,0.1)',
                }}
                animate={{
                    scale: state === 'listening' ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    repeat: state === 'listening' ? Infinity : 0,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Icon */}
                {state === 'speaking' ? (
                    <Volume2 className="w-6 h-6 text-black" />
                ) : state === 'listening' ? (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        <Mic className="w-6 h-6 text-[#39FF14]" />
                    </motion.div>
                ) : (
                    <MicOff className="w-5 h-5 text-[#39FF14]/60" />
                )}

                {/* Waveform bars for speaking state */}
                {state === 'speaking' && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-black/50 rounded-full"
                                animate={{
                                    height: [8, 20, 8],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.button>

            {/* Active agent indicator */}
            {activeAgent && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-xs text-[#39FF14]/80 font-medium tracking-wider uppercase">
                        {activeAgent}
                    </span>
                </motion.div>
            )}
        </div>
    );
}
