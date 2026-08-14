import React from 'react'
import { PharmaAiIcon } from './PharmaAiIcon'

interface PharmaAiLogoProps {
  className?: string
}

export const PharmaAiLogo: React.FC<PharmaAiLogoProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <PharmaAiIcon className="w-9 h-9 object-contain shrink-0" />
      <span className="text-2xl font-black tracking-tight">
        <span className="text-neutral-900 dark:text-white">Phar</span>
        <span className="text-emerald-500 dark:text-emerald-400">mind</span>
      </span>
    </div>
  )
}

export default PharmaAiLogo
