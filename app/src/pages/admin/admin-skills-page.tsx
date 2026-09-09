import { useTranslation } from "react-i18next"
import { Plus, Trash2 } from "lucide-react"
import {
  AdminPage,
  Field,
  FieldGrid,
  LocalizedField,
  Panel,
  useConfirmedDelete,
} from "@/components/admin/admin-ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePortfolioStore } from "@/app/portfolio-store"
import { emptyLocalized, pickLocalized } from "@/lib/i18n-utils"
import type { LanguageSkill } from "@/types"

export function AdminSkillsPage() {
  const { t, i18n } = useTranslation()
  const { content, patchContent, upsertSkill, deleteSkill } =
    usePortfolioStore()
  const confirmDelete = useConfirmedDelete()
  const lang = i18n.language

  const setLanguages = (languages: LanguageSkill[]) =>
    patchContent({ languages })

  return (
    <AdminPage
      title={t("admin.skillsNav")}
      lead={t("admin.skillsLead")}
      actions={
        <Button
          size="sm"
          onClick={() =>
            upsertSkill({
              id: `sk-${Date.now()}`,
              title: emptyLocalized(),
              body: emptyLocalized(),
              items: [],
            })
          }
        >
          <Plus className="size-3.5" />
          {t("common.add")}
        </Button>
      }
    >
      <div className="space-y-6">
        {content.skills.map((group) => (
          <Panel
            key={group.id}
            title={pickLocalized(group.title, lang) || group.id}
            actions={
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() =>
                  confirmDelete(pickLocalized(group.title, lang) || group.id, () =>
                    deleteSkill(group.id),
                  )
                }
              >
                <Trash2 className="size-4" />
              </Button>
            }
          >
            <LocalizedField
              label={t("admin.title")}
              value={group.title}
              onChange={(title) => upsertSkill({ ...group, title })}
            />
            <LocalizedField
              label={t("admin.body")}
              value={group.body}
              onChange={(body) => upsertSkill({ ...group, body })}
              multiline
            />
            <Field label={t("admin.items")} hint={t("admin.itemsHint")}>
              <Textarea
                rows={Math.max(4, group.items.length + 1)}
                value={group.items.join("\n")}
                onChange={(event) =>
                  upsertSkill({
                    ...group,
                    items: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </Panel>
        ))}

        <Panel
          title={t("about.languagesTitle")}
          actions={
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setLanguages([
                  ...content.languages,
                  {
                    id: `lang-${Date.now()}`,
                    name: emptyLocalized(),
                    level: emptyLocalized(),
                    proficiency: 3,
                  },
                ])
              }
            >
              <Plus className="size-3.5" />
              {t("common.add")}
            </Button>
          }
        >
          {content.languages.map((language) => (
            <div key={language.id} className="space-y-4 border border-rule p-4">
              <div className="flex items-start justify-between gap-3">
                <FieldGrid>
                  <Field label={t("admin.proficiency")}>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={language.proficiency}
                      onChange={(event) =>
                        setLanguages(
                          content.languages.map((l) =>
                            l.id === language.id
                              ? {
                                  ...l,
                                  proficiency: Math.min(
                                    5,
                                    Math.max(1, Number(event.target.value) || 1),
                                  ),
                                }
                              : l,
                          ),
                        )
                      }
                    />
                  </Field>
                </FieldGrid>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    confirmDelete(
                      pickLocalized(language.name, lang) || language.id,
                      () =>
                        setLanguages(
                          content.languages.filter((l) => l.id !== language.id),
                        ),
                    )
                  }
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <LocalizedField
                label={t("admin.name")}
                value={language.name}
                onChange={(name) =>
                  setLanguages(
                    content.languages.map((l) =>
                      l.id === language.id ? { ...l, name } : l,
                    ),
                  )
                }
              />
              <LocalizedField
                label={t("admin.level")}
                value={language.level}
                onChange={(level) =>
                  setLanguages(
                    content.languages.map((l) =>
                      l.id === language.id ? { ...l, level } : l,
                    ),
                  )
                }
              />
            </div>
          ))}
        </Panel>
      </div>
    </AdminPage>
  )
}
