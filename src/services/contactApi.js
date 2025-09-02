import api from './api';

export const sendVerificationEmail = async (formData) => {
  const res = await api.post('/enquiry/contact', formData);
  return res.data;
};

export const sendContactForm = async (formData) => {
  const res = await api.post('/enquiry/contact/submit', formData);
  return res.data;
};
