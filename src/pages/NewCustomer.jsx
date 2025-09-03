"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import api from "../services/api"
import Swal from "sweetalert2";

const NewCustomer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("searchQuery")
    if (searchQuery) {
      const words = searchQuery.split(" ")
      if (words.length >= 2) {
        setFormData((prev) => ({
          ...prev,
          firstName: words[0],
          lastName: words[words.length - 1],
          middleName: words.length > 2 ? words.slice(1, -1).join(" ") : "",
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          firstName: searchQuery,
        }))
      }
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "mobileNo") {
      // Only allow digits and max 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.mobileNo.trim()) {
//       setError("Please fill all required fields")
//       return
//     }

//     if (formData.mobileNo.length !== 10) {
//       setError("Mobile number must be 10 digits")
//       return
//     }

//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await api.post("/add-customer", {
//         first_name: formData.firstName.trim(),
//         middle_name: formData.middleName.trim() || null,
//         last_name: formData.lastName.trim(),
//         mobile_no: formData.mobileNo,
//       })

//       if (response.data.success) {
//   alert("Customer added successfully!"); 
//   navigate("/customer-list"); 
// }

//     } catch (error) {
//       console.error("Add customer error:", error)
//       const errorMessage = error.response?.data?.message || "Failed to add customer"
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.mobileNo.trim()) {
    setError("Please fill all required fields");
    return;
  }

  if (formData.mobileNo.length !== 10) {
    setError("Mobile number must be 10 digits");
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const response = await api.post("/add-customer", {
      first_name: formData.firstName.trim(),
      middle_name: formData.middleName.trim() || null,
      last_name: formData.lastName.trim(),
      mobile_no: formData.mobileNo,
    });

    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Customer added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/customer-list");
      }, 2000);
    }
  } catch (error) {
    console.error("Add customer error:", error);
    const errorMessage = error.response?.data?.message || "Failed to add customer";

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: errorMessage,
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Add New Customer" showBackButton={true} />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>👤</span>
              <span>Customer Information</span>
            </h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  placeholder="Enter middle name (optional)"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mobile Number*</label>
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Adding Customer..." : "👤 Add Customer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCustomer
