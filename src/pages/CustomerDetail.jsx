


"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { MdArrowBack, MdPerson, MdBusiness, MdPhone, MdDateRange, MdNotes } from "react-icons/md"
import { BASE_URL } from "../utils/constants"

const CustomerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/${id}`)
        const data = await response.json()
        setCustomer(data)
      } catch (error) {
        console.error("Error fetching customer detail:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomerDetail()
  }, [id])

  // Format date as D:M:Y
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}:${month}:${year}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Customer Details" showLogout={true} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Customer Details" showLogout={true} />
        <div className="text-center py-8">
          <p className="text-gray-500">Customer not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Customer Details" showLogout={true} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <MdArrowBack />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MdPerson className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium text-gray-900">
                      {`${customer.first_name} ${customer.middle_name || ""} ${customer.last_name}`.trim()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdPhone className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium text-gray-900">{customer.contact_number || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MdPerson className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Executive</p>
                    <p className="font-medium text-gray-900">{customer.executive_name || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdDateRange className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{formatDate(customer.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdBusiness className="text-gray-400 text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Interaction Type</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        customer.interaction_type === "Booked"
                          ? "bg-green-100 text-green-800"
                          : customer.interaction_type === "Meeting Done"
                            ? "bg-blue-100 text-blue-800"
                            : customer.interaction_type === "Enquiry"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.interaction_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {customer.unit_no && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <MdBusiness className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Unit Number</p>
                    <p className="font-medium text-gray-900">{customer.unit_no}</p>
                  </div>
                </div>
              </div>
            )}

            {customer.remark && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-3">
                  <MdNotes className="text-gray-400 text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Remarks</p>
                    <p className="text-gray-900 mt-1">{customer.remark}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail
