// src/pages/CartPage.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2, ChevronRight, Pill } from 'lucide-react'
import { useLangStore } from '../stores/langStore'

export interface CartItem {
  id: string
  name: string
  brand?: string
  price: number
  qty: number
}

export const CartPage: React.FC = () => {
  const { t } = useLangStore()
  const [items, setItems] = useState<CartItem[]>([])

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    )
  }

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-full flex flex-col pb-24 transition-colors duration-200">
      <div className="px-4 pt-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-extrabold text-slate-900 dark:text-white mb-4"
        >
          {t.cartTitle}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1E1E20] border border-slate-200 dark:border-zinc-800 flex items-center justify-center shadow-xs">
              <ShoppingCart size={28} className="text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{t.cartEmpty}</p>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5 mb-5">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-3 flex items-center gap-3 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#252528] overflow-hidden shrink-0 flex items-center justify-center p-1 text-emerald-600 dark:text-emerald-400">
                    <Pill size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-slate-900 dark:text-white text-xs truncate">{item.name}</p>
                    {item.brand && <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.brand}</p>}
                    <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {(item.price * item.qty).toLocaleString()} UZS
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button onClick={() => updateQty(item.id, -item.qty)} className="btn-touch p-1">
                      <Trash2 size={13} className="text-slate-400 hover:text-red-500" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#252528] rounded-xl p-1 border border-slate-200/60 dark:border-zinc-700/50">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-[#1E1E20] flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-xs"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-slate-900 dark:text-white font-extrabold text-xs w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#1E1E20] border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 mb-4 shadow-xs"
            >
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                <span>Jami mahsulotlar</span>
                <span>{items.reduce((s, it) => s + it.qty, 0)} ta</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-900 dark:text-white text-sm">
                <span>Umumiy summa</span>
                <span className="text-emerald-600 dark:text-emerald-400">{total.toLocaleString()} UZS</span>
              </div>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2"
            >
              Bron qilish
              <ChevronRight size={18} />
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}
