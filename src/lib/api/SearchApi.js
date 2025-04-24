// SearchApi.js
import axios from 'axios';
// 1. Import useCallback from react
import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:5000/api';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

/**
 * Custom hook to search for businesses
 */
export const useSearchBusinesses = () => {
  // isLoading is still needed by SearchPage and SearchBar
  const [isLoading, setIsLoading] = useState(false);
  // results and error state within the hook are not directly used by SearchPage,
  // as it uses the returned data and its own try/catch. We can remove them from return.

  // 2. Wrap the searchBusinesses function definition in useCallback
  const searchBusinesses = useCallback(async (
    searchQuery = '',
    selectedCuisines = '',
    page = 1,
    pageSize = 10, // Default pageSize defined in the hook
    sortOption = 'createdAt' // Added sortOption based on SearchPage usage
  ) => {
    setIsLoading(true); // Set loading true when the search starts
    console.log(`[useSearchBusinesses] Called with: query='${searchQuery}', cuisines='${selectedCuisines}', page=${page}, pageSize=${pageSize}, sort='${sortOption}'`);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('searchQuery', searchQuery);
      if (selectedCuisines) queryParams.append('selectedCuisines', selectedCuisines);
      queryParams.append('page', String(page)); // Ensure params are strings
      queryParams.append('pageSize', String(pageSize));
      queryParams.append('sortOption', sortOption);

      console.log(`[useSearchBusinesses] Making API Call: /search?${queryParams.toString()}`);
      const response = await axios.get(`${API_URL}/search?${queryParams.toString()}`);
      console.log('[useSearchBusinesses] API Call Success');
      return response.data; // Return the data directly

    } catch (err) {
      console.error('[useSearchBusinesses] Error searching businesses:', err);
      throw err; // Re-throw the error for the calling component to handle
    } finally {
      setIsLoading(false); // Set loading false when search finishes (success or error)
    }
  // 3. Add an empty dependency array for useCallback.
  // This means the function reference will be stable and created only once.
  }, []);

  // 4. Return only the stable function and loading state needed by components
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
      setBusiness(null); // Ensure state is reset if no id
      return null;
    }

    setIsLoading(true); // Set loading before fetch
    setError(null); // Clear previous errors
    try {
      console.log(`[useGetPublicBusinessById] Fetching business: ${id}`);
      const response = await axios.get(`${API_URL}/search/business/${id}`);
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
  // Depend on businessId so the function updates if the ID prop changes
  }, [businessId]);

  // Return the stable function reference along with state
  return { business, isLoading, error, fetchBusiness };
};