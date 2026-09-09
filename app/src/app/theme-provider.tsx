import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePortfolioStore } from "@/app/portfolio-store"

export type ThemeMode = "light" | "dark" | "system"

const STORAGE_KEY = "portfolio-theme"

type ThemeContextValue = {
  mode: ThemeMode
  resolved: "light" | "dark"
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredMode(): ThemeMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === "light" || value === "dark" || value === "system") {
      return value
    }
  } catch {
    /* ignore */
  }
  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = usePortfolioStore()
  /** The visitor's own choice wins; otherwise the admin's default applies. */
  const [mode, setModeState] = useState<ThemeMode>(
    () => readStoredMode() ?? settings.defaultTheme,
  )
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
  )

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => setSystemDark(query.matches)
    query.addEventListener("change", handler)
    return () => query.removeEventListener("change", handler)
  }, [])

  const resolved: "light" | "dark" =
    mode === "system" ? (systemDark ? "dark" : "light") : mode

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark")
    document.documentElement.style.colorScheme = resolved
  }, [resolved])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ mode, resolved, setMode }),
    [mode, resolved, setMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider")
  return ctx
}
