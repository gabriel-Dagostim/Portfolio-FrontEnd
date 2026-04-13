import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import type { LocaleCode } from "@/types"
import en from "./locales/en.json"
import ptBR from "./locales/pt-BR.json"

export const LOCALE_STORAGE_KEY = "portfolio-locale"
export const SUPPORTED_LOCALES: LocaleCode[] = ["pt-BR", "en"]

function readStoredLocale(): LocaleCode {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null
    if (v && SUPPORTED_LOCALES.includes(v)) return v
  } catch {
    /* ignore */
  }
  return "pt-BR"
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
  lng: readStoredLocale(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export function setLocale(lng: LocaleCode) {
  void i18n.changeLanguage(lng)
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
}

export default i18n
