// Central export file for all API services
export { userApi } from './userApi';
export { orderApi } from './orderApi';
export { homeBannerApi } from './homeBannerApi';

// For backward compatibility, export as apiClient
import userApi from './userApi';
import orderApi from './orderApi';
import homeBannerApi from './homeBannerApi';

export const apiClient = {
  users: userApi,
  orders: orderApi,
  homeBanners: homeBannerApi,
};

export default apiClient;
