import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/usersSlice";

const EditUser = ({ closePopup, userData }) => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({ ...userData });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/) || formData.email.length < 3) {
      newErrors.email = "Invalid email";
    }

    if (formData.name.length < 3) {
      newErrors.name = "Name must be minimum of 3 characters";
    }
    if (formData.phone.length < 6) {
      newErrors.phone = "Phone must be minimum 6 digits";
    }
    if (formData.website.length < 5) {
      newErrors.website = "URL required of minimum 5 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = () => {
    if (validate()) {
      dispatch(updateUser({user:{...formData,editIndex:undefined},index:formData.editIndex}));
      closePopup();
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={closePopup}
    >
      <div
        className="rounded-t-md bg-white  shadow-lg w-96 relative p-6 pb-0 border border-b-2"
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
        <div
          className="bg-white  shadow-lg w-96 relative p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6">

            <div className="flex justify-end items-center gap-1 ">
              <label className="block text-sm font-medium text-gray-700 ">
                <span className="text-red-500">*</span> Name
              </label>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm text-right absolute">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

             <div className="flex justify-end items-center gap-1 ">
                <label className="block text-sm font-medium text-gray-700 ">
                  <span className="text-red-500">*</span> Email
                </label>
            <div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                  placeholder="Enter your email"
                  />
                   {errors.email && (
                <p className="text-red-500 text-sm  absolute">
                  {errors.email}
                </p>
              )}
                  </div>
              </div>
             
              <div className="flex justify-end items-center gap-1 ">
                <label className="block text-sm font-medium text-gray-700 ">
                  <span className="text-red-500">*</span> Phone
                </label>
                <div>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  />
                     {errors.phone && (
                <p className="text-red-500 text-sm text-right absolute">
                  {errors.phone}
                </p>
              )}
                  </div>
              </div>

              <div className="flex justify-end items-center gap-1 ">
                <label className="block text-sm font-medium text-gray-700 ">
                  <span className="text-red-500">*</span> Website
                </label>
                <div>

                <input
                  type="string"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-64 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                  placeholder="Enter your website URL"
                  />
                  {errors.website && (
                <p className="text-red-500 text-sm text-right absolute">
                  {errors.website}
                </p>
              )}
                  </div>
              </div>
              
          </div>
        </div>
        <div
          className="bg-white rounded-b-md border-t  border-b-2 w-96 relative p-6 pt-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end space-x-4  pt-3">
            <button
              onClick={closePopup}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
    </div>
  );
};

export default EditUser;
