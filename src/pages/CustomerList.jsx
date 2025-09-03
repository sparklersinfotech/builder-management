"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import api from "../services/api"
import * as XLSX from "xlsx"
import { MdFileDownload } from "react-icons/md"

const CustomerList = () => {
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
      const response = await api.get("/all-customers")

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

  const exportToExcel = () => {
    if (filteredCustomers.length === 0) return

    // Prepare the data for Excel export
    const excelData = filteredCustomers.map((customer, index) => ({
      "Sr. No.": index + 1,
      "First Name": customer.first_name || 'N/A',
      "Middle Name": customer.middle_name || 'N/A',
      "Last Name": customer.last_name || 'N/A',
      "Full Name": `${customer.first_name} ${customer.middle_name || ""} ${customer.last_name}`.trim(),
      "Mobile Number": customer.mobile_no || "N/A",
      
      "Created At": customer.created_at ? new Date(customer.created_at).toLocaleString() : 'N/A'
    }))

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData)
    
    // Create workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Customers")
    
    // Generate file name
    const fileName = `Customer_List_${new Date().toISOString().split('T')[0]}.xlsx`
    
    // Export the file
    XLSX.writeFile(wb, fileName)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Customer List" showBackButton={true} />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Customer List" showBackButton={true} />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Search and Export Bar */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3 text-gray-400">🔍</div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={exportToExcel}
              disabled={filteredCustomers.length === 0}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md ${
                filteredCustomers.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white transition-colors whitespace-nowrap`}
            >
              <MdFileDownload />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-500">{customers.length}</p>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">{filteredCustomers.length}</p>
                <p className="text-sm text-gray-600">Search Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table Header */}
          <div className="bg-gray-800 text-white p-4 grid grid-cols-12 gap-4 font-semibold text-sm rounded-t-lg">
            <div className="col-span-1">Sr.</div>
            <div className="col-span-5">Full Name</div>
            <div className="col-span-4">Mobile</div>
            <div className="col-span-2">Action</div>
          </div>

          {/* Table Body */}
          {filteredCustomers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">👤</div>
              <p className="text-gray-600 mb-4">
                {searchQuery ? "No customers found matching your search" : "No customers found"}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate("/ -customer")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  👤 Add First Customer
                </button>
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
                      <button
                        onClick={() => handleViewHistory(customer)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        📊 View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Last
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerList