'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Eye, Globe, Cpu, Shield, TrendingUp, Sparkles, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════
// AXIOM RESET - LINEAR-LEVEL LANDING PAGE V2
// Design: Tactical Cyberpunk × Carbon Fiber × INTENSE Neon Green
// ═══════════════════════════════════════════════════════════════════

// Translations
const t = {
    en: {
        tagline: 'THE FIRST AI WORKFORCE ECONOMY',
        title1: 'Rent Expert',
        title2: 'Digital Agents',
        title3: 'For Your Business',
        subtitle: 'Deploy specialized AI agents that work 24/7. Keep 100% of your profits. Zero commission. Zero hassle.',
        cta: 'Deploy Your First Agent',
        ctaSecondary: 'Watch Demo',
        voiceButton: 'Talk to Agent',
        voiceButtonListening: 'Listening...',
        agentsTitle: 'The Agent Arena',
        agentsSubtitle: 'Choose your digital workforce — each agent is a specialist',
        rentNow: 'Rent Now',
        stats: {
            agents: 'AI Agents',
            commission: 'Commission',
            uptime: 'Uptime',
            businesses: 'Businesses Ready'
        },
        dna: {
            title: 'The Axiom DNA',
            subtitle: 'Built different. Built for MENA.',
            points: [
                { icon: <Cpu className="w-5 h-5" />, title: 'AI-Native', desc: 'Every agent is powered by cutting-edge AI' },
                { icon: <Shield className="w-5 h-5" />, title: 'Zero Commission', desc: 'You keep 100% of your profits' },
                { icon: <TrendingUp className="w-5 h-5" />, title: '24/7 Operations', desc: 'Your agents never sleep' },
            ]
        },
        footer: 'System Status: Operational • MENA Region',
        about: 'About'
    },
    ar: {
        tagline: 'أول اقتصاد للقوى العاملة الذكية',
        title1: 'استأجر وكلاء',
        title2: 'رقميين خبراء',
        title3: 'لعملك',
        subtitle: 'وظّف وكلاء ذكاء اصطناعي يعملون 24/7. احتفظ بـ100% من أرباحك. صفر عمولة. صفر تعقيد.',
        cta: 'وظّف وكيلك الأول',
        ctaSecondary: 'شاهد العرض',
        voiceButton: 'تحدث مع الوكيل',
        voiceButtonListening: 'جاري الاستماع...',
        agentsTitle: 'ساحة الوكلاء',
        agentsSubtitle: 'اختر فريقك الرقمي — كل وكيل متخصص في مجاله',
        rentNow: 'استأجر الآن',
        stats: {
            agents: 'وكيل ذكي',
            commission: 'عمولة',
            uptime: 'متاح',
            businesses: 'شركة جاهزة'
        },
        dna: {
            title: 'حمض أكسيوم النووي',
            subtitle: 'مبني بشكل مختلف. مبني للمنطقة.',
            points: [
                { icon: <Cpu className="w-5 h-5" />, title: 'ذكاء اصطناعي أصيل', desc: 'كل وكيل مدعوم بأحدث تقنيات الذكاء الاصطناعي' },
                { icon: <Shield className="w-5 h-5" />, title: 'صفر عمولة', desc: 'احتفظ بـ100% من أرباحك' },
                { icon: <TrendingUp className="w-5 h-5" />, title: 'عمليات 24/7', desc: 'وكلاؤك لا ينامون أبداً' },
            ]
        },
        footer: 'حالة النظام: يعمل • منطقة الشرق الأوسط',
        about: 'عنّا'
    }
};

// Agent Data with Archetypes & Accent Colors
const agents = [
    {
        id: 'sofra',
        name: 'Sofra',
        nameAr: 'سفرة',
        archetype: 'The Maître D\'',
        archetypeAr: 'مدير الضيافة',
        role: 'Restaurant OS',
        roleAr: 'نظام المطاعم',
        color: '#FF6B5B',
        image: '/agents/sofra.png',
        size: 'large'
    },
    {
        id: 'tajer',
        name: 'Tajer',
        nameAr: 'تاجر',
        archetype: 'The Closer',
        archetypeAr: 'المُنهي للصفقات',
        role: 'Real Estate',
        roleAr: 'العقارات',
        color: '#FFB347',
        image: '/agents/tajer.png',
        size: 'medium'
    },
    {
        id: 'drmoe',
        name: 'Dr. Moe',
        nameAr: 'د. مو',
        archetype: 'The Guardian',
        archetypeAr: 'الحارس',
        role: 'Pharmacy AI',
        roleAr: 'الصيدلية الذكية',
        color: '#00C4B4',
        image: '/agents/dr-moe.png',
        size: 'medium'
    },
    {
        id: 'tirs',
        name: 'Tirs',
        nameAr: 'تِرس',
        archetype: 'The Engineer',
        archetypeAr: 'المهندس',
        role: 'Industrial B2B',
        roleAr: 'الصناعة والجملة',
        color: '#8B9EB7',
        image: '/agents/tirs.png',
        size: 'small'
    },
    {
        id: 'ostaz',
        name: 'Ostaz',
        nameAr: 'أستاذ',
        archetype: 'The Mentor',
        archetypeAr: 'المرشد',
        role: 'Education',
        roleAr: 'التعليم',
        color: '#7C5CFF',
        image: '/agents/ostaz.png',
        size: 'small'
    },
];

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
};

const pulseNeon = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
            '0 0 40px rgba(57, 255, 20, 0.6), 0 0 80px rgba(57, 255, 20, 0.4)',
            '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
        ],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    }
};

export default function Home() {
    const [lang, setLang] = useState<'en' | 'ar'>('en');
    const [isListening, setIsListening] = useState(false);
    const [voiceText, setVoiceText] = useState('');
    const tr = t[lang];
    const isRTL = lang === 'ar';

    // Voice Handler using FREE Web Speech API
    const startVoice = () => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
            recognition.continuous = false;
            recognition.interimResults = true;

            recognition.onstart = () => {
                setIsListening(true);
                setVoiceText('');
            };

            recognition.onresult = (event: { results: { transcript: string; }[][]; }) => {
                const transcript = event.results[0][0].transcript;
                setVoiceText(transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
                // Speak response using TTS
                if (voiceText && 'speechSynthesis' in window) {
                    const response = lang === 'ar'
                        ? `مرحباً! سمعتك تقول: ${voiceText}. كيف يمكنني مساعدتك؟`
                        : `Hello! I heard you say: ${voiceText}. How can I help you?`;
                    const utterance = new SpeechSynthesisUtterance(response);
                    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
                    window.speechSynthesis.speak(utterance);
                }
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            alert('Voice recognition is not supported in this browser. Please use Chrome.');
        }
    };

    return (
        <div
            className="min-h-screen bg-[#050508] text-white overflow-x-hidden"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* ═══ INTENSE CARBON FIBER BACKGROUND ═══ */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
              linear-gradient(45deg, #0a0a0a 25%, transparent 25%),
              linear-gradient(-45deg, #0a0a0a 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #0a0a0a 75%),
              linear-gradient(-45deg, transparent 75%, #0a0a0a 75%)
            `,
                        backgroundSize: '6px 6px',
                        backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px'
                    }}
                />
                {/* Scan Lines Effect */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.03) 2px, rgba(57, 255, 20, 0.03) 4px)'
                    }}
                />
            </div>

            {/* ═══ MASSIVE NEON GLOW ORBS ═══ */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Main Hero Glow */}
                <motion.div
                    animate={{
                        opacity: [0.15, 0.25, 0.15],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#39FF14]/20 blur-[180px] rounded-full"
                />
                {/* Secondary Glow */}
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#39FF14]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#39FF14]/8 blur-[150px] rounded-full" />
            </div>

            {/* ═══ NAVBAR ═══ */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between bg-[#050508]/90 backdrop-blur-2xl border border-[#39FF14]/10 rounded-2xl px-6 py-3 shadow-[0_0_30px_rgba(57,255,20,0.05)]"
                    >
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="relative w-10 h-10"
                                animate={pulseNeon.animate}
                            >
                                <div className="absolute inset-0 bg-[#39FF14]/30 blur-xl rounded-full" />
                                <div className="relative w-10 h-10 rounded-xl bg-[#39FF14]/20 border border-[#39FF14]/50 flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-[#39FF14]" />
                                </div>
                            </motion.div>
                            <span className="text-white font-bold text-xl tracking-tight">Axiom</span>
                            <span className="text-[#39FF14] font-light text-xl">RESET</span>
                        </div>

                        {/* Nav Links */}
                        <div className="flex items-center gap-6">
                            <a href="#agents" className="text-gray-400 hover:text-[#39FF14] text-sm transition-colors hidden md:block">
                                {isRTL ? 'الوكلاء' : 'Agents'}
                            </a>
                            <Link href="/about" className="text-gray-400 hover:text-[#39FF14] text-sm transition-colors hidden md:block">
                                {tr.about}
                            </Link>
                            <button
                                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/20 text-sm text-[#39FF14] hover:bg-[#39FF14]/10 transition-all"
                            >
                                <Globe className="w-4 h-4" />
                                {lang === 'ar' ? 'EN' : 'عربي'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </nav>

            {/* ═══ HERO SECTION - MEGA ENHANCED ═══ */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
                {/* Animated Grid Lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#39FF14]/20 to-transparent" />
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        {/* Tagline Badge with NEON */}
                        <motion.div variants={fadeInUp} className="mb-10">
                            <motion.div
                                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 shadow-[0_0_30px_rgba(57,255,20,0.2)]"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(57, 255, 20, 0.2)',
                                        '0 0 40px rgba(57, 255, 20, 0.4)',
                                        '0 0 20px rgba(57, 255, 20, 0.2)',
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-4 h-4 text-[#39FF14]" />
                                <span className="text-[#39FF14] text-sm font-bold tracking-[0.2em] uppercase">
                                    {tr.tagline}
                                </span>
                                <Zap className="w-4 h-4 text-[#39FF14]" />
                            </motion.div>
                        </motion.div>

                        {/* MASSIVE Main Headline */}
                        <motion.div variants={fadeInUp} className="mb-6">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                <span className="text-white/90">{tr.title1}</span>
                            </h1>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mb-6">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                <span
                                    className="relative inline-block"
                                    style={{
                                        background: 'linear-gradient(135deg, #39FF14, #00FF88, #39FF14)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(0 0 30px rgba(57, 255, 20, 0.5))'
                                    }}
                                >
                                    {tr.title2}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mb-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/60 tracking-tight">
                                {tr.title3}
                            </h2>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed">
                            {tr.subtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            {/* Primary CTA - INTENSE NEON */}
                            <motion.button
                                className="group relative px-10 py-5 rounded-2xl font-bold text-black text-lg overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                animate={{
                                    boxShadow: [
                                        '0 0 30px rgba(57, 255, 20, 0.5), 0 0 60px rgba(57, 255, 20, 0.3)',
                                        '0 0 50px rgba(57, 255, 20, 0.7), 0 0 100px rgba(57, 255, 20, 0.5)',
                                        '0 0 30px rgba(57, 255, 20, 0.5), 0 0 60px rgba(57, 255, 20, 0.3)',
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="absolute inset-0 bg-[#39FF14]" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14] to-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center gap-3">
                                    {tr.cta}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>

                            {/* Secondary CTA */}
                            <button className="px-8 py-5 rounded-2xl font-bold text-[#39FF14] text-lg border-2 border-[#39FF14]/30 hover:border-[#39FF14]/60 hover:bg-[#39FF14]/5 transition-all">
                                {tr.ctaSecondary}
                            </button>

                            {/* 🎙️ LIVE VOICE BUTTON - FREE Web Speech API */}
                            <motion.button
                                onClick={startVoice}
                                className={`group relative px-8 py-5 rounded-full font-bold text-lg overflow-hidden transition-all ${isListening
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white/5 text-white border-2 border-white/20 hover:border-[#39FF14]/50'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={isListening ? {
                                    boxShadow: [
                                        '0 0 20px rgba(255, 0, 0, 0.4)',
                                        '0 0 40px rgba(255, 0, 0, 0.6)',
                                        '0 0 20px rgba(255, 0, 0, 0.4)',
                                    ]
                                } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <span className="relative flex items-center gap-3">
                                    {isListening ? (
                                        <>
                                            <MicOff className="w-5 h-5 animate-pulse" />
                                            {tr.voiceButtonListening}
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="w-5 h-5" />
                                            {tr.voiceButton}
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Voice Transcript Display */}
                        {voiceText && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 px-6 py-4 rounded-2xl bg-[#39FF14]/10 border border-[#39FF14]/30 max-w-lg mx-auto"
                            >
                                <p className="text-[#39FF14] text-center">
                                    &quot;{voiceText}&quot;
                                </p>
                            </motion.div>
                        )}

                        {/* Stats with NEON accents */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {[
                                { value: '5', label: tr.stats.agents, color: '#39FF14' },
                                { value: '0%', label: tr.stats.commission, color: '#39FF14' },
                                { value: '24/7', label: tr.stats.uptime, color: '#fff' },
                                { value: '100+', label: tr.stats.businesses, color: '#39FF14' },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="text-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div
                                        className="text-5xl md:text-6xl font-black"
                                        style={{
                                            color: stat.color,
                                            textShadow: stat.color === '#39FF14' ? '0 0 30px rgba(57, 255, 20, 0.5)' : 'none'
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-[#39FF14]/30 flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-3 bg-[#39FF14] rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ═══ AGENT ARENA - BENTO GRID ═══ */}
            <section id="agents" className="relative py-24 px-4">
                {/* Section Neon Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                            {tr.agentsTitle}
                        </h2>
                        <p className="text-gray-400 text-xl">{tr.agentsSubtitle}</p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[320px]">
                        {agents.map((agent, idx) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className={`
                  group relative rounded-3xl overflow-hidden cursor-pointer
                  bg-gradient-to-br from-white/[0.04] to-transparent
                  border border-white/[0.08] hover:border-[#39FF14]/30
                  transition-all duration-500
                  ${agent.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''}
                  ${agent.size === 'medium' ? 'lg:row-span-1' : ''}
                `}
                            >
                                {/* Agent Accent Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle at center, ${agent.color}, transparent 70%)` }}
                                />

                                {/* Neon Border on Hover */}
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        boxShadow: `inset 0 0 30px ${agent.color}20, 0 0 20px ${agent.color}10`
                                    }}
                                />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-6 z-10">
                                    {/* Top - Archetype Badge */}
                                    <div>
                                        <span
                                            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border"
                                            style={{
                                                color: agent.color,
                                                borderColor: `${agent.color}50`,
                                                backgroundColor: `${agent.color}15`,
                                                boxShadow: `0 0 20px ${agent.color}20`
                                            }}
                                        >
                                            {isRTL ? agent.archetypeAr : agent.archetype}
                                        </span>
                                    </div>

                                    {/* Center - Image */}
                                    <div className="flex-1 flex items-center justify-center py-4">
                                        <motion.div
                                            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                boxShadow: `0 0 40px ${agent.color}30`
                                            }}
                                        >
                                            <Image
                                                src={agent.image}
                                                alt={agent.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Bottom - Name & CTA */}
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
                                                {isRTL ? agent.nameAr : agent.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {isRTL ? agent.roleAr : agent.role}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/agents/${agent.id}`}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                                            style={{
                                                backgroundColor: agent.color,
                                                color: '#000',
                                                boxShadow: `0 0 20px ${agent.color}50`
                                            }}
                                        >
                                            {tr.rentNow}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ AXIOM DNA SECTION ═══ */}
            <section className="relative py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Glassmorphism Card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent" />
                        <div className="absolute inset-0 backdrop-blur-xl" />
                        <div className="absolute inset-0 border border-[#39FF14]/20 rounded-3xl" />

                        {/* Neon Accent Lines */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />

                        {/* Content */}
                        <div className="relative p-10 md:p-16 z-10">
                            <div className="text-center mb-14">
                                <h2
                                    className="text-4xl md:text-5xl font-black text-white mb-4"
                                    style={{ textShadow: '0 0 30px rgba(57, 255, 20, 0.3)' }}
                                >
                                    {tr.dna.title}
                                </h2>
                                <p className="text-gray-400 text-lg">{tr.dna.subtitle}</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {tr.dna.points.map((point, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#050508]/50 border border-[#39FF14]/10 hover:border-[#39FF14]/30 transition-all duration-300"
                                    >
                                        <motion.div
                                            className="w-14 h-14 rounded-xl bg-[#39FF14]/15 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] mb-6"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 20px rgba(57, 255, 20, 0.2)',
                                                    '0 0 30px rgba(57, 255, 20, 0.4)',
                                                    '0 0 20px rgba(57, 255, 20, 0.2)',
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                        >
                                            {point.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                                        <p className="text-gray-500">{point.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="relative py-16 border-t border-[#39FF14]/10">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Status with NEON pulse */}
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-[#39FF14]"
                                animate={{
                                    boxShadow: [
                                        '0 0 10px rgba(57, 255, 20, 0.5)',
                                        '0 0 20px rgba(57, 255, 20, 0.8)',
                                        '0 0 10px rgba(57, 255, 20, 0.5)',
                                    ]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-gray-400 text-sm">{tr.footer}</span>
                        </div>

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-[#39FF14]" />
                            <span className="text-white font-bold">Axiom</span>
                            <span className="text-[#39FF14]">RESET</span>
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-600 text-sm">© 2024 Axiom Reset. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
