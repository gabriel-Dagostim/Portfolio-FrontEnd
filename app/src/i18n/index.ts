import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import type { LocaleCode } from "@/types"
import en from "./locales/en.json"
import ptBR from "./locales/pt-BR.json"

export type { LocaleCode } from "@/types"
export const LOCALE_STORAGE_KEY = "portfolio-locale"
export const SUPPORTED_LOCALES: LocaleCode[] = ["en", "pt-BR"]
export const DEFAULT_LOCALE: LocaleCode = "en"

function applyDocumentLang(lng: LocaleCode) {
  if (typeof document === "undefined") return
  document.documentElement.lang = lng === "pt-BR" ? "pt-BR" : "en"
  document.title =
    lng === "pt-BR"
      ? "Gabriel Dagostim — Portfólio"
      : "Gabriel Dagostim — Portfolio"
}

function readStoredLocale(): LocaleCode {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null
    if (v && SUPPORTED_LOCALES.includes(v)) return v
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

const initialLocale = readStoredLocale()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
  lng: initialLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

applyDocumentLang(initialLocale)

i18n.on("languageChanged", (lng) => {
  applyDocumentLang(
    SUPPORTED_LOCALES.includes(lng as LocaleCode)
      ? (lng as LocaleCode)
      : DEFAULT_LOCALE,
  )
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
