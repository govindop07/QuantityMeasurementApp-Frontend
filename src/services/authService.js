import axios from 'axios';

const BASE = 'http://localhost:8080/api/auth';

const authService = {
  async register(data) {
    try {
      const res = await axios.post(`${BASE}/register`, data);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data || err.message || 'Registration failed');
    }
  },

  async login(data) {
    try {
      const res = await axios.post(`${BASE}/login`, data);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data || err.message || 'Invalid email or password.');
    }
  },

  async googleLogin(credential) {
    try {
      const res = await axios.post(`${BASE}/google`, { credential });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data || err.message || 'Google authentication failed.');
    }
  },

  saveSession(token, name, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUserName() {
    return localStorage.getItem('name') || '';
  },

  getUserEmail() {
    return localStorage.getItem('email') || '';
  },
};

export default authService;
