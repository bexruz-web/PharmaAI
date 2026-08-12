// src/router/AppRouter.tsx
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Header }         from '../components/layout/Header'
import { BottomNav }      from '../components/layout/BottomNav'
import { LanguageSelect } from '../pages/LanguageSelect'
import { Onboarding }     from '../pages/Onboarding'
import { Login }          from '../pages/Login'
import { OtpVerify }      from '../pages/OtpVerify'
import { Home }           from '../pages/Home'
import { MapPage }        from '../pages/MapPage'
import { ScanPage }       from '../pages/ScanPage'
import { CartPage }       from '../pages/CartPage'
import { ProfilePage }    from '../pages/ProfilePage'
import { useAuthStore }   from '../stores/authStore'
import { useLangStore }   from '../stores/langStore'

/** Protected route: redirect to /login if not authenticated */
const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

/** Main layout (header + content + bottom nav) */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col h-full w-full bg-dark-bg relative overflow-hidden">
    <Header />
    <main className="flex-1 overflow-y-auto pt-[72px] pb-[72px] scrollbar-none">{children}</main>
    <BottomNav />
  </div>
)

export const AppRouter: React.FC = () => {
  const { isAuthenticated, onboardingDone } = useAuthStore()
  const { isLangSelected } = useLangStore()

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect logic */}
        <Route
          path="/"
          element={
            !isLangSelected ? (
              <Navigate to="/language" replace />
            ) : !onboardingDone ? (
              <Navigate to="/onboarding" replace />
            ) : !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Public routes */}
        <Route path="/language"   element={<LanguageSelect />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/otp"        element={<OtpVerify />} />

        {/* Protected app routes */}
        <Route
          path="/home"
          element={
            <Protected>
              <AppLayout>
                <Home />
              </AppLayout>
            </Protected>
          }
        />
        <Route
          path="/map"
          element={
            <Protected>
              <AppLayout>
                <MapPage />
              </AppLayout>
            </Protected>
          }
        />
        <Route
          path="/scan"
          element={
            <Protected>
              <AppLayout>
                <ScanPage />
              </AppLayout>
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <AppLayout>
                <CartPage />
              </AppLayout>
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </Protected>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
