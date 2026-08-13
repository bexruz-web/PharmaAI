// src/pages/ScanPage.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { ScanLine, Upload, Mic, Camera, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLangStore } from '../stores/langStore'
import { useScannerStore } from '../stores/scannerStore'
import { GeminiScannerModal } from '../components/scanner/GeminiScannerModal'
import { ScanAnalysisResult } from '../services/geminiScannerService'

export const ScanPage: React.FC = () => {
  const { t } = useLangStore()
  const navigate = useNavigate()
  const { openScanner, isScannerOpen, closeScanner, setScanResult } = useScannerStore()

  const handleScanComplete = (result: ScanAnalysisResult, previewUrl?: string) => {
    setScanResult(result, previewUrl)
    // Navigate to home page where Search Modal will automatically open with scan results
    navigate('/home?search=1')
  }

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-full flex flex-col pb-24 transition-colors duration-200">
      <div className="flex-1 flex flex-col items-center px-4 pt-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Sparkles size={14} />
            <span>Gemini Vision AI Engine</span>
          </div>
          <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white">{t.scanTitle}</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t.scanSubtitle}</p>
        </motion.div>

        {/* Scanner viewfinder */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className="relative w-full max-w-xs aspect-square mb-6 cursor-pointer"
          onClick={openScanner}
        >
          {/* Frame */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border-2 border-emerald-500/40 shadow-sm flex flex-col items-center justify-center">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Corner brackets */}
            {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 right-3 rotate-180', 'bottom-3 left-3 -rotate-90'].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8`}>
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M4 28V4h24" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}

            {/* Center icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center shadow-xs"
              >
                <ScanLine size={32} className="text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Skanerlash uchun bosing
              </p>
              <span className="text-[10px] text-neutral-400">
                Kamera yoki fayl orqali dori qutisini AI tahlil qiladi
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 w-full max-w-xs"
        >
          <button
            onClick={openScanner}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors"
          >
            <Camera size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Kamera</span>
          </button>
          <button
            onClick={openScanner}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors"
          >
            <Upload size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Yuklash</span>
          </button>
          <button
            onClick={openScanner}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors"
          >
            <Mic size={18} className="text-purple-600 dark:text-purple-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Ovozli</span>
          </button>
        </motion.div>
      </div>

      {/* Gemini Scanner Modal */}
      <GeminiScannerModal
        isOpen={isScannerOpen}
        onClose={closeScanner}
        onScanComplete={handleScanComplete}
      />
    </div>
  )
}
