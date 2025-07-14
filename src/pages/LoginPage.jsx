import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-4 text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 w-full transition-colors duration-200 text-base"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;