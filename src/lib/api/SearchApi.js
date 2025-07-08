import { useState, useCallback } from 'react';
import { apiClient } from './api-client';

const baseRoute = '/api/search';


/**
 * Custom hook to search for businesses
 */
export const useSearchBusinesses = () => {
  const [isLoading, setIsLoading] = useState(false);

  // useCallback to create a stable reference to the function
  const searchBusinesses = useCallback(async (
    searchQuery = '',
    selectedCuisines = '',
    page = 1,
    pageSize = 10, // Default pageSize
    sortOption = 'createdAt' // Default sort option
  ) => {
    setIsLoading(true);
    try {
      // initialize params
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('searchQuery', searchQuery);
      if (selectedCuisines) queryParams.append('selectedCuisines', selectedCuisines);

      // add params
      queryParams.append('page', String(page)); // Ensure params are strings
      queryParams.append('pageSize', String(pageSize));
      queryParams.append('sortOption', sortOption);

      // make API call
      const response = await apiClient.get(`${baseRoute}?${queryParams.toString()}`);
      return response.data;

    } catch (err) {
      console.error('[useSearchBusinesses] Error searching businesses:', err);
      throw err; // Re-throw the error for the calling component to handle
    } finally {
      setIsLoading(false); // Set loading false when search finishes (success or error)
    }
  }, []); // function reference is stable

  return { searchBusinesses, isLoading };
};

/**
 * Custom hook to get business by ID
 */
// This hook likely also needs useCallback for fetchBusiness if used in a dependency array
export const useGetPublicBusinessById = (businessId) => {
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchBusiness in useCallback
  const fetchBusiness = useCallback(async (id = businessId) => {
    if (!id) {
      setIsLoading(false);
      setBusiness(null);
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`${baseRoute}/business/${id}`);
      setBusiness(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching business:', err);
      setError(err.response?.data?.message || 'Failed to fetch business');
      setBusiness(null); // Reset business on error
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [businessId]); // update fetchBusiness when businessId changes

  return { business, isLoading, error, fetchBusiness };
};