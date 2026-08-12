// src/pages/OtpVerify.tsx
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button }       from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'
import { useLangStore } from '../stores/langStore'

export const OtpVerify: React.FC = () => {
  const navigate = useNavigate()
  const { t }    = useLangStore()
  const { verifyOtp, pendingPhone } = useAuthStore()

  const [otp,    setOtp]    = useState(['', '', '', ''])
  const [error,  setError]  = useState('')
  const [loading, setLoading] = useState(false)
  const [resendCount, setResendCount] = useState(30)
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  // Countdown timer
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

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 4) {
      setError(t.otpError)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const ok = verifyOtp(code)
    setLoading(false)
    if (ok) {
      navigate('/home', { replace: true })
    } else {
      setError(t.otpError) // Noto'g'ri kod yoki kodning amal qilish muddati tugagan
      setOtp(['', '', '', ''])
      refs[0].current?.focus()
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-[#121212] overflow-hidden transition-colors duration-200 justify-between py-6 px-6">
      {/* Back button */}
      <div className="relative z-10 flex items-center justify-start h-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white btn-touch text-xs font-bold"
        >
          <ArrowLeft size={18} />
          <span>Orqaga</span>
        </motion.button>
      </div>

      {/* Content Container (Perfectly Centered) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-sm mx-auto w-full my-auto text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mb-5 shadow-xs mx-auto"
        >
          <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">{t.otpTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">{t.otpSubtitle}</p>
        <p className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm mb-6">{pendingPhone || '+998 90 123 45 67'}</p>

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
              style={{ fontSize: '18px' }} // Ensures WebKit/iOS does not zoom in on input focus
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
          className="mb-4"
        >
          {t.otpVerify}
        </Button>

        {/* Resend Timer */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400">{t.otpResend}?</span>
          {resendCount > 0 ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
              {String(Math.floor(resendCount / 60)).padStart(2, '0')}:{String(resendCount % 60).padStart(2, '0')}
            </span>
          ) : (
            <button
              onClick={() => setResendCount(30)}
              className="text-emerald-600 dark:text-emerald-400 font-bold btn-touch"
            >
              {t.otpResend}
            </button>
          )}
        </div>
      </motion.div>

      {/* Footer Spacer for balance */}
      <div className="h-6" />
    </div>
  )
}
