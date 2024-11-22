import React, { useState } from "react";

const EditUser = ({ closePopup, userData }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Form
  const validate = () => {
    const newErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.website.match(/^(https?:\/\/)?(www\.)?\S+\.\S+$/))
      newErrors.website = "Invalid website URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = () => {
    if (validate()) {
      alert("Form submitted successfully!");
      closePopup();
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={closePopup}
    >
      <div
        className="bg-white  shadow-lg w-96 relative p-6 pb-0 border border-b-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          className="text-2xl absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4  move-up ">Basic Model</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white  shadow-lg w-96 relative p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex justify-end items-center gap-1 ">
              <label className="block text-sm font-medium text-gray-700 ">
                <span className="text-red-500">*</span> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            {/* Email */}
            <div className="flex justify-end items-center gap-1 ">
              <label className="block text-sm font-medium text-gray-700 ">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex justify-end items-center gap-1 ">
              <label className="block text-sm font-medium text-gray-700 ">
                <span className="text-red-500">*</span> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            {/* Website */}
            <div className="flex justify-end items-center gap-1 ">
              <label className="block text-sm font-medium text-gray-700 ">
                <span className="text-red-500">*</span>  Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                placeholder="Enter your website URL"
              />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website}</p>
              )}
            </div>
          </div>
        </div>
        <div
          className="bg-white rounded-b-md border-t  border-b-2 w-96 relative p-6 pt-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" flex justify-end space-x-4  pt-3">
            <button
              onClick={closePopup}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
