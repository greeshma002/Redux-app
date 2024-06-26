import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onClose,onUpdate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  console.log("GREESHMA",user);
  console.log("formData",formData);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const editEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const editUsername = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('hghdhd',formData);
      const response = await axios.post(`/api/user/editUser/${user._id}`, formData);
      console.log('RESPONSE',response);

      if (response.data.success) {
        onUpdate(response.data.data); 
        onClose();
      } else {
        console.log('Failed to update user', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              id="username"
              onChange={editUsername}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              id="email"
              onChange={editEmail}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
