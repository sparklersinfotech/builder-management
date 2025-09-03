"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "./LoadingSpinner"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, loading, navigate])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isLoggedIn) {
    return <LoadingSpinner />
  }

  return children
}

export default ProtectedRoute
