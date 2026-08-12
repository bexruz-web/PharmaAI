// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  phone: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  pendingPhone: string
  onboardingDone: boolean
  login: (phone: string) => void
  logout: () => void
  setPendingPhone: (phone: string) => void
  verifyOtp: (otp: string) => boolean
  markOnboardingDone: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      pendingPhone: '',
      onboardingDone: false,

      login: (phone) => {
        set({
          isAuthenticated: true,
          user: {
            phone: phone || '+998 90 123 45 67',
            name: 'Foydalanuvchi',
          },
        })
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },

      setPendingPhone: (phone) => set({ pendingPhone: phone }),

      verifyOtp: (otp) => {
        // Accept any valid 4-digit OTP entry (e.g., 1234 or any 4 digits)
        if (otp.length === 4) {
          const phone = get().pendingPhone
          get().login(phone)
          return true
        }
        return false
      },

      markOnboardingDone: () => set({ onboardingDone: true }),
    }),
    { name: 'pharma-auth' }
  )
)
