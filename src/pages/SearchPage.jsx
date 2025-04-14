import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchBusinesses } from '../lib/api/SearchApi';
import SearchBar from '../components/search/SearchBar';
import CuisineFilter from '../components/search/CuisineFilter';
import RatingsFilter from '../components/search/RatingsFilter';
import SortOptions from '../components/search/SortOptions';
import BusinessCard from '../components/search/BusinessCard';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    selectedCuisines: '',
    minRating: 0,
    page: 1,
    pageSize: 8,
    sortOption: 'createdAt'
  });
  const [businesses, setBusinesses] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1
  });
  
  const { searchBusinesses, isLoading } = useSearchBusinesses();
  
  // Extract search query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    
    setSearchParams(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, [location.search]);
  
  // Fetch results when search parameters change
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await searchBusinesses(
          searchParams.searchQuery,
          searchParams.selectedCuisines,
          searchParams.page,
          searchParams.pageSize,
          searchParams.sortOption
        );
        
        setBusinesses(results.data);
        setPagination(results.pagination);
      } catch (error) {
        console.error('Search error:', error);
      }
    };
    
    // Only fetch if we have a search query or selected cuisines
    if (searchParams.searchQuery || searchParams.selectedCuisines) {
      fetchResults();
    }
  }, [
    searchParams.searchQuery, 
    searchParams.selectedCuisines, 
    searchParams.page, 
    searchParams.pageSize, 
    searchParams.sortOption
  ]);
  
  // Handle cuisine filter change
  const handleCuisineChange = (selectedCuisines) => {
    setSearchParams(prev => ({
      ...prev,
      selectedCuisines,
      page: 1 // Reset to first page when filters change
    }));
  };
  
  // Handle rating filter change
  const handleRatingChange = (minRating) => {
    setSearchParams(prev => ({
      ...prev,
      minRating,
      page: 1 // Reset to first page when filters change
    }));
  };
  
  // Handle sort option change
  const handleSortChange = (sortOption) => {
    setSearchParams(prev => ({
      ...prev,
      sortOption,
      page: 1 // Reset to first page when sort changes
    }));
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage
    }));
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle business selection
  const handleSelectBusiness = (businessId) => {
    navigate(`/business/${businessId}`);
  };
  
  // Filter businesses by minimum rating
  const filteredBusinesses = businesses.filter(
    business => business.rating >= searchParams.minRating
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <SearchBar className="max-w-4xl mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="mb-6">
                <CuisineFilter 
                  selectedCuisines={searchParams.selectedCuisines}
                  onChange={handleCuisineChange}
                />
              </div>
              
              <div className="mb-6">
                <RatingsFilter 
                  minRating={searchParams.minRating}
                  onChange={handleRatingChange}
                />
              </div>
              
              <div>
                <SortOptions 
                  sortOption={searchParams.sortOption}
                  onChange={handleSortChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Results area */}
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div>
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  Showing {filteredBusinesses.length} of {pagination.total} results
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredBusinesses.map((business) => (
                  <BusinessCard 
                    key={business._id}
                    business={business}
                    onClick={handleSelectBusiness}
                  />
                ))}
              </div>
              
              {/* Pagination with shadcn */}
              {pagination.pages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                          className={pagination.page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: pagination.pages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        // Logic for which pages to show
                        if (
                          pageNum === 1 ||
                          pageNum === pagination.pages ||
                          Math.abs(pageNum - pagination.page) <= 1
                        ) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink 
                                isActive={pageNum === pagination.page} 
                                onClick={() => handlePageChange(pageNum)}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          (pageNum === 2 && pagination.page > 3) ||
                          (pageNum === pagination.pages - 1 && pagination.page < pagination.pages - 2)
                        ) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                          className={pagination.page === pagination.pages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-xl text-gray-600 mb-4">No results found</p>
                <p className="text-gray-500 mb-6 text-center">
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <Button 
                  onClick={() => {
                    setSearchParams({
                      searchQuery: '',
                      selectedCuisines: '',
                      minRating: 0,
                      page: 1,
                      pageSize: 8,
                      sortOption: 'createdAt'
                    });
                    navigate('/');
                  }}
                >
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;