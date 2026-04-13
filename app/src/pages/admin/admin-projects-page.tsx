import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { RouterLinkButton } from "@/components/ui/link-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickBilingual } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

export function AdminProjectsPage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, deleteProject } = usePortfolioStore()
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("admin.projects")}
        </h1>
        <RouterLinkButton to="/admin/projects/new">
          <Plus className="mr-2 size-4" />
          {t("admin.newProject")}
        </RouterLinkButton>
      </div>
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("admin.namePt")}</TableHead>
              <TableHead>{t("common.status")}</TableHead>
              <TableHead>{t("common.published")}</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId)
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {pickBilingual(p.title, i18n.language)}
                    <div className="text-xs text-muted-foreground">
                      {cat ? pickBilingual(cat.name, i18n.language) : p.categoryId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{p.status}</Badge>
                  </TableCell>
                  <TableCell>{p.published ? "yes" : "no"}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={`/admin/projects/${p.id}/edit`}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "inline-flex")}
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm("Delete project?")) deleteProject(p.id)
                      }}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
