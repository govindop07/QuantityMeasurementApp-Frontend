import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService.js';

export default function ProtectedRoute({ children }) {

  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
