// src/pages/LanguageSelect.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLangStore } from '../stores/langStore'
import { type Lang } from '../i18n/translations'
import { Button } from '../components/ui/Button'
import { PharmaAiIcon } from '../components/PharmaAiIcon'

const LANGUAGES: { code: Lang; localeCode: string; label: string; flag: string }[] = [
  { code: 'UZ', localeCode: 'uz', label: "O'zbek",  flag: '🇺🇿' },
  { code: 'OZ', localeCode: 'oz', label: 'Ўзбек',   flag: '🇺🇿' },
  { code: 'RU', localeCode: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'EN', localeCode: 'en', label: 'English', flag: '🇬🇧' },
]

export const LanguageSelect: React.FC = () => {
  const navigate = useNavigate()
  const { t: tI18n, i18n } = useTranslation()
  const { lang, setLang, markLangSelected } = useLangStore()
  
  const [selectedLang, setSelectedLang] = useState<Lang>(lang || 'UZ')

  const handleSelect = (code: Lang, localeCode: string) => {
    setSelectedLang(code)
    setLang(code)
    i18n.changeLanguage(localeCode)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pharma-locale', localeCode)
    }
  }

  const handleProceed = () => {
    const selectedItem = LANGUAGES.find(l => l.code === selectedLang)
    const localeCode = selectedItem ? selectedItem.localeCode : 'uz'
    setLang(selectedLang)
    i18n.changeLanguage(localeCode)
    markLangSelected()
    navigate('/onboarding')
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] relative overflow-hidden px-6 justify-between pt-5 pb-6 transition-colors duration-200">
      {/* Top Header & Logo Area shifted higher up */}
      <div className="flex-1 flex flex-col items-center justify-start pt-3 w-full max-w-sm mx-auto overflow-visible">
        {/* Matte Soft-Grey Squircle Container & Capsule Icon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.08 }}
          className="mb-3 flex flex-col items-center justify-center overflow-visible"
        >
          {/* Matte Light-Grey Squircle Box */}
          <div className="w-20 h-20 rounded-3xl bg-slate-100/90 dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center p-3 shadow-xs mx-auto mb-3 overflow-visible">
            <PharmaAiIcon className="w-14 h-14 object-contain overflow-visible" />
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">
            {tI18n('languageSelect.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1 font-medium">
            {tI18n('languageSelect.subtitle')}
          </p>
        </motion.div>

        {/* 4 Working Language cards with high-contrast visible borders */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="w-full flex flex-col gap-3.5 mt-2"
        >
          {LANGUAGES.map((langItem, i) => {
            const isSelected = selectedLang === langItem.code
            return (
              <motion.button
                key={langItem.code}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(langItem.code, langItem.localeCode)}
                className={`
                  w-full flex items-center gap-4 py-4 px-5 rounded-2xl
                  transition-all duration-150 text-left shadow-xs btn-touch
                  ${isSelected 
                    ? 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-extrabold' 
                    : 'border border-slate-200/90 dark:border-zinc-800 bg-slate-100/90 dark:bg-[#1E1E20] hover:border-slate-300 dark:hover:border-zinc-700 text-slate-900 dark:text-white'}
                `}
              >
                <span className="text-2xl shrink-0 leading-none">{langItem.flag}</span>
                <span className="text-sm font-extrabold flex-1">
                  {langItem.label}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Action Button at footer */}
      <div className="w-full max-w-sm mx-auto pt-4 mb-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleProceed}
        >
          {tI18n('languageSelect.continueBtn')}
        </Button>
      </div>
    </div>
  )
}
