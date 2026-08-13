// src/components/layout/Header.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, X, Inbox } from 'lucide-react'
import { PharmaAiIcon } from '../PharmaAiIcon'
import { useLangStore } from '../../stores/langStore'

export const Header: React.FC = () => {
  const { t } = useLangStore()
  const [unreadCount, setUnreadCount] = useState(2)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  const handleMarkAllRead = () => {
    setUnreadCount(0)
  }

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full shrink-0 safe-top bg-transparent backdrop-blur-md px-4 py-2">
        <div className="flex items-center justify-between">
          {/* LEFT SIDE: Custom Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-1.5 shadow-xs shrink-0">
              <PharmaAiIcon className="w-9 h-9 object-contain" />
            </div>
            <span className="text-xl sm:text-[21px] font-black tracking-tight text-neutral-900 dark:text-white">
              Pharma<span className="text-emerald-600 dark:text-emerald-400">AI</span>
            </span>
          </div>

          {/* RIGHT SIDE: Notification Bell Icon (🔔) with badge count */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowNotificationModal(true)}
            title={t.notifications}
            className="w-10 h-10 rounded-full bg-neutral-800/80 border border-white/10 flex items-center justify-center relative shadow-xs text-slate-300 hover:text-emerald-400 transition-colors shrink-0"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-emerald-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-neutral-950">
                {unreadCount}
              </span>
            )}
          </motion.button>
        </div>
      </header>

      {/* NOTIFICATION BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {showNotificationModal && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotificationModal(false)}
            />
            <motion.div
              className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-[#1E1E20] border-t border-slate-200 dark:border-zinc-800 rounded-t-3xl safe-bottom p-6 shadow-xl max-w-[430px] mx-auto"
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

                  <button
                    onClick={() => setShowNotificationModal(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                  >
                    <X size={16} />
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
