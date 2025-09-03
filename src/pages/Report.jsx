"use client"

import { useState } from "react"
import { Users, FileText } from "lucide-react"
import AllEnquiries from "./AllEnquiries"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const ReportDashboard = () => {

   const navigate = useNavigate()
  const [currentView, setCurrentView] = useState("/customer-list") // 'dashboard' | 'customers' | 'enquiries'

  if (currentView === "enquiries") {
    return <AllEnquiries />
  }

  if (currentView === "customers") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-balance">Customer List</h1>
            <button
  onClick={() => navigate("/customer-list")}
                className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
            >
              Back
            </button>
          </div>
        </header>

        {/* <main className="p-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Customer List Component</p>
            <p className="text-sm text-gray-500 mt-2">Import your existing customer list component here</p>
          </div>
        </main> */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
           <Header title="Reports" showBackButton={true} />

      <main className="p-4 space-y-6">
        {/* Welcome */}
        <section className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Reports</h2>
          <p className="text-gray-600">Choose an option below to view your data</p>
        </section>

        {/* Options */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* View Customers */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View Customers</h3>
                <p className="text-sm text-gray-600 mt-1">View All Customer</p>
              </div>
              <button
                  onClick={() => navigate("/customer-list")}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                View Customers
              </button>
            </div>
          </div>

          {/* View Enquiries */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View Enquiries</h3>
                <p className="text-sm text-gray-600 mt-1">Track and analyze all customer enquiries</p>
              </div>
              <button
                onClick={() => setCurrentView("enquiries")}
                className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                View Enquiries
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        {/* <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">-</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">-</div>
              <div className="text-sm text-gray-600">Total Enquiries</div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  )
}

export default ReportDashboard
