
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  }
};

// Bookings API
export const bookingsAPI = {
  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  
  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  updateBookingStatus: async (bookingId: string, status: string) => {
    const response = await api.patch(`/bookings/${bookingId}`, { status });
    return response.data;
  }
};
