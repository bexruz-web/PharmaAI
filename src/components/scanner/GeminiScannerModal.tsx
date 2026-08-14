// src/components/scanner/GeminiScannerModal.tsx
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, X, ScanLine, AlertCircle, Sparkles } from 'lucide-react'
import { analyzeMedicineImage, ScanAnalysisResult } from '../../services/geminiScannerService'

interface GeminiScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScanComplete: (result: ScanAnalysisResult, imagePreview?: string) => void
}

// Sample images for quick testing
const DEMO_SAMPLES = [
  {
    name: 'Ketanov',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    mockResult: {
      is_medicine_package: true,
      quality_status: 'ok' as const,
      detected_name: 'Ketanov',
      dosage: '10mg',
      rejection_reason: null,
    },
  },
  {
    name: 'Nurofen',
    url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80',
    mockResult: {
      is_medicine_package: true,
      quality_status: 'ok' as const,
      detected_name: 'Nurofen',
      dosage: '200mg',
      rejection_reason: null,
    },
  },
  {
    name: 'Non-Medicine (Water Bottle)',
    url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=80',
    mockResult: {
      is_medicine_package: false,
      quality_status: 'ok' as const,
      detected_name: null,
      dosage: null,
      rejection_reason: 'Rasmda dori qutisi topilmadi.',
    },
  },
  {
    name: 'Blurry Photo',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80',
    mockResult: {
      is_medicine_package: true,
      quality_status: 'blurry' as const,
      detected_name: 'Paracetamol',
      dosage: null,
      rejection_reason: 'Rasm juda xira.',
    },
  },
]

export const GeminiScannerModal: React.FC<GeminiScannerModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const processFile = async (file: File) => {
    setIsAnalyzing(true)
    setErrorMsg(null)

    const previewUrl = URL.createObjectURL(file)

    try {
      const result = await analyzeMedicineImage(file)
      setIsAnalyzing(false)
      onScanComplete(result, previewUrl)
      onClose()
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

  const handleSelectDemo = async (sample: (typeof DEMO_SAMPLES)[0]) => {
    setIsAnalyzing(true)
    setErrorMsg(null)
    try {
      const result = await analyzeMedicineImage(sample.url)
      setIsAnalyzing(false)
      onScanComplete(result, sample.url)
      onClose()
    } catch (err) {
      console.warn('Falling back to sample mock result:', err)
      setIsAnalyzing(false)
      onScanComplete(sample.mockResult, sample.url)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex flex-col justify-between p-4 safe-top safe-bottom max-w-[430px] mx-auto"
      >
        {/* Hidden inputs */}
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

        {/* Top bar */}
        <div className="flex items-center justify-between text-white py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            <span className="font-extrabold text-sm tracking-wide">Pharmind Vision Scanner</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Scanner Viewfinder */}
        <div className="flex-1 flex flex-col items-center justify-center my-4">
          <div className="relative w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-neutral-900/90 flex items-center justify-center p-4">
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(52,211,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Corner brackets */}
            {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 right-3 rotate-180', 'bottom-3 left-3 -rotate-90'].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-7 h-7 pointer-events-none`}>
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M4 28V4h24" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}

            {/* Analyzing animated laser beam */}
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399]"
                  initial={{ top: '10%' }}
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <ScanLine size={48} className="text-emerald-400 animate-pulse" />
                <p className="text-xs font-bold text-emerald-300 tracking-wider uppercase animate-pulse">
                  🤖 Gemini AI Analiz Qilmoqda...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-center z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <ScanLine size={32} className="text-emerald-400" />
                </div>
                <p className="text-xs font-bold text-neutral-200">
                  Dori qutisini fonga to'g'rilab rasmga oling
                </p>
                <span className="text-[10px] text-neutral-400">
                  AI dori nomini va dozajasini soniyada aniqlaydi
                </span>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="mt-3 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Demo Samples Selection */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-neutral-400 mb-2 uppercase tracking-wider text-center">
            Test uchun namuna tanlang:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_SAMPLES.map((sample, i) => (
              <button
                key={i}
                disabled={isAnalyzing}
                onClick={() => handleSelectDemo(sample)}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-colors"
              >
                <img src={sample.url} alt={sample.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-[11px] font-bold text-white truncate">{sample.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={isAnalyzing}
            onClick={() => cameraInputRef.current?.click()}
            className="h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <Camera size={18} />
            <span>Kameradan Olish</span>
          </button>

          <button
            disabled={isAnalyzing}
            onClick={() => fileInputRef.current?.click()}
            className="h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
          >
            <Upload size={18} />
            <span>Galereyadan Yuklash</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
