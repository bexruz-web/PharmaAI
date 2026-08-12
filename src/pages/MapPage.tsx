// src/pages/MapPage.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Filter } from 'lucide-react'
import { useLangStore } from '../stores/langStore'

export const MapPage: React.FC = () => {
  const { t } = useLangStore()

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-full flex flex-col pb-24 transition-colors duration-200">
      <div className="h-[60px]" />

      {/* Map placeholder */}
      <div className="flex-1 relative overflow-hidden mx-4 mt-3 rounded-2xl min-h-[300px]">
        {/* Fake map grid */}
        <div className="absolute inset-0 bg-slate-200 dark:bg-[#1E1E20] overflow-hidden rounded-2xl border border-slate-300/60 dark:border-zinc-800">
          <div
            className="absolute inset-0 opacity-20 dark:opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Fake roads */}
          <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-300 dark:bg-zinc-700" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-300 dark:bg-zinc-700" />
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-slate-300 dark:bg-zinc-700" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-slate-300 dark:bg-zinc-700" />

          {/* Fake pharmacy pins */}
          {[
            { top: '30%', left: '25%' },
            { top: '55%', left: '60%' },
            { top: '20%', left: '70%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
              className="absolute"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <MapPin size={16} />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-600 rotate-45" />
              </div>
            </motion.div>
          ))}

          {/* Center user dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md">
              <div className="w-full h-full rounded-full bg-blue-400/40 animate-ping" />
            </div>
          </div>
        </div>

        {/* Navigation button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 flex items-center justify-center shadow-sm text-emerald-600 dark:text-emerald-400"
        >
          <Navigation size={18} />
        </motion.button>
      </div>

      {/* Bottom info */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{t.mapTitle}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.mapSubtitle}</p>
          </div>
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <Filter size={13} />
            Filter
          </button>
        </div>

        {/* Mini cards */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {['Dori-Darmon Pro', 'MedEx', 'Green Cross'].map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-3 flex items-center gap-3 min-w-[170px] shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{(0.3 * (i + 1)).toFixed(1)} km</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
