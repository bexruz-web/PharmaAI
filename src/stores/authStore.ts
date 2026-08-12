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

const MOCK_OTP = '1234'

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
            phone,
            name: 'Foydalanuvchi',
          },
        })
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },

      setPendingPhone: (phone) => set({ pendingPhone: phone }),

      verifyOtp: (otp) => {
        if (otp === MOCK_OTP) {
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
