// src/pages/Onboarding.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLangStore } from '../stores/langStore'
import { useAuthStore } from '../stores/authStore'

interface Slide {
  titleKey: 'slide1Title' | 'slide2Title' | 'slide3Title'
  descKey:  'slide1Desc'  | 'slide2Desc'  | 'slide3Desc'
  illustration: React.ReactNode
}

// 3D/7D-style Render 1: Large 3D Pharmacy Pills + Glass Magnifier
const PillsMagnifier3DIllustration = () => (
  <svg width="220" height="220" viewBox="0 0 240 240" fill="none" className="drop-shadow-md">
    <defs>
      {/* 3D Gradients */}
      <linearGradient id="pillGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="pillGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(16,185,129,0.15)" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
      <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Backdrop 3D Glow Ring */}
    <circle cx="120" cy="120" r="85" className="fill-slate-100 dark:fill-[#1E1E20]" filter="url(#shadow3d)" />

    {/* 3D Blister Pack (Backdrop) */}
    <g transform="translate(45, 55) rotate(-12)" opacity="0.85">
      <rect x="0" y="0" width="80" height="110" rx="14" fill="#94A3B8" opacity="0.3" stroke="#64748B" strokeWidth="2" />
      <circle cx="25" cy="30" r="14" fill="url(#pillGrad2)" />
      <circle cx="55" cy="30" r="14" fill="url(#pillGrad1)" />
      <circle cx="25" cy="70" r="14" fill="url(#pillGrad1)" />
      <circle cx="55" cy="70" r="14" fill="url(#pillGrad2)" />
    </g>

    {/* 3D Floating Capsule Pill */}
    <motion.g
      animate={{ y: [-6, 6, -6], rotate: [0, 8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      transform="translate(130, 45) rotate(35)"
    >
      <rect x="0" y="0" width="34" height="68" rx="17" fill="url(#pillGrad1)" />
      <rect x="0" y="34" width="34" height="34" rx="17" fill="url(#pillGrad2)" />
      {/* Glossy highlight */}
      <rect x="5" y="6" width="6" height="30" rx="3" fill="white" opacity="0.6" />
    </motion.g>

    {/* 3D Glass Magnifier */}
    <motion.g
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Handle */}
      <rect x="145" y="145" width="18" height="55" rx="9" fill="url(#ringGrad)" transform="rotate(-45 145 145)" />
      {/* 3D Lens Frame Ring */}
      <circle cx="105" cy="105" r="48" fill="none" stroke="url(#ringGrad)" strokeWidth="12" filter="url(#shadow3d)" />
      {/* Glass Lens Surface */}
      <circle cx="105" cy="105" r="42" fill="url(#glassGrad)" stroke="white" strokeWidth="2" />
      {/* Medical Cross Symbol Inside Magnifier */}
      <path d="M93 105h24M105 93v24" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
      {/* Lens Reflection Highlight */}
      <path d="M75 90 C 85 75, 110 72, 125 78" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
    </motion.g>
  </svg>
)

// 3D/7D-style Render 2: Large 3D Prescription Paper + Glowing Scan Beam
const ScannerPrescription3DIllustration = () => (
  <svg width="220" height="220" viewBox="0 0 240 240" fill="none" className="drop-shadow-md">
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

    {/* Backdrop Base Circle */}
    <circle cx="120" cy="120" r="85" className="fill-slate-100 dark:fill-[#1E1E20]" filter="url(#shadow3dDoc)" />

    {/* 3D Floating Prescription Document Sheet */}
    <motion.g
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      transform="translate(65, 45)"
      filter="url(#shadow3dDoc)"
    >
      <rect x="0" y="0" width="110" height="145" rx="14" fill="url(#sheetGrad)" stroke="#CBD5E1" strokeWidth="2" />
      
      {/* Rx Header Badge */}
      <rect x="15" y="16" width="30" height="30" rx="8" fill="#10B981" />
      <path d="M24 23h12M30 17v12" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Prescription Lines */}
      <rect x="52" y="20" width="42" height="6" rx="3" fill="#94A3B8" />
      <rect x="52" y="32" width="30" height="5" rx="2.5" fill="#CBD5E1" />

      <rect x="15" y="58" width="80" height="6" rx="3" fill="#64748B" />
      <rect x="15" y="72" width="65" height="6" rx="3" fill="#94A3B8" />
      <rect x="15" y="86" width="75" height="6" rx="3" fill="#94A3B8" />

      {/* Doctor Stamp Seal */}
      <circle cx="80" cy="115" r="14" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M75 115l3 3 6-6" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>

    {/* 3D Scanner Beam Animation overlay */}
    <g transform="translate(50, 40)">
      {/* 3D Viewfinder Frame Corner Brackets */}
      <path d="M0 30V0h30 M110 0h30v30 M140 130v30h-30 M30 160H0v-30" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      
      {/* Scanning Laser Ray */}
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

// 3D/7D-style Render 3: Large 3D Medical Parcel Box + Fast Delivery Shield
const FastDeliveryBox3DIllustration = () => (
  <svg width="220" height="220" viewBox="0 0 240 240" fill="none" className="drop-shadow-md">
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

    {/* Backdrop Base Circle */}
    <circle cx="120" cy="120" r="85" className="fill-slate-100 dark:fill-[#1E1E20]" filter="url(#shadow3dBox)" />

    {/* Fast Speed Lines Behind Box */}
    <g stroke="#10B981" strokeWidth="4" strokeLinecap="round" opacity="0.8">
      <line x1="30" y1="90" x2="55" y2="90" />
      <line x1="20" y1="110" x2="50" y2="110" />
      <line x1="35" y1="130" x2="55" y2="130" />
    </g>

    {/* 3D Parcel Package Box */}
    <motion.g
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      transform="translate(60, 60)"
      filter="url(#shadow3dBox)"
    >
      {/* Box Front Face */}
      <rect x="15" y="45" width="95" height="75" rx="10" fill="url(#boxFront)" stroke="#64748B" strokeWidth="2" />
      
      {/* Box Top Flap Lid (Isometric perspective) */}
      <path d="M15 45 L35 20 H125 L110 45 Z" fill="url(#boxTop)" stroke="#64748B" strokeWidth="2" />

      {/* Packaging Tape Band */}
      <rect x="52" y="45" width="22" height="75" fill="#10B981" />
      <path d="M52 45 L64 20 H77 L65 45 Z" fill="#34D399" />

      {/* White Medical Cross Stamp on Package */}
      <circle cx="63" cy="82" r="14" fill="white" />
      <path d="M57 82h12M63 76v12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />

      {/* Floating 3D Delivery Shield Badge */}
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
    titleKey: 'slide1Title',
    descKey:  'slide1Desc',
    illustration: <PillsMagnifier3DIllustration />,
  },
  {
    titleKey: 'slide2Title',
    descKey:  'slide2Desc',
    illustration: <ScannerPrescription3DIllustration />,
  },
  {
    titleKey: 'slide3Title',
    descKey:  'slide3Desc',
    illustration: <FastDeliveryBox3DIllustration />,
  },
]

export const Onboarding: React.FC = () => {
  const navigate   = useNavigate()
  const { t }      = useLangStore()
  const { markOnboardingDone } = useAuthStore()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

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
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden relative justify-between py-6 px-6 transition-colors duration-200">
      {/* Header Skip Button (No logo on onboarding flow) */}
      <div className="relative z-10 flex items-center justify-end h-10">
        {current < SLIDES.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSkip}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-extrabold px-3 py-2 btn-touch"
          >
            {t.skip}
          </motion.button>
        )}
      </div>

      {/* LARGE 3D Illustration & Text Hierarchy */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* LARGE 3D Illustration at TOP */}
            <div className="mb-6 flex items-center justify-center">
              {slide.illustration}
            </div>

            {/* Headline text (Bold) & Subtitle (Font-medium, muted) */}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 px-6 text-balance leading-snug">
              {t[slide.titleKey]}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs px-4">
              {t[slide.descKey]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Area */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === current ? 22 : 8,
                backgroundColor: i === current ? '#10B981' : 'rgba(148,163,184,0.3)',
              }}
              className="h-1.5 rounded-full"
              transition={{ type: 'spring', damping: 20 }}
            />
          ))}
        </div>

        {/* Action Button (Elegantly translated "Boshladik!" / "Начнем!" / "Let's start!") */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="
            w-full h-14 rounded-2xl font-extrabold text-sm text-white
            bg-emerald-600 hover:bg-emerald-700 transition-colors duration-150
            flex items-center justify-center gap-2 shadow-xs
          "
        >
          {current === SLIDES.length - 1 ? t.letsStart : t.next}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
