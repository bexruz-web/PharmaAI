// src/pages/ScanPage.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScanLine, Upload, Mic, Camera, X } from 'lucide-react'
import { useLangStore } from '../stores/langStore'

export const ScanPage: React.FC = () => {
  const { t }      = useLangStore()
  const [scanning, setScanning] = useState(false)
  const [done,     setDone]     = useState(false)

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setDone(true)
    }, 2000)
  }

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-full flex flex-col pb-24 transition-colors duration-200">
      <div className="flex-1 flex flex-col items-center px-4 pt-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">{t.scanTitle}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.scanSubtitle}</p>
        </motion.div>

        {/* Scanner viewfinder */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className="relative w-full max-w-xs aspect-square mb-6"
          onClick={handleScan}
        >
          {/* Frame */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-[#1E1E20] border-2 border-emerald-500/40 cursor-pointer shadow-sm">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Scanning line */}
            <AnimatePresence>
              {scanning && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-xs"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </AnimatePresence>

            {/* Corner brackets */}
            {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 right-3 rotate-180', 'bottom-3 left-3 -rotate-90'].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8`}>
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M4 28V4h24" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}

            {/* Center icon */}
            {!scanning && !done && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center shadow-xs"
                >
                  <ScanLine size={32} className="text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bosish uchun skanerlash</p>
              </div>
            )}

            {/* Done result */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/95 dark:bg-[#1E1E20]/95 p-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center">
                    <ScanLine size={26} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white text-center">Retsept aniqlandi!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">3 ta dori topildi</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDone(false) }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center"
                  >
                    <X size={14} className="text-slate-500 dark:text-slate-400" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 w-full max-w-xs"
        >
          <button className="flex-1 h-14 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700">
            <Camera size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Kamera</span>
          </button>
          <button className="flex-1 h-14 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700">
            <Upload size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Yuklash</span>
          </button>
          <button className="flex-1 h-14 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700">
            <Mic size={18} className="text-purple-600 dark:text-purple-400" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Ovozli</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
