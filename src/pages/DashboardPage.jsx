import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-words">
          Welcome, {user}! 👋
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-2xl mx-auto px-4">
          This is your dashboard. Explore the features below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-lg mx-auto">
          <Link
            to="/crud"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out w-full sm:w-auto text-center min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Go to CRUD</span>
              <span>📊</span>
            </span>
          </Link>
          
          <Link
            to="/profile"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out w-full sm:w-auto text-center min-w-[160px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Edit Profile</span>
              <span>👤</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;