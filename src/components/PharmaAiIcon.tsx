import React from 'react'
import capsuleImg from '../assets/logo-capsule.png'

interface PharmaAiIconProps {
  className?: string
}

export const PharmaAiIcon: React.FC<PharmaAiIconProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <img
      src={capsuleImg}
      alt="PharmaAI Capsule Icon"
      className={`${className} object-contain shrink-0 select-none overflow-visible drop-shadow-xs transition-transform duration-200 hover:scale-105`}
    />
  )
}

export default PharmaAiIcon
