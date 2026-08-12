// src/components/ui/Card.tsx
import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const paddingMap = {
  none: '',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-5',
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  padding = 'md',
}) => {
  const baseClass = `
    rounded-2xl overflow-hidden relative
    bg-white dark:bg-[#1E1E20]
    border border-slate-200/80 dark:border-zinc-800/80
    shadow-xs hover:shadow-sm transition-all duration-200
    ${paddingMap[padding]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  if (onClick) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={baseClass}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={baseClass}>{children}</div>
}
