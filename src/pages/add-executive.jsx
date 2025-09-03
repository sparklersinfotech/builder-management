import React, { useState } from "react";
import { MdAdd, MdCheckCircle, MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { MdArrowBack } from "react-icons/md";

const AddExecutive = () => {
  const navigate = useNavigate();
  const [executive, setExecutive] = useState({
    full_name: "",
    mobile: "",
    email: "",
    designation: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setExecutive({ ...executive, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { full_name, mobile, email, designation } = executive;
    const mobileRegex = /^[6-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!full_name || !mobile || !email || !designation)
      return "All fields are required";
    if (!mobileRegex.test(mobile))
      return "Mobile number must be 10 digits starting with 6-9";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/executives/add", executive);
      setExecutive({
        full_name: "",
        mobile: "",
        email: "",
        designation: "",
      });
      setMessage({ type: "success", text: res.data.message });

      setTimeout(() => {
        navigate("/executive-management");
      }, 1000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error adding executive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^[6-9]?\d{0,9}$/.test(value)) {
      handleChange(e);
    }
  };

  return (
    <div className="container mx-auto  max-w-6xl">
      <div className="bg-white  shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
    >
      <MdArrowBack size={20} />
    </button>
    Add Executive
  </h2>

  {/* View All Executives Button */}
  <button
    onClick={() => navigate('/executive-management')}
    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
  >
    View All Executives
  </button>
</div>


        {/* Body */}
        <div className="p-4 md:p-6">
          {/* Alert Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-center ${
                message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              {message.type === "error" ? (
                <MdError className="mr-3 flex-shrink-0" size={20} />
              ) : (
                <MdCheckCircle className="mr-3 flex-shrink-0" size={20} />
              )}
              <span className="font-medium">{message.text}</span>
              <button
                onClick={() => setMessage({ type: "", text: "" })}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="full_name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={executive.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={executive.mobile}
                  onChange={handleMobileChange}
                  placeholder="10-digit mobile (starts with 6-9)"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={executive.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label
                  htmlFor="designation"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={executive.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleAdd}
                disabled={isLoading}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm md:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <MdAdd size={20} />
                    Add Executive
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExecutive;
