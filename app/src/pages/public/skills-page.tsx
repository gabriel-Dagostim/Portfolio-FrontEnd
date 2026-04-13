import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  SkillsMindMap3D,
  type SkillGroup,
} from "@/components/skills/skills-mind-map-3d"
import { usePortfolioStore } from "@/app/portfolio-store"

const GROUPS: SkillGroup[] = [
  {
    key: "frontend",
    ids: [
      "html5",
      "css3",
      "js",
      "ts",
      "react",
      "vite",
      "next",
      "tailwind",
      "sass",
      "shadcn",
      "router",
      "motion",
      "i18n",
    ],
  },
  {
    key: "backend",
    ids: [
      "node",
      "express",
      "fastapi",
      "flask",
      "php",
      "rest",
      "jwt",
      "python",
      "mysql",
      "pg",
      "mssql",
      "mongo",
      "firebase",
      "supabase",
      "prisma",
    ],
  },
  {
    key: "infra",
    ids: [
      "docker",
      "nginx",
      "linux",
      "cloudflare",
      "coolify",
      "winserver",
      "git",
      "github",
      "minio",
    ],
  },
  { key: "automation", ids: ["playwright", "selenium"] },
  {
    key: "design",
    ids: ["figma", "three", "r3f", "bootstrap", "styled", "zod", "rhf"],
  },
]

export function SkillsPage() {
  const { t } = useTranslation()
  const { technologies } = usePortfolioStore()
  const technologiesById = useMemo(
    () => Object.fromEntries(technologies.map((x) => [x.id, x])),
    [technologies],
  )

  const flatTechNames = useMemo(() => {
    const set = new Set<string>()
    for (const g of GROUPS) {
      for (const id of g.ids) {
        const tech = technologiesById[id]
        if (tech) set.add(tech.name)
      }
    }
    return [...set].sort()
  }, [technologiesById])

  return (
    <div className="overflow-x-hidden">
      <SkillsMindMap3D
        groups={GROUPS}
        technologiesById={technologiesById}
      />

      {/* Lista para leitores de tela e SEO */}
      <section
        className="sr-only"
        aria-label={t("skills.title")}
      >
        <h2>{t("skills.title")}</h2>
        <p>{t("skills.subtitle")}</p>
        <ul>
          {flatTechNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
