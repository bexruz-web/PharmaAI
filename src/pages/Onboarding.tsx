// src/pages/Onboarding.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLangStore } from '../stores/langStore'
import { useAuthStore } from '../stores/authStore'
import { PharmaAiIcon } from '../components/PharmaAiIcon'

interface Slide {
  id: number
  titleKey: 'slide1Title' | 'slide2Title' | 'slide3Title'
  descKey:  'slide1Desc'  | 'slide2Desc'  | 'slide3Desc'
  illustration: React.ReactNode
}

// Step 1 Illustration: 3D Phone scanning ASPIRIN box (Enlarged scale)
const DrugScannerMockupIllustration = () => (
  <div className="w-full max-w-[370px] sm:max-w-[430px] h-[315px] sm:h-[365px] flex items-center justify-center relative mx-auto overflow-visible">
    {/* Soft ambient background glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 to-transparent dark:from-emerald-950/20 dark:to-transparent rounded-full blur-2xl -z-10 transform scale-95" />
    <img
      src="/assets/onboarding-scanner.png"
      alt="Drug Scanner Mockup"
      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
    />
  </div>
)

// Step 2 Illustration: Audio Guide Phone Mockup with Voice Waveform Widget
const AudioGuideMockupIllustration = () => (
  <div className="w-full max-w-[370px] sm:max-w-[430px] h-[315px] sm:h-[365px] flex items-center justify-center relative mx-auto overflow-visible">
    {/* Soft ambient background glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 to-transparent dark:from-emerald-950/20 dark:to-transparent rounded-full blur-2xl -z-10 transform scale-95" />
    <img
      src="/assets/onboarding-audio-guide.png"
      alt="Audio Guide Mockup"
      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
    />
  </div>
)

// Step 3 Illustration: Pharma AI Chat Phone Mockup
const ChatMockupIllustration = () => (
  <div className="w-full max-w-[370px] sm:max-w-[430px] h-[315px] sm:h-[365px] flex items-center justify-center relative mx-auto overflow-visible">
    {/* Soft ambient background glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 to-transparent dark:from-emerald-950/20 dark:to-transparent rounded-full blur-2xl -z-10 transform scale-95" />
    <img
      src="/assets/onboarding-chat.png"
      alt="Pharma AI Chat Mockup"
      className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
    />
  </div>
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
    illustration: <AudioGuideMockupIllustration />,
  },
  {
    id: 3,
    titleKey: 'slide3Title',
    descKey:  'slide3Desc',
    illustration: <ChatMockupIllustration />,
  },
]

export const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const { t: tI18n } = useTranslation()
  const { t: tStore } = useLangStore()
  const { markOnboardingDone } = useAuthStore()

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  // Asset preloading & memory caching for instant zero-lag transitions
  useEffect(() => {
    const assetsToPreload = [
      '/assets/onboarding-scanner.png',
      '/assets/onboarding-audio-guide.png',
      '/assets/onboarding-chat.png',
    ]
    assetsToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

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

  // Ultra-fast, responsive 180ms screen transition variants
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '40%' : '-40%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0 }),
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden relative justify-between pt-4 pb-6 px-6 transition-colors duration-200">
      {/* 1. Top Header Layout: Skip text button on left & Branded Boxed Logo Component on top-right */}
      <div className="relative z-20 flex items-center justify-between h-10 w-full max-w-sm sm:max-w-md mx-auto shrink-0">
        {/* Left: Green "O'tkazib yuborish" Skip action */}
        <button
          onClick={handleSkip}
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-extrabold py-1.5 btn-touch transition-colors"
        >
          {translate('skip')}
        </button>

        {/* Right: Top-Right Header Boxed Logo Component (Chip/Badge style with subtle border & padding) */}
        <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-xs">
          <PharmaAiIcon className="w-6 h-6 object-contain" />
        </div>
      </div>

      {/* 2. Central Content Block */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-2 pb-2">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center text-center w-full max-w-sm sm:max-w-md mx-auto"
          >
            {/* Visual Illustration Mockup */}
            <div className="mb-3 flex items-center justify-center w-full overflow-visible">
              {slide.illustration}
            </div>

            {/* Typography Block */}
            <div className="w-full max-w-sm sm:max-w-md px-2 flex flex-col items-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 text-center leading-snug tracking-tight">
                {translate(slide.titleKey)}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-center w-full max-w-xs sm:max-w-sm">
                {translate(slide.descKey)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Controls: Centered 3 pagination dots & full-width green CTA button */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center gap-5 pt-2 shrink-0">
        {/* 3 Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                i === current ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Full-width rounded green CTA button */}
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
