// Central export file for all API services
export { userApi } from './userApi';
export { orderApi } from './orderApi';

// For backward compatibility, export as apiClient
import userApi from './userApi';
import orderApi from './orderApi';

export const apiClient = {
  users: userApi,
  orders: orderApi,
};

export default apiClient;
