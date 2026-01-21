import { axiosInstance } from './config';

// File validation constants
export const FILE_VALIDATION = {
  MAX_FILES: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.pdf'],
};

/**
 * Validate files before upload
 * @param {FileList|File[]} files - Files to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateFiles = (files) => {
  if (!files || files.length === 0) {
    return { valid: true }; // No files is valid (optional upload)
  }

  const fileArray = Array.from(files);

  if (fileArray.length > FILE_VALIDATION.MAX_FILES) {
    return { 
      valid: false, 
      error: `Maximum ${FILE_VALIDATION.MAX_FILES} files allowed. You selected ${fileArray.length} files.` 
    };
  }

  for (const file of fileArray) {
    if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return { 
        valid: false, 
        error: `"${file.name}" is ${sizeMB}MB. Maximum file size is 10MB.` 
      };
    }

    if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: `"${file.name}" has invalid type. Only JPEG, PNG, WebP, and PDF files are allowed.` 
      };
    }
  }

  return { valid: true };
};

export const orderApi = {
  create: async ({ userId, productId, price, status = 'pending', orderSpecifications, files = [] }) => {
    try {
      // Validate productId
      const numericProductId = Number(productId);
      if (!productId || isNaN(numericProductId)) {
        throw new Error(`Invalid product ID: ${productId}`);
      }

      // Validate files if provided
      if (files && files.length > 0) {
        const validation = validateFiles(files);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
      }

      // Build FormData
      const formData = new FormData();
      formData.append('userId', String(userId));
      formData.append('productId', String(numericProductId)); // FormData always sends as string
      formData.append('status', String(status));
      
      if (price !== null && price !== undefined) {
        formData.append('price', String(Number(price)));
      }

      // Stringify orderSpecifications (DO NOT include files here)
      formData.append('orderSpecifications', JSON.stringify(orderSpecifications));

      // Append files separately
      if (files && files.length > 0) {
        const fileArray = Array.from(files);
        fileArray.forEach(file => {
          formData.append('files', file);
        });
      }

      console.log('Creating order with FormData:');
      console.log('- userId:', userId);
      console.log('- productId:', numericProductId, '(type:', typeof numericProductId, ')');
      console.log('- status:', status);
      console.log('- orderSpecifications:', orderSpecifications);
      console.log('- files count:', files.length);

      const response = await axiosInstance.post('/api/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Response data:', error.response?.data);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
      throw new Error(`Failed to create order: ${errorMsg}`);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/api/orders', { params });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to fetch orders: ${errorMsg}`);
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to fetch order: ${errorMsg}`);
    }
  },

  // Admin: Set price for order
  setPrice: async (id, price) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/set-price`, { price });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to set order price: ${errorMsg}`);
    }
  },

  // Update order status
  updateStatus: async (id, status) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to update order status: ${errorMsg}`);
    }
  },

  // Customer: Approve order price
  approve: async (id) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/approve`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to approve order: ${errorMsg}`);
    }
  },

  // Cancel order with reason
  cancel: async (id, reason = '') => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/cancel`, { reason });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to cancel order: ${errorMsg}`);
    }
  },

  // Legacy: Update price (kept for backward compatibility)
  updatePrice: async (id, price) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}/price`, { price });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to update order price: ${errorMsg}`);
    }
  },

  update: async (id, updateData) => {
    try {
      const response = await axiosInstance.patch(`/api/orders/${id}`, updateData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to update order: ${errorMsg}`);
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.statusText || error.message;
      throw new Error(`Failed to delete order: ${errorMsg}`);
    }
  },
};

export default orderApi;
