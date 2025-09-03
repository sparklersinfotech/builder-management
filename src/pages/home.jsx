



"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import PieChart from "./PieChart"
import { MdDateRange, MdBookmark, MdPending, MdQuestionAnswer, MdMeetingRoom } from "react-icons/md"
import { BASE_URL } from "../utils/constants"

const Home = () => {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({
    total_bookings: 0,
    total_meetings: 0,
    total_pending: 0,
    total_enquiry: 0,
  })
  const [loading, setLoading] = useState(true)

  // Date setup
  const today = new Date()
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(today.getMonth() - 1)
  const [fromDate, setFromDate] = useState(oneMonthAgo.toISOString().split("T")[0])
  const [toDate, setToDate] = useState(today.toISOString().split("T")[0])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/counts?fromDate=${fromDate}&toDate=${toDate}`)
      const data = await response.json()
      setCounts(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [fromDate, toDate])

  const handleCardClick = (type) => {
    navigate(`/detailed-list/${type}?fromDate=${fromDate}&toDate=${toDate}`)
  }

  // Updated dashboard cards - removed total_projects
  const dashboardCards = [
    {
      title: "Total Meetings",
      count: counts.total_meetings,
      icon: <MdMeetingRoom />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      type: "total_meetings",
    },
    {
      title: "Total Bookings",
      count: counts.total_bookings,
      icon: <MdBookmark />,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      type: "total_bookings",
    },
    {
      title: "Total Pending",
      count: counts.total_pending,
      icon: <MdPending />,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      type: "total_pending",
    },
    {
      title: "Total Enquiry",
      count: counts.total_enquiry,
      icon: <MdQuestionAnswer />,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      type: "total_enquiry",
    },
  ]

  // Updated chart data - removed total_projects
  const chartData = [
    { name: "Meetings", value: counts.total_meetings, color: "#8B5CF6" },
    { name: "Bookings", value: counts.total_bookings, color: "#10B981" },
    { name: "Pending", value: counts.total_pending, color: "#F59E0B" },
    { name: "Enquiry", value: counts.total_enquiry, color: "#EF4444" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Dashboard" showLogout={true} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Date Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <MdDateRange className="text-gray-500 text-xl" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Now 4 cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.type)}
              className={`${card.bgColor} ${card.borderColor} border rounded-lg p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{loading ? "..." : card.count}</p>
                </div>
                <div className={`${card.color} text-white p-3 rounded-full text-xl`}>{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview Chart</h3>
            <PieChart data={chartData} />
          </div>

          {/* Quick Actions - Updated with all 5 options */}
          <div className="bg-white rounded-lg shadow-sm p-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/search")}
                className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium text-blue-800">Search Existing Customer</div>
                <div className="text-sm text-blue-600">Find and manage existing clients</div>
              </button>
              <button
                onClick={() => navigate("/new-customer")}
                className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium text-green-800">Add New Customer</div>
                <div className="text-sm text-green-600">Create new customer record</div>
              </button>
              <button
                onClick={() => navigate("/add-client-project")}
                className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium text-purple-800">Add New Project</div>
                <div className="text-sm text-purple-600">Create new project</div>
              </button>
              <button
                onClick={() => navigate("/add-executive")}
                className="w-full text-left p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium text-cyan-800">Add Executive</div>
                <div className="text-sm text-cyan-600">Add new executive to system</div>
              </button>
              <button
                onClick={() => navigate("/report")}
                className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium text-red-800">View Reports</div>
                <div className="text-sm text-red-600">Generate detailed reports</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
