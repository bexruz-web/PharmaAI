// src/pages/Onboarding.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLangStore } from '../stores/langStore'
import { useAuthStore } from '../stores/authStore'

interface Slide {
  id: number
  titleKey: 'slide1Title' | 'slide2Title' | 'slide3Title'
  descKey:  'slide1Desc'  | 'slide2Desc'  | 'slide3Desc'
  illustration: React.ReactNode
}

// Step 1 Illustration: Scaled UP Drug Scanner & Phone Mockup with soft floor shadow
const DrugScannerMockupIllustration = () => (
  <div className="w-full max-w-[280px] sm:max-w-[320px] h-[240px] sm:h-[270px] flex items-center justify-center relative mx-auto overflow-visible">
    {/* Soft ambient background glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 to-transparent dark:from-emerald-950/20 dark:to-transparent rounded-full blur-2xl -z-10 transform scale-95" />
    <motion.img
      src="/assets/onboarding-scanner.png"
      alt="Drug Scanner Mockup"
      initial={{ scale: 0.94, y: 4 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
    />
  </div>
)

// Step 2 Illustration: Prescription Scanner & Voice Assistant
const ScannerPrescription3DIllustration = () => (
  <svg width="230" height="230" viewBox="0 0 240 240" fill="none" className="drop-shadow-md mx-auto">
    <defs>
      <linearGradient id="sheetGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
      <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(16,185,129,0)" />
        <stop offset="50%" stopColor="rgba(16,185,129,0.4)" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <filter id="shadow3dDoc" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.2" />
      </filter>
    </defs>
    <circle cx="120" cy="120" r="85" className="fill-slate-100 dark:fill-[#1E1E20]" filter="url(#shadow3dDoc)" />
    <motion.g
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      transform="translate(65, 45)"
      filter="url(#shadow3dDoc)"
    >
      <rect x="0" y="0" width="110" height="145" rx="14" fill="url(#sheetGrad)" stroke="#CBD5E1" strokeWidth="2" />
      <rect x="15" y="16" width="30" height="30" rx="8" fill="#10B981" />
      <path d="M24 23h12M30 17v12" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="20" width="42" height="6" rx="3" fill="#94A3B8" />
      <rect x="52" y="32" width="30" height="5" rx="2.5" fill="#CBD5E1" />
      <rect x="15" y="58" width="80" height="6" rx="3" fill="#64748B" />
      <rect x="15" y="72" width="65" height="6" rx="3" fill="#94A3B8" />
      <rect x="15" y="86" width="75" height="6" rx="3" fill="#94A3B8" />
      <circle cx="80" cy="115" r="14" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M75 115l3 3 6-6" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
    <g transform="translate(50, 40)">
      <path d="M0 30V0h30 M110 0h30v30 M140 130v30h-30 M30 160H0v-30" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      <motion.g
        animate={{ y: [10, 140, 10] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="-12" width="140" height="14" fill="url(#beamGrad)" opacity="0.6" />
        <line x1="-5" y1="2" x2="145" y2="2" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" filter="drop-shadow(0 0 6px #10b981)" />
      </motion.g>
    </g>
  </svg>
)

// Step 3 Illustration: Fast Home Delivery Box
const FastDeliveryBox3DIllustration = () => (
  <svg width="230" height="230" viewBox="0 0 240 240" fill="none" className="drop-shadow-md mx-auto">
    <defs>
      <linearGradient id="boxFront" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="boxTop" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="shadow3dBox" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="120" cy="120" r="85" className="fill-slate-100 dark:fill-[#1E1E20]" filter="url(#shadow3dBox)" />
    <g stroke="#10B981" strokeWidth="4" strokeLinecap="round" opacity="0.8">
      <line x1="30" y1="90" x2="55" y2="90" />
      <line x1="20" y1="110" x2="50" y2="110" />
      <line x1="35" y1="130" x2="55" y2="130" />
    </g>
    <motion.g
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      transform="translate(60, 60)"
      filter="url(#shadow3dBox)"
    >
      <rect x="15" y="45" width="95" height="75" rx="10" fill="url(#boxFront)" stroke="#64748B" strokeWidth="2" />
      <path d="M15 45 L35 20 H125 L110 45 Z" fill="url(#boxTop)" stroke="#64748B" strokeWidth="2" />
      <rect x="52" y="45" width="22" height="75" fill="#10B981" />
      <path d="M52 45 L64 20 H77 L65 45 Z" fill="#34D399" />
      <circle cx="63" cy="82" r="14" fill="white" />
      <path d="M57 82h12M63 76v12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      <motion.g
        animate={{ y: [-3, 3, -3], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        transform="translate(65, -15)"
      >
        <path d="M25 0 L50 12 V35 C50 50, 25 65, 25 65 C25 65, 0 50, 0 35 V12 Z" fill="url(#shieldGrad)" stroke="white" strokeWidth="2.5" />
        <path d="M16 30 L22 36 L34 22" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </motion.g>
  </svg>
)

const SLIDES: Slide[] = [
  {
    id: 1,
    titleKey: 'slide1Title',
    descKey:  'slide1Desc',
    illustration: <DrugScannerMockupIllustration />,
  },
  {
    id: 2,
    titleKey: 'slide2Title',
    descKey:  'slide2Desc',
    illustration: <ScannerPrescription3DIllustration />,
  },
  {
    id: 3,
    titleKey: 'slide3Title',
    descKey:  'slide3Desc',
    illustration: <FastDeliveryBox3DIllustration />,
  },
]

export const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const { t: tI18n } = useTranslation()
  const { t: tStore } = useLangStore()
  const { markOnboardingDone } = useAuthStore()

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const translate = (key: string) => tI18n(key) || (tStore as any)[key] || key

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      goTo(current + 1)
    } else {
      markOnboardingDone()
      navigate('/login')
    }
  }

  const handleSkip = () => {
    markOnboardingDone()
    navigate('/login')
  }

  const slide = SLIDES[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden relative justify-between pt-4 pb-6 px-6 transition-colors duration-200">
      {/* 1. Top Header: Skip text button on the Top-Right Corner in brand green */}
      <div className="relative z-20 flex items-center justify-end h-10 w-full max-w-sm sm:max-w-md mx-auto">
        {current < SLIDES.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-extrabold px-3 py-1.5 btn-touch transition-colors"
          >
            {translate('skip')}
          </motion.button>
        )}
      </div>

      {/* 2 & 3. Central Image Container & Text Layout */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-1">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="flex flex-col items-center text-center w-full max-w-sm sm:max-w-md mx-auto"
          >
            {/* Image Container shifted higher up and scaled UP */}
            <div className="mb-3 flex items-center justify-center w-full overflow-visible">
              {slide.illustration}
            </div>

            {/* Typography Block: Prominent Title & Expanded Subtitle container */}
            <div className="w-full max-w-sm sm:max-w-md px-2 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 text-center leading-tight tracking-tight">
                {translate(slide.titleKey)}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-center w-full max-w-xs sm:max-w-sm">
                {translate(slide.descKey)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Bottom Layout & Controls */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center gap-5 pt-2">
        {/* Active Pagination Indicator: 3 dots, 1st dot active green */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === current ? 24 : 8,
                backgroundColor: i === current ? '#10B981' : 'rgba(148,163,184,0.3)',
              }}
              className="h-2 rounded-full cursor-pointer"
              transition={{ type: 'spring', damping: 20 }}
            />
          ))}
        </div>

        {/* Main Full-Width Stretched CTA Button ("Keyingisi") */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="
            w-full h-14 rounded-2xl font-extrabold text-base text-white
            bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
            transition-all duration-150 flex items-center justify-center gap-2
            shadow-md shadow-emerald-600/25 btn-touch
          "
        >
          <span>{current === SLIDES.length - 1 ? translate('letsStart') : translate('next')}</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
