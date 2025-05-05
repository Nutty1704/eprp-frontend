// src/lib/api/CuisineApi.js (or add to another API file)
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:5000/api'; // Ensure this matches your setup

export const useGetCuisineSummary = () => {
    const [cuisineSummary, setCuisineSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('[useGetCuisineSummary] Fetching cuisine summary...');
            const response = await axios.get(`${API_URL}/cuisines/summary`); // Use the new endpoint
            // Map the result slightly for easier use (rename _id to name)
            const mappedData = response.data.map(item => ({ name: item._id, count: item.count }));
            setCuisineSummary(mappedData);
            console.log('[useGetCuisineSummary] Success:', mappedData);
        } catch (err) {
            console.error('Error fetching cuisine summary:', err);
            setError(err.response?.data?.message || 'Failed to fetch cuisine summary');
            setCuisineSummary([]); // Clear data on error
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array - fetch once

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]); // fetchSummary is stable due to useCallback

    return { cuisineSummary, isLoading, error, refetch: fetchSummary };
};