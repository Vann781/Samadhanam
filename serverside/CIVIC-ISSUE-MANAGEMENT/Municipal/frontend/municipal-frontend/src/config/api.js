/**
 * API Configuration
 * Centralized API endpoints for the Municipal Frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4040';

export const endpoints = {
  municipal: {
    login: `${API_BASE_URL}/municipalities/login`,
    fetchDistrict: `${API_BASE_URL}/municipalities/fetchDistrict`,
    fetchByName: `${API_BASE_URL}/municipalities/fetchByName`,
    allDistricts: `${API_BASE_URL}/municipalities/allDistricts`,
    updateComplaint: `${API_BASE_URL}/municipalities/updateComplaint`,
    uploadEvidence: `${API_BASE_URL}/municipalities/uploadEvidence`
  }
};

/**
 * Helper function to get auth headers
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("Admin login token");
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

/**
 * Helper function to get auth headers for multipart/form-data
 */
export const getAuthHeadersMultipart = () => {
  const token = localStorage.getItem("Admin login token");
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export default { endpoints, getAuthHeaders, getAuthHeadersMultipart };
