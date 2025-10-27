import { axiosInstance } from './config';

export const userApi = {
  createOrGet: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users', userData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to create/get user:', errorMsg, error);
      throw new Error(`Failed to create/get user: ${errorMsg}`);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to get user:', errorMsg, error);
      throw new Error(`Failed to get user: ${errorMsg}`);
    }
  },
  
  updateRole: async (id, role) => {
    try {
      const response = await axiosInstance.patch(`/api/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to update user role:', errorMsg, error);
      throw new Error(`Failed to update user role: ${errorMsg}`);
    }
  },
};

export default userApi;
