// src/components/medication/MedicationCard.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Card } from '../ui/Card'
import {
  Medication,
  getLocalizedTitle,
  getLocalizedForm,
  getPharmacyName,
  getPharmacyLogo,
  getMedicationImage,
  PharmacyData
} from '../../services/medicationService'

interface MedicationCardProps {
  med: Medication
  lang: string
  cartQuantity?: number
  onUpdateQuantity?: (id: string, qty: number) => void
}

// Compact Pharmacy Logo Avatar
const PharmacyLogoBadge: React.FC<{ pharmacy: PharmacyData | PharmacyData[] | null | undefined; name: string }> = ({ pharmacy, name }) => {
  const logoUrl = getPharmacyLogo(pharmacy)
  const [imgError, setImgError] = useState(false)
  const initialLetter = (name || 'D').charAt(0).toUpperCase()

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={name}
        onError={() => setImgError(true)}
        className="w-4 h-4 rounded-full object-cover border border-slate-200 dark:border-zinc-700 bg-white shrink-0"
      />
    )
  }

  return (
    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-extrabold shrink-0 shadow-xs">
      {initialLetter}
    </div>
  )
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  med,
  lang,
  cartQuantity = 0,
  onUpdateQuantity,
}) => {
  const [qty, setQty] = useState(cartQuantity)

  // Image loading state & fallback
  const initialSrc = getMedicationImage(med)
  const [imgSrc, setImgSrc] = useState(initialSrc)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const fallbackSrc = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80'

  const title = getLocalizedTitle(med, lang)
  const form = getLocalizedForm(med, lang)
  const pharmacyName = getPharmacyName(med.pharmacies)

  // Line 3: Dosage & Form (Format: "500mg • Tabletka")
  const dosageFormParts: string[] = []
  if (med.dosage && med.dosage.trim()) dosageFormParts.push(med.dosage.trim())
  if (form && form.trim()) dosageFormParts.push(form.trim())
  const dosageFormText = dosageFormParts.join(' • ')

  // Line 4: Country Only (Format: "Germaniya")
  const countryText = med.manufacturer_country && med.manufacturer_country.trim() ? med.manufacturer_country.trim() : null

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = qty + 1
    setQty(next)
    if (onUpdateQuantity) onUpdateQuantity(med.id, next)
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = Math.max(0, qty - 1)
    setQty(next)
    if (onUpdateQuantity) onUpdateQuantity(med.id, next)
  }

  return (
    <Card hoverable className="p-2.5 flex flex-col justify-between h-full bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
      {/* 1. TOP IMAGE CONTAINER & OVERLAYS (Full edge-to-edge cover like Uzum) */}
      <div className="relative w-full aspect-square rounded-xl bg-slate-100 dark:bg-[#252528] overflow-hidden border border-slate-200/60 dark:border-zinc-800/80 mb-2">
        {/* Skeleton loading pulse */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-xl" />
        )}

        <img
          src={imgSrc}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError) {
              setHasError(true)
              setImgSrc(fallbackSrc)
            }
          }}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100 scale-100 hover:scale-105' : 'opacity-0 scale-95'
          }`}
        />

        {/* Extra Small Prescription Badge ("Retseptli" on top-left) */}
        {med.prescription_required && (
          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase shadow-xs bg-red-500/85 text-white backdrop-blur-xs">
            Retseptli
          </span>
        )}

        {/* Morphing Stepper Container (Perfectly centered initial + button) */}
        <motion.div
          layout
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`absolute bottom-2 right-2 z-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-md border border-emerald-500/30 overflow-hidden transition-colors ${
            qty > 0 ? 'h-8 px-2.5 gap-2.5' : 'w-8 h-8 p-0'
          }`}
        >
          <AnimatePresence mode="wait">
            {qty > 0 && (
              <motion.button
                key="minus-btn"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                onClick={handleDecrement}
                className="text-white hover:text-emerald-200 transition-colors shrink-0 flex items-center justify-center"
              >
                <Minus size={13} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {qty > 0 && (
              <motion.span
                key="qty-text"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-extrabold text-white min-w-[16px] text-center select-none"
              >
                {qty}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrement}
            className="text-white hover:text-emerald-200 transition-colors shrink-0 flex items-center justify-center"
          >
            <Plus size={15} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </div>

      {/* 2. CARD BODY LAYOUT (Below Image) */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Line 1: Price (Bold price directly under image) */}
          <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 leading-tight mb-0.5">
            {med.price.toLocaleString()} UZS
          </div>

          {/* Line 2: Title (Medication title) */}
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-snug mb-1">
            {title}
          </h3>

          {/* Line 3: Dosage & Form (e.g. "500mg • Tabletka") */}
          {dosageFormText && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mb-0.5">
              {dosageFormText}
            </p>
          )}

          {/* Line 4: Country Only (e.g. "Germaniya") */}
          {countryText && (
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
              {countryText}
            </p>
          )}
        </div>

        {/* Line 5: Pharmacy (Bottom Row - ONLY Pharmacy logo/avatar and Pharmacy name) */}
        {pharmacyName && (
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100 dark:border-zinc-800/60 mt-auto">
            <PharmacyLogoBadge pharmacy={med.pharmacies} name={pharmacyName} />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase truncate">
              {pharmacyName}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
