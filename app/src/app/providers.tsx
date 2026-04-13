import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { I18nextProvider } from "react-i18next"
import i18n from "@/i18n"
import { PortfolioStoreProvider } from "@/app/portfolio-store"
import { ThemeProvider } from "@/app/theme-provider"
import type { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
})

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <PortfolioStoreProvider>{children}</PortfolioStoreProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
