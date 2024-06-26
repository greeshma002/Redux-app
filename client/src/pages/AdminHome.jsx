import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';

function AdminHome() {
  const [userDetails, setUserDetails] = useState([]);
  const [EditUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/user/getUser');
        setUserDetails(response.data);
        
      } catch (err) {
        setError(err);
      }
    };

    fetchUserDetails();
  }, []);
console.log('userDetails',userDetails);
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/user/deleteUser/${userId}`);
      setUserDetails(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError(err);
    }
  };

 
  const handleEditUser = async (userId) => {
    try {
      const response = await axios.post(`/api/user/editUser/${userId}`);
      console.log('responce vanaii data',response.data);
      if (response.data.success) {
        setEditUser({ ...response.data.data, userId });
        setIsModalOpen(true); 
      } else {
        console.log('Failed to fetch user details', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error);
    }
  };
  
  const handleUpdateUser = (updatedUser) => {
    setUserDetails((prevUsers) => {
      return prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user));
    });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleAddNewUser = (newUser) => {
    setUserDetails([...userDetails, newUser]);
    setIsAddModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = userDetails.filter(user => {
    return user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderTable = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user,index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xl text-gray-900">{user.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xl text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className= "text-xl text-indigo-600 hover:text-indigo-900 mr-2"
                 onClick={() => handleEditUser(user._id)}
                >
                  Edit
                </button>
                {isModalOpen && <EditUserModal  
          onUpdate={handleUpdateUser} user={EditUser} onClose={handleCloseModal} />}
          
            
                <button
                  className="text-xl text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Here"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
      {renderTable()}
      <div className="mt-4">
      <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      {isAddModalOpen && (
        <AddUserModal
          onClose={handleCloseAddModal}
          onAdd={handleAddNewUser}
        />
      )}
    </div>
  );
}

export default AdminHome;
