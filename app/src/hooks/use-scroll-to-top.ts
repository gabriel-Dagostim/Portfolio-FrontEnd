import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** A new route should start at the top, not wherever the last one was left. */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
}
