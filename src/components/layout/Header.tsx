// src/components/layout/Header.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { PharmaAiIcon } from '../PharmaAiIcon'
import { useLangStore } from '../../stores/langStore'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLangStore()
  const [unreadCount] = useState(2)

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full shrink-0 safe-top bg-transparent backdrop-blur-md px-4 py-2">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE: Custom Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-1.5 shadow-xs shrink-0">
            <PharmaAiIcon className="w-9 h-9 object-contain" />
          </div>
          <span className="text-xl sm:text-[21px] font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-900 via-[52%] to-emerald-500 to-[62%] dark:from-white dark:via-white dark:via-[52%] dark:to-emerald-400 dark:to-[62%]">
            Pharmind
          </span>
        </div>

        {/* RIGHT SIDE: Notification Bell Icon (🔔) with adaptive light/dark theme styling */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => navigate('/notifications')}
          title={t.notifications}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-white/10 flex items-center justify-center relative shadow-xs text-neutral-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-emerald-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-950">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </div>
    </header>
  )
}
