import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react"
import {
  AdminPage,
  EmptyState,
  Field,
  FieldGrid,
  LocalizedField,
  LocalizedListField,
  Panel,
  ToggleRow,
  useConfirmedDelete,
} from "@/components/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePortfolioStore } from "@/app/portfolio-store"
import { emptyLocalized, pickLocalized } from "@/lib/i18n-utils"
import type { CareerEntry } from "@/types"

function blankEntry(): CareerEntry {
  return {
    id: `car-${Date.now()}`,
    kind: "work",
    org: "",
    logoUrl: "",
    logoFit: "contain",
    startYear: new Date().getFullYear(),
    period: emptyLocalized(),
    title: emptyLocalized(),
    body: emptyLocalized(),
    tags: [],
  }
}

export function AdminCareerPage() {
  const { t, i18n } = useTranslation()
  const { content, upsertCareer, deleteCareer } = usePortfolioStore()
  const confirmDelete = useConfirmedDelete()
  const [openId, setOpenId] = useState<string | null>(null)

  const sorted = useMemo(
    () => [...content.career].sort((a, b) => b.startYear - a.startYear),
    [content.career],
  )

  function addEntry() {
    const entry = blankEntry()
    upsertCareer(entry)
    setOpenId(entry.id)
  }

  return (
    <AdminPage
      title={t("admin.career")}
      lead={t("admin.careerLead")}
      actions={
        <Button size="sm" onClick={addEntry}>
          <Plus className="size-3.5" />
          {t("common.add")}
        </Button>
      }
    >
      {sorted.length === 0 ? (
        <EmptyState
          message={t("admin.empty")}
          action={
            <Button size="sm" onClick={addEntry}>
              {t("admin.addFirst")}
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {sorted.map((entry) => {
            const isOpen = openId === entry.id
            const label =
              pickLocalized(entry.title, i18n.language) || entry.org || entry.id
            return (
              <li key={entry.id} className="border border-rule bg-surface">
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : entry.id)}
                    aria-expanded={isOpen}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    {isOpen ? (
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="type-data w-12 shrink-0 text-xs text-primary">
                      {entry.startYear}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {entry.org}
                      </span>
                    </span>
                  </button>
                  <Badge variant="muted" className="hidden sm:inline-flex">
                    {entry.kind === "work"
                      ? t("admin.kindWork")
                      : t("admin.kindEducation")}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      confirmDelete(label, () => deleteCareer(entry.id))
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {isOpen ? (
                  <div className="space-y-5 border-t border-rule p-4 sm:p-5">
                    <FieldGrid>
                      <Field label={t("admin.organisation")}>
                        <Input
                          value={entry.org}
                          onChange={(e) =>
                            upsertCareer({ ...entry, org: e.target.value })
                          }
                        />
                      </Field>
                      <Field label={t("admin.startYear")}>
                        <Input
                          type="number"
                          value={entry.startYear}
                          onChange={(e) =>
                            upsertCareer({
                              ...entry,
                              startYear: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </Field>
                      <Field label={t("admin.logo")} hint={t("admin.imageHint")}>
                        <Input
                          value={entry.logoUrl}
                          onChange={(e) =>
                            upsertCareer({ ...entry, logoUrl: e.target.value })
                          }
                        />
                      </Field>
                      <Field label={t("admin.kind")}>
                        <div className="inline-flex border border-rule">
                          {(["work", "education"] as const).map((kind, i) => (
                            <button
                              key={kind}
                              type="button"
                              onClick={() => upsertCareer({ ...entry, kind })}
                              aria-pressed={entry.kind === kind}
                              className={
                                (i > 0 ? "border-l border-rule " : "") +
                                "px-3 py-2 text-sm transition-colors " +
                                (entry.kind === kind
                                  ? "bg-foreground text-background"
                                  : "text-muted-foreground hover:bg-surface-sunken")
                              }
                            >
                              {kind === "work"
                                ? t("admin.kindWork")
                                : t("admin.kindEducation")}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label={t("admin.logoFit")}>
                        <div className="inline-flex border border-rule">
                          {(["contain", "cover"] as const).map((fit, i) => (
                            <button
                              key={fit}
                              type="button"
                              onClick={() =>
                                upsertCareer({ ...entry, logoFit: fit })
                              }
                              aria-pressed={entry.logoFit === fit}
                              className={
                                (i > 0 ? "border-l border-rule " : "") +
                                "px-3 py-2 text-sm transition-colors " +
                                (entry.logoFit === fit
                                  ? "bg-foreground text-background"
                                  : "text-muted-foreground hover:bg-surface-sunken")
                              }
                            >
                              {fit === "contain"
                                ? t("admin.fitContain")
                                : t("admin.fitCover")}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </FieldGrid>

                    <ToggleRow
                      label={t("admin.current")}
                      checked={Boolean(entry.current)}
                      onChange={(current) => upsertCareer({ ...entry, current })}
                    />

                    <LocalizedField
                      label={t("admin.period")}
                      value={entry.period}
                      onChange={(period) => upsertCareer({ ...entry, period })}
                    />
                    <LocalizedField
                      label={t("admin.title")}
                      value={entry.title}
                      onChange={(title) => upsertCareer({ ...entry, title })}
                    />
                    <LocalizedField
                      label={t("admin.body")}
                      value={entry.body}
                      onChange={(body) => upsertCareer({ ...entry, body })}
                      multiline
                    />
                    <LocalizedListField
                      label={t("admin.tags")}
                      addLabel={t("admin.addTag")}
                      values={entry.tags}
                      onChange={(tags) => upsertCareer({ ...entry, tags })}
                    />
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}

      <Panel className="mt-6" title={t("admin.translationsHint")}>
        <p className="text-xs leading-5 text-muted-foreground">
          {t("admin.careerLead")}
        </p>
      </Panel>
    </AdminPage>
  )
}
