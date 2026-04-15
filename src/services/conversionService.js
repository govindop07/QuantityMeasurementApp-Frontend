import axios from 'axios';
import authService from './authService.js';

const BASE = 'http://localhost:8080/api/v1/quantities';

function getAxiosConfig() {
  const token = authService.getToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  };
}

const conversionService = {
  async convert(payload) {
    try {
      const res = await axios.post(`${BASE}/convert`, payload, getAxiosConfig());
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Conversion failed');
    }
  },

  async arithmetic(payload) {
    try {
      const res = await axios.post(`${BASE}/arithmetic`, payload, getAxiosConfig());
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Arithmetic operation failed');
    }
  },

  async getHistory() {
    try {
      const res = await axios.get(`${BASE}/history`, getAxiosConfig());
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || 'Failed to load history');
    }
  },
};

export default conversionService;
