// src/pages/LanguageSelect.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLangStore } from '../stores/langStore'
import { type Lang } from '../i18n/translations'
import { Button } from '../components/ui/Button'

const LANGUAGES: { code: Lang; label: string; nativeLabel: string; flag: string; desc: string }[] = [
  { code: 'UZ', label: "O'zbek tili", nativeLabel: "O'zbek", flag: '🇺🇿', desc: "Ilovadan o'zbek tilida foydalaning" },
  { code: 'RU', label: 'Русский язык',  nativeLabel: 'Русский',  flag: '🇷🇺', desc: 'Используйте приложение на русском' },
  { code: 'EN', label: 'English',        nativeLabel: 'English',  flag: '🇬🇧', desc: 'Use the app in English' },
]

export const LanguageSelect: React.FC = () => {
  const navigate = useNavigate()
  const { t, setLang, markLangSelected } = useLangStore()
  const [selectedLang, setSelectedLang] = useState<Lang | null>(null)

  const handleSelect = (code: Lang) => {
    setSelectedLang(code)
    setLang(code) // Instantly updates global store & translates all page elements dynamically
  }

  const handleProceed = () => {
    if (selectedLang) {
      setLang(selectedLang)
      markLangSelected()
      navigate('/onboarding')
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] relative overflow-hidden px-6 justify-between py-10 transition-colors duration-200">
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.1 }}
          className="mb-8 text-center"
        >
          <div className="w-18 h-18 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xs mx-auto mb-3">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <path d="M24 8C24 8 12 16 12 28C12 34.627 17.373 40 24 40C30.627 40 36 34.627 36 28C36 16 24 8 24 8Z" fill="white" fillOpacity="0.9"/>
              <circle cx="24" cy="28" r="4" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Pharma<span className="text-emerald-600 dark:text-emerald-400">AI</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium transition-all">
            {t.appSubtitle}
          </p>
        </motion.div>

        {/* Language cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-5 font-semibold transition-all">
            {selectedLang ? t.chooseLanguage : 'Tilni tanlang / Выберите язык / Choose Language'}
          </p>
          <div className="flex flex-col gap-2.5">
            {LANGUAGES.map((langItem, i) => {
              const isSelected = selectedLang === langItem.code
              return (
                <motion.button
                  key={langItem.code}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(langItem.code)}
                  className={`
                    w-full flex items-center gap-3.5 p-3.5 rounded-2xl
                    border transition-all duration-150 text-left shadow-xs
                    ${isSelected 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' 
                      : 'border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-[#1E1E20] hover:border-slate-300 dark:hover:border-zinc-700'}
                  `}
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#252528] flex items-center justify-center text-xl shrink-0">
                    {langItem.flag}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{langItem.nativeLabel}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{langItem.desc}</span>
                  </div>
                  {isSelected && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Dynamic Action Button at footer */}
      <div className="h-16 w-full max-w-sm mx-auto flex items-center justify-center">
        <AnimatePresence>
          {selectedLang && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full"
            >
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleProceed}
              >
                {t.next}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
