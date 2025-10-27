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
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to create order:', errorMsg, error);
      throw new Error(`Failed to create order: ${errorMsg}`);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/api/orders', { params });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to fetch orders:', errorMsg, error);
      throw new Error(`Failed to fetch orders: ${errorMsg}`);
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to fetch order:', errorMsg, error);
      throw new Error(`Failed to fetch order: ${errorMsg}`);
    }
  },

  updatePrice: async (id, price) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/price`, { price });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to update order price:', errorMsg, error);
      throw new Error(`Failed to update order price: ${errorMsg}`);
    }
  },

  update: async (id, updateData) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}`, updateData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to update order:', errorMsg, error);
      throw new Error(`Failed to update order: ${errorMsg}`);
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      console.error('Failed to delete order:', errorMsg, error);
      throw new Error(`Failed to delete order: ${errorMsg}`);
    }
  },
};

export default orderApi;
