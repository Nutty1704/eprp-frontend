import { useQuery, useQueryClient } from 'react-query';
import { getReviews } from '@/src/lib/api/review';

/**
 * Hook for fetching reviews with automatic refetching when parameters change
 * @param {Object} options - Query configuration
 * @param {string} [options.customerId] - Filter reviews by customer ID
 * @param {string} [options.businessId] - Filter reviews by business ID
 * @param {Object} [options.filters={}] - Additional filter criteria
 * @param {Object} [options.sort] - Sorting configuration { field, direction }
 * @param {number} [options.page=1] - Current page number
 * @param {number} [options.limit=10] - Items per page
 */
export const useReviews = ({
  customerId,
  businessId,
  filters = {},
  sort = { field: 'createdAt', direction: 'desc' },
  page = 1,
  limit = 10
}) => {
  // Validate required parameters
  if (!customerId && !businessId) {
    throw new Error("Either customerId or businessId is required");
  }
  
  // Get access to the query client
  const queryClient = useQueryClient();
  
  // Consolidate all query parameters
  const queryParams = {
    ...(customerId && { customerId }),
    ...(businessId && { businessId }),
    ...filters,
    sortBy: sort.field,
    order: sort.direction,
    page,
    limit
  };

  // Create a query key that will change whenever any parameter changes
  const queryKey = ['reviews', queryParams];
  
  // The query will automatically refetch when queryKey changes
  const query = useQuery(
    queryKey,
    () => getReviews(queryParams),
    {
      keepPreviousData: true,
      staleTime: 60000, // Data considered fresh for 1 minute
    }
  );

  // Function to update a review in the local cache
  const updateReview = (reviewId, updatedReviewData) => {
    queryClient.setQueryData(queryKey, (oldData) => {
      if (!oldData || !oldData.data) return oldData;
      
      // Create a new array with the updated review
      const updatedReviews = oldData.data.map(review => 
        review._id === reviewId ? { ...review, ...updatedReviewData } : review
      );
      
      // Return the updated data with the same structure
      return {
        ...oldData,
        data: updatedReviews
      };
    });
  };

  return {
    reviews: query.data?.data || [],
    metadata: query.data?.metadata || { total: 0, pages: 0 },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateReview
  };
};