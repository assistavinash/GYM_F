import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Uses .env for backend URL
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const adminService = {
  getAllUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data;
  },
  approveUser: async (id) => {
    return api.post(`/admin/users/${id}/approve`);
  },
  deleteUser: async (id) => {
    return api.delete(`/admin/users/${id}`);
  }
};

// Send gym enquiry form data
// Create a new class (trainer or admin)
export const createClass = async (classData) => {
  return api.post('/classes', classData);
};

// Get all classes
export const getClasses = async () => {
  const res = await api.get('/classes');
  return res.data;
};
export const sendGymEnquiry = async (formData) => {
  return api.post('/enquiry', formData);
};

export { adminService };
export default api;
