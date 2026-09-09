import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import type { LocaleCode } from "@/types"
import { normalizeLocale } from "@/lib/i18n-utils"
import en from "./locales/en.json"
import ptBR from "./locales/pt-BR.json"
import es from "./locales/es.json"

export type { LocaleCode } from "@/types"

export const LOCALE_STORAGE_KEY = "portfolio-locale"

/** Order matters — this drives the language switch. */
export const SUPPORTED_LOCALES: {
  code: LocaleCode
  short: string
  label: string
}[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "pt-BR", short: "PT", label: "Português" },
  { code: "es", short: "ES", label: "Español" },
]

/** First visit and fallback are always English — never the browser language. */
export const DEFAULT_LOCALE: LocaleCode = "en"

const LOCALE_CODES = SUPPORTED_LOCALES.map((l) => l.code)

function isLocale(value: unknown): value is LocaleCode {
  return typeof value === "string" && LOCALE_CODES.includes(value as LocaleCode)
}

const DOCUMENT_TITLE: Record<LocaleCode, string> = {
  en: "Gabriel Dagostim — Infrastructure and full-stack developer",
  "pt-BR": "Gabriel Dagostim — Desenvolvedor full stack e de infraestrutura",
  es: "Gabriel Dagostim — Desarrollador full stack y de infraestructura",
}

const HTML_LANG: Record<LocaleCode, string> = {
  en: "en",
  "pt-BR": "pt-BR",
  es: "es",
}

function applyDocumentLang(lng: LocaleCode) {
  if (typeof document === "undefined") return
  document.documentElement.lang = HTML_LANG[lng]
  document.title = DOCUMENT_TITLE[lng]
}

/**
 * Order of precedence: the visitor's own choice, then the language the admin
 * set as the site default, then English. The browser's language is never used
 * — English stays the front door.
 */
function resolveInitialLocale(): LocaleCode {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(stored)) return stored

    const store = localStorage.getItem("portfolio-admin-store-v2")
    if (store) {
      const parsed = JSON.parse(store) as {
        settings?: { defaultLocale?: unknown }
      }
      if (isLocale(parsed?.settings?.defaultLocale)) {
        return parsed.settings.defaultLocale
      }
    }
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
    es: { translation: es },
  },
  lng: initialLocale,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: LOCALE_CODES,
  nonExplicitSupportedLngs: false,
  load: "currentOnly",
  interpolation: { escapeValue: false },
})

applyDocumentLang(initialLocale)

i18n.on("languageChanged", (lng) => {
  applyDocumentLang(normalizeLocale(lng))
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
