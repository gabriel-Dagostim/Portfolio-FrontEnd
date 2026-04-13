import {
  createContext,
  useCallback,
  useContext,
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

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
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

const initialState: StoreState = {
  projects: structuredClone(SEED_PROJECTS),
  categories: structuredClone(SEED_CATEGORIES),
  areas: structuredClone(SEED_AREAS),
  technologies: structuredClone(SEED_TECHNOLOGIES),
  settings: { ...INITIAL_SETTINGS },
}

type PortfolioContextValue = StoreState & {
  upsertProject: (project: Project) => void
  deleteProject: (id: string) => void
  upsertCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  upsertTechnology: (tech: Technology) => void
  deleteTechnology: (id: string) => void
  patchSettings: (s: Partial<SiteSettings>) => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

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
