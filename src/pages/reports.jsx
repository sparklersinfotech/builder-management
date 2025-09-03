// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import Header from "../components/Header"
// import api from "../services/api"

// const Reports = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [customer, setCustomer] = useState(null)
//   const [projectDetails, setProjectDetails] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProject, setSelectedProject] = useState(null)
//   const [modalVisible, setModalVisible] = useState(false)

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search)
//     const customerId = searchParams.get("customerId")
//     const fullName = searchParams.get("fullName")
//     const mobile = searchParams.get("mobile")

//     if (customerId && fullName && mobile) {
//       const customerData = {
//         id: Number.parseInt(customerId),
//         full_name: decodeURIComponent(fullName),
//         mobile_no: mobile,
//       }
//       setCustomer(customerData)
//       fetchProjectDetails(Number.parseInt(customerId))
//     }
//   }, [location])

//   const fetchProjectDetails = async (customerId) => {
//     try {
//       setIsLoading(true)
//       const response = await api.get(`/customer-details/${customerId}`)
//       if (response.data.success) {
//         setProjectDetails(response.data.data)
//       } else {
//         alert("Failed to fetch project details")
//       }
//     } catch (error) {
//       console.error("Error fetching project details:", error)
//       alert("Failed to fetch project details")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleProjectPress = (project) => {
//     setSelectedProject(project)
//     setModalVisible(true)
//   }

//   const handleAddEnquiry = () => {
//     if (customer) {
//       const nameParts = customer.full_name.split(" ")
//       const firstName = nameParts[0]
//       const lastName = nameParts[nameParts.length - 1]
//       const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : ""

//       navigate(
//         `/add-project?customerId=${customer.id}&firstName=${firstName}&middleName=${middleName}&lastName=${lastName}&mobile=${customer.mobile_no}`,
//       )
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Booked":
//         return "bg-green-500"
//       case "Meeting Done":
//         return "bg-orange-500"
//       case "Enquiry":
//         return "bg-blue-500"
//       case "Call Receive":
//         return "bg-purple-500"
//       default:
//         return "bg-gray-500"
//     }
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     })
//   }

//   if (!customer) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header title="Reports" showBackButton={true} />
//         <div className="container mx-auto px-4 py-8 text-center">
//           <p className="text-red-600">No customer data found</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header title="Enquiry Reports" showBackButton={true} />
//         <div className="container mx-auto px-4 py-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading project details...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title="Enquiry Reports" showBackButton={true} />

//       <div className="container mx-auto px-4 py-6 max-w-6xl">
//         {/* Customer Info Card with Add Enquiry Button */}
//         <div className="bg-white rounded-lg shadow-sm mb-6">
//           <div className="px-6 py-4 border-b">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <span>👤</span>
//               <span>Customer Details</span>
//             </h3>
//           </div>
//           <div className="p-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-lg font-semibold">{customer.full_name}</p>
//                 <p className="text-gray-600">{customer.mobile_no}</p>
//               </div>
//               <button
//                 onClick={handleAddEnquiry}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//               >
//                 ➕ Add Enquiry
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Card */}
//         <div className="bg-white rounded-lg shadow-sm mb-6">
//           <div className="p-6">
//             <div className="grid grid-cols-2 gap-4 text-center">
//               <div>
//                 <p className="text-2xl font-bold text-blue-500">{projectDetails.length}</p>
//                 <p className="text-sm text-gray-600">Total Enquiry</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-blue-500">
//                   {projectDetails.filter((p) => p.interaction_type === "Booked").length}
//                 </p>
//                 <p className="text-sm text-gray-600">Booked</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm">
//           {/* Table Header */}
//           <div className="bg-gray-800 text-white p-4 grid grid-cols-12 gap-4 font-semibold text-sm rounded-t-lg">
//             <div className="col-span-1">Sr.</div>
//             <div className="col-span-4">Project</div>
//             <div className="col-span-3">Executive</div>
//             <div className="col-span-4">Status</div>
//           </div>

//           {/* Table Body */}
//           {projectDetails.length === 0 ? (
//             <div className="p-8 text-center">
//               <div className="text-4xl mb-4">📄</div>
//               <p className="text-gray-600 mb-4">No Enquiry details found for this customer</p>
//               <button
//                 onClick={handleAddEnquiry}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//               >
//                 ➕ Add Enquiry
//               </button>
//             </div>
//           ) : (
//             <div className="divide-y">
//               {projectDetails.map((project, index) => (
//                 <div
//                   key={project.id}
//                   className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 cursor-pointer"
//                   onClick={() => handleProjectPress(project)}
//                 >
//                   <div className="col-span-1 text-sm font-medium">{index + 1}</div>
//                   <div className="col-span-4">
//                     <p className="font-medium text-sm">{project.project_name || "N/A"}</p>
//                   </div>
//                   <div className="col-span-3 text-sm text-gray-600">{project.executive_name || "N/A"}</div>
//                   <div className="col-span-4">
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(project.interaction_type)}`}
//                     >
//                       {project.interaction_type}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Detail Modal */}
//       {modalVisible && selectedProject && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
//     <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto m-4 w-full shadow-xl">
//       <div className="px-6 py-4 border-b flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Project Details</h3>
//               <button onClick={() => setModalVisible(false)} className="text-gray-400 hover:text-gray-600">
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Project Info Card */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3 flex items-center space-x-2">
//                   <span>📄</span>
//                   <span>Project Information</span>
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Project Name:</span>
//                     <span className="text-gray-900">{selectedProject.project_name || "N/A"}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Executive:</span>
//                     <span className="text-gray-900">{selectedProject.executive_name || "N/A"}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium text-gray-600">Status:</span>
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(selectedProject.interaction_type)}`}
//                     >
//                       {selectedProject.interaction_type}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Interaction Details Card */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3 flex items-center space-x-2">
//                   <span>📅</span>
//                   <span>Interaction Details</span>
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Date:</span>
//                     <span className="text-gray-900">{formatDate(selectedProject.date)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Unit No:</span>
//                     <span className="text-gray-900">{selectedProject.unit_no || "Not specified"}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Remarks Card */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3 flex items-center space-x-2">
//                   <span>📝</span>
//                   <span>Remarks</span>
//                 </h4>
//                 <p className="text-gray-900 italic">{selectedProject.remark || "No remarks added"}</p>
//               </div>

//               {/* Customer Info Card */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3 flex items-center space-x-2">
//                   <span>👤</span>
//                   <span>Customer Information</span>
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Name:</span>
//                     <span className="text-gray-900">{customer.full_name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium text-gray-600">Mobile:</span>
//                     <span className="text-gray-900">{customer.mobile_no}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Reports


"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import api from "../services/api"
import * as XLSX from "xlsx"
import { MdFileDownload } from "react-icons/md"

const Reports = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [customer, setCustomer] = useState(null)
  const [projectDetails, setProjectDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const customerId = searchParams.get("customerId")
    const fullName = searchParams.get("fullName")
    const mobile = searchParams.get("mobile")

    if (customerId && fullName && mobile) {
      const customerData = {
        id: Number.parseInt(customerId),
        full_name: decodeURIComponent(fullName),
        mobile_no: mobile,
      }
      setCustomer(customerData)
      fetchProjectDetails(Number.parseInt(customerId))
    }
  }, [location])

  const fetchProjectDetails = async (customerId) => {
    try {
      setIsLoading(true)
      const response = await api.get(`/customer-details/${customerId}`)
      if (response.data.success) {
        setProjectDetails(response.data.data)
      } else {
        alert("Failed to fetch project details")
      }
    } catch (error) {
      console.error("Error fetching project details:", error)
      alert("Failed to fetch project details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProjectPress = (project) => {
    setSelectedProject(project)
    setModalVisible(true)
  }

  const handleAddEnquiry = () => {
    if (customer) {
      const nameParts = customer.full_name.split(" ")
      const firstName = nameParts[0]
      const lastName = nameParts[nameParts.length - 1]
      const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : ""

      navigate(
        `/add-project?customerId=${customer.id}&firstName=${firstName}&middleName=${middleName}&lastName=${lastName}&mobile=${customer.mobile_no}`,
      )
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "bg-green-500"
      case "Meeting Done":
        return "bg-orange-500"
      case "Enquiry":
        return "bg-blue-500"
      case "Call Receive":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTimeForExcel = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  const exportToExcel = () => {
    if (projectDetails.length === 0) return

    // Prepare the data for Excel export with all fields from modal
    const excelData = projectDetails.map((project, index) => ({
      "Sr. No.": index + 1,
      "Customer Name": customer.full_name,
      "Customer Mobile": customer.mobile_no,
      "Project Name": project.project_name || "N/A",
      "Executive Name": project.executive_name || "N/A",
      "Status": project.interaction_type || "N/A",
      "Date": formatDateTimeForExcel(project.date),
      "Unit No": project.unit_no || "Not specified",
      "Remarks": project.remark || "No remarks added",
      "Follow Up Date": formatDateTimeForExcel(project.follow_up_date),
      "Project Type": project.project_type || "N/A",
      "Budget": project.budget || "N/A",
      "Source": project.source || "N/A"
    }))

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData)
    
    // Set column widths
    const wscols = [
      {wch: 8},  // Sr. No.
      {wch: 20}, // Customer Name
      {wch: 15}, // Customer Mobile
      {wch: 25}, // Project Name
      {wch: 20}, // Executive Name
      {wch: 15}, // Status
      {wch: 20}, // Date
      {wch: 10}, // Unit No
      {wch: 40}, // Remarks
      {wch: 20}, // Follow Up Date
      {wch: 15}, // Project Type
      {wch: 15}, // Budget
      {wch: 15}  // Source
    ]
    ws['!cols'] = wscols
    
    // Create workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "ProjectDetails")
    
    // Generate file name with customer name
    const fileName = `Project_Details_${customer.full_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`
    
    // Export the file
    XLSX.writeFile(wb, fileName)
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Reports" showBackButton={true} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-600">No customer data found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Enquiry Reports" showBackButton={true} />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Enquiry Reports" showBackButton={true} />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Customer Info Card with Add Enquiry and Export Buttons */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>👤</span>
              <span>Customer Details</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-lg font-semibold">{customer.full_name}</p>
                <p className="text-gray-600">{customer.mobile_no}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddEnquiry}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md whitespace-nowrap"
                >
                  ➕ Add Enquiry
                </button>
                <button
                  onClick={exportToExcel}
                  disabled={projectDetails.length === 0}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                    projectDetails.length === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white transition-colors whitespace-nowrap`}
                >
                  <MdFileDownload />
                  <span>Export to Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-500">{projectDetails.length}</p>
                <p className="text-sm text-gray-600">Total Enquiry</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">
                  {projectDetails.filter((p) => p.interaction_type === "Booked").length}
                </p>
                <p className="text-sm text-gray-600">Booked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table Header */}
          <div className="bg-gray-800 text-white p-4 grid grid-cols-12 gap-4 font-semibold text-sm rounded-t-lg">
            <div className="col-span-1">Sr.</div>
            <div className="col-span-4">Project</div>
            <div className="col-span-3">Executive</div>
            <div className="col-span-4">Status</div>
          </div>

          {/* Table Body */}
          {projectDetails.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">📄</div>
              <p className="text-gray-600 mb-4">No Enquiry details found for this customer</p>
              <button
                onClick={handleAddEnquiry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                ➕ Add Enquiry
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {projectDetails.map((project, index) => (
                <div
                  key={project.id}
                  className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProjectPress(project)}
                >
                  <div className="col-span-1 text-sm font-medium">{index + 1}</div>
                  <div className="col-span-4">
                    <p className="font-medium text-sm">{project.project_name || "N/A"}</p>
                  </div>
                  <div className="col-span-3 text-sm text-gray-600">{project.executive_name || "N/A"}</div>
                  <div className="col-span-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(project.interaction_type)}`}
                    >
                      {project.interaction_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {modalVisible && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto m-4 w-full">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <button onClick={() => setModalVisible(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Info Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <span>📄</span>
                  <span>Project Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Project Name:</span>
                    <span className="text-gray-900">{selectedProject.project_name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Executive:</span>
                    <span className="text-gray-900">{selectedProject.executive_name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Interaction Type:</span>
                    <span className="text-gray-900">{selectedProject.project_id || "N/A"}</span>
                  </div>
                  
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(selectedProject.interaction_type)}`}
                    >
                      {selectedProject.interaction_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interaction Details Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <span>📅</span>
                  <span>Interaction Details</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Date:</span>
                    <span className="text-gray-900">{formatDate(selectedProject.date)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Unit No:</span>
                    <span className="text-gray-900">{selectedProject.unit_no || ""}</span>
                  </div>
                </div>
              </div>

              {/* Remarks Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <span>📝</span>
                  <span>Remarks</span>
                </h4>
                <p className="text-gray-900 italic">{selectedProject.remark || "No remarks added"}</p>
              </div>

              {/* Customer Info Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <span>👤</span>
                  <span>Customer Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-900">{customer.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Mobile:</span>
                    <span className="text-gray-900">{customer.mobile_no}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports