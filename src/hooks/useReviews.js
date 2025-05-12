import { useQuery, useQueryClient } from 'react-query';
import { getReviews } from '@/src/lib/api/review';
import { useState, useCallback, useRef, useEffect } from 'react';

export const useReviews = ({
  businessId,
  customerId, // added for future use
  filters = {},
  sort = { field: 'createdAt', direction: 'desc' },
  page: initialPage = 1,
  limit = 10,
  infiniteScroll = false
}) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    hasMore: true,
    reviews: []
  });
  
  const [paginatedPage, setPaginatedPage] = useState(initialPage);
  
  // Create stable reference for callbacks
  const stateRef = useRef(pagination);
  stateRef.current = pagination;
  
  const baseQueryKey = [
    'reviews', 
    businessId, 
    customerId,
    JSON.stringify(sort), 
    JSON.stringify(filters), 
    limit,
    infiniteScroll ? 'infinite' : 'paginated'
  ];
  
  const queryKey = infiniteScroll ? baseQueryKey : [...baseQueryKey, paginatedPage];
  
  // Build query parameters once
  const getQueryParams = useCallback((page) => ({
    ...(businessId && { businessId }),
    ...(customerId && { customerId }),
    ...filters,
    sortBy: sort.field,
    order: sort.direction,
    page,
    limit
  }), [businessId, filters, sort, limit]);
  
  // Main query - for both initial data load and paginated mode
  const query = useQuery(
    queryKey,
    () => getReviews(getQueryParams(infiniteScroll ? 1 : paginatedPage)),
    {
      keepPreviousData: true,
      staleTime: 60000,
      enabled: Boolean(businessId||customerId),
      onSuccess: (data) => {
        if (infiniteScroll) {
          // Initialize the accumulated reviews on first load or sort/filter change
          setPagination(prev => ({
            currentPage: 1,
            hasMore: data.metadata.currentPage < data.metadata.pages,
            reviews: data.data || []
          }));
        }
      },
      // Prevent refetching on window focus for better performance
      refetchOnWindowFocus: false
    }
  );
  
  // Reset when sort or filters change
  useEffect(() => {
    if (infiniteScroll) {
      setPagination({
        currentPage: 1,
        hasMore: true,
        reviews: []
      });
    } else {
      setPaginatedPage(1);
    }
  }, [businessId, customerId, JSON.stringify(sort), JSON.stringify(filters), infiniteScroll]);
  
  // Optimized load more function (for infinite scroll)
  const loadMore = useCallback(async () => {
    if (!infiniteScroll || !stateRef.current.hasMore || query.isFetching) {
      return;
    }
    
    const nextPage = stateRef.current.currentPage + 1;
    
    try {
      const result = await getReviews(getQueryParams(nextPage));
      
      setPagination(prev => ({
        currentPage: nextPage,
        hasMore: nextPage < result.metadata.pages,
        reviews: [...prev.reviews, ...(result.data || [])]
      }));
      
      return result;
    } catch (error) {
      console.error("Error loading more reviews:", error);
      return null;
    }
  }, [infiniteScroll, getQueryParams, query.isFetching]);
  
  // Function to change page (for paginated mode)
  const setPage = useCallback((newPage) => {
    if (infiniteScroll) return; // No-op for infinite scroll mode
    setPaginatedPage(newPage);
  }, [infiniteScroll]);
  
  // Optimized review update function
  const updateReview = useCallback((reviewId, updatedData) => {
    // Update local state without triggering refetch
    if (infiniteScroll) {
      setPagination(prev => ({
        ...prev,
        reviews: prev.reviews.map(review => 
          review._id === reviewId ? { ...review, ...updatedData } : review
        )
      }));
    } else {
      // Update the query cache directly for paginated mode
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData || !oldData.data) return oldData;
        
        return {
          ...oldData,
          data: oldData.data.map(review => 
            review._id === reviewId ? { ...review, ...updatedData } : review
          )
        };
      });
    }
  }, [infiniteScroll, queryClient, queryKey]);
  
  // Calculate current metadata
  const metadata = query.data?.metadata || { 
    total: 0, 
    pages: 0, 
    currentPage: infiniteScroll ? pagination.currentPage : paginatedPage, 
    limit 
  };
  
  // Calculate if there are more pages
  const hasMore = infiniteScroll
    ? pagination.hasMore
    : (paginatedPage < metadata.pages);
  
  // Return cleaner, more consistent interface
  return {
    reviews: infiniteScroll ? pagination.reviews : (query.data?.data || []),
    metadata,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    updateReview,
    loadMore,
    hasMore,
    currentPage: infiniteScroll ? pagination.currentPage : paginatedPage,
    setPage,
    totalPages: metadata.pages
  };
};