const API_BASE_URL = 'http://localhost:3000';

export const apiClient = {
  // Users endpoints
  users: {
    createOrGet: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create/get user: ${response.statusText}`);
      }
      
      return response.json();
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to get user: ${response.statusText}`);
      }
      
      return response.json();
    },
    
    updateRole: async (id, role) => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update user role: ${response.statusText}`);
      }
      
      return response.json();
    },
  },
};

export default apiClient;
