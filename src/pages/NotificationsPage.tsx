// src/pages/NotificationsPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCheck, Bell } from 'lucide-react'
import { useLangStore } from '../stores/langStore'

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLangStore()
  const [notifications, setNotifications] = useState<any[]>([])

  const handleMarkAllRead = () => {
    setNotifications([])
  }

  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden w-full max-w-[430px] mx-auto bg-white dark:bg-neutral-950 relative border-x border-neutral-200 dark:border-neutral-800/50 shadow-2xl transition-colors duration-200">
      {/* Top Bar matching screenshot */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md px-4 py-3 border-b border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between">
        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-emerald-500 transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
        </motion.button>

        {/* Title */}
        <h1 className="text-base font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {t.notifications || 'Bildirishnomalar'}
        </h1>

        {/* Mark All Read Check Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleMarkAllRead}
          title={t.markAllAsRead || 'Barchasini o\'qilgan deb belgilash'}
          className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-500 hover:text-emerald-400 transition-colors shrink-0"
        >
          <CheckCheck size={22} />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4">
        {notifications.length === 0 ? (
          /* Empty State centered message */
          <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-10 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 shadow-xs">
              <Bell size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white mb-1.5 tracking-tight">
              Hozircha bildirishnomalar mavjud emas
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed font-medium">
              Yangi xabarlar va buyurtma holatlari shu yerda ko'rsatiladi.
            </p>
          </div>
        ) : (
          /* Notifications List */
          <div className="flex flex-col gap-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex gap-3.5"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                  <Bell size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium mb-1">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {item.time || 'hozirgina'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
