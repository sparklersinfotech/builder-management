// import { useState, useEffect } from "react";
// import {
//   Search,
//   Download,
//   Eye,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";
// import * as XLSX from "xlsx";
// import { BASE_URL } from "../utils/constants";
// import Header from "../components/Header";

// export default function AllEnquiries() {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedInteractionType, setSelectedInteractionType] = useState("all");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({});
//   const [stats, setStats] = useState({});
//   const [interactionTypes, setInteractionTypes] = useState([]);
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);

//   const fetchEnquiries = async (page = 1) => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: "15",
//       });
//       if (searchTerm.trim()) params.append("search", searchTerm.trim());
//       if (selectedInteractionType !== "all")
//         params.append("interaction_type", selectedInteractionType);
//       if (startDate) params.append("start_date", startDate);
//       if (endDate) params.append("end_date", endDate);

//       const res = await fetch(`${BASE_URL}/all?${params.toString()}`);
//       const data = await res.json();
//       console.log("res", res );
//       console.log("data", data );
//       if (data?.success) {
//         setEnquiries(data.data || []);
//         setPagination(data.pagination || {});
//         setStats(data.stats || {});
//       }
//     } catch (e) {
//       console.log("[v0] fetchEnquiries error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInteractionTypes = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/interaction-types`);
//       const data = await res.json();
//       // console.log("data", data);
//       if (data?.success) setInteractionTypes(data.data || []);
//     } catch (e) {
      
//     }
//   };



//     const handleExport = async () => {
//   try {
//     const params = new URLSearchParams({
//       export: "true", // Add a parameter to indicate export
//       limit: "10000", // Set a high limit to get all records
//     });
    
//     if (searchTerm.trim()) params.append("search", searchTerm.trim());
//     if (selectedInteractionType !== "all")
//       params.append("interaction_type", selectedInteractionType);
//     if (startDate) params.append("start_date", startDate);
//     if (endDate) params.append("end_date", endDate);

//     const res = await fetch(`${BASE_URL}/all?${params.toString()}`);
//     const data = await res.json();
    
//     if (data?.success) {
//       const exportData = data.data.map((enquiry, index) => ({
//         "Sr. No.": index + 1,
//         "Full Name": enquiry.full_name || "",
//         "Mobile Number": enquiry.mobile_no || "",
//         "Project": enquiry.project_name || "",
//         "Executive": enquiry.executive_name || "",
//         "Interaction Type": enquiry.interaction_type || "",
//         "Date": formatDate(enquiry.date),
//         "Unit Number": enquiry.unit_no || "",
//         "Remark": enquiry.remark || ""
//       }));

//       const ws = XLSX.utils.json_to_sheet(exportData);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
//       XLSX.writeFile(
//         wb,
//         `enquiries_${new Date().toISOString().split("T")[0]}.xlsx`
//       );
//     }
//   } catch (e) {
//     console.log("[v0] handleExport error:", e);
//     alert("Error exporting data. Please try again.");
//   }
// };


//   const viewEnquiryDetails = async (enquiryId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/${enquiryId}`);
//       const data = await res.json();
//       if (data?.success) {
//         setSelectedEnquiry(data.data);
//         setShowDetails(true);
//       }
//     } catch (e) {
//       console.log("[v0] viewEnquiryDetails error:", e);
//     }
//   };

//   const handleFilterChange = () => {
//     setCurrentPage(1);
//     fetchEnquiries(1);
//   };

//   const truncateWords = (text = "", maxWords = 7) => {
//     const parts = String(text).trim().split(/\s+/);
//     if (parts.length <= maxWords) return text;
//     return parts.slice(0, maxWords).join(" ") + "...";
//   };

//   const clearFilters = () => {
//     setSearchTerm("");
//     setSelectedInteractionType("all");
//     setStartDate("");
//     setEndDate("");
//     setCurrentPage(1);
//     fetchEnquiries(1);
//   };

//   const goToPage = (page) => {
//     setCurrentPage(page);
//     fetchEnquiries(page);
//   };

//   useEffect(() => {
//     fetchEnquiries();
//     fetchInteractionTypes();
//   }, []);

//   useEffect(() => {
//     const id = setTimeout(() => {
//       if (searchTerm.length >= 2 || searchTerm.length === 0)
//         handleFilterChange();
//     }, 500);
//     return () => clearTimeout(id);
//   }, [searchTerm]);

//   useEffect(() => {
//     handleFilterChange();
//   }, [selectedInteractionType, startDate, endDate]);

//   const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//             <Header title="All Inquiry" showBackButton={true} />

//       <main className="p-4 space-y-4">
//         {/* Search + Filters Card */}
//         <section className="bg-white rounded-lg shadow p-4 space-y-4">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Search by name, project, executive, or mobile..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Filters Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             {/* Interaction Type Select */}
//             {/* <div>
//               <label className="sr-only">Interaction Type</label>
//               <select
//                 value={selectedInteractionType}
//                 onChange={(e) => setSelectedInteractionType(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Types</option>
//                 {interactionTypes.map((t) => (
//                   <option key={t.interaction_type} value={t.interaction_type}>
//                     {t.interaction_type} ({t.count})
//                   </option>
//                 ))}
//               </select>
//             </div> */}

//             <div className="flex gap-4">
//   {/* Start Date */}
//   <div className="flex-1">
//     <label className="ml-1">Start Date</label>
//     <input
//       type="date"
//       placeholder="dd/mm/yyyy"
//       value={startDate}
//       onChange={(e) => setStartDate(e.target.value)}
//       className="date-input w-35 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>

//   {/* End Date */}
//   <div className="flex-1">
//     <label className="ml-1">End Date</label>
//     <input
//       type="date"
//       placeholder="dd/mm/yyyy"
//       value={endDate}
//       onChange={(e) => setEndDate(e.target.value)}
//       className="date-input w-35 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// </div>

//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-2">
//             <button
//               type="button"
//               onClick={handleExport}
//               className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
//             >
//               <Download className="h-4 w-4" />
//               Export to Excel
//             </button>
//             <button
//               type="button"
//               onClick={clearFilters}
//               className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//             >
//               <Filter className="h-4 w-4" />
//               Clear Filters
//             </button>
//           </div>
//         </section>

//         {/* Stats */}
//         {/* <section className="grid grid-cols-2 gap-4"> */}
//         <div className="bg-white rounded-lg shadow p-4 text-center">
//           <div className="text-2xl font-bold text-blue-600">
//             {stats?.total || 0}
//           </div>
//           <div className="text-sm text-gray-600">Total Enquiries</div>
//         </div>
//         {/* <div className="bg-white rounded-lg shadow p-4 text-center">
//             <div className="text-2xl font-bold text-blue-600">
//               {enquiries.length}
//             </div>
//             <div className="text-sm text-gray-600">Search Results</div>
//           </div> */}
//         {/* </section> */}

//         {/* Interaction Type Pills */}
//         {/* {Array.isArray(stats?.interactionTypes) && stats.interactionTypes.length > 0 && (
//           <section className="bg-white rounded-lg shadow">
//             <div className="px-4 pt-4">
//               <h3 className="text-sm font-semibold text-gray-800">Interaction Types</h3>
//             </div>
//             <div className="p-4 flex flex-wrap gap-2">
//               {stats.interactionTypes.map((type) => (
//                 <span
//                   key={type.interaction_type}
//                   className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
//                 >
//                   {type.interaction_type}: {type.count}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )} */}

//         {/* List */}
//         <section className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center text-gray-600">Loading...</div>
//           ) : enquiries.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No enquiries found
//             </div>
//           ) : (
//             <>
//               {/* Header Row */}
              // <div className="bg-gray-800 text-white p-3 grid grid-cols-12 gap-2 text-sm font-medium">
              //   <div className="col-span-1">Sr.</div>
              //   <div className="col-span-3">Full Name</div>
              //   <div className="col-span-3">Project</div>
              //   <div className="col-span-3">Executive</div>
              //   <div className="col-span-2 text-center">Action</div>
              // </div>
//               {/* Rows */}
              // <div className="divide-y">
              //   {enquiries.map((enquiry, idx) => (
              //     <div
              //       key={enquiry.id}
              //       className="p-3 grid grid-cols-12 gap-2 items-center text-sm hover:bg-gray-50"
              //     >
              //       <div className="col-span-1 font-medium">
              //         {(currentPage - 1) * 15 + idx + 1}
              //       </div>

              //       <div className="col-span-3" title={enquiry.full_name}>
              //         <div className="font-medium">
              //           {truncateWords(enquiry.full_name, 7)}
              //         </div>
              //       </div>

              //       <div className="col-span-3" title={enquiry.project_name}>
              //         <div className="font-medium">
              //           {truncateWords(enquiry.project_name, 7)}
              //         </div>
              //       </div>

              //       <div className="col-span-3" title={enquiry.executive_name}>
              //         <div>{truncateWords(enquiry.executive_name, 7)}</div>
              //       </div>

              //       <div className="col-span-2 flex justify-center">
              //         <button
              //           type="button"
              //           onClick={() => viewEnquiryDetails(enquiry.id)}
              //           className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              //           aria-label="View details"
              //           title="View details"
              //         >
              //           <Eye className="h-4 w-4" />
              //         </button>
              //       </div>
              //     </div>
              //   ))}
              // </div>
//             </>
//           )}
//         </section>

//         {/* Pagination */}
//         {pagination?.totalPages > 1 && (
//           <section className="bg-white rounded-lg shadow p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing {(currentPage - 1) * 15 + 1} to{" "}
//                 {Math.min(currentPage * 15, pagination.totalRecords || 0)} of{" "}
//                 {pagination.totalRecords || 0} entries
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={!pagination.hasPrevPage}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   Prev
//                 </button>
//                 <span className="text-sm">
//                   Page {currentPage} of {pagination.totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={!pagination.hasNextPage}
//                 >
//                   Next
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Modal (pure Tailwind) */}
//       {showDetails && (
//         <div
//           className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             className="absolute inset-0 bg-black/50"
//             onClick={() => setShowDetails(false)}
//           />
//           <div className="relative w-full sm:max-w-md mx-auto bg-white rounded-t-xl sm:rounded-xl shadow-xl ring-1 ring-gray-200">
//             <div className="flex items-center justify-between px-4 py-3 border-b">
//               <h2 className="text-base font-semibold">Enquiry Details</h2>
//               <button
//                 className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
//                 onClick={() => setShowDetails(false)}
//                 aria-label="Close"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>
//             <div className="max-h-[70vh] overflow-y-auto p-4">
//               {selectedEnquiry && (
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="grid grid-cols-2 gap-2">
//                     <div className="text-sm text-gray-600">Customer Name</div>
//                     <div className="font-medium">
//                       {selectedEnquiry.full_name}
//                     </div>

//                     <div className="text-sm text-gray-600">Mobile Number</div>
//                     <div>{selectedEnquiry.mobile_no}</div>

//                     <div className="text-sm text-gray-600">Project</div>
//                     <div>{selectedEnquiry.project_name}</div>

//                     <div className="text-sm text-gray-600">Executive</div>
//                     <div>{selectedEnquiry.executive_name}</div>

//                     <div className="text-sm text-gray-600">
//                       Interaction Type
//                     </div>
//                     <div>
//                       <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
//                         {selectedEnquiry.interaction_type}
//                       </span>
//                     </div>

//                     <div className="text-sm text-gray-600">Date</div>
//                     <div>{formatDate(selectedEnquiry.date)}</div>

//                     {selectedEnquiry.unit_no && (
//                       <>
//                         <div className="text-sm text-gray-600">Unit Number</div>
//                         <div>{selectedEnquiry.unit_no}</div>
//                       </>
//                     )}

//                     {selectedEnquiry.remark && (
//                       <>
//                         <div className="text-sm text-gray-600">Remark</div>
//                         <div className="text-sm bg-gray-50 p-2 rounded">
//                           {selectedEnquiry.remark}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import { BASE_URL } from "../utils/constants";
import Header from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";

export default function AllEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInteractionType, setSelectedInteractionType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState({});
  const [interactionTypes, setInteractionTypes] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Format date to DD/MM/YYYY string
  const formatDateToDDMMYYYY = (date) => {
    if (!date || !isValid(date)) return "";
    return format(date, "dd/MM/yyyy");
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

  // Convert Date to YYYY-MM-DD for API calls
  const formatDateForAPI = (date) => {
    if (!date || !isValid(date)) return "";
    return format(date, "yyyy-MM-dd");
  };

  const fetchEnquiries = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
      });
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (selectedInteractionType !== "all")
        params.append("interaction_type", selectedInteractionType);
      if (startDate) params.append("start_date", formatDateForAPI(startDate));
      if (endDate) params.append("end_date", formatDateForAPI(endDate));

      const res = await fetch(`${BASE_URL}/all?${params.toString()}`);
      const data = await res.json();
      console.log("res", res);
      console.log("data", data);
      if (data?.success) {
        setEnquiries(data.data || []);
        setPagination(data.pagination || {});
        setStats(data.stats || {});
      }
    } catch (e) {
      console.log("[v0] fetchEnquiries error:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInteractionTypes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/interaction-types`);
      const data = await res.json();
      if (data?.success) setInteractionTypes(data.data || []);
    } catch (e) {
      console.error("Error fetching interaction types:", e);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        export: "true",
        limit: "10000",
      });
      
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (selectedInteractionType !== "all")
        params.append("interaction_type", selectedInteractionType);
      if (startDate) params.append("start_date", formatDateForAPI(startDate));
      if (endDate) params.append("end_date", formatDateForAPI(endDate));

      const res = await fetch(`${BASE_URL}/all?${params.toString()}`);
      const data = await res.json();
      
      if (data?.success) {
        const exportData = data.data.map((enquiry, index) => {
          // Format date for Excel export in DD/MM/YYYY format
          const formattedDate = enquiry.date 
            ? format(new Date(enquiry.date), "dd/MM/yyyy")
            : "";
            
          return {
            "Sr. No.": index + 1,
            "Full Name": enquiry.full_name || "",
            "Mobile Number": enquiry.mobile_no || "",
            "Project": enquiry.project_name || "",
            "Executive": enquiry.executive_name || "",
            "Interaction Type": enquiry.interaction_type || "",
            "Date": formattedDate,
            "Unit Number": enquiry.unit_no || "",
            "Remark": enquiry.remark || ""
          };
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
        XLSX.writeFile(
          wb,
          `enquiries_${format(new Date(), "dd_MM_yyyy")}.xlsx`
        );
      }
    } catch (e) {
      console.log("[v0] handleExport error:", e);
      alert("Error exporting data. Please try again.");
    }
  };

  const viewEnquiryDetails = async (enquiryId) => {
    try {
      const res = await fetch(`${BASE_URL}/${enquiryId}`);
      const data = await res.json();
      if (data?.success) {
        setSelectedEnquiry(data.data);
        setShowDetails(true);
      }
    } catch (e) {
      console.log("[v0] viewEnquiryDetails error:", e);
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchEnquiries(1);
  };

  const truncateWords = (text = "", maxWords = 7) => {
    const parts = String(text).trim().split(/\s+/);
    if (parts.length <= maxWords) return text;
    return parts.slice(0, maxWords).join(" ") + "...";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedInteractionType("all");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
    fetchEnquiries(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    fetchEnquiries(page);
  };

  useEffect(() => {
    fetchEnquiries();
    fetchInteractionTypes();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm.length === 0)
        handleFilterChange();
    }, 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedInteractionType, startDate, endDate]);

  // Custom input component for date picker
  const CustomDateInput = ({ value, onClick, onChange, placeholder }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  // Handle manual date input with DD/MM/YYYY format
  const handleManualDateChange = (dateString, setDateFunction) => {
    const parsedDate = parseDDMMYYYYToDate(dateString);
    if (parsedDate && isValid(parsedDate)) {
      setDateFunction(parsedDate);
    }
  };

  // Format date for display in DD/MM/YYYY format
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (e) {
      return "-";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="All Inquiry" showBackButton={true} />

      <main className="p-4 space-y-4">
        {/* Search + Filters Card */}
        <section className="bg-white rounded-lg shadow p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name, project, executive, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Interaction Type Select */}
            <div className="hidden">
              <label className="block text-xs text-gray-500 mb-1">Interaction Type</label>
              <select
                value={selectedInteractionType}
                onChange={(e) => setSelectedInteractionType(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {interactionTypes.map((t) => (
                  <option key={t.interaction_type} value={t.interaction_type}>
                    {t.interaction_type} ({t.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              {/* Start Date */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <CustomDateInput
                      value={startDate ? formatDateToDDMMYYYY(startDate) : ""}
                      onChange={(e) => handleManualDateChange(e.target.value, setStartDate)}
                      placeholder="DD/MM/YYYY"
                    />
                  }
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Date */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <CustomDateInput
                      value={endDate ? formatDateToDDMMYYYY(endDate) : ""}
                      onChange={(e) => handleManualDateChange(e.target.value, setEndDate)}
                      placeholder="DD/MM/YYYY"
                    />
                  }
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </button>
          </div>
        </section>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {stats?.total || 0}
          </div>
          <div className="text-sm text-gray-600">Total Enquiries</div>
        </div>

        {/* List */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No enquiries found
            </div>
          ) : (
            <>
              {/* Header Row */}
              <div className="bg-gray-800 text-white p-3 grid grid-cols-12 gap-2 text-sm font-medium">
                <div className="col-span-1">Sr.</div>
                <div className="col-span-3">Full Name</div>
                <div className="col-span-3">Project</div>
                <div className="col-span-3">Executive</div>
                <div className="col-span-2 text-center">Action</div>
              </div>
              {/* Rows */}
               <div className="divide-y">
                {enquiries.map((enquiry, idx) => (
                  <div
                    key={enquiry.id}
                    className="p-3 grid grid-cols-12 gap-2 items-center text-sm hover:bg-gray-50"
                  >
                    <div className="col-span-1 font-medium">
                      {(currentPage - 1) * 15 + idx + 1}
                    </div>

                    <div className="col-span-3" title={enquiry.full_name}>
                      <div className="">
                        {truncateWords(enquiry.full_name, 7)}
                      </div>
                    </div>

                    <div className="col-span-3" title={enquiry.project_name}>
                      <div className="">
                        {truncateWords(enquiry.project_name, 7)}
                      </div>
                    </div>

                    <div className="col-span-3 ml-3" title={enquiry.executive_name}>
                      <div>{truncateWords(enquiry.executive_name, 7)}</div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => viewEnquiryDetails(enquiry.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        aria-label="View details"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * 15 + 1} to{" "}
                {Math.min(currentPage * 15, pagination.totalRecords || 0)} of{" "}
                {pagination.totalRecords || 0} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <span className="text-sm">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal (pure Tailwind) */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetails(false)}
          />
          <div className="relative w-full sm:max-w-md mx-auto bg-white rounded-t-xl sm:rounded-xl shadow-xl ring-1 ring-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-base font-semibold">Enquiry Details</h2>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
                onClick={() => setShowDetails(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-4">
              {selectedEnquiry && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-600">Customer Name</div>
                    <div className="font-medium">
                      {selectedEnquiry.full_name}
                    </div>

                    <div className="text-sm text-gray-600">Mobile Number</div>
                    <div>{selectedEnquiry.mobile_no}</div>

                    <div className="text-sm text-gray-600">Project</div>
                    <div>{selectedEnquiry.project_name}</div>

                    <div className="text-sm text-gray-600">Executive</div>
                    <div>{selectedEnquiry.executive_name}</div>

                    <div className="text-sm text-gray-600">
                      Interaction Type
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
                        {selectedEnquiry.interaction_type}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">Date</div>
                    <div>{formatDateDisplay(selectedEnquiry.date)}</div>

                    {selectedEnquiry.unit_no && (
                      <>
                        <div className="text-sm text-gray-600">Unit Number</div>
                        <div>{selectedEnquiry.unit_no}</div>
                      </>
                    )}

                    {selectedEnquiry.remark && (
                      <>
                        <div className="text-sm text-gray-600">Remark</div>
                        <div className="text-sm bg-gray-50 p-2 rounded">
                          {selectedEnquiry.remark}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}