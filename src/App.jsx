import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { CrudProvider } from './contexts/CrudContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import CrudPage from './pages/CrudPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import PrivatRoute from './components/PrivatRoute';
import './index.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CrudProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PrivatRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/crud" element={<CrudPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </CrudProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;