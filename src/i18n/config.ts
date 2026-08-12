import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import uzLocale from '../locales/uz.json'
import ozLocale from '../locales/oz.json'
import ruLocale from '../locales/ru.json'
import enLocale from '../locales/en.json'

export const resources = {
  uz: { translation: uzLocale },
  oz: { translation: ozLocale },
  ru: { translation: ruLocale },
  en: { translation: enLocale },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    lng: (localStorage.getItem('pharma-locale') || 'uz').toLowerCase(),
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'pharma-locale',
    },
  })

export default i18n
