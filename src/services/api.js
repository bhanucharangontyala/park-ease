import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Change this if your Spring Boot runs on a different port

const api = axios.create({
  baseURL: API_BASE_URL,
});

// User Endpoints
export const registerUser = (userData) => api.post('/user/Register', userData);
export const loginUser = (email, password) => api.get(`/user/Login?email=${email}&Password=${password}`);
export const getAllUsers = () => api.get('/user/GetUsers');
export const getAllAdmins = () => api.get('/user/GetAdmins');
export const updateUserDetails = (id, userData) => api.patch(`/user/UpdateUserDetails/${id}`, userData);

// Parking Endpoints
export const getAvailableSlots = () => api.get('/Parking/GetAvailSlots');
export const getAllSlots = () => api.get('/Parking/GetAllSlots');
export const addSlot = (slotData) => api.post('/Parking/AddSlot', slotData);
export const updateSlot = (id, slotData) => api.put(`/Parking/UpdateSlot/${id}`, slotData);
export const updateAvailability = (slotId, status) => api.patch(`/Parking/UpdateAvail?slotId=${slotId}&status=${status}`);
export const deleteSlot = (id) => api.delete(`/Parking/DeleteSlot/${id}`);

// Booking & Payment Endpoints
export const createBooking = (bookingData) => api.post('/api/booking/create', bookingData);
export const verifyPayment = (paymentId, razorpayPaymentId) => 
  api.post('/api/payment/verify', null, {
    params: {
      paymentId: paymentId,
      razorpayPaymentId: razorpayPaymentId
    }
  });

export default api;
