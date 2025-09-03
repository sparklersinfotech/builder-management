"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { ArrowLeft, Search, RefreshCw, History, UserPlus, Loader2, X } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

export default function CustomerListScreen() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    filterCustomers()
  }, [searchQuery, customers])

  const fetchCustomers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/all-customers`)

      if (response.data.success) {
        const sortedCustomers = response.data.data.sort((a, b) => b.id - a.id)
        setCustomers(sortedCustomers)
      } else {
        alert("Failed to fetch customers")
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
      alert("Failed to fetch customers")
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchCustomers()
    setRefreshing(false)
    setCurrentPage(1)
  }

  const filterCustomers = () => {
    if (!searchQuery.trim()) {
      setFilteredCustomers(customers)
      setCurrentPage(1)
      return
    }

    const filtered = customers.filter((customer) => {
      const fullName = `${customer.first_name} ${customer.middle_name || ""} ${customer.last_name}`.toLowerCase()
      const mobile = customer.mobile_no.toLowerCase()
      const query = searchQuery.toLowerCase()
      return fullName.includes(query) || mobile.includes(query)
    })
    setFilteredCustomers(filtered)
    setCurrentPage(1)
  }

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage
    const endIndex = startIndex + recordsPerPage
    return filteredCustomers.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage)

  const handleViewHistory = (customer) => {
    const fullName = `${customer.first_name} ${customer.middle_name ? customer.middle_name + " " : ""}${customer.last_name}`
    navigate(`/reports?customerId=${customer.id}&fullName=${encodeURIComponent(fullName)}&mobile=${customer.mobile_no}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-500 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Customer List</h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Customer List</h1>
          </div>
          <Button
            onClick={onRefresh}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-600"
            disabled={refreshing}
          >
            <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-500">{customers.length}</p>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">{filteredCustomers.length}</p>
                <p className="text-sm text-gray-600">Filtered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="bg-gray-800 text-white p-4 grid grid-cols-12 gap-4 font-semibold text-sm">
              <div className="col-span-1">Sr.</div>
              <div className="col-span-5">Full Name</div>
              <div className="col-span-4">Mobile</div>
              <div className="col-span-2">Action</div>
            </div>

            {/* Table Body */}
            {filteredCustomers.length === 0 ? (
              <div className="p-8 text-center">
                <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "No customers found matching your search" : "No customers found"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => navigate("/new-customer")} className="bg-blue-500 hover:bg-blue-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add First Customer
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {getPaginatedData().map((customer, index) => (
                    <div key={customer.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                      <div className="col-span-1 text-sm font-medium">
                        {(currentPage - 1) * recordsPerPage + index + 1}
                      </div>
                      <div className="col-span-5">
                        <p className="font-medium text-sm">
                          {customer.first_name} {customer.middle_name ? customer.middle_name + " " : ""}
                          {customer.last_name}
                        </p>
                      </div>
                      <div className="col-span-4 text-sm text-gray-600">{customer.mobile_no}</div>
                      <div className="col-span-2">
                        <Button
                          onClick={() => handleViewHistory(customer)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <History className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t flex justify-center items-center space-x-2">
                    <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} variant="outline" size="sm">
                      First
                    </Button>
                    <Button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                    >
                      Next
                    </Button>
                    <Button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                    >
                      Last
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
