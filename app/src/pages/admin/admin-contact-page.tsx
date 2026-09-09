import { useTranslation } from "react-i18next"
import { AdminPage, Field, FieldGrid, Panel } from "@/components/admin/admin-ui"
import { Input } from "@/components/ui/input"
import { usePortfolioStore } from "@/app/portfolio-store"
import type { ContactContent } from "@/types"

const FIELDS: { key: keyof ContactContent; label: string; type?: string }[] = [
  { key: "email", label: "Email", type: "email" },
  { key: "phoneDisplay", label: "Phone" },
  { key: "whatsappE164", label: "WhatsApp (digits only)" },
  { key: "linkedinUrl", label: "LinkedIn URL", type: "url" },
  { key: "githubUrl", label: "GitHub URL", type: "url" },
  { key: "portfolioUrl", label: "Portfolio URL", type: "url" },
]

export function AdminContactPage() {
  const { t } = useTranslation()
  const { content, patchContent } = usePortfolioStore()
  const { contact } = content

  return (
    <AdminPage title={t("admin.contactNav")} lead={t("admin.contactLead")}>
      <Panel>
        <FieldGrid>
          {FIELDS.map((field) => (
            <Field key={field.key} label={field.label} htmlFor={field.key}>
              <Input
                id={field.key}
                type={field.type ?? "text"}
                value={contact[field.key]}
                onChange={(event) =>
                  patchContent({
                    contact: { ...contact, [field.key]: event.target.value },
                  })
                }
              />
            </Field>
          ))}
        </FieldGrid>
      </Panel>
    </AdminPage>
  )
}
