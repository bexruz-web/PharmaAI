// src/components/ui/Input.tsx
import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightElement, hint, className = '', type, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPass ? 'text' : 'password') : type}
            className={`
              w-full h-14 rounded-2xl px-4 text-sm font-medium
              ${leftIcon ? 'pl-12' : ''}
              ${isPassword || rightElement ? 'pr-12' : ''}
              bg-slate-100 dark:bg-[#1E1E20]
              border border-slate-200 dark:border-zinc-800
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0
              transition-colors duration-150
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 btn-touch"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {rightElement && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-500 pl-1 animate-fade-in">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-400 dark:text-slate-500 pl-1">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
