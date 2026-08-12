// src/pages/ProfilePage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Bell, Globe, Moon, Sun, Package, LogOut,
  ChevronRight, Shield, Phone,
} from 'lucide-react'
import { useAuthStore }  from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
import { useLangStore }  from '../stores/langStore'
import type { Lang }     from '../i18n/translations'

const LANGUAGES: { code: Lang; flag: string }[] = [
  { code: 'UZ', flag: '🇺🇿' },
  { code: 'OZ', flag: '🇺🇿' },
  { code: 'RU', flag: '🇷🇺' },
  { code: 'EN', flag: '🇬🇧' },
]

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const { t, lang, setLang } = useLangStore()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
  }

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-full pb-24 transition-colors duration-200">
      <div className="h-[60px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col px-4 pt-4 gap-4"
      >
        {/* Profile user card */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                {user?.name ?? 'Foydalanuvchi'}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Phone size={12} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user?.phone ?? '+998 XX XXX XX XX'}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
              <Shield size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* Settings sections */}
        <motion.div variants={itemVariants}>
          <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 pl-1">
            Sozlamalar
          </p>
          <div className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800/60 shadow-xs">
            {/* Dark mode switcher */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center">
                  {isDark ? <Moon size={16} className="text-purple-600 dark:text-purple-400" /> : <Sun size={16} className="text-amber-500" />}
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t.darkMode}</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${isDark ? 'bg-emerald-600' : 'bg-slate-300'}
                `}
              >
                <motion.div
                  animate={{ x: isDark ? 22 : 2 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs"
                />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                  <Globe size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t.language}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`
                      w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold
                      transition-all duration-150
                      ${lang === l.code
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-[#252528] text-slate-600 dark:text-slate-400'}
                    `}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                  <Bell size={16} className="text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t.notifications}</span>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </div>
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
            <button className="w-full flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <Package size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t.orders}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">2</span>
                <ChevronRight size={15} className="text-slate-400" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-13 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold text-sm shadow-xs"
          >
            <LogOut size={16} />
            {t.logout}
          </motion.button>
        </motion.div>

        {/* Version */}
        <motion.div variants={itemVariants}>
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium">PharmaAI v1.0.0 — Matte Edition</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
