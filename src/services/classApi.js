import api from './api';

export const updateClass = async (id, classData) => {
  return api.put(`/classes/${id}`, classData);
};
