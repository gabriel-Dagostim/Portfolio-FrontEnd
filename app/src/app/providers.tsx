import { I18nextProvider } from "react-i18next"
import type { ReactNode } from "react"
import i18n from "@/i18n"
import { PortfolioStoreProvider } from "@/app/portfolio-store"
import { ThemeProvider } from "@/app/theme-provider"

/**
 * The store sits above the theme so the admin's "default theme" setting can
 * actually reach a first-time visitor.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <PortfolioStoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </PortfolioStoreProvider>
    </I18nextProvider>
  )
}
