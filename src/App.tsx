// src/App.tsx
import React, { useEffect } from 'react'
import { AppRouter }       from './router/AppRouter'
import { useThemeStore }   from './stores/themeStore'

const App: React.FC = () => {
  const { isDark } = useThemeStore()

  // Sync dark class on root document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen w-full bg-slate-200 dark:bg-[#0c0c0d] text-slate-900 dark:text-slate-100 flex items-center justify-center sm:py-6 sm:px-4 relative overflow-hidden transition-colors duration-200">
      {/* Soft background ambient shapes for desktop view */}
      <div className="hidden sm:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-slate-300/30 dark:bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-300/30 dark:bg-teal-500/5 blur-[100px] pointer-events-none" />

      {/* Main Responsive Frame */}
      <div className="
        w-full h-[100dvh] sm:h-[880px] sm:max-w-[430px]
        bg-slate-50 dark:bg-[#121212]
        sm:rounded-3xl sm:shadow-2xl
        sm:border border-slate-200 dark:border-zinc-800
        relative overflow-hidden flex flex-col transition-colors duration-200
      ">
        <AppRouter />
      </div>
    </div>
  )
}

export default App
