import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Plus, Trash2 } from "lucide-react"
import {
  AdminPage,
  LocalizedField,
  Panel,
  ToggleRow,
  useConfirmedDelete,
} from "@/components/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePortfolioStore } from "@/app/portfolio-store"
import { emptyLocalized, pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

type Tab = "categories" | "areas" | "technologies"

function slugId(prefix: string, value: string) {
  const base = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${prefix}-${base || Date.now()}`
}

export function AdminTaxonomyPage() {
  const { t, i18n } = useTranslation()
  const store = usePortfolioStore()
  const confirmDelete = useConfirmedDelete()
  const [tab, setTab] = useState<Tab>("categories")
  const [newTech, setNewTech] = useState("")
  const lang = i18n.language

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "categories", label: t("admin.categories"), count: store.categories.length },
    { id: "areas", label: t("admin.areas"), count: store.areas.length },
    {
      id: "technologies",
      label: t("admin.technologies"),
      count: store.technologies.length,
    },
  ]

  /** How many projects reference an id — deleting one in use would orphan them. */
  const usedBy = (predicate: (p: (typeof store.projects)[number]) => boolean) =>
    store.projects.filter(predicate).length

  return (
    <AdminPage title={t("admin.sectionCatalogue")}>
      <div className="inline-flex border border-rule">
        {tabs.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            aria-pressed={tab === item.id}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 text-sm transition-colors",
              index > 0 && "border-l border-rule",
              tab === item.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
            )}
          >
            {item.label}
            <span className="type-data text-xs opacity-70">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {tab === "categories" ? (
          <>
            <Button
              size="sm"
              onClick={() => {
                const id = slugId("cat", String(Date.now()))
                store.upsertCategory({ id, name: emptyLocalized() })
              }}
            >
              <Plus className="size-3.5" />
              {t("common.add")}
            </Button>
            {store.categories.map((category) => (
              <Panel
                key={category.id}
                title={pickLocalized(category.name, lang) || category.id}
                description={`${usedBy((p) => p.categoryId === category.id)} · ${t("admin.projects").toLowerCase()}`}
                actions={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      confirmDelete(
                        pickLocalized(category.name, lang) || category.id,
                        () => store.deleteCategory(category.id),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                }
              >
                <LocalizedField
                  label={t("admin.name")}
                  value={category.name}
                  onChange={(name) => store.upsertCategory({ ...category, name })}
                />
                <ToggleRow
                  label={t("admin.showcaseOnly")}
                  checked={Boolean(category.showcaseOnly)}
                  onChange={(showcaseOnly) =>
                    store.upsertCategory({ ...category, showcaseOnly })
                  }
                />
              </Panel>
            ))}
          </>
        ) : null}

        {tab === "areas" ? (
          <>
            <Button
              size="sm"
              onClick={() =>
                store.upsertArea({
                  id: slugId("area", String(Date.now())),
                  name: emptyLocalized(),
                })
              }
            >
              <Plus className="size-3.5" />
              {t("common.add")}
            </Button>
            {store.areas.map((area) => (
              <Panel
                key={area.id}
                title={pickLocalized(area.name, lang) || area.id}
                description={`${usedBy((p) => p.areaId === area.id)} · ${t("admin.projects").toLowerCase()}`}
                actions={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      confirmDelete(
                        pickLocalized(area.name, lang) || area.id,
                        () => store.deleteArea(area.id),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                }
              >
                <LocalizedField
                  label={t("admin.name")}
                  value={area.name}
                  onChange={(name) => store.upsertArea({ ...area, name })}
                />
              </Panel>
            ))}
          </>
        ) : null}

        {tab === "technologies" ? (
          <Panel title={t("admin.technologies")}>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                const name = newTech.trim()
                if (!name) return
                store.upsertTechnology({ id: slugId("tech", name).slice(5), name })
                setNewTech("")
              }}
            >
              <Input
                value={newTech}
                onChange={(event) => setNewTech(event.target.value)}
                placeholder={t("admin.name")}
              />
              <Button type="submit" size="sm">
                <Plus className="size-3.5" />
                {t("common.add")}
              </Button>
            </form>

            <ul className="flex flex-wrap gap-2">
              {store.technologies.map((tech) => {
                const count = usedBy((p) => p.technologyIds.includes(tech.id))
                return (
                  <li key={tech.id}>
                    <span className="inline-flex items-center gap-2 border border-rule py-1 pl-2.5 pr-1 text-sm">
                      {tech.name}
                      <Badge variant="data">{count}</Badge>
                      <button
                        type="button"
                        onClick={() =>
                          confirmDelete(tech.name, () =>
                            store.deleteTechnology(tech.id),
                          )
                        }
                        className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`${t("common.delete")} ${tech.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </span>
                  </li>
                )
              })}
            </ul>
          </Panel>
        ) : null}
      </div>
    </AdminPage>
  )
}
