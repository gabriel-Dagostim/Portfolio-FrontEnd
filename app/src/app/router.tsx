import { createBrowserRouter } from "react-router-dom"
import { PublicShell } from "@/components/layout/public-shell"
import { AdminShell } from "@/components/layout/admin-shell"
import { HomePage } from "@/pages/public/home-page"
import { ProjectsPage } from "@/pages/public/projects-page"
import { ProjectDetailPage } from "@/pages/public/project-detail-page"
import { AboutPage } from "@/pages/public/about-page"
import { SkillsPage } from "@/pages/public/skills-page"
import { ContactPage } from "@/pages/public/contact-page"
import { AdminLoginPage } from "@/pages/admin/admin-login-page"
import { AdminDashboardPage } from "@/pages/admin/admin-dashboard-page"
import { AdminProjectsPage } from "@/pages/admin/admin-projects-page"
import { AdminProjectFormPage } from "@/pages/admin/admin-project-form-page"
import { AdminCategoriesPage } from "@/pages/admin/admin-categories-page"
import { AdminTechnologiesPage } from "@/pages/admin/admin-technologies-page"
import { AdminSettingsPage } from "@/pages/admin/admin-settings-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:slug", element: <ProjectDetailPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "skills", element: <SkillsPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "projects", element: <AdminProjectsPage /> },
      { path: "projects/new", element: <AdminProjectFormPage /> },
      { path: "projects/:projectId/edit", element: <AdminProjectFormPage /> },
      { path: "categories", element: <AdminCategoriesPage /> },
      { path: "technologies", element: <AdminTechnologiesPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
])
