import React, { useState } from "react";
import {
  MdAdd,
  MdDelete,
  MdCheckCircle,
  MdError,
  MdClose,
  MdSend,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import { MdArrowBack } from "react-icons/md";

const AddClinetProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "",
  });
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const { name, address, type } = formData;

    if (!name || !address || !type) {
      setAlert({ type: "error", message: "All fields are required" });
      return;
    }

    setProjects([...projects, formData]);
    setFormData({ name: "", address: "", type: "" });
    setAlert({ type: "", message: "" });
  };

  const handleRemove = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmitAll = async () => {
    if (projects.length === 0) {
      setAlert({
        type: "error",
        message: "Please add at least one project before submitting",
      });
      return;
    }

    setIsLoading(true);
    try {
      await Promise.all(
        projects.map((project) => api.post("/projects/add", project))
      );
      setAlert({ type: "success", message: "Projects added successfully!" });
      setProjects([]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Projects added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/allprojects");
      }, 1000);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to submit projects" });
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to submit projects",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto  max-w-6xl">
      <div className="bg-white  shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        {/* Header */}
<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
    >
      <MdArrowBack size={20} />
    </button>
    Add Project
  </h2>

  {/* View All Projects Link */}
  <button
    onClick={() => navigate('/allprojects')}
    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
  >
    View All Projects
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

          {/* Form */}
          <form onSubmit={handleAddProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Project Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                >
                  <option value="">Select Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* Add Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm md:text-base"
              >
                <MdAdd size={20} />
                Add Project
              </button>
            </div>
          </form>

          {/* Projects Table */}
          {projects.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Added Projects
              </h3>

              <div className="overflow-hidden border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {project.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRemove(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <MdDelete size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSubmitAll}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {/* <MdSend size={18} /> */}
                      Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddClinetProject;
