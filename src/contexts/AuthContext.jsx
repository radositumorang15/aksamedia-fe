import React, { createContext, useContext, useState, useEffect } from 'react';
import { STATIC_USERNAME, STATIC_PASSWORD } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []); 

  const login = (username, password) => {
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
      setUser(username);
      localStorage.setItem('authenticatedUser', username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authenticatedUser');
  };

  const updateUsername = (newUsername) => {
    setUser(newUsername); 
    localStorage.setItem('authenticatedUser', newUsername);
  };

  useEffect(() => {
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUsername, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};