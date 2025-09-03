"use client"

import { useEffect } from "react"
import { useAuth } from "../context/auth-context"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
