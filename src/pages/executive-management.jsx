// import React, { useEffect, useState } from "react";
// import { 
//   MdDelete, 
//   MdEdit, 
//   MdVisibility, 
//   MdSearch,
//   MdCheckCircle,
//   MdError,
//   MdClose
// } from "react-icons/md";
// import Swal from 'sweetalert2';

// const ExecutiveManagement = () => {
//   const [executives, setExecutives] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredExecutives, setFilteredExecutives] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedExecutive, setSelectedExecutive] = useState(null);
//   const [alert, setAlert] = useState({ type: "", message: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchExecutives();
//   }, []);

//   useEffect(() => {
//     filterExecutives();
//   }, [searchTerm, executives]);

//   const fetchExecutives = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/executives/all");
//       setExecutives(res.data.executives);
//     } catch (error) {
//       setAlert({ type: "error", message: "Failed to fetch executives" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterExecutives = () => {
//     const filtered = executives.filter((ex) =>
//       ex.full_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredExecutives(filtered);
//     setCurrentPage(1);
//   };

//   const deleteExecutive = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this executive?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc2626',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await api.delete(`/executives/${id}`);
//         setAlert({ type: "success", message: "Executive deleted successfully" });
//         fetchExecutives();
//         Swal.fire('Deleted!', 'Executive has been deleted.', 'success');
//       } catch (error) {
//         setAlert({ type: "error", message: "Failed to delete executive" });
//         Swal.fire('Error!', 'Failed to delete executive.', 'error');
//       }
//     }
//   };

//   const openEditModal = (executive) => {
//     setSelectedExecutive({ ...executive });
//     setShowEditModal(true);
//   };

//   const openViewModal = (executive) => {
//     setSelectedExecutive(executive);
//     setShowViewModal(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await api.put(
//         `/executives/${selectedExecutive.id}`,
//         selectedExecutive
//       );
//       setShowEditModal(false);
//       fetchExecutives();
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated Successfully',
//         text: 'Executive updated successfully!',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Failed to update executive!',
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setSelectedExecutive({ ...selectedExecutive, [field]: value });
//   };

//   const startIndex = (currentPage - 1) * recordsPerPage;
//   const currentExecutives = filteredExecutives
//     .sort((a, b) => b.id - a.id)
//     .slice(startIndex, startIndex + recordsPerPage);

//   const totalPages = Math.ceil(filteredExecutives.length / recordsPerPage);

//   // Modal Component
//   const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
//     if (!isOpen) return null;

//     const sizeClasses = {
//       sm: "max-w-md",
//       md: "max-w-lg",
//       lg: "max-w-2xl"
//     };

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//           <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
//           <div className={`inline-block w-full ${sizeClasses[size]} p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <MdClose size={24} />
//               </button>
//             </div>
//             {children}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 max-w-7xl">
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//           <h2 className="text-xl md:text-2xl font-bold text-white">Executive Management</h2>
//         </div>

//         {/* Body */}
//         <div className="p-4 md:p-6">
//           {/* Alert Message */}
//           {alert.message && (
//             <div className={`mb-6 p-4 rounded-lg border flex items-center ${
//               alert.type === "error" 
//                 ? "bg-red-50 border-red-200 text-red-800" 
//                 : "bg-green-50 border-green-200 text-green-800"
//             }`}>
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

//           {/* Search */}
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>
//           </div>

//           {/* Mobile Cards View */}
//           <div className="block md:hidden space-y-4">
//             {currentExecutives.map((executive, index) => (
//               <div key={executive.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <h3 className="font-bold text-lg text-gray-900 mb-1">{executive.full_name}</h3>
//                     <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
//                       {executive.designation}
//                     </span>
//                     <p className="text-xs text-gray-500">#{startIndex + index + 1}</p>
//                   </div>
//                   <div className="flex gap-2 ml-4">
//                     <button
//                       onClick={() => openViewModal(executive)}
//                       className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
//                     >
//                       <MdVisibility size={18} />
//                     </button>
//                     <button
//                       onClick={() => openEditModal(executive)}
//                       className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                     >
//                       <MdEdit size={18} />
//                     </button>
//                     <button
//                       onClick={() => deleteExecutive(executive.id)}
//                       className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
//                     >
//                       <MdDelete size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
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
//                       Executive Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Designation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentExecutives.map((executive, index) => (
//                     <tr key={executive.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                         {executive.full_name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                           {executive.designation}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openViewModal(executive)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
//                           >
//                             <MdVisibility size={16} />
//                           </button>
//                           <button
//                             onClick={() => openEditModal(executive)}
//                             className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                           >
//                             <MdEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteExecutive(executive.id)}
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
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

//       {/* View Details Modal */}
//       <Modal
//         isOpen={showViewModal}
//         onClose={() => setShowViewModal(false)}
//         title="Executive Details"
//         size="md"
//       >
//         {selectedExecutive && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
//                 <p className="text-sm text-gray-900 font-semibold">{selectedExecutive.full_name}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Mobile</label>
//                 <p className="text-sm text-gray-900">{selectedExecutive.mobile}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                 <p className="text-sm text-gray-900">{selectedExecutive.email}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Designation</label>
//                 <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                   {selectedExecutive.designation}
//                 </span>
//               </div>
//             </div>
//             <div className="flex justify-end pt-4">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Edit Executive Modal */}
//       <Modal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         title="Edit Executive"
//         size="md"
//       >
//         {selectedExecutive && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="sm:col-span-2">
//                 <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   id="edit-name"
//                   type="text"
//                   value={selectedExecutive.full_name || ""}
//                   onChange={(e) => handleInputChange('full_name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="edit-mobile" className="block text-sm font-medium text-gray-700 mb-1">
//                   Mobile
//                 </label>
//                 <input
//                   id="edit-mobile"
//                   type="tel"
//                   value={selectedExecutive.mobile || ""}
//                   onChange={(e) => handleInputChange('mobile', e.target.value)}
//                   maxLength={10}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   id="edit-email"
//                   type="email"
//                   value={selectedExecutive.email || ""}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label htmlFor="edit-designation" className="block text-sm font-medium text-gray-700 mb-1">
//                   Designation
//                 </label>
//                 <input
//                   id="edit-designation"
//                   type="text"
//                   value={selectedExecutive.designation || ""}
//                   onChange={(e) => handleInputChange('designation', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
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
//                 Update Executive
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ExecutiveManagement;


// import React, { useEffect, useState } from "react";
// import { 
//   MdDelete, 
//   MdEdit, 
//   MdVisibility, 
//   MdSearch,
//   MdCheckCircle,
//   MdError,
//   MdClose,
//   MdAdd
// } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import api from '../services/api';

// const ExecutiveManagement = () => {
//   const [executives, setExecutives] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredExecutives, setFilteredExecutives] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedExecutive, setSelectedExecutive] = useState(null);
//   const [alert, setAlert] = useState({ type: "", message: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchExecutives();
//   }, []);

//   useEffect(() => {
//     filterExecutives();
//   }, [searchTerm, executives]);

//   const fetchExecutives = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/executives/all");
//       setExecutives(res.data.executives);
//     } catch (error) {
//       setAlert({ type: "error", message: "Failed to fetch executives" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterExecutives = () => {
//     const filtered = executives.filter((ex) =>
//       ex.full_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredExecutives(filtered);
//     setCurrentPage(1);
//   };

//   const deleteExecutive = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this executive?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc2626',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await api.delete(`/executives/${id}`);
//         setAlert({ type: "success", message: "Executive deleted successfully" });
//         fetchExecutives();
//         Swal.fire('Deleted!', 'Executive has been deleted.', 'success');
//       } catch (error) {
//         setAlert({ type: "error", message: "Failed to delete executive" });
//         Swal.fire('Error!', 'Failed to delete executive.', 'error');
//       }
//     }
//   };

//   const openEditModal = (executive) => {
//     setSelectedExecutive(executive);
//     setShowEditModal(true);
//   };

//   const openViewModal = (executive) => {
//     setSelectedExecutive(executive);
//     setShowViewModal(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await api.put(
//         `/executives/${selectedExecutive.id}`,
//         selectedExecutive
//       );
//       setShowEditModal(false);
//       fetchExecutives();
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated Successfully',
//         text: 'Executive updated successfully!',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Failed to update executive!',
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setSelectedExecutive({ ...selectedExecutive, [field]: value });
//   };

//   const startIndex = (currentPage - 1) * recordsPerPage;
//   const currentExecutives = filteredExecutives
//     .sort((a, b) => b.id - a.id)
//     .slice(startIndex, startIndex + recordsPerPage);

//   const totalPages = Math.ceil(filteredExecutives.length / recordsPerPage);

//   // Modal Component
//   const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
//     if (!isOpen) return null;

//     const sizeClasses = {
//       sm: "max-w-md",
//       md: "max-w-xl",
//       lg: "max-w-3xl"
//     };

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//           <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//             <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
//           </div>
          
//           <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
//           <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}>
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="flex items-start justify-between">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
//                 <button
//                   onClick={onClose}
//                   className="ml-3 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
//                 >
//                   <MdClose size={24} />
//                 </button>
//               </div>
//               <div className="mt-4">
//                 {children}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto  max-w-7xl">
//       <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl md:text-2xl font-bold text-white">Executive Management</h2>
//           <button
//             onClick={() => navigate("/add-executive")}
//             className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
//           >
//             <MdAdd size={20} />
//             Add Executive
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 md:p-6">
//           {/* Alert Message */}
//           {alert.message && (
//             <div className={`mb-6 p-4 rounded-lg border flex items-center ${
//               alert.type === "error" 
//                 ? "bg-red-50 border-red-200 text-red-800" 
//                 : "bg-green-50 border-green-200 text-green-800"
//             }`}>
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

//           {/* Search */}
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>
//           </div>

//           {/* Mobile Table View */}
//           <div className="block md:hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       #
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentExecutives.map((executive, index) => (
//                     <tr key={executive.id} className="hover:bg-gray-50">
//                       <td className="px-3 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-3 py-4 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-gray-900">{executive.full_name}</div>
//                         <div className="text-xs text-gray-500 mt-1">
//                           <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
//                             {executive.designation}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openViewModal(executive)}
//                             className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
//                           >
//                             <MdVisibility size={16} />
//                           </button>
//                           <button
//                             onClick={() => openEditModal(executive)}
//                             className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                           >
//                             <MdEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteExecutive(executive.id)}
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
//                       Executive Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Designation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentExecutives.map((executive, index) => (
//                     <tr key={executive.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
//                         {startIndex + index + 1}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                         {executive.full_name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                           {executive.designation}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openViewModal(executive)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
//                           >
//                             <MdVisibility size={16} />
//                           </button>
//                           <button
//                             onClick={() => openEditModal(executive)}
//                             className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//                           >
//                             <MdEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteExecutive(executive.id)}
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
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

//       {/* View Details Modal */}
//       <Modal
//         isOpen={showViewModal}
//         onClose={() => setShowViewModal(false)}
//         title="Executive Details"
//         size="md"
//       >
//         {selectedExecutive && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
//                 <p className="text-sm text-gray-900 font-semibold">{selectedExecutive.full_name}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Mobile</label>
//                 <p className="text-sm text-gray-900">{selectedExecutive.mobile}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                 <p className="text-sm text-gray-900">{selectedExecutive.email}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <label className="block text-sm font-medium text-gray-600 mb-1">Designation</label>
//                 <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                   {selectedExecutive.designation}
//                 </span>
//               </div>
//             </div>
//             <div className="flex justify-end pt-4">
//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Edit Executive Modal */}
//       <Modal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         title="Edit Executive"
//         size="md"
//       >
//         {selectedExecutive && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="sm:col-span-2">
//                 <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   id="edit-name"
//                   type="text"
//                   value={selectedExecutive.full_name || ""}
//                   onChange={(e) => handleInputChange('full_name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="edit-mobile" className="block text-sm font-medium text-gray-700 mb-1">
//                   Mobile
//                 </label>
//                 <input
//                   id="edit-mobile"
//                   type="tel"
//                   value={selectedExecutive.mobile || ""}
//                   onChange={(e) => handleInputChange('mobile', e.target.value)}
//                   maxLength={10}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   id="edit-email"
//                   type="email"
//                   value={selectedExecutive.email || ""}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label htmlFor="edit-designation" className="block text-sm font-medium text-gray-700 mb-1">
//                   Designation
//                 </label>
//                 <input
//                   id="edit-designation"
//                   type="text"
//                   value={selectedExecutive.designation || ""}
//                   onChange={(e) => handleInputChange('designation', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
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
//                 Update Executive
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ExecutiveManagement;

"use client"

import { useEffect, useState } from "react"
import {
  MdDelete,
  MdEdit,
  MdVisibility,
  MdSearch,
  MdCheckCircle,
  MdError,
  MdClose,
  MdAdd,
  MdFileDownload,
} from "react-icons/md"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import * as XLSX from "xlsx"
import { MdArrowBack } from "react-icons/md"

import api from "../services/api"

const ExecutiveManagement = () => {
  const [executives, setExecutives] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredExecutives, setFilteredExecutives] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedExecutive, setSelectedExecutive] = useState(null)
  const [alert, setAlert] = useState({ type: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const recordsPerPage = 10

  const demoData = [
    { id: 1, full_name: "Rohit Janrav", mobile: "9879879877", email: "rohit@gmail.com", designation: "CEO" },
    
    {
      id: 5,
      full_name: "Rajesh Singh",
      mobile: "9555666777",
      email: "rajesh@gmail.com",
      designation: "Operations Head",
    },
  ]

  useEffect(() => {
    fetchExecutives()
  }, [])

  useEffect(() => {
    filterExecutives()
  }, [searchTerm, executives])

  const fetchExecutives = async () => {
    setIsLoading(true)
    try {
      const res = await api.get("/executives/all")
      setExecutives(res.data.executives)
    } catch (error) {
      // Demo data for testing
      setExecutives(demoData)
      setAlert({ type: "error", message: "Using demo data - API connection failed" })
    } finally {
      setIsLoading(false)
    }
  }

  const filterExecutives = () => {
    const filtered = executives.filter((ex) => ex.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredExecutives(filtered)
    setCurrentPage(1)
  }

  const exportToExcel = () => {
    try {
      const exportData = filteredExecutives.map((executive, index) => ({
        "Sr. No.": index + 1,
        "Full Name": executive.full_name,
        Mobile: executive.mobile,
        Email: executive.email,
        Designation: executive.designation,
        "Created Date": new Date().toLocaleDateString("en-IN"),
      }))

      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Set column widths
      const columnWidths = [
        { wch: 8 }, // Sr. No.
        { wch: 25 }, // Full Name
        { wch: 15 }, // Mobile
        { wch: 30 }, // Email
        { wch: 20 }, // Designation
        { wch: 15 }, // Created Date
      ]
      worksheet["!cols"] = columnWidths

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Executives")

      const fileName = `Executive_Management_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.xlsx`
      XLSX.writeFile(workbook, fileName)

      Swal.fire({
        icon: "success",
        title: "Export Successful!",
        text: `Excel file "${fileName}" has been downloaded successfully.`,
        timer: 3000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export data to Excel. Please try again.",
      })
    }
  }

  const deleteExecutive = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this executive?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/executives/${id}`)
        setAlert({ type: "success", message: "Executive deleted successfully" })
        fetchExecutives()
        Swal.fire("Deleted!", "Executive has been deleted.", "success")
      } catch (error) {
        // Demo mode - remove from local state
        setExecutives((prev) => prev.filter((ex) => ex.id !== id))
        Swal.fire("Deleted!", "Executive has been deleted.", "success")
      }
    }
  }

  const openEditModal = (executive) => {
    setSelectedExecutive({ ...executive })
    setShowEditModal(true)
    document.body.style.overflow = "hidden"
  }

  const openViewModal = (executive) => {
    setSelectedExecutive(executive)
    setShowViewModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = (modalType) => {
    if (modalType === "edit") {
      setShowEditModal(false)
    } else {
      setShowViewModal(false)
    }
    setSelectedExecutive(null)
    document.body.style.overflow = "unset"
  }

  const EditModal = ({ isOpen, onClose, executive, onUpdate }) => {
    const [formData, setFormData] = useState({
      full_name: "",
      mobile: "",
      email: "",
      designation: "",
    })

    // Initialize form data when modal opens
    useEffect(() => {
      if (isOpen && executive) {
        setFormData({
          full_name: executive.full_name || "",
          mobile: executive.mobile || "",
          email: executive.email || "",
          designation: executive.designation || "",
        })
      }
    }, [isOpen, executive])

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === "Escape" && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
      }
    }, [isOpen, onClose])

    const handleInputChange = (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const handleSubmit = async () => {
      // Validation
      if (!formData.full_name?.trim()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Full name is required!",
        })
        return
      }

      if (!formData.mobile?.trim() || formData.mobile.length !== 10) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a valid 10-digit mobile number!",
        })
        return
      }

      if (!formData.email?.trim() || !formData.email.includes("@")) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a valid email address!",
        })
        return
      }

      if (!formData.designation?.trim()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Designation is required!",
        })
        return
      }

      const updatedExecutive = { ...executive, ...formData }
      await onUpdate(updatedExecutive)
    }

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div
          className="fixed inset-0 bg-opacity-25 backdrop-blur-sm transition-all duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-semibold text-white">Edit Executive</h3>
                <button
                  onClick={onClose}
                  className="ml-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-black transition-all duration-200 hover:scale-110"
                >
                  <MdClose size={18} />
                </button>
              </div>
            </div>
            <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="edit-name"
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile *
                    </label>
                    <input
                      id="edit-mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter 10-digit mobile"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="edit-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="edit-designation" className="block text-sm font-medium text-gray-700 mb-2">
                      Designation *
                    </label>
                    <input
                      id="edit-designation"
                      type="text"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter designation"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Update Executive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleUpdate = async (updatedExecutive) => {
    try {
      await api.put(`/executives/${updatedExecutive.id}`, updatedExecutive)
      setShowEditModal(false)
      document.body.style.overflow = "unset"
      fetchExecutives()
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Executive updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      // Demo mode - update local state
      setExecutives((prev) => prev.map((ex) => (ex.id === updatedExecutive.id ? updatedExecutive : ex)))
      setShowEditModal(false)
      document.body.style.overflow = "unset"
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Executive updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      })
    }
  }

  const startIndex = (currentPage - 1) * recordsPerPage
  const currentExecutives = filteredExecutives
    .sort((a, b) => b.id - a.id)
    .slice(startIndex, startIndex + recordsPerPage)

  const totalPages = Math.ceil(filteredExecutives.length / recordsPerPage)

  const ViewModal = ({ isOpen, onClose, executive }) => {
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === "Escape" && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
      }
    }, [isOpen, onClose])

    if (!isOpen || !executive) return null

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div
          className="fixed inset-0 bg-opacity-25 backdrop-blur-sm transition-all duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-semibold text-white">Executive Details</h3>
                <button
                  onClick={onClose}
                  className="ml-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-black transition-all duration-200 hover:scale-110"
                >
                  <MdClose size={18} />
                </button>
              </div>
            </div>
            <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-b border-gray-200 pb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <p className="text-base text-gray-900 font-semibold">{executive.full_name}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mobile</label>
                    <p className="text-base text-gray-900">{executive.mobile}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                    <p className="text-base text-gray-900">{executive.email}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Designation</label>
                    <span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      {executive.designation}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center text-white hover:bg-blue-50 p-1 rounded-lg transition-colors"
            >
              <MdArrowBack size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-white">Executive Management</h2>
          </div>
        </div>

        <div className="flex gap-3 ml-4 mt-4">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <MdFileDownload size={20} />
            Export Excel
          </button>

          <button
            onClick={() => navigate("/add-executive")}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <MdAdd size={20} />
            Add Executive
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

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

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
                      Name
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
                  {currentExecutives.map((executive, index) => (
                    <tr key={executive.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{executive.full_name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                            {executive.designation}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openViewModal(executive)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                          >
                            <MdVisibility size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(executive)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteExecutive(executive.id)}
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
                      Executive Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentExecutives.map((executive, index) => (
                    <tr key={executive.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {executive.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {executive.designation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openViewModal(executive)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                          >
                            <MdVisibility size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(executive)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteExecutive(executive.id)}
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

      <ViewModal isOpen={showViewModal} onClose={() => closeModal("view")} executive={selectedExecutive} />

      <EditModal
        isOpen={showEditModal}
        onClose={() => closeModal("edit")}
        executive={selectedExecutive}
        onUpdate={handleUpdate}
      />
    </div>
  )
}

export default ExecutiveManagement
