import useAuthStore from '@/src/stores/auth-store';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

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
  const { isAuthenticated } = useAuthStore();

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
  }, [isAuthenticated]);

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


export const useBusinessStats = (businessId) => {
  // Define the fetch function
  const fetchBusinessStats = async () => {
    if (!businessId) {
      return null;
    }

    const response = await axios.get(`${API_URL}/business/${businessId}/stats`);
    return response.data?.data;
  };

  // Use React Query's useQuery hook
  const {
    data: stats,
    isLoading,
    error
  } = useQuery({
    queryKey: ['businessStats', businessId],
    queryFn: fetchBusinessStats,
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    // Only fetch if businessId exists
    enabled: !!businessId,
    onError: (error) => {
      console.error('Error fetching business stats:', error);
    }
  });

  return {
    stats,
    isLoading,
    error: error ? error.response?.data?.message || 'Failed to fetch business stats' : null
  };
};

export const useGetMyDeals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/deals/my`);
      setDeals(res.data);
    } catch (err) {
      console.error("Error fetching deals:", err);
      setError("Failed to fetch deals");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDeals(); }, []);
  const refetch = () => fetchDeals();

  return { deals, isLoading, error, refetch };
};

export const useCreateDeal = () => {
  const createDeal = async (dealData) => {
    const res = await axios.post(`${API_URL}/deals`, dealData);
    return res.data;
  };
  return { createDeal };
};

export const useUpdateDeal = () => {
  const updateDeal = async (dealId, updatedData) => {
    const res = await axios.put(`${API_URL}/deals/${dealId}`, updatedData);
    return res.data;
  };
  return { updateDeal };
};

export const useDeleteDeal = () => {
  const deleteDeal = async (dealId) => {
    const res = await axios.delete(`${API_URL}/deals/${dealId}`);
    return res.data;
  };
  return { deleteDeal };
};

export const useGetActivePublicDeals = (limit = 10) => {
  const fetchActivePublicDeals = async () => {
    const response = await axios.get(`${API_URL}/deals/public/active?limit=${limit}`);
    return response.data;
  };

  const {
    data: deals,
    isLoading,
    error,
    refetch // You can use refetch if needed
  } = useQuery({
    queryKey: ['activePublicDeals', limit], // queryKey includes limit to refetch if limit changes
    queryFn: fetchActivePublicDeals,
    refetchOnWindowFocus: false, // Optional: configure as per your needs
    // keepPreviousData: true, // Optional
    onError: (err) => {
      console.error('Error fetching active public deals:', err);
    }
  });

  return {
    deals: deals || [], // Ensure deals is always an array
    isLoading,
    error: error ? (error.response?.data?.message || 'Failed to fetch active public deals') : null,
    refetch
  };
};