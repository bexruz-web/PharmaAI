// src/components/layout/BottomNav.tsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Map, ScanLine, ShoppingCart, User } from 'lucide-react'
import { useLangStore } from '../../stores/langStore'
import type { Translations } from '../../i18n/translations'

interface NavItem {
  id:       string
  path:     string
  labelKey: keyof Translations
  icon:     React.ElementType
  isCenter?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',    path: '/home',    labelKey: 'home',    icon: Home          },
  { id: 'map',     path: '/map',     labelKey: 'map',     icon: Map           },
  { id: 'scan',    path: '/scan',    labelKey: 'scan',    icon: ScanLine, isCenter: true },
  { id: 'cart',    path: '/cart',    labelKey: 'cart',    icon: ShoppingCart  },
  { id: 'profile', path: '/profile', labelKey: 'profile', icon: User          },
]

export const BottomNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t }    = useLangStore()

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 w-full shrink-0 safe-bottom bg-white/95 dark:bg-[#1A1A1C]/95 border-t border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center justify-around h-15 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            const Icon     = item.icon

            if (item.isCenter) {
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center justify-center -mt-5"
                >
                  <div
                    className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center
                      shadow-xs transition-all duration-150
                      ${isActive
                        ? 'bg-emerald-700 text-white scale-105'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'}
                    `}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {String(t[item.labelKey])}
                  </span>
                </motion.button>
              )
            }

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] px-2"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.7}
                  className={`transition-colors duration-150 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {String(t[item.labelKey])}
                </span>
              </motion.button>
            )
          })}
        </div>
    </nav>
  )
}
