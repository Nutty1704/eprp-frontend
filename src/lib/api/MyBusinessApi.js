import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

/**
 * Custom hook to get all businesses for the logged-in owner
 */
export const useGetMyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/business`);
        setBusinesses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err.response?.data?.message || 'Failed to fetch businesses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/business`);
      setBusinesses(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError(err.response?.data?.message || 'Failed to fetch businesses');
    } finally {
      setIsLoading(false);
    }
  };

  return { businesses, isLoading, error, refetch };
};

/**
 * Custom hook to get a specific business by ID
 */
export const useGetBusinessById = (businessId) => {
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/business/${businessId}`);
        setBusiness(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching business:', err);
        setError(err.response?.data?.message || 'Failed to fetch business');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  const refetch = async () => {
    if (!businessId) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/business/${businessId}`);
      setBusiness(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching business:", err);
      setError(err.response?.data?.message || "Failed to fetch business");
    } finally {
      setIsLoading(false);
    }
  };

  return { business, isLoading, error, refetch };
};

/**
 * Custom hook to get the owner's business
 * For backward compatibility with existing code
 */
export const useGetMyBusiness = () => {
  const { businesses, isLoading, error, refetch } = useGetMyBusinesses();
  
  // Return the first business for single business use cases
  return { 
    business: businesses && businesses.length > 0 ? businesses[0] : null, 
    isLoading, 
    error,
    refetch
  };
};

/**
 * Custom hook to create a new business
 */
export const useCreateMyBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createBusiness = async (businessData) => {
    try {
      setIsLoading(true);
      setSuccess(false);
      
      // Use FormData for file uploads
      let formData;
      if (!(businessData instanceof FormData)) {
        formData = new FormData();
        Object.keys(businessData).forEach(key => {
          // Handle arrays and objects
          if (typeof businessData[key] === 'object' && !(businessData[key] instanceof File)) {
            formData.append(key, JSON.stringify(businessData[key]));
          } else {
            formData.append(key, businessData[key]);
          }
        });
      } else {
        formData = businessData;
      }
      
      const response = await axios.post(`${API_URL}/business`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error creating business:', err);
      setError(err.response?.data?.message || 'Failed to create business');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createBusiness, isLoading, error, success };
};

/**
 * Custom hook to update an existing business
 */
export const useUpdateMyBusiness = (businessId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateBusiness = async (businessData, id = null) => {
    try {
      setIsLoading(true);
      setSuccess(false);
      
      // Use the provided ID or the prop ID
      const targetId = id || businessId;
      
      if (!targetId) {
        throw new Error('Business ID is required');
      }
      
      // Use FormData for file uploads
      let formData;
      if (!(businessData instanceof FormData)) {
        formData = new FormData();
        Object.keys(businessData).forEach(key => {
          // Handle arrays and objects
          if (typeof businessData[key] === 'object' && !(businessData[key] instanceof File)) {
            formData.append(key, JSON.stringify(businessData[key]));
          } else {
            formData.append(key, businessData[key]);
          }
        });
      } else {
        formData = businessData;
      }
      
      const response = await axios.put(`${API_URL}/business/${targetId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error updating business:', err);
      setError(err.response?.data?.message || 'Failed to update business');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateBusiness, isLoading, error, success };
};

/**
 * Custom hook to delete a business
 */
export const useDeleteBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteBusiness = async (businessId) => {
    try {
      setIsLoading(true);
      setSuccess(false);
      
      if (!businessId) {
        throw new Error('Business ID is required');
      }
      
      const response = await axios.delete(`${API_URL}/business/${businessId}`);
      
      setSuccess(true);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error deleting business:', err);
      setError(err.response?.data?.message || 'Failed to delete business');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteBusiness, isLoading, error, success };
};