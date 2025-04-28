import { useEffect, useState } from "react";
import { getReviews } from "@/src/lib/api/review"; // adjust the path if needed

export const useGetReviews = ({ customerId, businessId, filters = {} }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const result = await getReviews(customerId, businessId, filters);

      if (result.success) {
        setReviews(result.data || []);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch reviews.");
      }
    } catch (err) {
      console.error("Review fetch error:", err);
      setError("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerId || businessId) {
      fetchReviews();
    }
  }, [customerId, businessId, JSON.stringify(filters)]);

  return { reviews, isLoading, error, refetch: fetchReviews };
};
