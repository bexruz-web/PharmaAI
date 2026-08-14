// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScanLine, Search, ChevronRight, ArrowLeft, History, Store,
  Pill, RefreshCw, X, ShoppingCart, SlidersHorizontal, Check, Sparkles
} from 'lucide-react'
import { useLangStore } from '../stores/langStore'
import { useScannerStore } from '../stores/scannerStore'
import { type Translations } from '../i18n/translations'
import { MedicationCard } from '../components/medication/MedicationCard'
import {
  fetchMedications,
  fetchCategories,
  fetchPharmacies,
  getLocalizedTitle,
  getLocalizedDescription,
  getCategoryName,
  getPharmacyName,
  getMedicationImage,
  getPharmacyLogo,
  Medication,
  CategoryData,
  PharmacyData
} from '../services/medicationService'

// Banners are built dynamically from i18n translations
const getBanners = (t: Translations) => [
  {
    id: 1,
    tag: t.bannerAiTag,
    tagColor: 'text-emerald-400',
    title: t.bannerAiTitle,
    subtitle: t.bannerAiSubtitle,
    linkText: t.bannerAiCta,
    linkColor: 'text-emerald-400 hover:text-emerald-300',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=900',
    action: 'scan'
  },
  {
    id: 2,
    tag: t.bannerGrandTag,
    tagColor: 'text-amber-400',
    title: t.bannerGrandTitle,
    subtitle: t.bannerGrandSubtitle,
    linkText: t.bannerGrandCta,
    linkColor: 'text-amber-400 hover:text-amber-300',
    img: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=900',
    action: 'categories'
  },
  {
    id: 3,
    tag: t.bannerRegionalTag,
    tagColor: 'text-cyan-400',
    title: t.bannerRegionalTitle,
    subtitle: t.bannerRegionalSubtitle,
    linkText: t.bannerRegionalCta,
    linkColor: 'text-cyan-400 hover:text-cyan-300',
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=900',
    action: 'map'
  }
]

const RECENT_SEARCHES = ['Paratsetamol', 'No-Shpa', 'Vitamin C', 'Amoxicillin', 'Theraflu']

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 22 } },
}

// Pharmacy Logo Component for top filters & search
const PharmacyLogoBadge: React.FC<{ pharmacy: PharmacyData | PharmacyData[] | null | undefined; name: string; colorIdx?: number }> = ({ pharmacy, name, colorIdx = 0 }) => {
  const logoUrl = getPharmacyLogo(pharmacy)
  const [imgError, setImgError] = useState(false)

  const colors = ['bg-emerald-600', 'bg-blue-600', 'bg-amber-600', 'bg-purple-600', 'bg-teal-600']
  const colorClass = colors[colorIdx % colors.length]
  const initialLetter = (name || 'D').charAt(0).toUpperCase()

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={name}
        onError={() => setImgError(true)}
        className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-zinc-700 bg-white shrink-0"
      />
    )
  }

  return (
    <div className={`w-5 h-5 rounded-full ${colorClass} text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-xs`}>
      {initialLetter}
    </div>
  )
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { t, lang } = useLangStore()
  const {
    scanResult,
    clearScanResult
  } = useScannerStore()

  const BANNERS = getBanners(t)

  // State management
  const [medications, setMedications] = useState<Medication[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [pharmacies, setPharmacies] = useState<PharmacyData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null)
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({})
  const [activeBanner, setActiveBanner] = useState(0)

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Handle URL query for auto-opening search if coming from scan page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('search') === '1' || scanResult) {
      setShowSearchModal(true)
    }
  }, [scanResult])

  // When scanResult updates, auto-populate search query if valid medicine or clear if invalid scan
  useEffect(() => {
    if (scanResult) {
      if (scanResult.is_medicine_package && scanResult.quality_status === 'ok' && scanResult.detected_name) {
        const cleanName = scanResult.detected_name.trim()
        const lowerName = cleanName.toLowerCase()
        const hasDirect = medications.some(m => getLocalizedTitle(m, lang).toLowerCase().includes(lowerName))

        if (hasDirect) {
          setSearchQuery(cleanName)
        } else {
          const words = cleanName.split(/\s+/).filter(w => w.length >= 3 && !/^\d+(mg|g|ml|tab|caps)?$/i.test(w))
          const matchedWord = words.find(w => medications.some(m => getLocalizedTitle(m, lang).toLowerCase().includes(w.toLowerCase())))
          setSearchQuery(matchedWord || cleanName)
        }
      } else {
        // Clear search input if scan is not a valid medicine package or blurry
        setSearchQuery('')
      }
    }
  }, [scanResult, medications, lang])

  const loadData = async () => {
    setIsLoading(true)
    setFetchError(null)
    try {
      const [medsData, catsData, pharmsData] = await Promise.all([
        fetchMedications(),
        fetchCategories(),
        fetchPharmacies(),
      ])
      setMedications(medsData)
      setCategories(catsData)
      setPharmacies(pharmsData)
    } catch (err: any) {
      console.error('Failed to load data from Supabase:', err)
      setFetchError(err.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showSearchModal) {
      setTimeout(() => searchInputRef.current?.focus(), 150)
    }
  }, [showSearchModal])

  const updateQuantity = (id: string, qty: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }))
  }

  const queryLower = searchQuery.trim().toLowerCase()

  const searchFilteredMedicines = medications.filter((med) => {
    if (!queryLower) return true
    const title = getLocalizedTitle(med, lang).toLowerCase()
    const desc = (getLocalizedDescription(med, lang) || '').toLowerCase()
    const catName = getCategoryName(med.categories, lang).toLowerCase()
    const pharmName = getPharmacyName(med.pharmacies).toLowerCase()
    const dosage = (med.dosage || '').toLowerCase()
    const mfg = (med.manufacturer_country || '').toLowerCase()

    return (
      title.includes(queryLower) ||
      desc.includes(queryLower) ||
      catName.includes(queryLower) ||
      pharmName.includes(queryLower) ||
      dosage.includes(queryLower) ||
      mfg.includes(queryLower)
    )
  })

  const searchFilteredPharmacies = pharmacies.filter((p) =>
    !queryLower || (p.name || '').toLowerCase().includes(queryLower)
  )

  const homeMedicines = medications.filter((med) => {
    let matchesCategory = true
    if (activeCategory !== 'all') {
      matchesCategory =
        String(med.category_id) === String(activeCategory) ||
        (Array.isArray(med.categories)
          ? med.categories.some((c) => String(c.id) === String(activeCategory))
          : String(med.categories?.id) === String(activeCategory))
    }

    let matchesPharmacy = true
    if (selectedPharmacyId) {
      matchesPharmacy = String(med.pharmacy_id) === String(selectedPharmacyId)
    }

    return matchesCategory && matchesPharmacy
  })

  return (
    <div className="bg-white dark:bg-neutral-950 transition-colors duration-200">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5 px-4 pt-4 pb-24"
      >
        {/* 1. PILL SEARCH BAR WITH FIXED EMBEDDED SCAN BUTTON & STANDALONE FILTER BUTTON */}
        <motion.div variants={itemVariants} className="flex items-center gap-2.5 w-full">
          {/* Main Input Container */}
          <div
            onClick={() => setShowSearchModal(true)}
            className="flex-1 h-11 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center pl-3.5 pr-12 shadow-xs cursor-pointer overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150 relative"
          >
            <Search size={18} className="text-neutral-400 shrink-0 mr-2.5" />
            <span className="flex-1 text-neutral-400 dark:text-neutral-500 font-medium text-xs sm:text-sm truncate">
              {t.searchPlaceholder}
            </span>

            {/* Synchronized Circular Scan Badge */}
            <motion.button
              whileTap={{ opacity: 0.8 }}
              onClick={(e) => {
                e.stopPropagation()
                navigate('/scan')
              }}
              title={t.aiScan}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors outline-none focus:outline-none"
            >
              <ScanLine size={18} />
            </motion.button>
          </div>

          {/* Standalone Circular Filter Button */}
          <motion.button
            whileTap={{ opacity: 0.8 }}
            onClick={() => setShowCategoryModal(true)}
            title={t.categories}
            className={`
              w-11 h-11 rounded-full border flex items-center justify-center relative shrink-0 shadow-xs transition-colors duration-150 outline-none focus:outline-none
              ${activeCategory !== 'all'
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700'}
            `}
          >
            <SlidersHorizontal size={18} />
            {activeCategory !== 'all' && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-[#121212]" />
            )}
          </motion.button>
        </motion.div>

        {/* 2. PROMO BANNERS CAROUSEL (Smooth Gradient Fade Style) */}
        <motion.div variants={itemVariants} className="relative w-full">
          <div className="rounded-3xl overflow-hidden relative shadow-2xl h-44 md:h-48 w-full border border-white/10 bg-neutral-950">
            <AnimatePresence mode="wait">
              {(() => {
                const banner = BANNERS[activeBanner]
                return (
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    {/* Full-width crisp background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${banner.img})` }}
                    />

                    {/* Smooth left-to-right gradient overlay: dark on left, transparent on right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10" />

                    {/* Content: sits above the gradient */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-5 w-3/5">
                      {/* Top: Clean text tag, no pill/border */}
                      <span className={`text-[10px] font-semibold tracking-widest uppercase ${banner.tagColor}`}>
                        {banner.tag}
                      </span>

                      {/* Bottom: Headline, Subtitle, CTA link */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm md:text-[15px] font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                          {banner.title}
                        </h3>
                        <p className="text-[11px] text-slate-300/85 font-medium line-clamp-2 leading-snug">
                          {banner.subtitle}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (banner.action === 'scan') navigate('/scan')
                            else if (banner.action === 'map') navigate('/map')
                            else setShowCategoryModal(true)
                          }}
                          className={`text-xs font-bold flex items-center gap-1 mt-1 w-fit hover:underline cursor-pointer transition-colors ${banner.linkColor}`}
                        >
                          {banner.linkText}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>

            {/* Dot indicators — centered at bottom */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3. PHARMACIES BAR */}
        {pharmacies.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                {t.nearbyPharmacies}
              </h2>
              <button
                onClick={() => navigate('/map')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 btn-touch"
              >
                <span>{t.seeAll}</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
              {pharmacies.map((pharm, idx) => {
                const isSelected = selectedPharmacyId === pharm.id
                const pharmName = pharm.name || `Dorixona ${idx + 1}`

                return (
                  <motion.button
                    key={pharm.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedPharmacyId(isSelected ? null : (pharm.id || null))}
                    className={`
                      flex items-center gap-2 h-10 px-3.5 rounded-full border shrink-0 text-xs font-bold transition-all duration-150 shadow-xs
                      ${isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300'}
                    `}
                  >
                    <PharmacyLogoBadge pharmacy={pharm} name={pharmName} colorIdx={idx} />
                    <span>{pharmName}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* 4. POPULAR MEDICINES GRID */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                {t.popularMedicines}
              </h2>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1"
                >
                  <span>{t.filterClear}</span>
                  <X size={12} />
                </button>
              )}
            </div>
            {!isLoading && (
              <span className="text-xs text-neutral-400 font-semibold">
                {homeMedicines.length} {t.medicineCount}
              </span>
            )}
          </div>

          {/* LOADING SHIMMER STATE */}
          {isLoading && (
            <div className="grid grid-cols-2 gap-3.5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white dark:bg-neutral-900 rounded-2xl p-3 border border-neutral-200 dark:border-neutral-800 animate-pulse flex flex-col justify-between h-56">
                  <div className="w-full aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-3" />
                  <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-full mb-2" />
                  <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* FETCH ERROR STATE */}
          {fetchError && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-900/40 rounded-2xl p-4">
              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">{fetchError}</p>
              <button
                onClick={loadData}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
              >
                <RefreshCw size={14} />
                <span>{t.retryLoad}</span>
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && !fetchError && homeMedicines.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                <Pill size={28} className="text-neutral-400" />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-1">
                {t.nothingFound}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs">
                {t.nothingFoundHint}
              </p>
            </div>
          )}

          {/* REFACTORED MEDICATION CARD GRID */}
          {!isLoading && !fetchError && homeMedicines.length > 0 && (
            <div className="grid grid-cols-2 gap-3.5">
              {homeMedicines.map((med) => (
                <MedicationCard
                  key={med.id}
                  med={med}
                  lang={lang}
                  cartQuantity={cartQuantities[med.id] || 0}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* CATEGORY FILTER BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {showCategoryModal && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-neutral-900/50 dark:bg-black/75 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategoryModal(false)}
            />
            <motion.div
              className="fixed bottom-0 inset-x-0 z-[100] bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-t-3xl safe-bottom p-5 shadow-2xl max-w-[430px] mx-auto h-[50vh] max-h-[50vh] flex flex-col"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="w-10 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto mb-3 shrink-0" />

              <div className="flex items-center justify-between mb-3 shrink-0">
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t.categories}
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-700 dark:hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Icon-Free Text-Only Category List (No Numbers, Vertical Scroll) */}
              <div className="overflow-y-auto flex-1 no-scrollbar flex flex-col">
                {/* All Categories Option */}
                <motion.button
                  whileTap={{ opacity: 0.8 }}
                  onClick={() => {
                    setActiveCategory('all')
                    setShowCategoryModal(false)
                  }}
                  className={`
                    flex items-center justify-between py-3 px-3.5 rounded-xl border-b transition-all duration-150 text-left shrink-0
                    ${activeCategory === 'all'
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : 'border-neutral-100 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-200 font-medium hover:bg-neutral-100/70 dark:hover:bg-neutral-800'}
                  `}
                >
                  <span className="text-sm tracking-wide">
                    {lang === 'UZ' || lang === 'OZ' ? 'Barchasi' : lang === 'RU' ? 'Все категории' : 'All Categories'}
                  </span>
                  {activeCategory === 'all' && (
                    <Check size={16} strokeWidth={2.5} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </motion.button>

                {/* Individual Category List Items (No Numbers) */}
                {categories.map((cat, idx) => {
                  const catId = cat.id || `cat-${idx}`
                  const isSelected = activeCategory === catId
                  const catLabel = getCategoryName(cat, lang) || cat.name || 'Kategoriya'

                  return (
                    <motion.button
                      key={catId}
                      whileTap={{ opacity: 0.8 }}
                      onClick={() => {
                        setActiveCategory(String(catId))
                        setShowCategoryModal(false)
                      }}
                      className={`
                        flex items-center justify-between py-3 px-3.5 rounded-xl border-b transition-all duration-150 text-left shrink-0
                        ${isSelected
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold'
                          : 'border-neutral-100 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-200 font-medium hover:bg-neutral-100/70 dark:hover:bg-neutral-800'}
                      `}
                    >
                      <span className="text-sm tracking-wide">{catLabel}</span>
                      {isSelected && (
                        <Check size={16} strokeWidth={2.5} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 max-w-[430px] mx-auto z-[90] bg-white dark:bg-neutral-950 flex flex-col transition-colors duration-200 overflow-hidden shadow-2xl border-x border-neutral-200 dark:border-neutral-800/50"
          >
            <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 safe-top flex items-center gap-3 shadow-xs">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSearchModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-300 btn-touch shrink-0"
              >
                <ArrowLeft size={20} />
              </motion.button>

              <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-11 px-3 gap-2">
                <Search size={17} className="text-neutral-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  style={{ fontSize: '16px' }}
                  className="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 font-medium focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="w-5 h-5 rounded-full bg-slate-200 dark:bg-zinc-700 text-slate-500 dark:text-slate-300 flex items-center justify-center shrink-0"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setShowSearchModal(false)
                  navigate('/scan')
                }}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs btn-touch"
              >
                <ScanLine size={18} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {/* CASE 1: Not a medicine package (Yandex / Uzum style upper-centered message) */}
              {scanResult && !scanResult.is_medicine_package && (
                <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-10 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5 text-3xl shadow-xs">
                    ⚠️
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                    Bu dori qutisi emas
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
                    Iltimos, dori paketini yoki qutisini yaqinroqdan skanerlang.
                  </p>
                </div>
              )}

              {/* CASE 2: Blurry / poor quality image (Yandex / Uzum style upper-centered message) */}
              {scanResult && scanResult.is_medicine_package && scanResult.quality_status !== 'ok' && (
                <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-10 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-5 text-3xl shadow-xs">
                    📸
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                    Rasm xira tushdi
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
                    Qutini yorug'roq joyda yaqinroqdan rasmga oling.
                  </p>
                </div>
              )}

              {/* CASE 3: Recognized Medicine AI Badge */}
              {scanResult && scanResult.is_medicine_package && scanResult.quality_status === 'ok' && scanResult.detected_name && searchFilteredMedicines.length > 0 && (
                <div className="p-3 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-emerald-500 animate-pulse shrink-0" />
                    <span>AI aniqladi: <span className="underline">{scanResult.detected_name}</span> {scanResult.dosage ? `(${scanResult.dosage})` : ''}</span>
                  </div>
                  <button
                    onClick={clearScanResult}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white shrink-0 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {!searchQuery && !scanResult && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">
                    <History size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>{t.lastSearches}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {RECENT_SEARCHES.map((term, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery(term)}
                        className="px-3.5 py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-emerald-500 transition-colors shadow-xs"
                      >
                        🔍 {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {(!scanResult || (scanResult.is_medicine_package && scanResult.quality_status === 'ok')) && searchFilteredMedicines.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Pill size={15} className="text-emerald-600 dark:text-emerald-400" />
                    {t.medicines} ({searchFilteredMedicines.length})
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    {searchFilteredMedicines.map((med) => {
                      const qty = cartQuantities[med.id] || 0
                      const title = getLocalizedTitle(med, lang)
                      const pharmName = getPharmacyName(med.pharmacies)
                      const catName = getCategoryName(med.categories, lang)

                      return (
                        <div
                          key={med.id}
                          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 flex items-center gap-3.5 shadow-xs"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800 flex items-center justify-center p-1">
                            <img
                              src={getMedicationImage(med)}
                              alt={title}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80'
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            {pharmName && (
                              <div className="flex items-center gap-1">
                                <PharmacyLogoBadge pharmacy={med.pharmacies} name={pharmName} />
                                <span className="text-[10px] font-bold text-neutral-400 uppercase truncate">{pharmName}</span>
                              </div>
                            )}
                            <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">{title}</h4>
                            {catName && <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{catName}</p>}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                                {med.price.toLocaleString()} UZS
                              </span>
                            </div>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(med.id, qty > 0 ? 0 : 1)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs btn-touch ${
                              qty > 0 ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            <ShoppingCart size={16} />
                          </motion.button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {(!scanResult || (scanResult.is_medicine_package && scanResult.quality_status === 'ok')) && searchFilteredPharmacies.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Store size={15} className="text-emerald-600 dark:text-emerald-400" />
                    {t.pharmacies} ({searchFilteredPharmacies.length})
                  </h3>

                  <div className="flex flex-col gap-2">
                    {searchFilteredPharmacies.map((pharm, idx) => (
                      <div
                        key={pharm.id}
                        onClick={() => {
                          setShowSearchModal(false)
                          navigate('/map')
                        }}
                        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <PharmacyLogoBadge pharmacy={pharm} name={pharm.name || ''} colorIdx={idx} />
                          <div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CASE 4: Quality OK BUT NOT in local database stock (Yandex / Uzum style upper-centered message) */}
              {scanResult && scanResult.is_medicine_package && scanResult.quality_status === 'ok' && searchFilteredMedicines.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-10 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mb-5 text-3xl shadow-xs">
                    🔍
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                    Afsuski, '{scanResult.detected_name || searchQuery}' topilmadi
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
                    Hozircha hech qaysi dorixonada ushbu dori mavjud emas.
                  </p>
                </div>
              )}

              {/* Standard Empty Search State */}
              {searchQuery && !scanResult && searchFilteredMedicines.length === 0 && searchFilteredPharmacies.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-10 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mb-5 text-3xl shadow-xs">
                    <Search size={32} className="text-neutral-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white mb-2 tracking-tight">
                    {t.nothingFound}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
                    {t.nothingFoundHint}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
