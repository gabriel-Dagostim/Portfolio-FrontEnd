import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"
import {
  INITIAL_SETTINGS,
  SEED_AREAS,
  SEED_CATEGORIES,
  SEED_PROJECTS,
  SEED_TECHNOLOGIES,
} from "@/mocks/seed"
import type {
  AreaOfWork,
  Category,
  Project,
  SiteSettings,
  Technology,
} from "@/types"

const STORAGE_KEY = "portfolio-admin-store-v1"
/** Bump when seed must rehydrate (e.g. new projects) even if local cache exists. */
const SEED_REVISION = 2

type StoreState = {
  projects: Project[]
  categories: Category[]
  areas: AreaOfWork[]
  technologies: Technology[]
  settings: SiteSettings
}

type Action =
  | { type: "UPSERT_PROJECT"; project: Project }
  | { type: "DELETE_PROJECT"; id: string }
  | { type: "UPSERT_CATEGORY"; category: Category }
  | { type: "DELETE_CATEGORY"; id: string }
  | { type: "UPSERT_TECH"; tech: Technology }
  | { type: "DELETE_TECH"; id: string }
  | { type: "SET_SETTINGS"; settings: Partial<SiteSettings> }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: StoreState }

function seedState(): StoreState {
  return {
    projects: structuredClone(SEED_PROJECTS),
    categories: structuredClone(SEED_CATEGORIES),
    areas: structuredClone(SEED_AREAS),
    technologies: structuredClone(SEED_TECHNOLOGIES),
    settings: { ...INITIAL_SETTINGS },
  }
}

/** Keep visitor/admin edits, but always inject projects/techs/categories missing from seed. */
function mergePersistedWithSeed(parsed: Partial<StoreState>): StoreState {
  const seed = seedState()

  const projectsById = new Map(
    (Array.isArray(parsed.projects) ? parsed.projects : []).map((p) => [
      p.id,
      p,
    ]),
  )
  for (const p of seed.projects) {
    if (!projectsById.has(p.id)) {
      projectsById.set(p.id, structuredClone(p))
    }
  }

  const categoriesById = new Map(
    (Array.isArray(parsed.categories) ? parsed.categories : seed.categories).map(
      (c) => [c.id, c],
    ),
  )
  for (const c of seed.categories) {
    if (!categoriesById.has(c.id)) {
      categoriesById.set(c.id, structuredClone(c))
    }
  }

  const areasById = new Map(
    (Array.isArray(parsed.areas) ? parsed.areas : seed.areas).map((a) => [
      a.id,
      a,
    ]),
  )
  for (const a of seed.areas) {
    if (!areasById.has(a.id)) {
      areasById.set(a.id, structuredClone(a))
    }
  }

  const techById = new Map(
    (
      Array.isArray(parsed.technologies) ? parsed.technologies : seed.technologies
    ).map((t) => [t.id, t]),
  )
  for (const t of seed.technologies) {
    if (!techById.has(t.id)) {
      techById.set(t.id, structuredClone(t))
    }
  }

  return {
    projects: Array.from(projectsById.values()),
    categories: Array.from(categoriesById.values()),
    areas: Array.from(areasById.values()),
    technologies: Array.from(techById.values()),
    settings: { ...seed.settings, ...(parsed.settings ?? {}) },
  }
}

function createInitialState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreState>
      if (parsed && Array.isArray(parsed.projects)) {
        return mergePersistedWithSeed(parsed)
      }
    }
  } catch {
    /* ignore */
  }
  return seedState()
}

function persistState(state: StoreState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, seedRevision: SEED_REVISION }),
    )
  } catch {
    // Quota exceeded (large data URLs) — keep in-memory only
  }
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "HYDRATE":
      return action.state
    case "RESET":
      return seedState()
    case "UPSERT_PROJECT": {
      const idx = state.projects.findIndex((p) => p.id === action.project.id)
      const projects =
        idx === -1
          ? [...state.projects, action.project]
          : state.projects.map((p, i) => (i === idx ? action.project : p))
      return { ...state, projects }
    }
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
      }
    case "UPSERT_CATEGORY": {
      const idx = state.categories.findIndex((c) => c.id === action.category.id)
      const categories =
        idx === -1
          ? [...state.categories, action.category]
          : state.categories.map((c, i) => (i === idx ? action.category : c))
      return { ...state, categories }
    }
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.id),
      }
    case "UPSERT_TECH": {
      const idx = state.technologies.findIndex((t) => t.id === action.tech.id)
      const technologies =
        idx === -1
          ? [...state.technologies, action.tech]
          : state.technologies.map((t, i) => (i === idx ? action.tech : t))
      return { ...state, technologies }
    }
    case "DELETE_TECH":
      return {
        ...state,
        technologies: state.technologies.filter((t) => t.id !== action.id),
      }
    case "SET_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
      }
    default:
      return state
  }
}

type PortfolioContextValue = StoreState & {
  upsertProject: (project: Project) => void
  deleteProject: (id: string) => void
  upsertCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  upsertTechnology: (tech: Technology) => void
  deleteTechnology: (id: string) => void
  patchSettings: (s: Partial<SiteSettings>) => void
  resetStore: () => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  // Re-merge seed projects whenever new ones ship (e.g. CAH) even if the tab
  // still had an older in-memory snapshot before refresh.
  useEffect(() => {
    const seedIds = new Set(SEED_PROJECTS.map((p) => p.id))
    const missing = [...seedIds].filter(
      (id) => !state.projects.some((p) => p.id === id),
    )
    if (missing.length === 0) return
    dispatch({
      type: "HYDRATE",
      state: mergePersistedWithSeed(state),
    })
    // Only on mount — state.projects is intentionally the first load snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    persistState(state)
  }, [state])

  const upsertProject = useCallback((project: Project) => {
    dispatch({ type: "UPSERT_PROJECT", project })
  }, [])

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: "DELETE_PROJECT", id })
  }, [])

  const upsertCategory = useCallback((category: Category) => {
    dispatch({ type: "UPSERT_CATEGORY", category })
  }, [])

  const deleteCategory = useCallback((id: string) => {
    dispatch({ type: "DELETE_CATEGORY", id })
  }, [])

  const upsertTechnology = useCallback((tech: Technology) => {
    dispatch({ type: "UPSERT_TECH", tech })
  }, [])

  const deleteTechnology = useCallback((id: string) => {
    dispatch({ type: "DELETE_TECH", id })
  }, [])

  const patchSettings = useCallback((settings: Partial<SiteSettings>) => {
    dispatch({ type: "SET_SETTINGS", settings })
  }, [])

  const resetStore = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: "RESET" })
  }, [])

  const value = useMemo<PortfolioContextValue>(
    () => ({
      ...state,
      upsertProject,
      deleteProject,
      upsertCategory,
      deleteCategory,
      upsertTechnology,
      deleteTechnology,
      patchSettings,
      resetStore,
    }),
    [
      state,
      upsertProject,
      deleteProject,
      upsertCategory,
      deleteCategory,
      upsertTechnology,
      deleteTechnology,
      patchSettings,
      resetStore,
    ],
  )

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  )
}

export function usePortfolioStore() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error("usePortfolioStore must be used within PortfolioStoreProvider")
  }
  return ctx
}
