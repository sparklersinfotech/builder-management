// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Label } from "../components/ui/label"
// import { Textarea } from "../components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
// import { ArrowLeft, User, Plus, Calendar, Loader2 } from "lucide-react"
// import axios from "axios"
// import { BASE_URL } from "../utils/constants"

// export default function AddProjectScreen() {
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const [customer, setCustomer] = useState(null)
//   const [unitNo, setUnitNo] = useState("")
//   const [remark, setRemark] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   // Dropdown states
//   const [projects, setProjects] = useState([])
//   const [selectedProject, setSelectedProject] = useState("")
//   const [executives, setExecutives] = useState([])
//   const [selectedExecutive, setSelectedExecutive] = useState("")

//   // Interaction type
//   const interactionTypes = ["Call Receive", "Enquiry", "Meeting Done", "Booked"]
//   const [selectedInteraction, setSelectedInteraction] = useState("Enquiry")

//   // Date
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0])

//   useEffect(() => {
//     // Get customer data from URL params
//     const customerId = searchParams.get("customerId")
//     const firstName = searchParams.get("firstName")
//     const middleName = searchParams.get("middleName")
//     const lastName = searchParams.get("lastName")
//     const mobile = searchParams.get("mobile")

//     if (customerId && firstName && lastName && mobile) {
//       setCustomer({
//         id: Number.parseInt(customerId),
//         first_name: firstName,
//         middle_name: middleName || "",
//         last_name: lastName,
//         mobile_no: mobile,
//       })
//     }

//     fetchProjects()
//     fetchExecutives()
//   }, [searchParams])

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/projects-customer`)
//       if (response.data.success) {
//         setProjects(response.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching projects:", error)
//     }
//   }

//   const fetchExecutives = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/executives`)
//       if (response.data.success) {
//         setExecutives(response.data.data)
//       }
//     } catch (error) {
//       console.error("Error fetching executives:", error)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!selectedProject || !selectedExecutive || !selectedInteraction) {
//       setError("Please fill all required fields")
//       return
//     }

//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await axios.post(`${BASE_URL}/add-project-details`, {
//         customer_id: customer?.id,
//         project_id: selectedProject,
//         executive_id: selectedExecutive,
//         interaction_type: selectedInteraction,
//         date: date,
//         unit_no: unitNo || null,
//         remark: remark || null,
//       })

//      if (response.data.success) {
//   alert("Enquiry details added successfully!");
//   navigate(-1); // ✅ directly back jato
// }
//     } catch (error) {
//       console.error("Add Enquiry error:", error)
//       const errorMessage = error.response?.data?.message || "Failed to add Enquiry details"
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!customer) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <header className="bg-blue-500 text-white shadow-lg">
//           <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
//             <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-xl font-bold">Add Enquiry Details</h1>
//           </div>
//         </header>
//         <div className="container mx-auto px-4 py-8 text-center">
//           <p className="text-red-600">No customer data found. Please select a customer first.</p>
//           <Button onClick={() => navigate(-1)} className="mt-4">
//             Go Back
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-500 text-white shadow-lg">
//         <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
//           <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-xl font-bold">Add Enquiry Details</h1>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-6 max-w-2xl">
//         {/* Customer Info Card */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <User className="h-5 w-5 text-blue-500" />
//               <span>Customer Information</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <p className="text-lg font-semibold">
//                 {customer.first_name} {customer.middle_name ? customer.middle_name + " " : ""}
//                 {customer.last_name}
//               </p>
//               <p className="text-gray-600">{customer.mobile_no}</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Form */}
//         <Card>
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

//               <div className="space-y-2">
//                 <Label htmlFor="project">Project*</Label>
//                 <select
//                   id="project"
//                   value={selectedProject}
//                   onChange={(e) => setSelectedProject(e.target.value)}
//                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                   required
//                 >
//                   <option value="">Select Project</option>
//                   {projects.map((project) => (
//                     <option key={project.id} value={project.id}>
//                       {project.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="executive">Executive*</Label>
//                 <select
//                   id="executive"
//                   value={selectedExecutive}
//                   onChange={(e) => setSelectedExecutive(e.target.value)}
//                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                   required
//                 >
//                   <option value="">Select Executive</option>
//                   {executives.map((executive) => (
//                     <option key={executive.id} value={executive.id}>
//                       {executive.full_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-3">
//                 <Label>Interaction Type*</Label>
//                 <div className="space-y-2">
//                   {interactionTypes.map((type) => (
//                     <div
//                       key={type}
//                       className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
//                         selectedInteraction === type
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => setSelectedInteraction(type)}
//                     >
//                       <span className="font-medium">{type}</span>
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           selectedInteraction === type ? "border-blue-500" : "border-gray-300"
//                         }`}
//                       >
//                         {selectedInteraction === type && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="date">Date*</Label>
//                 <div className="relative">
//                   <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//                   <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="unitNo">Unit No</Label>
//                 <Input
//                   id="unitNo"
//                   placeholder="Enter unit number"
//                   value={unitNo}
//                   onChange={(e) => setUnitNo(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="remark">Remark</Label>
//                 <Textarea
//                   id="remark"
//                   placeholder="Enter remark"
//                   value={remark}
//                   onChange={(e) => setRemark(e.target.value)}
//                   rows={3}
//                 />
//               </div>

//               <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
//                 {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
//                 {isLoading ? "Adding Details..." : "Submit Details"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft, User, Plus, Calendar, Loader2 } from "lucide-react"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

export default function AddProjectScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [customer, setCustomer] = useState(null)
  const [unitNo, setUnitNo] = useState("")
  const [remark, setRemark] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Dropdown states
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState("")
  const [executives, setExecutives] = useState([])
  const [selectedExecutive, setSelectedExecutive] = useState("")

  // Interaction type
  const interactionTypes = ["Call Receive", "Enquiry", "Meeting Done", "Booked"]
  const [selectedInteraction, setSelectedInteraction] = useState("Enquiry")

  // Date - format as dd/mm/yyyy
  const [date, setDate] = useState(formatDateToDDMMYYYY(new Date()))

  // Function to format date to dd/mm/yyyy
  function formatDateToDDMMYYYY(date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Function to convert dd/mm/yyyy to yyyy-mm-dd for input[type="date"]
  function formatDDMMYYYYToInputDate(dateString) {
    if (!dateString) return ""
    const parts = dateString.split('/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
    return dateString
  }

  // Function to convert yyyy-mm-dd to dd/mm/yyyy
  function formatInputDateToDDMMYYYY(dateString) {
    if (!dateString) return ""
    const parts = dateString.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return dateString
  }

  useEffect(() => {
    // Get customer data from URL params
    const customerId = searchParams.get("customerId")
    const firstName = searchParams.get("firstName")
    const middleName = searchParams.get("middleName")
    const lastName = searchParams.get("lastName")
    const mobile = searchParams.get("mobile")

    if (customerId && firstName && lastName && mobile) {
      setCustomer({
        id: Number.parseInt(customerId),
        first_name: firstName,
        middle_name: middleName || "",
        last_name: lastName,
        mobile_no: mobile,
      })
    }

    fetchProjects()
    fetchExecutives()
  }, [searchParams])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects-customer`)
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const fetchExecutives = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/executives`)
      if (response.data.success) {
        setExecutives(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching executives:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedProject || !selectedExecutive || !selectedInteraction) {
      setError("Please fill all required fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Convert date back to yyyy-mm-dd format for API if needed
      let apiDate = date
      if (date.includes('/')) {
        const parts = date.split('/')
        apiDate = `${parts[2]}-${parts[1]}-${parts[0]}`
      }

      const response = await axios.post(`${BASE_URL}/add-project-details`, {
        customer_id: customer?.id,
        project_id: selectedProject,
        executive_id: selectedExecutive,
        interaction_type: selectedInteraction,
        date: apiDate,
        unit_no: unitNo || null,
        remark: remark || null,
      })

      if (response.data.success) {
        alert("Enquiry details added successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Add Enquiry error:", error)
      const errorMessage = error.response?.data?.message || "Failed to add Enquiry details"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-500 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Add Enquiry Details</h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-600">No customer data found. Please select a customer first.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Button onClick={() => navigate(-1)} variant="ghost" size="sm" className="text-white hover:bg-blue-600">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Add Enquiry Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Customer Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-500" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {customer.first_name} {customer.middle_name ? customer.middle_name + " " : ""}
                {customer.last_name}
              </p>
              <p className="text-gray-600">{customer.mobile_no}</p>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="project">Project*</Label>
                <select
                  id="project"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="executive">Executive*</Label>
                <select
                  id="executive"
                  value={selectedExecutive}
                  onChange={(e) => setSelectedExecutive(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  <option value="">Select Executive</option>
                  {executives.map((executive) => (
                    <option key={executive.id} value={executive.id}>
                      {executive.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label>Interaction Type*</Label>
                <div className="space-y-2">
                  {interactionTypes.map((type) => (
                    <div
                      key={type}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedInteraction === type
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedInteraction(type)}
                    >
                      <span className="font-medium">{type}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedInteraction === type ? "border-blue-500" : "border-gray-300"
                        }`}
                      >
                        {selectedInteraction === type && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date*</Label>
                <div className="relative">
                  <Input 
                    id="date" 
                    type="date" 
                    value={formatDDMMYYYYToInputDate(date)} 
                    onChange={(e) => setDate(formatInputDateToDDMMYYYY(e.target.value))} 
                    required 
                  />
                  <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-sm text-gray-500">Selected date: {date}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitNo">Unit No</Label>
                <Input
                  id="unitNo"
                  placeholder="Enter unit number"
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea
                  id="remark"
                  placeholder="Enter remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                {isLoading ? "Adding Details..." : "Submit Details"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}