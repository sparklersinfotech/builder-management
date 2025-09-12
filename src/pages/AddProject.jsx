
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import api from "../services/api";
// import Swal from "sweetalert2";

// const AddProject = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [customer, setCustomer] = useState(null);
//   const [formData, setFormData] = useState({
//     selectedProject: "",
//     selectedExecutive: "",
//     selectedInteraction: "Enquiry",
//     date: new Date().toISOString().split("T")[0],
//     unitNo: "",
//     remark: "",
//   });
//   const [projects, setProjects] = useState([]);
//   const [executives, setExecutives] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const interactionTypes = [
//     "Call Receive",
//     "Enquiry",
//     "Meeting Done",
//     "Booked",
//   ];

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const customerId = searchParams.get("customerId");
//     const firstName = searchParams.get("firstName");
//     const middleName = searchParams.get("middleName");
//     const lastName = searchParams.get("lastName");
//     const mobile = searchParams.get("mobile");

//     if (customerId && firstName && lastName && mobile) {
//       setCustomer({
//         id: Number.parseInt(customerId),
//         first_name: firstName,
//         middle_name: middleName || "",
//         last_name: lastName,
//         mobile_no: mobile,
//       });
//     }

//     fetchProjects();
//     fetchExecutives();
//   }, [location]);

//   const fetchProjects = async () => {
//     try {
//       const response = await api.get("/projects-customer");
//       if (response.data.success) {
//         setProjects(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchExecutives = async () => {
//     try {
//       const response = await api.get("/executives");
//       if (response.data.success) {
//         setExecutives(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching executives:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleInteractionChange = (type) => {
//     setFormData({
//       ...formData,
//       selectedInteraction: type,
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (
//   //     !formData.selectedProject ||
//   //     !formData.selectedExecutive ||
//   //     !formData.selectedInteraction
//   //   ) {
//   //     setError("Please fill all required fields");
//   //     return;
//   //   }

//   //   setIsLoading(true);
//   //   setError("");

//   //   try {
//   //     const response = await api.post("/add-project-details", {
//   //       customer_id: customer?.id,
//   //       project_id: formData.selectedProject,
//   //       executive_id: formData.selectedExecutive,
//   //       interaction_type: formData.selectedInteraction,
//   //       date: formData.date,
//   //       unit_no: formData.unitNo || null,
//   //       remark: formData.remark || null,
//   //     });

//   //     if (response.data.success) {
//   //       alert("Enquiry details added successfully!");
//   //       navigate(-1);
//   //     }
//   //   } catch (error) {
//   //     console.error("Add Enquiry error:", error);
//   //     const errorMessage =
//   //       error.response?.data?.message || "Failed to add Enquiry details";
//   //     setError(errorMessage);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
  
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (
//     !formData.selectedProject ||
//     !formData.selectedExecutive ||
//     !formData.selectedInteraction
//   ) {
//     setError("Please fill all required fields");
//     return;
//   }

//   setIsLoading(true);
//   setError("");

//   try {
//     const response = await api.post("/add-project-details", {
//       customer_id: customer?.id,
//       project_id: formData.selectedProject,
//       executive_id: formData.selectedExecutive,
//       interaction_type: formData.selectedInteraction,
//       date: formData.date,
//       unit_no: formData.unitNo || null,
//       remark: formData.remark || null,
//     });

//     if (response.data.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Enquiry details added successfully!",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         navigate(-1);
//       }, 2000);
//     }
//   } catch (error) {
//     console.error("Add Enquiry error:", error);
//     const errorMessage =
//       error.response?.data?.message || "Failed to add Enquiry details";

//     Swal.fire({
//       icon: "error",
//       title: "Error!",
//       text: errorMessage,
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };


//   if (!customer) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header title="Add Enquiry Details" showBackButton={true} />
//         <div className="container mx-auto px-4 py-8 text-center">
//           <p className="text-red-600">
//              data found. Please select a customer first.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header title="Add Enquiry Details" showBackButton={true} />

//       <div className="container mx-auto px-4 py-6 max-w-2xl">
//         {/* Customer Info Card */}
//         <div className="bg-white rounded-lg shadow-sm mb-6">
//           <div className="px-6 py-4 border-b">
//             <h3 className="text-lg font-semibold flex items-center space-x-2">
//               <span>👤</span>
//               <span>Customer Information</span>
//             </h3>
//           </div>
//           <div className="p-6">
//             <div className="space-y-2">
//               <p className="text-lg font-semibold">
//                 {customer.first_name}{" "}
//                 {customer.middle_name ? customer.middle_name + " " : ""}
//                 {customer.last_name}
//               </p>
//               <p className="text-gray-600">{customer.mobile_no}</p>
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                   {error}
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Project*
//                 </label>
//                 <select
//                   name="selectedProject"
//                   value={formData.selectedProject}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                 <label className="block text-sm font-medium text-gray-700">
//                   Executive*
//                 </label>
//                 <select
//                   name="selectedExecutive"
//                   value={formData.selectedExecutive}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                 <label className="block text-sm font-medium text-gray-700">
//                   Interaction Type*
//                 </label>
//                 <div className="space-y-2">
//                   {interactionTypes.map((type) => (
//                     <div
//                       key={type}
//                       className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
//                         formData.selectedInteraction === type
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => handleInteractionChange(type)}
//                     >
//                       <span className="font-medium">{type}</span>
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.selectedInteraction === type
//                             ? "border-blue-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         {formData.selectedInteraction === type && (
//                           <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Date*
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Unit No
//                 </label>
//                 <input
//                   type="text"
//                   name="unitNo"
//                   placeholder="Enter unit number"
//                   value={formData.unitNo}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Remark
//                 </label>
//                 <textarea
//                   name="remark"
//                   placeholder="Enter remark"
//                   value={formData.remark}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition duration-200 disabled:opacity-50"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Adding Details..." : "➕ Submit Details"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProject;


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";

const AddProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    selectedProject: "",
    selectedExecutive: "",
    selectedInteraction: "Enquiry",
    date: new Date(),
    unitNo: "",
    remark: "",
  });
  const [projects, setProjects] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const interactionTypes = [
    "Call Receive",
    "Enquiry",
    "Meeting Done",
    "Booked",
  ];

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const customerId = searchParams.get("customerId");
    const firstName = searchParams.get("firstName");
    const middleName = searchParams.get("middleName");
    const lastName = searchParams.get("lastName");
    const mobile = searchParams.get("mobile");

    if (customerId && firstName && lastName && mobile) {
      setCustomer({
        id: Number.parseInt(customerId),
        first_name: firstName,
        middle_name: middleName || "",
        last_name: lastName,
        mobile_no: mobile,
      });
    }

    fetchProjects();
    fetchExecutives();
  }, [location]);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects-customer");
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchExecutives = async () => {
    try {
      const response = await api.get("/executives");
      if (response.data.success) {
        setExecutives(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching executives:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  // Handle manual date input with DD/MM/YYYY format
  const handleManualDateChange = (dateString) => {
    const parsedDate = parseDDMMYYYYToDate(dateString);
    if (parsedDate && isValid(parsedDate)) {
      setFormData({
        ...formData,
        date: parsedDate,
      });
    }
  };

  const handleInteractionChange = (type) => {
    setFormData({
      ...formData,
      selectedInteraction: type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.selectedProject ||
      !formData.selectedExecutive ||
      !formData.selectedInteraction
    ) {
      setError("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/add-project-details", {
        customer_id: customer?.id,
        project_id: formData.selectedProject,
        executive_id: formData.selectedExecutive,
        interaction_type: formData.selectedInteraction,
        date: formatDateForAPI(formData.date),
        unit_no: formData.unitNo || null,
        remark: formData.remark || null,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Enquiry details added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.error("Add Enquiry error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add Enquiry details";

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Custom input component for date picker
  const CustomDateInput = ({ value, onClick, onChange, placeholder }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Add Enquiry Details" showBackButton={true} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-600">
            data found. Please select a customer first.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Add Enquiry Details" showBackButton={true} />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Customer Info Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>👤</span>
              <span>Customer Information</span>
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {customer.first_name}{" "}
                {customer.middle_name ? customer.middle_name + " " : ""}
                {customer.last_name}
              </p>
              <p className="text-gray-600">{customer.mobile_no}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Project*
                </label>
                <select
                  name="selectedProject"
                  value={formData.selectedProject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700">
                  Executive*
                </label>
                <select
                  name="selectedExecutive"
                  value={formData.selectedExecutive}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700">
                  Interaction Type*
                </label>
                <div className="space-y-2">
                  {interactionTypes.map((type) => (
                    <div
                      key={type}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.selectedInteraction === type
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleInteractionChange(type)}
                    >
                      <span className="font-medium">{type}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.selectedInteraction === type
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.selectedInteraction === type && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date*
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <CustomDateInput
                      value={formatDateToDDMMYYYY(formData.date)}
                      onChange={(e) => handleManualDateChange(e.target.value)}
                      placeholder="DD/MM/YYYY"
                    />
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Unit No
                </label>
                <input
                  type="text"
                  name="unitNo"
                  placeholder="Enter unit number"
                  value={formData.unitNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Remark
                </label>
                <textarea
                  name="remark"
                  placeholder="Enter remark"
                  value={formData.remark}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Adding Details..." : "➕ Submit Details"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;