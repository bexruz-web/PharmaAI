import React from 'react'
import logoLight from '../assets/logo-full-light.png'
import logoDark from '../assets/logo-full-dark.png'

interface PharmaAiLogoProps {
  className?: string
}

export const PharmaAiLogo: React.FC<PharmaAiLogoProps> = ({ className = 'w-48 h-auto' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Light mode version */}
      <img
        src={logoLight}
        alt="PharmaAI Logo"
        className="w-full h-auto dark:hidden block object-contain select-none"
      />
      {/* Dark mode version */}
      <img
        src={logoDark}
        alt="PharmaAI Logo"
        className="w-full h-auto dark:block hidden object-contain select-none"
      />
    </div>
  )
}

export default PharmaAiLogo
