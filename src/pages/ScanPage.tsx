// src/pages/ScanPage.tsx
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScanLine, Upload, Mic, Camera, Sparkles, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLangStore } from '../stores/langStore'
import { useScannerStore } from '../stores/scannerStore'
import { analyzeMedicineImage } from '../services/geminiScannerService'

export const ScanPage: React.FC = () => {
  const { t } = useLangStore()
  const navigate = useNavigate()
  const { setScanResult } = useScannerStore()

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    setIsAnalyzing(true)
    setErrorMsg(null)

    const previewUrl = URL.createObjectURL(file)

    try {
      const result = await analyzeMedicineImage(file)
      setIsAnalyzing(false)
      setScanResult(result, previewUrl)
      // Navigate to home page where Search Modal automatically opens with results
      navigate('/home?search=1')
    } catch (err) {
      console.error(err)
      setIsAnalyzing(false)
      setErrorMsg("Rasm tahlilida xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
      e.target.value = ''
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-full flex flex-col pb-24 transition-colors duration-200">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex-1 flex flex-col items-center px-4 pt-4">
        {/* Title & Badge */}
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

        {/* Scanner viewfinder box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className="relative w-full max-w-xs aspect-square mb-6 cursor-pointer select-none"
          onClick={() => !isAnalyzing && cameraInputRef.current?.click()}
        >
          {/* Frame */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border-2 border-emerald-500/40 shadow-sm flex flex-col items-center justify-center p-4">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Corner brackets */}
            {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 right-3 rotate-180', 'bottom-3 left-3 -rotate-90'].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8 pointer-events-none`}>
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M4 28V4h24" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}

            {/* Center icon / Laser beam animation during analysis */}
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center gap-3 relative z-10 w-full">
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_#10b981]"
                  initial={{ top: '10%' }}
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <ScanLine size={48} className="text-emerald-500 animate-pulse" />
                <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase animate-pulse">
                  🤖 Gemini AI Analiz Qilmoqda...
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center z-10">
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
            )}
          </div>
        </motion.div>

        {errorMsg && (
          <div className="mb-4 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs font-bold flex items-center gap-2 max-w-xs w-full">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 w-full max-w-xs"
        >
          <button
            disabled={isAnalyzing}
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors btn-touch disabled:opacity-50"
          >
            <Camera size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Kamera</span>
          </button>
          <button
            disabled={isAnalyzing}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors btn-touch disabled:opacity-50"
          >
            <Upload size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Yuklash</span>
          </button>
          <button
            disabled={isAnalyzing}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:border-emerald-500 transition-colors btn-touch disabled:opacity-50"
          >
            <Mic size={18} className="text-purple-600 dark:text-purple-400" />
            <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300">Ovozli</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ScanPage
