import api from './api';

export const sendMembershipVerificationEmail = async (formData) => {
  const res = await api.post('/enquiry/membership/verify', formData);
  return res.data;
};

export const submitMembershipForm = async (formData) => {
  const res = await api.post('/enquiry/membership/submit', formData);
  return res.data;
};
