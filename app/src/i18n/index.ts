import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import type { LocaleCode } from "@/types"
import en from "./locales/en.json"
import ptBR from "./locales/pt-BR.json"

export type { LocaleCode } from "@/types"

/** Preference chosen by the visitor (EN toggle / PT-BR toggle). */
export const LOCALE_STORAGE_KEY = "portfolio-locale"
export const SUPPORTED_LOCALES: LocaleCode[] = ["en", "pt-BR"]
/** First open and fallback: always English (never browser language). */
export const DEFAULT_LOCALE: LocaleCode = "en"

function isLocale(value: string | null | undefined): value is LocaleCode {
  return value === "en" || value === "pt-BR"
}

function applyDocumentLang(lng: LocaleCode) {
  if (typeof document === "undefined") return
  document.documentElement.lang = lng === "pt-BR" ? "pt-BR" : "en"
  document.title =
    lng === "pt-BR"
      ? "Gabriel Dagostim — Portfólio"
      : "Gabriel Dagostim — Portfolio"
}

/**
 * Initial language:
 * 1) User’s saved choice (after they clicked EN / PT-BR)
 * 2) Otherwise English — do not use navigator.language
 */
function resolveInitialLocale(): LocaleCode {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

const initialLocale = resolveInitialLocale()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
  lng: initialLocale,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  nonExplicitSupportedLngs: false,
  load: "currentOnly",
  interpolation: { escapeValue: false },
})

applyDocumentLang(initialLocale)

i18n.on("languageChanged", (lng) => {
  const next = isLocale(lng) ? lng : DEFAULT_LOCALE
  applyDocumentLang(next)
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
