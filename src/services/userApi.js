import { axiosInstance } from './config';

export const userApi = {
  createOrGet: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create/get user: ${error.response?.statusText || error.message}`);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.response?.statusText || error.message}`);
    }
  },
  
  updateRole: async (id, role) => {
    try {
      const response = await axiosInstance.patch(`/api/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user role: ${error.response?.statusText || error.message}`);
    }
  },
};

export default userApi;
