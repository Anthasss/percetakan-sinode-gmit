import { axiosInstance } from './config';

export const orderApi = {
  create: async ({ userId, productId, price, status = 'pending', orderSpecifications }) => {
    try {
      const response = await axiosInstance.post('/api/orders', {
        userId,
        productId,
        price,
        status,
        orderSpecifications,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.response?.statusText || error.message}`);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/api/orders', { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.response?.statusText || error.message}`);
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order: ${error.response?.statusText || error.message}`);
    }
  },

  updatePrice: async (id, price) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/price`, { price });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update order price: ${error.response?.statusText || error.message}`);
    }
  },

  update: async (id, updateData) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update order: ${error.response?.statusText || error.message}`);
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.response?.statusText || error.message}`);
    }
  },
};

export default orderApi;
