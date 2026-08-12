// src/stores/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
  setDark: (val: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggleTheme: () => {
        const newVal = !get().isDark
        set({ isDark: newVal })
        if (typeof document !== 'undefined') {
          if (newVal) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
      setDark: (val: boolean) => {
        set({ isDark: val })
        if (typeof document !== 'undefined') {
          if (val) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
    }),
    { name: 'pharma-theme-v2' }
  )
)
