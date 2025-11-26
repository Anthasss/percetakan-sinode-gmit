import { axiosInstance } from './config';

const BASE_PATH = '/api/home-banners';

/**
 * Upload a new home banner image
 * @param {File} imageFile - The image file to upload (JPEG, PNG, or WebP, max 5MB)
 * @returns {Promise<{id: string, objectKey: string, publicUrl: string, createdAt: string, updatedAt: string}>}
 */
const uploadHomeBanner = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  console.log('Uploading file via API:', {
    fileName: imageFile.name,
    fileType: imageFile.type,
    fileSize: imageFile.size
  });

  const response = await axiosInstance.post(BASE_PATH, formData, {
    headers: {
      'Content-Type': undefined, // Let browser set the correct multipart boundary
    },
    // Add timeout for mobile networks
    timeout: 60000, // 60 seconds
  });

  return response.data;
};

/**
 * Get all home banners
 * @returns {Promise<Array<{id: string, objectKey: string, publicUrl: string, createdAt: string, updatedAt: string}>>}
 */
const getAllHomeBanners = async () => {
  const response = await axiosInstance.get(BASE_PATH);
  return response.data;
};

/**
 * Delete a home banner
 * @param {string} id - The UUID of the banner to delete
 * @returns {Promise<{message: string}>}
 */
const deleteHomeBanner = async (id) => {
  const response = await axiosInstance.delete(`${BASE_PATH}/${id}`);
  return response.data;
};

export const homeBannerApi = {
  uploadHomeBanner,
  getAllHomeBanners,
  deleteHomeBanner,
};

export default homeBannerApi;
