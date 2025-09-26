import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const enquiryService = {
  sendGymEnquiry: async (enquiryData) => {
    try {
      const response = await axios.post(`${API_BASE}/api/enquiry`, enquiryData);
      return response.data;
    } catch (error) {
      console.error('Enquiry service error:', error);
      throw error;
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await axios.post(`${API_BASE}/api/enquiry/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }
};

export default enquiryService;