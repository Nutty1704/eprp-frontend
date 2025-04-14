import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:5000/api';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

/**
 * Custom hook to search for businesses
 */
export const useSearchBusinesses = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBusinesses = async (searchQuery = '', selectedCuisines = '', page = 1, pageSize = 10) => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      let queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('searchQuery', searchQuery);
      if (selectedCuisines) queryParams.append('selectedCuisines', selectedCuisines);
      queryParams.append('page', page);
      queryParams.append('pageSize', pageSize);
      
      const response = await axios.get(`${API_URL}/search?${queryParams.toString()}`);
      setResults(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error searching businesses:', err);
      setError(err.response?.data?.message || 'Failed to search businesses');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { searchBusinesses, results, isLoading, error };
};

/**
 * Custom hook to get business by ID
 */
export const useGetPublicBusinessById = (businessId) => {
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBusiness = async (id = businessId) => {
    if (!id) {
      setIsLoading(false);
      return null;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/search/business/${id}`);
      setBusiness(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error fetching business:', err);
      setError(err.response?.data?.message || 'Failed to fetch business');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { business, isLoading, error, fetchBusiness };
};