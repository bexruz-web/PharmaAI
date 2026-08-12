// src/pages/Login.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, HelpCircle, ChevronDown, X, Shield, FileText } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input }  from '../components/ui/Input'
import { PharmaAiIcon } from '../components/PharmaAiIcon'
import { useLangStore } from '../stores/langStore'
import { useAuthStore } from '../stores/authStore'
import type { Lang } from '../i18n/translations'

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'UZ', label: "O'zbek", flag: '🇺🇿' },
  { code: 'OZ', label: 'Ўзбек',  flag: '🇺🇿' },
  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
]

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { t, lang, setLang } = useLangStore()
  const { setPendingPhone } = useAuthStore()

  const [phone,   setPhone]   = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPriv,  setShowPriv]  = useState(false)

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 9)
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 9) {
      setError(t.phoneError)
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPendingPhone(`+998 ${phone}`)
      navigate('/otp')
    }, 600)
  }

  const activeFlag = LANGUAGES.find((l) => l.code === lang)?.flag ?? '🇺🇿'

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 dark:bg-[#121212] relative overflow-hidden px-6 justify-between py-8 transition-colors duration-200">
      {/* TOP HEADER LAYOUT */}
      <div className="relative z-10 flex items-center justify-between">
        {/* LEFT side: Language dropdown selector + Help Pill Button */}
        <div className="flex items-center gap-2">
          {/* Language dropdown selector showing current language flag + code */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLangDropdown((v) => !v)}
              className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs btn-touch"
            >
              <span>{activeFlag}</span>
              <span>{lang}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowLangDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-28 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 p-1.5 z-40 shadow-lg"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code)
                          setShowLangDropdown(false)
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          lang === l.code ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Help Block: Grouped inside single rounded pill button */}
          <button
            onClick={() => window.open('https://t.me/web_bekxruzme', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 shadow-xs btn-touch"
          >
            <HelpCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>{t.help}</span>
          </button>
        </div>

        {/* RIGHT side: Top-Right Header Boxed Logo Component (Matching Onboarding Screens) */}
        <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-xs">
          <PharmaAiIcon className="w-6 h-6 object-contain" />
        </div>
      </div>

      {/* MID FORM CONTAINER */}
      <div className="flex-1 flex flex-col justify-center relative z-10 w-full max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{t.loginTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">{t.loginSubtitle}</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block pl-1">
              {t.phoneLabel}
            </label>
            <div className="flex gap-2.5">
              <div className="flex items-center justify-center h-14 px-3.5 rounded-2xl bg-slate-100 dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 shrink-0">
                <span className="text-slate-900 dark:text-white font-bold text-sm">🇺🇿 +998</span>
              </div>
              <div className="flex-1">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value))
                    setError('')
                  }}
                  placeholder={t.phonePlaceholder}
                  error={error}
                  leftIcon={<Phone size={18} />}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={loading}
            icon={<ArrowRight size={20} />}
          >
            {t.loginBtn}
          </Button>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center">
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
            🔐 Demo kirish • OTP tasdiqlash kodi: <span className="font-extrabold">1234</span>
          </p>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 text-center border-t border-slate-200 dark:border-zinc-800 pt-4">
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <button onClick={() => setShowTerms(true)} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {t.termsOfUse}
          </button>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700" />
          <button onClick={() => setShowPriv(true)} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {t.privacyPolicy}
          </button>
        </div>
      </div>

      {/* MODAL BOTTOM SHEETS */}
      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="absolute inset-0 z-40 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 z-50 bg-white dark:bg-[#1E1E20] border-t border-slate-200 dark:border-zinc-800 rounded-t-3xl p-6 max-h-[80%] overflow-y-auto safe-bottom shadow-xl"
            >
              <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t.termsTitle}
                </h3>
                <button onClick={() => setShowTerms(false)} className="btn-touch w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <X size={16} className="text-slate-500" />
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.termsContent}
              </p>
              <Button variant="primary" fullWidth onClick={() => setShowTerms(false)}>
                Qabul qilaman
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPriv && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPriv(false)}
              className="absolute inset-0 z-40 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 z-50 bg-white dark:bg-[#1E1E20] border-t border-slate-200 dark:border-zinc-800 rounded-t-3xl p-6 max-h-[80%] overflow-y-auto safe-bottom shadow-xl"
            >
              <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t.privacyTitle}
                </h3>
                <button onClick={() => setShowPriv(false)} className="btn-touch w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <X size={16} className="text-slate-500" />
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.privacyContent}
              </p>
              <Button variant="primary" fullWidth onClick={() => setShowPriv(false)}>
                Tushundim
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
