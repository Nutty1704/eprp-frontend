import { apiClient } from './api-client';
import { useState, useEffect } from 'react';

const baseRoute = '/api/business'; 

export const useGetPopularBusinesses = (limit = 6) => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularBusinesses = async () => {
      try {
        setIsLoading(true);
        setError(null); 
        const response = await apiClient.get(`${baseRoute}/popular`, {
          params: { 
              limit     // Pass limit as query param
            } 
        });
        setBusinesses(response.data);
      } catch (err) {
        console.error('Error fetching popular businesses:', err);
        setError(err.response?.data?.message || 'Failed to fetch popular spots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularBusinesses();
  }, [location, limit]); 

  const refetch = async () => {
       try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get(`${API_BASE_URL}/popular`, {
          params: { limit } 
        });
        setBusinesses(response.data);
      } catch (err) {
        console.error('Error refetching popular businesses:', err);
        setError(err.response?.data?.message || 'Failed to refetch popular spots');
      } finally {
        setIsLoading(false);
      }
  };

  return { businesses, isLoading, error, refetch };
};