import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAdmin, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-medium text-stone-600">
        Checking admin access…
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
