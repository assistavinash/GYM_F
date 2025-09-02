import api from './api';

export const getTrainers = async () => {
  const res = await api.get('/trainers');
  return res.data;
};
