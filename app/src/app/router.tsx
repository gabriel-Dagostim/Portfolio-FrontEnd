import { Navigate, createBrowserRouter } from "react-router-dom"
import { LegacyProjectRedirect } from "@/app/legacy-redirect"
import { PublicShell } from "@/components/layout/public-shell"
import { AdminShell } from "@/components/layout/admin-shell"
import { HomePage } from "@/pages/public/home-page"
import { WorkPage } from "@/pages/public/work-page"
import { ProjectDetailPage } from "@/pages/public/project-detail-page"
import {
  AutomationsPage,
  InfrastructurePage,
  SystemsPage,
} from "@/pages/public/collection-page"
import { AboutPage } from "@/pages/public/about-page"
import { SkillsPage } from "@/pages/public/skills-page"
import { ContactPage } from "@/pages/public/contact-page"
import { AdminLoginPage } from "@/pages/admin/admin-login-page"
import { AdminOverviewPage } from "@/pages/admin/admin-overview-page"
import { AdminProjectsPage } from "@/pages/admin/admin-projects-page"
import { AdminProjectFormPage } from "@/pages/admin/admin-project-form-page"
import { AdminProfilePage } from "@/pages/admin/admin-profile-page"
import { AdminCareerPage } from "@/pages/admin/admin-career-page"
import { AdminSkillsPage } from "@/pages/admin/admin-skills-page"
import { AdminContactPage } from "@/pages/admin/admin-contact-page"
import { AdminFlowPage } from "@/pages/admin/admin-flow-page"
import { AdminTaxonomyPage } from "@/pages/admin/admin-taxonomy-page"
import { AdminSettingsPage } from "@/pages/admin/admin-settings-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work", element: <WorkPage /> },
      { path: "work/:slug", element: <ProjectDetailPage /> },
      { path: "systems", element: <SystemsPage /> },
      { path: "infrastructure", element: <InfrastructurePage /> },
      { path: "automations", element: <AutomationsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "skills", element: <SkillsPage /> },
      { path: "contact", element: <ContactPage /> },

      // Paths the old site shipped with, keep the links people already have.
      { path: "projects", element: <Navigate to="/work" replace /> },
      { path: "projects/:slug", element: <LegacyProjectRedirect /> },
      { path: "sistemas", element: <Navigate to="/systems" replace /> },
      { path: "estrela", element: <Navigate to="/systems" replace /> },
      { path: "infra", element: <Navigate to="/infrastructure" replace /> },
      { path: "flow", element: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "projects", element: <AdminProjectsPage /> },
      { path: "projects/new", element: <AdminProjectFormPage /> },
      { path: "projects/:projectId", element: <AdminProjectFormPage /> },
      { path: "profile", element: <AdminProfilePage /> },
      { path: "career", element: <AdminCareerPage /> },
      { path: "skills", element: <AdminSkillsPage /> },
      { path: "contact", element: <AdminContactPage /> },
      { path: "flow", element: <AdminFlowPage /> },
      { path: "taxonomy", element: <AdminTaxonomyPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
])

