/**
 * API Configuration
 * Centralized API endpoints for the State Frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4005';

export const endpoints = {
  state: {
    login: `${API_BASE_URL}/State/login`,
    allDistricts: `${API_BASE_URL}/State/allDistricts`,
    fetchComplaintsByState: `${API_BASE_URL}/State/complaints`
  }
};

/**
 * Helper function to get auth headers
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("State login token");
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export default { endpoints, getAuthHeaders };
