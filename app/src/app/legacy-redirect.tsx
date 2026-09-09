import { Navigate, useParams } from "react-router-dom"

/** /projects/:slug was the old detail URL; keep those links working. */
export function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/work/${slug ?? ""}`} replace />
}
