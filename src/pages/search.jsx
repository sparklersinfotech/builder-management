"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import api from "../services/api"

const Search = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchMessage, setSearchMessage] = useState("")

  let searchTimeout

  const searchCustomers = async (query) => {
    if (query.trim().length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await api.get(`/search?search=${query}`)
      if (response.data.success) {
        setSearchResults(response.data.data)
        setShowSearchResults(true)
        if (response.data.data.length === 0) {
          setSearchMessage("Customer record not found. Please add this customer.")
        } else {
          setSearchMessage("")
        }
      }
    } catch (error) {
      console.error("Search error:", error)
      alert("Failed to search customers")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e) => {
    const text = e.target.value
    setSearchQuery(text)
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      searchCustomers(text)
    }, 500)
  }

  const handleCustomerSelect = (customer) => {
    setShowSearchResults(false)
    setSearchQuery("")
    navigate(
      `/add-project?customerId=${customer.id}&firstName=${customer.first_name}&middleName=${customer.middle_name || ""}&lastName=${customer.last_name}&mobile=${customer.mobile_no}`,
    )
  }

  const navigateToAddCustomer = () => {
    navigate(`/new-customer?searchQuery=${searchQuery}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Customer Management" showBackButton={true} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>🔍</span>
              <span>Search Existing Customer</span>
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or mobile number..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3 text-gray-400">🔍</div>
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {/* Search Results */}
            {showSearchResults && (
              <div className="bg-white border rounded-lg max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="divide-y">
                    {searchResults.map((customer) => (
                      <div
                        key={customer.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => handleCustomerSelect(customer)}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {customer.first_name} {customer.middle_name ? customer.middle_name + " " : ""}
                            {customer.last_name}
                          </p>
                          <p className="text-sm text-gray-600">{customer.mobile_no}</p>
                        </div>
                        <div className="text-gray-400">→</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-4">👤</div>
                    <p className="text-gray-600 mb-4">{searchMessage}</p>
                    <button
                      onClick={navigateToAddCustomer}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      👤 Add New Customer
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={() => navigate("/new-customer")}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">👤</span>
                <span>Add New Customer</span>
              </div>
              <span>→</span>
            </button>

            <button
              onClick={() => navigate("/customer-list")}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📋</span>
                <span>View All Customers</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
