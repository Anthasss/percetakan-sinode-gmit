import { API_BASE_URL } from './config';

export const orderApi = {
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }
    
    return response.json();
  },

  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.userId) queryParams.append('userId', params.userId);
    if (params.status) queryParams.append('status', params.status);
    if (params.productId) queryParams.append('productId', params.productId);
    
    const url = `${API_BASE_URL}/api/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }
    
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }
    
    return response.json();
  },

  updatePrice: async (id, price) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}/price`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order price: ${response.statusText}`);
    }
    
    return response.json();
  },

  update: async (id, updateData) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.statusText}`);
    }
    
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete order: ${response.statusText}`);
    }
    
    return response.json();
  },
};

export default orderApi;
