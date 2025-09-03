"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

export default function NewCustomerScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery")
    if (searchQuery) {
      const words = searchQuery.split(" ")
      if (words.length >= 2) {
        setFirstName(words[0])
        setLastName(words[words.length - 1])
        if (words.length > 2) {
          setMiddleName(words.slice(1, -1).join(" "))
        }
      } else {
        setFirstName(searchQuery)
      }
    }
  }, [searchParams])

  const validateMobileNumber = (number) => {
    if (/^\d{0,10}$/.test(number)) {
      setMobileNo(number)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !mobileNo.trim()) {
      setError("Please fill all required fields")
      return
    }

    if (mobileNo.length !== 10) {
      setError("Mobile number must be 10 digits")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(`${BASE_URL}/add-customer`, {
        first_name: firstName.trim(),
        middle_name: middleName.trim() || null,
        last_name: lastName.trim(),
        mobile_no: mobileNo,
      })

      if (response.data.success) {
        const result = window.confirm(
          "Customer added successfully! Would you like to add an enquiry for this customer?",
        )
        if (result) {
          navigate(
            `/add-project?customerId=${response.data.customer_id}&firstName=${firstName.trim()}&middleName=${middleName.trim()}&lastName=${lastName.trim()}&mobile=${mobileNo}`,
          )
        } else {
          // Reset form
          setFirstName("")
          setMiddleName("")
          setLastName("")
          setMobileNo("")
        }
      }
    } catch (error) {
      console.error("Add customer error:", error)
      const errorMessage = error.response?.data?.message || "Failed to add customer"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Add New Customer</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Enter middle name (optional)"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNo">Mobile Number*</Label>
                <Input
                  id="mobileNo"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNo}
                  onChange={(e) => validateMobileNumber(e.target.value)}
                  maxLength={10}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                {isLoading ? "Adding Customer..." : "Add Customer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
