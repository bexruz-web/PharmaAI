// src/stores/langStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n/config'
import { type Lang, translations, type Translations } from '../i18n/translations'

interface LangState {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
  isLangSelected: boolean
  markLangSelected: () => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'UZ',
      t: translations['UZ'],
      isLangSelected: false,
      setLang: (lang) => {
        const codeLower = lang.toLowerCase()
        i18n.changeLanguage(codeLower)
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('pharma-locale', codeLower)
        }
        set({ lang, t: translations[lang] })
      },
      markLangSelected: () =>
        set({ isLangSelected: true }),
    }),
    { name: 'pharma-lang' }
  )
)
