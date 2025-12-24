import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

type ProtectedRouteProps = {
  children: ReactNode
  role?: string
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = localStorage.getItem("accessToken")
  const userRole = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
