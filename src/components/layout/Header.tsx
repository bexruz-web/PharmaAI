// src/components/layout/Header.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronDown, Bell, CheckCheck, X, Check, Inbox } from 'lucide-react'
import { useLangStore } from '../../stores/langStore'

const SAVED_ADDRESSES = [
  { id: 1, name: 'Toshkent, Yunusobod, 4-mavze 12-uy', isDefault: true },
  { id: 2, name: 'Toshkent, Chilonzor, 9-mavze 24-uy', isDefault: false },
  { id: 3, name: 'Toshkent, Mirzo Ulug\'bek t., Mustaqillik sh. 5-uy', isDefault: false },
]

export const Header: React.FC = () => {
  const { t } = useLangStore()
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].name)
  const [unreadCount, setUnreadCount] = useState(2)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  const handleMarkAllRead = () => {
    setUnreadCount(0)
  }

  return (
    <>
      <header className="absolute top-0 inset-x-0 z-40 safe-top">
        <div className="bg-white/90 dark:bg-[#141416]/90 border-b border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-md px-4 py-2.5 transition-colors duration-200">
          <div className="flex items-center justify-between">
            {/* LEFT SIDE: Interactive Location selector button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-2 min-h-[40px] text-left"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {t.selectLocation}
                </span>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[170px]">
                    {selectedAddress.split(',')[1]?.trim() || selectedAddress}
                  </span>
                  <ChevronDown size={13} className="text-slate-400 dark:text-slate-500" />
                </div>
              </div>
            </motion.button>

            {/* RIGHT SIDE: Notification Bell Icon (🔔) with badge count */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowNotificationModal(true)}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#242427] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center relative shadow-xs btn-touch text-slate-700 dark:text-slate-200"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-emerald-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white dark:border-[#141416]">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* 1. LOCATION BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {showLocationModal && (
          <>
            <motion.div
              className="absolute inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocationModal(false)}
            />
            <motion.div
              className="absolute bottom-0 inset-x-0 z-50 bg-white dark:bg-[#1E1E20] border-t border-slate-200 dark:border-zinc-800 rounded-t-3xl safe-bottom p-6 shadow-xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t.savedAddresses}
                </h3>
                <button onClick={() => setShowLocationModal(false)} className="btn-touch w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <X size={16} className="text-slate-500" />
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {SAVED_ADDRESSES.map((addr) => {
                  const isSelected = selectedAddress === addr.name
                  return (
                    <motion.button
                      key={addr.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAddress(addr.name)
                        setShowLocationModal(false)
                      }}
                      className={`
                        flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 text-left
                        ${isSelected
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#242427] text-slate-800 dark:text-slate-200'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                          <MapPin size={15} className={isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'} />
                        </div>
                        <span className="text-xs font-bold leading-snug">{addr.name}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. NOTIFICATION BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {showNotificationModal && (
          <>
            <motion.div
              className="absolute inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotificationModal(false)}
            />
            <motion.div
              className="absolute bottom-0 inset-x-0 z-50 bg-white dark:bg-[#1E1E20] border-t border-slate-200 dark:border-zinc-800 rounded-t-3xl safe-bottom p-6 shadow-xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="w-10 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
              
              {/* Header with Title & "Mark all as read" icon button */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell size={18} className="text-emerald-600 dark:text-emerald-400" />
                  {t.notifications}
                </h3>

                <div className="flex items-center gap-2">
                  {/* Mark all as read Icon Button */}
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleMarkAllRead}
                    title={t.markAllAsRead}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <CheckCheck size={16} />
                    <span className="text-[10px]">{t.markAllAsRead}</span>
                  </motion.button>

                  <button onClick={() => setShowNotificationModal(false)} className="btn-touch w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Clean Empty State Graphic & Text */}
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#252528] border border-slate-200 dark:border-zinc-800 flex items-center justify-center mb-3 shadow-xs">
                  <Inbox size={28} className="text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  {t.noNotifications}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
