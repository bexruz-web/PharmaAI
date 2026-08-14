// src/components/ui/Logo.tsx
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical'
  showSubtitle?: boolean
  subtitleText?: string
  className?: string
}

export const LogoIcon: React.FC<{ sizePx?: number }> = ({ sizePx = 36 }) => {
  const iconId = React.useId()

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm transition-transform duration-200"
    >
      <defs>
        {/* Capsule Left Gradient (Emerald/Mint Green) */}
        <linearGradient id={`capsuleGrad-${iconId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Neural Mesh Right Gradient (Electric Blue -> Purple) */}
        <linearGradient id={`meshGrad-${iconId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Capsule Inner Reflection Glow */}
        <linearGradient id={`glossGrad-${iconId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>

        {/* Subtle Drop Shadow */}
        <filter id={`shadow-${iconId}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#065F46" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main Container Group */}
      <g filter={`url(#shadow-${iconId})`}>
        {/* LEFT HALF: Green Medical Capsule Body */}
        <path
          d="M 14,14 A 18,18 0 0 1 32,14 L 32,50 A 18,18 0 0 1 14,50 A 18,18 0 0 1 14,14 Z"
          fill={`url(#capsuleGrad-${iconId})`}
          transform="rotate(-28 32 32)"
        />

        {/* Capsule Gloss Highlights */}
        <path
          d="M 18,18 A 12,12 0 0 1 30,18 L 30,34 A 6,6 0 0 1 18,34 Z"
          fill={`url(#glossGrad-${iconId})`}
          opacity="0.45"
          transform="rotate(-28 32 32)"
        />

        {/* RIGHT HALF: Morphing Neural Network Mesh (Blue/Purple Connections & Nodes) */}
        {/* Synapse Connection Lines */}
        <path
          d="M 28 22 L 44 16 M 28 32 L 48 30 M 28 42 L 42 46 M 44 16 L 48 30 M 48 30 L 42 46 M 44 16 L 54 24 M 48 30 L 56 36 M 42 46 L 52 48"
          stroke={`url(#meshGrad-${iconId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural Network Nodes (Circles with Glow) */}
        <circle cx="44" cy="16" r="3.5" fill="#60A5FA" stroke="#1E40AF" strokeWidth="1" />
        <circle cx="48" cy="30" r="4.5" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="1" />
        <circle cx="42" cy="46" r="3.5" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1" />
        <circle cx="54" cy="24" r="3" fill="#A78BFA" />
        <circle cx="56" cy="36" r="3" fill="#38BDF8" />
        <circle cx="52" cy="48" r="2.5" fill="#818CF8" />

        {/* Core AI Pulse Center Node inside capsule transition */}
        <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  showSubtitle = false,
  subtitleText = 'Smart Pharmacy Platform',
  className = '',
}) => {
  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 48,
  }

  const textSizes = {
    sm: 'text-base font-extrabold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl font-extrabold',
  }

  const iconPx = iconSizes[size]
  const isVert = layout === 'vertical'

  return (
    <div
      className={`flex ${isVert ? 'flex-col items-center text-center' : 'items-center gap-2.5'} ${className}`}
    >
      <LogoIcon sizePx={iconPx} />

      <div className={`flex flex-col ${isVert ? 'items-center mt-2' : 'justify-center'}`}>
        <span className={`${textSizes[size]} tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-900 via-[52%] to-emerald-500 to-[62%] dark:from-white dark:via-white dark:via-[52%] dark:to-emerald-400 dark:to-[62%] transition-colors`}>
          Pharmind
        </span>

        {showSubtitle && (
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  )
}
