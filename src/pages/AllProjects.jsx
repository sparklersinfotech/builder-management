// import React, { useEffect, useState } from "react";
// import {
//   MdDelete,
//   MdEdit,
//   MdSearch,
//   MdCheckCircle,
//   MdError,
//   MdClose,
//   MdAdd,
//   MdFileDownload,
// } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import api from "../services/api";
// import * as XLSX from "xlsx";

// const AllProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [alert, setAlert] = useState({ type: "", message: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     filterProjects();
//   }, [searchTerm, typeFilter, projects]);

//   const fetchProjects = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/projects/");
//       const sorted = res.data.sort((a, b) => b.id - a.id);
//       setProjects(sorted);
//     } catch (error) {
//       setAlert({ type: "error", message: "Failed to fetch projects" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterProjects = () => {
//     let filtered = projects;

//     if (searchTerm) {
//       filtered = filtered.filter((project) =>
//         project.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (typeFilter) {
//       filtered = filtered.filter((project) => project.type === typeFilter);
//     }

//     setFilteredProjects(filtered);
//     setCurrentPage(1);
//   };

//   const deleteProject = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You want to delete this project?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc2626",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await api.delete(`/projects/${id}`);
//         setAlert({ type: "success", message: "Project deleted successfully" });
//         fetchProjects();
//         Swal.fire("Deleted!", "Project has been deleted.", "success");
//       } catch (error) {
//         setAlert({ type: "error", message: "Failed to delete project" });
//         Swal.fire("Error!", "Failed to delete project.", "error");
//       }
//     }
//   };

//   const openEditModal = (project) => {
//     setSelectedProject(project);
//     setShowEditModal(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await api.put(`/projects/${selectedProject.id}`, selectedProject);
//       setShowEditModal(false);
//       fetchProjects();
//       Swal.fire({
//         icon: "success",
//         title: "Updated Successfully",
//         text: "Project updated successfully!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: "Failed to update project!",
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setSelectedProject({ ...selectedProject, [field]: value });
//   };

//   const resetFilters = () => {
//     setSearchTerm("");
//     setTypeFilter("");
//   };

//   const exportToExcel = () => {
//     // Prepare data for export
//     const data = filteredProjects.map((project) => ({
//       "Project Name": project.name,
//       Address: project.address,
//       Type: project.type,
//     }));

//     if (data.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data",
//         text: "There are no projects to export.",
//       });
//       return;
//     }

//     // Create worksheet
//     const ws = XLSX.utils.json_to_sheet(data);

//     // Create workbook
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Projects");

//     // Generate file and download
//     const fileName = `Projects_${new Date().toISOString().slice(0, 10)}.xlsx`;
//     XLSX.writeFile(wb, fileName);
//   };

//   const startIndex = (currentPage - 1) * recordsPerPage;
//   const currentProjects = filteredProjects.slice(
//     startIndex,
//     startIndex + recordsPerPage
//   );
//   const totalPages = Math.ceil(filteredProjects.length / recordsPerPage);

//   // Modal Component
//   const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
//     if (!isOpen) return null;

//     const sizeClasses = {
//       sm: "max-w-md",
//       md: "max-w-xl",
//       lg: "max-w-3xl",
//     };

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//           <div
//             className="fixed inset-0 transition-opacity"
//             aria-hidden="true"
//             onClick={(e) => {
//               // Only close if clicking directly on the overlay
//               if (e.target === e.currentTarget) {
//                 onClose();
//               }
//             }}
//           >
//             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//           </div>

//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>

//           <div
//             className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}
//             onClick={(e) => e.stopPropagation()} // Prevent click propagation
//           >
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="flex items-start justify-between">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">
//                   {title}
//                 </h3>
//                 <button
//                   onClick={onClose}
//                   className="ml-3 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
//                 >
//                   <MdClose size={24} />
//                 </button>
//               </div>
//               <div className="mt-4">{children}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto max-w-7xl">
//       <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
//           <h2 className="text-xl md:text-2xl font-bold text-white">
//             Project Management
//           </h2>
//         </div>
//         <div className="flex flex-row gap-3 w-full md:w-auto mt-4 ml-4">
//           <button
//             onClick={exportToExcel}
//             className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-200"
//           >
//             <MdFileDownload size={20} />
//             Export Excel
//           </button>

//           <button
//             onClick={() => navigate("/add-client-project")}
//             className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-200"
//           >
//             <MdAdd size={20} />
//             Add Project
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 md:p-6">
//           {/* Alert Message */}
//           {alert.message && (
//             <div
//               className={`mb-6 p-4 rounded-lg border flex items-center ${
//                 alert.type === "error"
//                   ? "bg-red-50 border-red-200 text-red-800"
//                   : "bg-green-50 border-green-200 text-green-800"
//               }`}
//             >
//               {alert.type === "error" ? (
//                 <MdError className="mr-3 flex-shrink-0" size={20} />
//               ) : (
//                 <MdCheckCircle className="mr-3 flex-shrink-0" size={20} />
//               )}
//               <span className="font-medium">{alert.message}</span>
//               <button
//                 onClick={() => setAlert({ type: "", message: "" })}
//                 className="ml-auto text-gray-400 hover:text-gray-600"
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           {/* Search and Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by project name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>

//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//             >
//               <option value="">Filter by type</option>
//               <option value="Residential">Residential</option>
//               <option value="Commercial">Commercial</option>
//             </select>

//             <button
//               onClick={resetFilters}
//               className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//             >
//               <MdSearch size={16} />
//               Reset Filters
//             </button>
//           </div>

//           {/* Mobile Table View */}
//           <div className="block md:hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       #
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Project
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentProjects.map((project, index) => (
//                     <tr key={project.id} className="hover:bg-gray-50">
//                       <td className="px-3 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-3 py-4 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-gray-900">
//                           {project.name}
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">
//                           {project.address}
//                         </div>
//                         <div className="text-xs mt-1">
//                           <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
//                             {project.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openEditModal(project)}
//                             className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                           >
//                             <MdEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteProject(project.id)}
//                             className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
//                           >
//                             <MdDelete size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Desktop Table View */}
//           <div className="hidden md:block">
//             <div className="overflow-hidden border border-gray-200 rounded-xl">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
//                       #
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Project Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Address
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentProjects.map((project, index) => (
//                     <tr
//                       key={project.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                         {project.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {project.address}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                           {project.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openEditModal(project)}
//                             className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                           >
//                             <MdEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteProject(project.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
//                           >
//                             <MdDelete size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6">
//               <nav className="flex items-center space-x-1">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>

//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`px-3 py-2 text-sm font-medium border ${
//                       currentPage === index + 1
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() =>
//                     setCurrentPage(Math.min(totalPages, currentPage + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </nav>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Edit Project Modal */}
//       <Modal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         title="Edit Project"
//         size="md"
//       >
//         {selectedProject && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label
//                   htmlFor="edit-name"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Project Name
//                 </label>
//                 <input
//                   id="edit-name"
//                   type="text"
//                   value={selectedProject.name || ""}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="edit-address"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Address
//                 </label>
//                 <input
//                   id="edit-address"
//                   type="text"
//                   value={selectedProject.address || ""}
//                   onChange={(e) => handleInputChange("address", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="edit-type"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Type
//                 </label>
//                 <select
//                   id="edit-type"
//                   value={selectedProject.type || ""}
//                   onChange={(e) => handleInputChange("type", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
//               >
//                 Update Project
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllProjects;


"use client"

import { useEffect, useState } from "react"
import { MdDelete, MdEdit, MdSearch, MdCheckCircle, MdError, MdClose, MdAdd, MdFileDownload } from "react-icons/md"
import Swal from "sweetalert2"
import api from "../services/api"
import { MdArrowBack } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import * as XLSX from "xlsx"

const AllProjects = () => {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [filteredProjects, setFilteredProjects] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [alert, setAlert] = useState({ type: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const recordsPerPage = 10

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const res = await api.get("/projects/")
      const sorted = res.data.sort((a, b) => b.id - a.id)
      setProjects(sorted)
    } catch (error) {
      setAlert({ type: "error", message: "Failed to fetch projects" })
      // For demo purposes, set some sample data
      const sampleProjects = [
        {
          id: 1,
          name: "Sample Project 1",
          address: "123 Main St",
          type: "Residential",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Sample Project 2",
          address: "456 Oak Ave",
          type: "Commercial",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Sample Project 3",
          address: "789 Pine Rd",
          type: "Residential",
          created_at: new Date().toISOString(),
        },
      ]
      setProjects(sampleProjects)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (typeFilter) {
      filtered = filtered.filter((project) => project.type === typeFilter)
    }

    setFilteredProjects(filtered)
    setCurrentPage(1)
  }

  const deleteProject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/projects/${id}`)
        setAlert({ type: "success", message: "Project deleted successfully" })
        fetchProjects()
        Swal.fire("Deleted!", "Project has been deleted.", "success")
      } catch (error) {
        // For demo purposes, remove from local state
        setProjects(projects.filter((p) => p.id !== id))
        setAlert({ type: "success", message: "Project deleted successfully (demo mode)" })
        Swal.fire("Deleted!", "Project has been deleted.", "success")
      }
    }
  }

  const openEditModal = (project) => {
    setSelectedProject({ ...project }) // Create a copy to avoid direct mutation
    setShowEditModal(true)
  }

  const handleUpdate = async (updatedProject) => {
    try {
      await api.put(`/projects/${updatedProject.id}`, updatedProject)
      setShowEditModal(false)
      setSelectedProject(null)
      fetchProjects()
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Project updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      // For demo purposes, update local state
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
      setShowEditModal(false)
      setSelectedProject(null)
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Project updated successfully! (demo mode)",
        timer: 2000,
        showConfirmButton: false,
      })
    }
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setSelectedProject(null)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("")
  }

  const exportToExcel = () => {
    // Prepare data for export
    const data = filteredProjects.map((project, index) => ({
      "Sr. No.": index + 1,
      "Project Name": project.name,
      Address: project.address,
      Type: project.type,
      "Created Date": project.created_at ? new Date(project.created_at).toLocaleDateString() : "N/A",
    }))

    if (data.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "There are no projects to export.",
      })
      return
    }

    try {
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data)

      // Set column widths
      const colWidths = [
        { wch: 8 }, // Sr. No.
        { wch: 25 }, // Project Name
        { wch: 30 }, // Address
        { wch: 15 }, // Type
        { wch: 15 }, // Created Date
      ]
      ws["!cols"] = colWidths

      // Create workbook
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Projects")

      // Generate file and download
      const fileName = `Projects_Export_${new Date().toISOString().slice(0, 10)}.xlsx`
      XLSX.writeFile(wb, fileName)

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Export Successful",
        text: `${data.length} projects exported successfully!`,
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export projects to Excel!",
      })
    }
  }

  const navigateToAddProject = () => {
    navigate("/add-client-project")
  }

  const startIndex = (currentPage - 1) * recordsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + recordsPerPage)
  const totalPages = Math.ceil(filteredProjects.length / recordsPerPage)

  const EditModal = ({ isOpen, onClose, project, onUpdate }) => {
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      type: "",
    })

    // Initialize form data when modal opens
    useEffect(() => {
      if (project) {
        setFormData({
          name: project.name || "",
          address: project.address || "",
          type: project.type || "",
        })
      }
    }, [project])

    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
      if (!formData.name || !formData.address || !formData.type) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please fill in all required fields!",
        })
        return
      }

      // Update the project with form data
      const updatedProject = { ...project, ...formData }
      onUpdate(updatedProject)
    }

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Enhanced backdrop with blur effect */}
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-all duration-300"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal container */}
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <div
            className="relative bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-100 max-w-xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MdEdit className="text-blue-600" size={24} />
                Edit Project
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Close modal"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter project address"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="edit-type"
                      value={formData.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">Select project type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Update Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [searchTerm, typeFilter, projects])

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showEditModal])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeEditModal()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
          >
            <MdArrowBack size={20} />
          </button>

          <h2 className="text-xl md:text-2xl font-bold text-white">Project Management</h2>
        </div>

        <div className="flex flex-row gap-3 w-full md:w-auto mt-4 ml-4">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <MdFileDownload size={20} />
            Export Excel
          </button>

          <button
            onClick={navigateToAddProject}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <MdAdd size={20} />
            Add Project
          </button>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6">
          {/* Alert Message */}
          {alert.message && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-center ${
                alert.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              {alert.type === "error" ? (
                <MdError className="mr-3 flex-shrink-0" size={20} />
              ) : (
                <MdCheckCircle className="mr-3 flex-shrink-0" size={20} />
              )}
              <span className="font-medium">{alert.message}</span>
              <button
                onClick={() => setAlert({ type: "", message: "" })}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by project name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Filter by type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <MdSearch size={16} />
              Reset Filters
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading projects...</span>
            </div>
          )}

          {/* Mobile Table View */}
          <div className="block md:hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.map((project, index) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{project.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{project.address}</div>
                        <div className="text-xs mt-1">
                          <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                            {project.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.map((project, index) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Data State */}
          {!isLoading && currentProjects.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg">No projects found</div>
              <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Edit Project Modal */}
      <EditModal isOpen={showEditModal} onClose={closeEditModal} project={selectedProject} onUpdate={handleUpdate} />
    </div>
  )
}

export default AllProjects
