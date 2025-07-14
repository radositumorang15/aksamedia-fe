import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateUsername } = useAuth();
  const [newUsername, setNewUsername] = useState(user || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setNewUsername(user || '');
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (newUsername.trim() && newUsername.trim() !== user) {
      updateUsername(newUsername.trim());
      setMessage('Username updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else if (newUsername.trim() === user) {
      setMessage('No changes to save.');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Username cannot be empty.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        
        {message && (
          <div className={`text-center mb-4 p-3 rounded-md text-sm sm:text-base ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="username" 
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              New Username:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 text-base"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 w-full transition-colors duration-200 text-base"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;