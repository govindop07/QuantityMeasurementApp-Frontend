import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    onLogout && onLogout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`;

  return (
    <nav className="flex justify-between items-center px-8 h-14 bg-white shadow-sm sticky top-0 z-50">

      <div>
        <NavLink to="/home" className="text-xl font-bold text-gray-900 no-underline">
          Quantity Measurement
        </NavLink>
      </div>

      <div className="flex items-center gap-7">
        <NavLink to="/home"       className={linkClass}>Home</NavLink>
        <NavLink to="/conversion" className={linkClass}>Conversion</NavLink>
        <NavLink to="/operations" className={linkClass}>Operations</NavLink>
        <NavLink to="/history"    className={linkClass}>History</NavLink>
        <span className="text-gray-500 text-sm hidden sm:inline-block">{authService.getUserName()}</span>
        <button className="bg-transparent border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors" onClick={handleLogout}>Logout</button>
      </div>

    </nav>
  );
}
