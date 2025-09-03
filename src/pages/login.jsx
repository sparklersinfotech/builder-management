"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"
import { jwtDecode } from "jwt-decode"; // ✅ correct

import  imglogo from "../assets/roognta.png" // ✅ Ensure this path is correct


const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Please enter both email and password");
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const response = await api.post("/admin/login", formData);

    console.log("Login response:", response.data);

    const { token } = response.data;

    if (token) {
      const decoded = jwtDecode(token); // 👈 Decode token to extract user info
      console.log("Decoded token:", decoded);

      const user = {
        email: decoded.email || formData.email, // fallback if email not in token
        role: decoded.role || response.data.role,
        name: decoded.name || "Admin"
      };

      login(user, token); // ✅ Use decoded user
      navigate("/home");
    } else {
      setError("Invalid login response");
    }
  } catch (error) {
    console.error("Login Error:", error);
    setError(error.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center">
           <div className="mx-auto h-32 w-auto mb-4">
    <img
      src={imglogo} // ✅ use imported image variable
      alt="Builder Management Logo"
      className="h-full w-auto mx-auto object-contain"
    />
  </div>
          <h2 className="text-3xl font-bold text-gray-900">Builder Management</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your construction projects</p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold text-center">Admin Login</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">📧</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">🔒</div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-md transition duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">© 2025 Builder Management</p>
        </div>
      </div>
    </div>
  )
}

export default Login
