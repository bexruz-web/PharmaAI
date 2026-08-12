// src/pages/OtpVerify.tsx
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Edit2 } from 'lucide-react'
import { Button }       from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'
import { useLangStore } from '../stores/langStore'
import { PharmaAiIcon } from '../components/PharmaAiIcon'

export const OtpVerify: React.FC = () => {
  const navigate = useNavigate()
  const { t }    = useLangStore()
  const { verifyOtp, pendingPhone } = useAuthStore()

  const [otp,     setOtp]     = useState(['', '', '', ''])
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [resendCount, setResendCount] = useState(60)
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  // Focus on 1st input field on mount
  useEffect(() => {
    refs[0].current?.focus()
  }, [])

  // 60-second Countdown timer widget
  useEffect(() => {
    if (resendCount <= 0) return
    const timer = setInterval(() => setResendCount((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [resendCount])

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next  = [...otp]
    next[index] = digit
    setOtp(next)
    setError('')
    if (digit && index < 3) refs[index + 1].current?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current?.focus()
    }
  }

  const handleResend = () => {
    setResendCount(60)
    setError('')
    setOtp(['', '', '', ''])
    refs[0].current?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 4) {
      setError(t.otpError)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    const ok = verifyOtp(code)
    setLoading(false)
    if (ok) {
      navigate('/home', { replace: true })
    } else {
      setError(t.otpError)
      setOtp(['', '', '', ''])
      refs[0].current?.focus()
    }
  }

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden transition-colors duration-200 justify-between py-6 px-6 relative">
      {/* Top Header Row: Back button on left & Top-Left Boxed Logo style matching Login */}
      <div className="relative z-10 flex items-center justify-between h-14">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white btn-touch text-xs font-bold"
        >
          <ArrowLeft size={18} />
          <span>{t.back || "Orqaga"}</span>
        </motion.button>

        {/* Top-Right Header Boxed Logo */}
        <div className="w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center p-2.5 shadow-xs">
          <PharmaAiIcon className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
        </div>
      </div>

      {/* Content Container (Centered) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-sm mx-auto w-full my-auto text-center"
      >
        {/* Shield Check Badge Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mb-5 shadow-xs mx-auto"
        >
          <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">{t.otpTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-2 leading-relaxed">{t.otpSubtitle}</p>

        {/* Verified Phone Number with interactive Change Number action */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 mb-6">
          <span className="text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
            {pendingPhone || '+998 90 123 45 67'}
          </span>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold ml-1 btn-touch"
            title="Telefon raqamini o'zgartirish"
          >
            <Edit2 size={12} />
            <span>O'zgartirish</span>
          </button>
        </div>

        {/* 4-digit OTP Inputs (Centered & reachable, font size 18px to prevent mobile zoom) */}
        <div className="flex items-center justify-center gap-3 mb-5 w-full">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{ fontSize: '18px' }}
              className="
                w-14 h-14 sm:w-16 sm:h-16 text-center font-extrabold rounded-2xl
                border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#1E1E20]
                text-slate-900 dark:text-white shadow-xs
                focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none
                transition-colors duration-150 caret-emerald-600
              "
            />
          ))}
        </div>

        {/* Error Toast/Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold text-center w-full"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify Button */}
        <Button
          fullWidth
          size="lg"
          isLoading={loading}
          onClick={handleVerify}
          className="mb-5"
        >
          {t.otpVerify}
        </Button>

        {/* 60-Second Resend Countdown Timer Widget */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400">{t.otpResend}?</span>
          {resendCount > 0 ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono tracking-wide">
              {formatTimer(resendCount)}
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline btn-touch"
            >
              {t.otpResend}
            </button>
          )}
        </div>
      </motion.div>

      {/* Footer Spacer for balance */}
      <div className="h-4" />
    </div>
  )
}
