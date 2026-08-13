// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScanLine, Search, ChevronRight, ArrowLeft, History, Store,
  Heart, ShoppingCart, Check, Star, ShieldCheck, Pill, Stethoscope, Sparkles, Baby, Eye, X
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { useLangStore } from '../stores/langStore'

// Mock Categories - Minimalist rounded square blocks with clean icons
const CATEGORIES = [
  { id: 'all',     labelUz: 'Barchasi',     labelRu: 'Все',          labelEn: 'All',         icon: Pill },
  { id: 'analg',    labelUz: 'Analgetiklar', labelRu: 'Анальгетики',  labelEn: 'Analgesics',  icon: Stethoscope },
  { id: 'antib',    labelUz: 'Antibiotiklar',labelRu: 'Антибиотики',  labelEn: 'Antibiotics', icon: ShieldCheck },
  { id: 'vitam',    labelUz: 'Vitaminlar',   labelRu: 'Витамины',     labelEn: 'Vitamins',    icon: Sparkles },
  { id: 'baby',     labelUz: 'Bolalar uchun',labelRu: 'Для детей',    labelEn: 'For Children',icon: Baby },
  { id: 'eye',      labelUz: 'Ko\'z parvarishi',labelRu: 'Уход за глазами',labelEn: 'Eye Care',  icon: Eye },
]

// Mock Vendors / Stores - Horizontal pill buttons with small avatar logo
const VENDORS = [
  { id: 1, name: 'Oson Apteka', rating: '4.9', time: '15-20 min', color: 'bg-emerald-600' },
  { id: 2, name: 'Grand Pharma', rating: '4.8', time: '20-30 min', color: 'bg-blue-600' },
  { id: 3, name: '999 Apteka', rating: '4.7', time: '10-15 min', color: 'bg-amber-600' },
  { id: 4, name: 'Best Pharm', rating: '4.9', time: '25-35 min', color: 'bg-purple-600' },
  { id: 5, name: 'Dori-Darmon', rating: '4.8', time: '15-25 min', color: 'bg-teal-600' },
]

// Mock Medicines with Unsplash photography & 80% card image box
const MEDICINES = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    subUz: 'Faol moddasi: Paratsetamol',
    subRu: 'Активное вещество: Парацетамол',
    subEn: 'Active Ingredient: Paracetamol',
    category: 'analg',
    price: 12000,
    oldPrice: 15000,
    rating: 4.9,
    reviews: 128,
    rx: false,
    store: 'Oson Apteka',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 2,
    name: 'No-shpa 40mg',
    subUz: 'Faol moddasi: Drotaverin',
    subRu: 'Активное вещество: Дротаверин',
    subEn: 'Active Ingredient: Drotaverine',
    category: 'analg',
    price: 24000,
    oldPrice: 28000,
    rating: 4.8,
    reviews: 84,
    rx: false,
    store: 'Grand Pharma',
    img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 3,
    name: 'Amoxicillin 500mg',
    subUz: 'Faol moddasi: Amoksitsillin',
    subRu: 'Активное вещество: Амоксициллин',
    subEn: 'Active Ingredient: Amoxicillin',
    category: 'antib',
    price: 18000,
    oldPrice: 22000,
    rating: 4.7,
    reviews: 96,
    rx: true,
    store: '999 Apteka',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 4,
    name: 'Vitamin C 1000mg',
    subUz: 'Faol moddasi: Askorbin kislotasi',
    subRu: 'Активное вещество: Аскорбиновая к-та',
    subEn: 'Active Ingredient: Ascorbic Acid',
    category: 'vitam',
    price: 32000,
    oldPrice: 40000,
    rating: 4.9,
    reviews: 154,
    rx: false,
    store: 'Best Pharm',
    img: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 5,
    name: 'Ibuprofen 400mg',
    subUz: 'Faol moddasi: Ibuprofen',
    subRu: 'Активное вещество: Ибупрофен',
    subEn: 'Active Ingredient: Ibuprofen',
    category: 'analg',
    price: 15000,
    oldPrice: 19000,
    rating: 4.8,
    reviews: 112,
    rx: false,
    store: 'Oson Apteka',
    img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 6,
    name: 'Cardiomagnyl 75mg',
    subUz: 'Faol moddasi: Atsetilsalitsil kislotasi',
    subRu: 'Активное вещество: Ацетилсалициловая к-ta',
    subEn: 'Active Ingredient: Acetylsalicylic Acid',
    category: 'analg',
    price: 38000,
    oldPrice: 45000,
    rating: 4.9,
    reviews: 210,
    rx: true,
    store: 'Dori-Darmon',
    img: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400&h=400',
  },
]

// Banners with clean matte presentation
const BANNERS = [
  {
    id: 1,
    title: 'AI Skaner bilan tez toping!',
    subtitle: 'Retseptingizni rasmga oling',
    btnTextUz: 'Batafsil ko\'rish ➔',
    btnTextRu: 'Подробнее ➔',
    btnTextEn: 'See details ➔',
    img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 2,
    title: 'Barcha vitaminlar -15%',
    subtitle: 'Imunitetni mustahkamlang',
    btnTextUz: 'Batafsil ko\'rish ➔',
    btnTextRu: 'Подробнее ➔',
    btnTextEn: 'See details ➔',
    img: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&q=80&w=400&h=300',
  }
]

const RECENT_SEARCHES = ['Paracetamol', 'No-shpa', 'Vitamin C', 'Amoxicillin', 'Ibuprofen']

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 22 } },
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { t, lang } = useLangStore()

  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [addedItems, setAddedItems] = useState<number[]>([])
  const [activeBanner, setActiveBanner] = useState(0)

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Auto scroll promo banners
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-focus search input when search modal opens
  useEffect(() => {
    if (showSearchModal) {
      setTimeout(() => searchInputRef.current?.focus(), 150)
    }
  }, [showSearchModal])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  const addToCart = (id: number) => {
    if (!addedItems.includes(id)) {
      setAddedItems((prev) => [...prev, id])
      setTimeout(() => {
        setAddedItems((prev) => prev.filter((itemId) => itemId !== id))
      }, 1500)
    }
  }

  const getCategoryLabel = (cat: typeof CATEGORIES[0]) => {
    if (lang === 'UZ') return cat.labelUz
    if (lang === 'RU') return cat.labelRu
    return cat.labelEn
  }

  const getActiveIngredient = (med: typeof MEDICINES[0]) => {
    if (lang === 'UZ') return med.subUz
    if (lang === 'RU') return med.subRu
    return med.subEn
  }

  const getReviewsText = (count: number) => {
    if (lang === 'UZ') return `${count} sharh`
    if (lang === 'RU') return `${count} отзывов`
    return `${count} reviews`
  }

  const getBannerBtnText = (banner: typeof BANNERS[0]) => {
    if (lang === 'UZ') return banner.btnTextUz
    if (lang === 'RU') return banner.btnTextRu
    return banner.btnTextEn
  }

  // Search filtering logic for dedicated Search View/Modal
  const queryLower = searchQuery.trim().toLowerCase()

  const searchFilteredMedicines = MEDICINES.filter((med) =>
    queryLower === '' ||
    med.name.toLowerCase().includes(queryLower) ||
    med.subUz.toLowerCase().includes(queryLower) ||
    med.subRu.toLowerCase().includes(queryLower) ||
    med.subEn.toLowerCase().includes(queryLower) ||
    med.store.toLowerCase().includes(queryLower)
  )

  const searchFilteredVendors = VENDORS.filter((v) =>
    queryLower === '' || v.name.toLowerCase().includes(queryLower)
  )

  // Main Home medicines filtering (by selected category and selected vendor chip)
  const homeMedicines = MEDICINES.filter((med) => {
    const matchesCategory = activeCategory === 'all' || med.category === activeCategory
    const selectedVendorObj = VENDORS.find((v) => v.id === selectedVendor)
    const matchesVendor = !selectedVendorObj || med.store === selectedVendorObj.name
    return matchesCategory && matchesVendor
  })

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-full pb-24 transition-colors duration-200">
      {/* MAIN HOMEPAGE CONTAINER with spacious gap-6 spacing */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 px-4 pt-14"
      >
        {/* 1. SEARCH TRIGGER BAR (Clicking opens full-screen Search Modal) */}
        <motion.div variants={itemVariants} className="w-full">
          <div
            onClick={() => setShowSearchModal(true)}
            className="w-full h-13 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 flex items-center px-4 gap-3 shadow-xs cursor-pointer hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-150"
          >
            <Search size={18} className="text-slate-400 shrink-0" />
            <span className="flex-1 text-slate-400 dark:text-slate-500 font-medium text-sm truncate">
              {t.searchPlaceholder}
            </span>
            {/* CLEAN SCAN ICON ONLY! -> navigates directly to /scan */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation()
                navigate('/scan')
              }}
              title={t.aiScan}
              className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs btn-touch"
            >
              <ScanLine size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* 2. PROMO BANNERS CAROUSEL */}
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl">
          <div className="relative w-full h-36 bg-slate-900 dark:bg-[#1E1E20] text-white rounded-2xl border border-slate-800 dark:border-zinc-800 shadow-xs overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBanner}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-4 flex justify-between items-center z-10"
              >
                <div className="flex-1 max-w-[60%] flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase mb-1">
                    SPECIAL OFFER
                  </span>
                  <h3 className="text-sm font-extrabold text-white leading-tight mb-1">
                    {BANNERS[activeBanner].title}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium mb-2 line-clamp-1">
                    {BANNERS[activeBanner].subtitle}
                  </p>
                  <button
                    onClick={() => navigate('/scan')}
                    className="text-[11px] font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 btn-touch"
                  >
                    <span>{getBannerBtnText(BANNERS[activeBanner])}</span>
                  </button>
                </div>
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-xs bg-slate-800 border border-slate-700">
                  <img
                    src={BANNERS[activeBanner].img}
                    alt="Banner Promo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-4 z-20 flex gap-1.5">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeBanner ? 'w-5 bg-emerald-400' : 'w-1.5 bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3. VENDORS / STORES BAR (with gap-3 spacing) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
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
            {VENDORS.map((vendor) => {
              const isSelected = selectedVendor === vendor.id
              return (
                <motion.button
                  key={vendor.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedVendor(isSelected ? null : vendor.id)}
                  className={`
                    flex items-center gap-2 h-10 px-3.5 rounded-full border shrink-0 text-xs font-bold transition-all duration-150 shadow-xs
                    ${isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white dark:bg-[#1E1E20] border-slate-200/80 dark:border-zinc-800 text-slate-800 dark:text-slate-200 hover:border-slate-300'}
                  `}
                >
                  <div className={`w-5 h-5 rounded-full ${vendor.color} text-white flex items-center justify-center text-[10px] font-extrabold`}>
                    {vendor.name.charAt(0)}
                  </div>
                  <span>{vendor.name}</span>
                  <span className="text-[10px] opacity-75">⭐ {vendor.rating}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* 4. CATEGORY CHIPS (with gap-3.5 spacing) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {t.categories}
          </h2>
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isSelected = activeCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    w-20 h-20 rounded-2xl border flex flex-col items-center justify-center gap-1.5 shrink-0 text-xs font-bold transition-all duration-150 shadow-xs
                    ${isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white dark:bg-[#1E1E20] border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'}
                  `}
                >
                  <Icon size={22} className={isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} />
                  <span className="text-[10px] font-extrabold text-center leading-tight line-clamp-1 px-1">
                    {getCategoryLabel(cat)}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* 5. POPULAR MEDICINES GRID */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {t.popularMedicines}
            </h2>
            <span className="text-xs text-slate-400 font-semibold">
              {homeMedicines.length} ta dori
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {homeMedicines.map((med) => {
              const isFav = favorites.includes(med.id)
              const isAdded = addedItems.includes(med.id)

              return (
                <Card key={med.id} hoverable className="p-3 flex flex-col justify-between">
                  {/* Upper 80% Photo Box Container */}
                  <div className="relative w-full aspect-square rounded-xl bg-slate-100 dark:bg-[#252528] flex items-center justify-center p-2 mb-2.5 overflow-hidden">
                    <img
                      src={med.img}
                      alt={med.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 hover:scale-105"
                    />

                    {/* Rx Badge (Rendered ONLY if rx / prescription_required is true) */}
                    {med.rx && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase shadow-xs bg-red-500 text-white">
                        {t.rxRequired}
                      </span>
                    )}

                    {/* Heart Icon Button */}
                    <button
                      onClick={() => toggleFavorite(med.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-[#1E1E20]/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xs btn-touch transition-colors"
                    >
                      <Heart size={14} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="flex flex-col gap-1 mb-3 flex-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase truncate">
                      {med.store}
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-snug">
                      {med.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                      {getActiveIngredient(med)}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{med.rating}</span>
                      <span className="text-[10px] text-slate-400">({getReviewsText(med.reviews)})</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart CTA */}
                  <div className="flex items-end justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/60 mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through block leading-none">
                        {med.oldPrice.toLocaleString()} so'm
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 leading-tight">
                        {med.price.toLocaleString()} so'm
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(med.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-xs btn-touch ${
                        isAdded ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {isAdded ? <Check size={16} /> : <ShoppingCart size={15} />}
                    </motion.button>
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* DEDICATED FULL-SCREEN SEARCH OVERLAY / MODAL */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-50 dark:bg-[#121212] flex flex-col transition-colors duration-200 overflow-hidden"
          >
            {/* TOP BAR: Back Arrow (←), Search Input, Clear Button, Scan Button */}
            <div className="bg-white dark:bg-[#141416] border-b border-slate-200/80 dark:border-zinc-800 px-4 py-3 safe-top flex items-center gap-3 shadow-xs">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSearchModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-300 btn-touch shrink-0"
              >
                <ArrowLeft size={20} />
              </motion.button>

              <div className="flex-1 flex items-center bg-slate-100 dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 rounded-2xl h-11 px-3 gap-2">
                <Search size={17} className="text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  style={{ fontSize: '16px' }}
                  className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium focus:outline-none"
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

              {/* Camera Scan Button */}
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

            {/* SEARCH CONTENT BODY */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {/* RECENT SEARCH CHIPS (When input is empty) */}
              {!searchQuery && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <History size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Oxirgi qidiruvlar</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {RECENT_SEARCHES.map((term, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery(term)}
                        className="px-3.5 py-2 rounded-full bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors shadow-xs"
                      >
                        🔍 {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* LIVE RESULTS (When typing or empty) */}
              {/* SECTION 1: DORILAR (Medicines) */}
              {searchFilteredMedicines.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Pill size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Dorilar ({searchFilteredMedicines.length})
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {searchFilteredMedicines.map((med) => {
                      const isAdded = addedItems.includes(med.id)
                      return (
                        <div
                          key={med.id}
                          className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-3 flex items-center gap-3.5 shadow-xs"
                        >
                          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-[#252528] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                            <img src={med.img} alt={med.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{med.store}</span>
                            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{med.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{getActiveIngredient(med)}</p>
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                              {med.price.toLocaleString()} so'm
                            </span>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addToCart(med.id)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs btn-touch ${
                              isAdded ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
                          </motion.button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: DORIXONALAR (Pharmacies) */}
              {searchFilteredVendors.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Store size={15} className="text-emerald-600 dark:text-emerald-400" />
                    Dorixonalar ({searchFilteredVendors.length})
                  </h3>

                  <div className="flex flex-col gap-2">
                    {searchFilteredVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        onClick={() => {
                          setShowSearchModal(false)
                          navigate('/map')
                        }}
                        className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${vendor.color} text-white flex items-center justify-center text-sm font-extrabold`}>
                            {vendor.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{vendor.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium">⏱️ {vendor.time} • ⭐ {vendor.rating}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMPTY STATE */}
              {searchQuery && searchFilteredMedicines.length === 0 && searchFilteredVendors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-18 h-18 rounded-2xl bg-slate-100 dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 flex items-center justify-center mb-4 shadow-xs">
                    <Search size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                    Dori yoki dorixona topilmadi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    Iltimos, dori nomini yoki faol moddasini to'g'ri kiritganingizga ishonch hosil qiling.
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
