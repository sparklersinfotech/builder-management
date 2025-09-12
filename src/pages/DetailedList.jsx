// // "use client"

// // import { useState, useEffect } from "react"
// // import { useParams, useSearchParams, useNavigate } from "react-router-dom"
// // import Header from "../components/Header"
// // import { MdSearch, MdArrowBack, MdVisibility } from "react-icons/md"
// // import { BASE_URL } from "../utils/constants"

// // const DetailedList = () => {
// //   const { type } = useParams()
// //   const [searchParams] = useSearchParams()
// //   const navigate = useNavigate()

// //   const [data, setData] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)
// //   const [searchTerm, setSearchTerm] = useState("")

// //   const fromDate = searchParams.get("fromDate")
// //   const toDate = searchParams.get("toDate")

// //   const fetchData = async () => {
// //   setLoading(true);
// //   setError(null);
// //   try {
// //     const response = await fetch(
// //       `${BASE_URL}/detailed-list?type=${type}&fromDate=${fromDate}&toDate=${toDate}`
// //     );
// //     if (!response.ok) {
// //       throw new Error(`Server responded with ${response.status}`);
// //     }
// //     const result = await response.json();
// //     if (result.error) {
// //       throw new Error(result.message || 'Database error occurred');
// //     }
// //     setData(result.data || result); // Handle different response formats
// //   } catch (error) {
// //     console.error("Fetch error:", error);
// //     setError(error.message);
// //     setData([]); // Clear previous data on error
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   useEffect(() => {
// //     fetchData()
// //   }, [type, fromDate, toDate, searchTerm])

// //   const getTitle = () => {
// //     const titles = {
// //       total_projects: "All Projects",
// //       total_bookings: "All Bookings",
// //       total_meetings: "All Meetings",
// //       total_pending: "All Pending",
// //       total_enquiry: "All Enquiries",
// //     }
// //     return titles[type] || "Details"
// //   }

// //   const handleViewDetails = (id) => {
// //     navigate(`/CustomerDetail/${id}`)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header title={getTitle()} showLogout={true} />

// //       <div className="max-w-7xl mx-auto px-4 py-6">
// //         {/* Header Section */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
// //           <button
// //             onClick={() => navigate("/Home")}
// //             className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
// //           >
// //             <MdArrowBack />
// //             <span>Back to Dashboard</span>
// //           </button>

// //           <div className="relative w-full sm:w-auto">
// //             <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search customers..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
// //             />
// //           </div>
// //         </div>

// //         {/* Date Range Info */}
// //         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //           <p className="text-sm text-gray-600">
// //             Showing data from <span className="font-medium">{fromDate}</span> to{" "}
// //             <span className="font-medium">{toDate}</span>
// //           </p>
// //         </div>

// //         {/* Data Table */}
// //         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //           {loading ? (
// //             <div className="p-8 text-center">
// //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
// //               <p className="mt-2 text-gray-500">Loading...</p>
// //             </div>
// //           ) : error ? (
// //             <div className="p-8 text-center text-red-500">{error}</div>
// //           ) : data.length === 0 ? (
// //             <div className="p-8 text-center text-gray-500">No records found for the selected criteria.</div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Customer Name
// //                     </th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Project Name
// //                     </th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Executive Name
// //                     </th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Date
// //                     </th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Action
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {data.map((item, index) => (
// //                     <tr key={index} className="hover:bg-gray-50 transition-colors">
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-gray-900">
// //                           {`${item.first_name} ${item.middle_name || ""} ${item.last_name}`.trim()}
// //                         </div>
// //                         <div className="text-sm text-gray-500">{item.contact_number}</div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
// //                         {item.project_name || "N/A"}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
// //                         {item.executive_name || "N/A"}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
// //                         {new Date(item.date).toLocaleDateString()}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
// //                         <button
// //                           onClick={() => handleViewDetails(item.id)}
// //                           className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors"
// //                         >
// //                           <MdVisibility />
// //                           View
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default DetailedList

// "use client";
// import { useState, useEffect } from "react";
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import {
//   MdSearch,
//   MdArrowBack,
//   MdVisibility,
//   MdClose,
//   MdPerson,
//   MdPhone,
//   MdDateRange,
//   MdBusiness,
//   MdNotes,
//   MdFileDownload,
// } from "react-icons/md";
// import { BASE_URL } from "../utils/constants";
// import * as XLSX from "xlsx";

// const DetailedList = () => {
//   const { type } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fromDate = searchParams.get("fromDate");
//   const toDate = searchParams.get("toDate");

//   // const fetchData = async () => {
//   //   setLoading(true);
//   //   setError(null);
//   //   try {
//   //     const searchParam = searchTerm
//   //       ? `&search=${encodeURIComponent(searchTerm)}`
//   //       : "";
//   //     const response = await fetch(
//   //       `${BASE_URL}/detailed-list?type=${type}&fromDate=${fromDate}&toDate=${toDate}${searchParam}`
//   //     );
//   //     console.log(response ,"resposne");

//   //     if (!response.ok) {
//   //       throw new Error(`Server responded with ${response.status}`);
//   //     }
//   //     const result = await response.json();

//   //     if (result.error) {
//   //       throw new Error(result.message || "Database error occurred");
//   //     }
//   //     setData(result.data || result);
//   //   } catch (error) {
//   //     console.error("Fetch error:", error);
//   //     setError(error.message);
//   //     setData([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchData = async () => {
//   setLoading(true);
//   setError(null);
//   try {
//     console.log("📌 Fetching data from API...");
//     const searchParam = searchTerm
//       ? `&search=${encodeURIComponent(searchTerm)}`
//       : "";
//     const url = `${BASE_URL}/detailed-list?type=${type}&fromDate=${fromDate}&toDate=${toDate}${searchParam}`;

//     console.log("➡️ API URL:", url);

//     const response = await fetch(url);
//     console.log("✅ Raw Response Object:", response);

//     if (!response.ok) {
//       throw new Error(`Server responded with ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("📥 Parsed JSON Result:", result);

//     if (result.error) {
//       throw new Error(result.message || "Database error occurred");
//     }

//     // Sometimes backend sends array, sometimes object {data: [...]}
//     const finalData = result.data || result;
//     console.log("📊 Final Data to Render:", finalData);
//     if (finalData.length > 0) {
//       console.log("🔑 Keys in first row:", Object.keys(finalData[0]));
//       console.log("👀 Sample first row:", finalData[0]);
//     }

//     setData(finalData);
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     if (error.response) {
//       console.error("Server error response:", error.response.data);
//     }
//     setError(error.message);
//     setData([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchData();
//   }, [type, fromDate, toDate, searchTerm]);

//   const getTitle = () => {
//     const titles = {
//       total_bookings: "All Bookings",
//       total_meetings: "All Meetings",
//       total_pending: "All Pending",
//       total_enquiry: "All Enquiries",
//     };
//     return titles[type] || "Details";
//   };

//   const handleViewDetails = (record) => {
//     setSelectedRecord(record);
//     setShowModal(true);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day}:${month}:${year}`;
//   };

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const exportToExcel = () => {
//     if (data.length === 0) return;

//     // Prepare the data for Excel export
//     const excelData = data.map((item) => ({
//       "Customer Name": item.customer_name || "N/A",
//       "Contact Number":
//         item.customer_mobile || item.mobile_no || item.contact_number || "N/A",
//       "Project Name": item.project_name || "N/A",
//       "Unit Number": item.unit_no || "N/A",
//       "Executive Name": item.executive_name || "N/A",
//       Date: item.date ? formatDateTime(item.date) : "N/A",
//       "Interaction Type": item.interaction_type || "N/A",
//       Remarks: item.remark || "N/A",
//     }));

//     // Create worksheet
//     const ws = XLSX.utils.json_to_sheet(excelData);

//     // Create workbook
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "CustomerData");

//     // Generate file name
//     const fileName = `${getTitle()}_${formatDate(fromDate)}_to_${formatDate(
//       toDate
//     )}.xlsx`;

//     // Export the file
//     XLSX.writeFile(wb, fileName);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title={getTitle()} showLogout={true} />
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate("/Home")}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
//           >
//             <MdArrowBack />
//             <span>Back to Dashboard</span>
//           </button>
//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <div className="relative w-full sm:w-64">
//               <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search customers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               />
//             </div>
//             <button
//               onClick={exportToExcel}
//               disabled={data.length === 0}
//               className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
//                 data.length === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700"
//               } text-white transition-colors`}
//             >
//               <MdFileDownload />
//               <span>Export to Excel</span>
//             </button>
//           </div>
//         </div>

//         {/* Date Range Info */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <p className="text-sm text-gray-600">
//             Showing data from{" "}
//             <span className="font-medium">{formatDate(fromDate)}</span> to{" "}
//             <span className="font-medium">{formatDate(toDate)}</span>
//           </p>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-2 text-gray-500">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="p-8 text-center text-red-500">{error}</div>
//           ) : data.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No records found for the selected criteria.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Project Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Executive Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {data.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {item.customer_name || "N/A"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.project_name || "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.executive_name || "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.date ? formatDate(item.date) : "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(item)}
//                           className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors"
//                         >
//                           <MdVisibility />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showModal && selectedRecord && (
//         <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4">
//               <h3 className="text-lg font-semibold">Customer Details</h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <MdClose size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Customer Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <MdPerson className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Customer Name</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.customer_name || "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdPhone className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Contact Number</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.customer_mobile ||
//                           selectedRecord.mobile_no ||
//                           selectedRecord.contact_number ||
//                           "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdBusiness className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Project</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.project_name || "N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Executive Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <MdPerson className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Executive</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.executive_name || "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdDateRange className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.date
//                           ? new Date(selectedRecord.date).toLocaleDateString()
//                           : "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <MdBusiness className="text-gray-400 text-xl mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Interaction Type</p>
//                       <span
//                         className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                           selectedRecord.interaction_type === "Booked"
//                             ? "bg-green-100 text-green-800"
//                             : selectedRecord.interaction_type === "Meeting Done"
//                             ? "bg-blue-100 text-blue-800"
//                             : selectedRecord.interaction_type === "Enquiry"
//                             ? "bg-purple-100 text-purple-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {selectedRecord.interaction_type || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Details */}
//               {selectedRecord.unit_no && (
//                 <div className="pt-4 border-t">
//                   <div className="flex items-center gap-3">
//                     <MdBusiness className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Unit Number</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.unit_no}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {selectedRecord.remark && (
//                 <div className="pt-4 border-t">
//                   <div className="flex items-start gap-3">
//                     <MdNotes className="text-gray-400 text-xl mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Remarks</p>
//                       <p className="text-gray-900 mt-1 whitespace-pre-wrap">
//                         {selectedRecord.remark}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetailedList;


// "use client"
// import { useState, useEffect } from "react"
// import { useParams, useSearchParams, useNavigate } from "react-router-dom"
// import Header from "../components/Header"
// import {
//   MdSearch,
//   MdArrowBack,
//   MdVisibility,
//   MdClose,
//   MdPerson,
//   MdPhone,
//   MdDateRange,
//   MdBusiness,
//   MdNotes,
//   MdFileDownload,
// } from "react-icons/md"
// import { BASE_URL } from "../utils/constants"
// import * as XLSX from "xlsx"

// const DetailedList = () => {
//   const { type } = useParams()
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)

//   const fromDate = searchParams.get("fromDate")
//   const toDate = searchParams.get("toDate")

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       console.log("📌 Fetching data from API...")
//       const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
//       const url = `${BASE_URL}/detailed-list?type=${type}&fromDate=${fromDate}&toDate=${toDate}${searchParam}`

//       console.log("➡️ API URL:", url)

//       const response = await fetch(url)
//       console.log("✅ Raw Response Object:", response)

//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}`)
//       }

//       const result = await response.json()
//       console.log("📥 Parsed JSON Result:", result)

//       if (result.error) {
//         throw new Error(result.message || "Database error occurred")
//       }

//       // Sometimes backend sends array, sometimes object {data: [...]}
//       const finalData = result.data || result
//       console.log("📊 Final Data to Render:", finalData)
//       if (finalData.length > 0) {
//         console.log("🔑 Keys in first row:", Object.keys(finalData[0]))
//         console.log("👀 Sample first row:", finalData[0])
//       }

//       setData(finalData)
//     } catch (error) {
//       console.error("❌ Fetch error:", error)
//       if (error.response) {
//         console.error("Server error response:", error.response.data)
//       }
//       setError(error.message)
//       setData([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [type, fromDate, toDate, searchTerm])

//   const getTitle = () => {
//     const titles = {
//       total_bookings: "All Bookings",
//       total_meetings: "All Meetings",
//       total_pending: "All Pending",
//       total_enquiry: "All Enquiries",
//     }
//     return titles[type] || "Details"
//   }

//   const handleViewDetails = (record) => {
//     setSelectedRecord(record)
//     setShowModal(true)
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     const day = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()
//     return `${day}:${month}:${year}`
//   }

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleString()
//   }

//   const exportToExcel = () => {
//     if (data.length === 0) return

//     // Prepare the data for Excel export
//     const excelData = data.map((item) => ({
//       "Customer Name": item.customer_name || "N/A",
//       "Contact Number": item.customer_mobile || item.mobile_no || item.contact_number || "N/A",
//       "Project Name": item.project_name || "N/A",
//       "Unit Number": item.unit_no || "N/A",
//       "Executive Name": item.executive_name || "N/A",
//       Date: item.date ? formatDateTime(item.date) : "N/A",
//       "Interaction Type": item.interaction_type || "N/A",
//       Remarks: item.remark || "N/A",
//     }))

//     // Create worksheet
//     const ws = XLSX.utils.json_to_sheet(excelData)

//     // Create workbook
//     const wb = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(wb, ws, "CustomerData")

//     // Generate file name
//     const fileName = `${getTitle()}_${formatDate(fromDate)}_to_${formatDate(toDate)}.xlsx`

//     // Export the file
//     XLSX.writeFile(wb, fileName)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title={getTitle()} showLogout={true} />
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate("/Home")}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
//           >
//             <MdArrowBack />
//             <span>Back to Dashboard</span>
//           </button>
//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <div className="relative w-full sm:w-64">
//               <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search customers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               />
//             </div>
//             <button
//               onClick={exportToExcel}
//               disabled={data.length === 0}
//               className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
//                 data.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//               } text-white transition-colors`}
//             >
//               <MdFileDownload />
//               <span>Export to Excel</span>
//             </button>
//           </div>
//         </div>

//         {/* Date Range Info */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <p className="text-sm text-gray-600">
//             Showing data from <span className="font-medium">{formatDate(fromDate)}</span> to{" "}
//             <span className="font-medium">{formatDate(toDate)}</span>
//           </p>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-2 text-gray-500">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="p-8 text-center text-red-500">{error}</div>
//           ) : data.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">No records found for the selected criteria.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Project Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Executive Name
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {data.map((item, index) => (
//                     <tr key={index} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{item.customer_name || "N/A"}</div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.project_name || "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.executive_name || "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.date ? formatDate(item.date) : "N/A"}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(item)}
//                           className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors"
//                         >
//                           <MdVisibility />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showModal && selectedRecord && (
//         <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4">
//               <h3 className="text-lg font-semibold">Customer Details</h3>
//               <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
//                 <MdClose size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Customer Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <MdPerson className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Customer Name</p>
//                       <p className="font-medium text-gray-900">{selectedRecord.customer_name || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdPhone className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Contact Number</p>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.customer_mobile ||
//                           selectedRecord.mobile_no ||
//                           selectedRecord.contact_number ||
//                           "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdBusiness className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Project</p>
//                       <p className="font-medium text-gray-900">{selectedRecord.project_name || "N/A"}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Executive Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <MdPerson className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Executive</p>
//                       <p className="font-medium text-gray-900">{selectedRecord.executive_name || "N/A"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MdDateRange className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {selectedRecord.date ? new Date(selectedRecord.date).toLocaleDateString() : "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <MdBusiness className="text-gray-400 text-xl mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Interaction Type</p>
//                       <span
//                         className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                           selectedRecord.interaction_type === "Booked"
//                             ? "bg-green-100 text-green-800"
//                             : selectedRecord.interaction_type === "Meeting Done"
//                               ? "bg-blue-100 text-blue-800"
//                               : selectedRecord.interaction_type === "Enquiry"
//                                 ? "bg-purple-100 text-purple-800"
//                                 : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {selectedRecord.interaction_type || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Details */}
//               {selectedRecord.unit_no && (
//                 <div className="pt-4 border-t">
//                   <div className="flex items-center gap-3">
//                     <MdBusiness className="text-gray-400 text-xl" />
//                     <div>
//                       <p className="text-sm text-gray-500">Unit Number</p>
//                       <p className="font-medium text-gray-900">{selectedRecord.unit_no}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {selectedRecord.remark && (
//                 <div className="pt-4 border-t">
//                   <div className="flex items-start gap-3">
//                     <MdNotes className="text-gray-400 text-xl mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Remarks</p>
//                       <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedRecord.remark}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DetailedList


"use client"
import { useState, useEffect } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import {
  MdSearch,
  MdArrowBack,
  MdVisibility,
  MdClose,
  MdPerson,
  MdPhone,
  MdDateRange,
  MdBusiness,
  MdNotes,
  MdFileDownload,
} from "react-icons/md"
import { BASE_URL } from "../utils/constants"
import * as XLSX from "xlsx"
import { format, parse, isValid } from "date-fns"

const DetailedList = () => {
  const { type } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const fromDate = searchParams.get("fromDate")
  const toDate = searchParams.get("toDate")

  // Format date to DD/MM/YYYY string
  const formatDateToDDMMYYYY = (date) => {
    if (!date || !isValid(new Date(date))) return "N/A";
    return format(new Date(date), "dd/MM/yyyy");
  };

  // Parse DD/MM/YYYY string to Date object
  const parseDDMMYYYYToDate = (dateString) => {
    if (!dateString) return null;
    try {
      return parse(dateString, "dd/MM/yyyy", new Date());
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("📌 Fetching data from API...")
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
      const url = `${BASE_URL}/detailed-list?type=${type}&fromDate=${fromDate}&toDate=${toDate}${searchParam}`

      console.log("➡️ API URL:", url)

      const response = await fetch(url)
      console.log("✅ Raw Response Object:", response)

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const result = await response.json()
      console.log("📥 Parsed JSON Result:", result)

      if (result.error) {
        throw new Error(result.message || "Database error occurred")
      }

      // Sometimes backend sends array, sometimes object {data: [...]}
      const finalData = result.data || result
      console.log("📊 Final Data to Render:", finalData)
      if (finalData.length > 0) {
        console.log("🔑 Keys in first row:", Object.keys(finalData[0]))
        console.log("👀 Sample first row:", finalData[0])
      }

      setData(finalData)
    } catch (error) {
      console.error("❌ Fetch error:", error)
      if (error.response) {
        console.error("Server error response:", error.response.data)
      }
      setError(error.message)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [type, fromDate, toDate, searchTerm])

  const getTitle = () => {
    const titles = {
      total_bookings: "All Bookings",
      total_meetings: "All Meetings",
      total_pending: "All Pending",
      total_enquiry: "All Enquiries",
    }
    return titles[type] || "Details"
  }

  const handleViewDetails = (record) => {
    setSelectedRecord(record)
    setShowModal(true)
  }

  const exportToExcel = () => {
    if (data.length === 0) return

    // Prepare the data for Excel export with DD/MM/YYYY format
    const excelData = data.map((item) => ({
      "Customer Name": item.customer_name || "N/A",
      "Contact Number": item.customer_mobile || item.mobile_no || item.contact_number || "N/A",
      "Project Name": item.project_name || "N/A",
      "Unit Number": item.unit_no || "N/A",
      "Executive Name": item.executive_name || "N/A",
      "Date": item.date ? formatDateToDDMMYYYY(item.date) : "N/A",
      "Interaction Type": item.interaction_type || "N/A",
      "Remarks": item.remark || "N/A",
    }))

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData)

    // Create workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "CustomerData")

    // Generate file name with DD_MM_YYYY format
    const fileName = `${getTitle()}_${formatDateToDDMMYYYY(fromDate).replace(/\//g, '_')}_to_${formatDateToDDMMYYYY(toDate).replace(/\//g, '_')}.xlsx`

    // Export the file
    XLSX.writeFile(wb, fileName)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={getTitle()} showLogout={true} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/Home")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MdArrowBack />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <button
              onClick={exportToExcel}
              disabled={data.length === 0}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
                data.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white transition-colors`}
            >
              <MdFileDownload />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>

        {/* Date Range Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <p className="text-sm text-gray-600">
            Showing data from <span className="font-medium">{formatDateToDDMMYYYY(fromDate)}</span> to{" "}
            <span className="font-medium">{formatDateToDDMMYYYY(toDate)}</span>
          </p>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No records found for the selected criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Executive Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.customer_name || "N/A"}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.project_name || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.executive_name || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateToDDMMYYYY(item.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors"
                        >
                          <MdVisibility />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <MdClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdPerson className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Customer Name</p>
                      <p className="font-medium text-gray-900">{selectedRecord.customer_name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdPhone className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Number</p>
                      <p className="font-medium text-gray-900">
                        {selectedRecord.customer_mobile ||
                          selectedRecord.mobile_no ||
                          selectedRecord.contact_number ||
                          "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdBusiness className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Project</p>
                      <p className="font-medium text-gray-900">{selectedRecord.project_name || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Executive Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdPerson className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Executive</p>
                      <p className="font-medium text-gray-900">{selectedRecord.executive_name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdDateRange className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">
                        {formatDateToDDMMYYYY(selectedRecord.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MdBusiness className="text-gray-400 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Interaction Type</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          selectedRecord.interaction_type === "Booked"
                            ? "bg-green-100 text-green-800"
                            : selectedRecord.interaction_type === "Meeting Done"
                              ? "bg-blue-100 text-blue-800"
                              : selectedRecord.interaction_type === "Enquiry"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedRecord.interaction_type || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {selectedRecord.unit_no && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <MdBusiness className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Unit Number</p>
                      <p className="font-medium text-gray-900">{selectedRecord.unit_no}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedRecord.remark && (
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <MdNotes className="text-gray-400 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Remarks</p>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedRecord.remark}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailedList