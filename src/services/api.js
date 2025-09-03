// import axios from "axios"
// import { BASE_URL } from "../utils/constants"

// // Create axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   withCredentials: true,  
// })

// // Add token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// // Handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default api


import axios from "axios"

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
import { BASE_URL } from "../utils/constants"


// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api
