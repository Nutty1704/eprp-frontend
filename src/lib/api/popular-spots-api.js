import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const useGetPopularBusinesses = (limit = 6) => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularBusinesses = async () => {
      try {
        setIsLoading(true);
        setError(null); 
        const response = await axios.get(`${API_BASE_URL}/business/popular`, {
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
        const response = await axios.get(`${API_BASE_URL}/business/popular`, {
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