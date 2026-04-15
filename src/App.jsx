import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import authService from './services/authService.js';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/home/Home.jsx';
import Conversion from './pages/conversion/Conversion.jsx';
import Operations from './pages/operations/Operations.jsx';
import History from './pages/history/History.jsx';

function AppLayout() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    setLoggedIn(authService.isLoggedIn());
  }, [location.pathname]);

  return (
    <>
      {loggedIn && <Navbar onLogout={() => setLoggedIn(false)} />}
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<Login    onLogin={() => setLoggedIn(true)} />} />
        <Route path="/register" element={<Register onLogin={() => setLoggedIn(true)} />} />

        {/* Protected routes */}
        <Route path="/home"       element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/conversion" element={<ProtectedRoute><Conversion /></ProtectedRoute>} />
        <Route path="/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
        <Route path="/history"    element={<ProtectedRoute><History /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
