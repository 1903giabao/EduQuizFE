import { Navigate, Outlet } from "react-router-dom"
import { ReactNode } from "react"
import { useAuth } from "../../context/AuthContext"

type ProtectedRouteProps = {
  roles?: string[];
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <Outlet></Outlet>
}

export default ProtectedRoute
