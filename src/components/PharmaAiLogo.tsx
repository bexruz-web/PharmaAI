import React from 'react'
import { PharmaAiIcon } from './PharmaAiIcon'

interface PharmaAiLogoProps {
  className?: string
}

export const PharmaAiLogo: React.FC<PharmaAiLogoProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <PharmaAiIcon className="w-9 h-9 object-contain shrink-0" />
      <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-900 via-[52%] to-emerald-500 to-[62%] dark:from-white dark:via-white dark:via-[52%] dark:to-emerald-400 dark:to-[62%]">
        Pharmind
      </span>
    </div>
  )
}

export default PharmaAiLogo
