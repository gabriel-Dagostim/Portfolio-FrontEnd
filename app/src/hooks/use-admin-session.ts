import { useCallback, useSyncExternalStore } from "react"

const KEY = "portfolio-admin-session"

function getSnapshot(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}

const CHANGED = "portfolio-admin-changed"

function subscribe(cb: () => void) {
  const run = () => cb()
  window.addEventListener("storage", run)
  window.addEventListener(CHANGED, run)
  return () => {
    window.removeEventListener("storage", run)
    window.removeEventListener(CHANGED, run)
  }
}

export function useAdminSession() {
  const authed = useSyncExternalStore(subscribe, getSnapshot, () => false)

  const login = useCallback(() => {
    sessionStorage.setItem(KEY, "1")
    window.dispatchEvent(new Event(CHANGED))
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY)
    window.dispatchEvent(new Event(CHANGED))
  }, [])

  return { authed, login, logout }
}

export function readAdminSession(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}
