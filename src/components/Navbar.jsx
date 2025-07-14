import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, setThemeMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode); 
  };

  return (
    <nav className="bg-white p-4 shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-500 dark:text-white text-xl font-bold">
          CRUD APP
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${theme === 'light' ? 'bg-gray-500' : ''}`}
              title="Light mode"
            >
              ☀️
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${theme === 'dark' ? 'bg-gray-500' : ''}`}
              title="Dark mode"
            >
              🌙
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${theme === 'system' ? 'bg-gray-500' : ''}`}
              title="Follow system"
            >
              🌗
            </button>
          </div>
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white  bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              >
                Hello, {user}!
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
