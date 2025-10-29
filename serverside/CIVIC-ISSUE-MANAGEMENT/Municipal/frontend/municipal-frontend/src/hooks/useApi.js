import { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * Custom hook for API calls with loading and error states
 * @returns {Object} - { loading, error, callApi }
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Wrapper function for API calls
   * @param {Function} apiFunc - Async function that makes the API call
   * @returns {Promise} - Result from the API call
   */
  const callApi = async (apiFunc) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunc();
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, callApi };
};

export default useApi;
