'use client';

import { useCallback } from 'react';
import { useVoice } from '@/context/VoiceContext';

// Agent personalities and greetings
const agentGreetings: Record<string, { greeting: string; greetingAr: string }> = {
    sofra: {
        greeting: "Welcome to Sofra. What are we eating today?",
        greetingAr: "أهلاً بك في سفرة. شو نطبخ اليوم؟"
    },
    tajer: {
        greeting: "Tajer here. Let's close some deals today.",
        greetingAr: "تاجر معك. خلينا نسكر صفقات اليوم."
    },
    drmoe: {
        greeting: "Dr. Moe at your service. How can I help with your health today?",
        greetingAr: "دكتور مو بخدمتك. كيف أقدر أساعدك بصحتك اليوم؟"
    },
    tirs: {
        greeting: "Tirs online. Ready to engineer your solution.",
        greetingAr: "ترس متصل. جاهز لهندسة حلّك."
    },
    ostaz: {
        greeting: "Ostaz speaking. What would you like to learn?",
        greetingAr: "الأستاذ معك. شو حابب تتعلم؟"
    }
};

export function useVoiceAgent() {
    const { speak, startListening, stopListening, state, activeAgent, setActiveAgent, transcript, isSupported } = useVoice();

    const activateAgent = useCallback(async (agentId: string, lang: 'en' | 'ar' = 'en') => {
        if (!isSupported) return;

        const agent = agentGreetings[agentId];
        if (!agent) return;

        setActiveAgent(agentId);

        // Speak greeting
        const greeting = lang === 'ar' ? agent.greetingAr : agent.greeting;
        await speak(greeting);

        // Auto-listen after greeting (with small delay)
        setTimeout(() => {
            startListening();
        }, 300);
    }, [speak, startListening, setActiveAgent, isSupported]);

    const deactivateAgent = useCallback(() => {
        stopListening();
        setActiveAgent(null);
    }, [stopListening, setActiveAgent]);

    return {
        activateAgent,
        deactivateAgent,
        activeAgent,
        state,
        transcript,
        isSupported
    };
}
