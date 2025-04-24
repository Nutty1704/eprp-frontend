import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
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

  const defaultOpenFilters = ["cuisines", "ratings", "sort"];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex justify-center">
        <SearchBar className="max-w-4xl w-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-2 md:p-4">
              <Label className="text-base font-medium mb-3 block">Filters</Label>
              <Accordion
                  type="multiple" // Allow multiple sections open
                  defaultValue={defaultOpenFilters} // Set which are open initially
                  className="w-full space-y-1" // Add small space between items
                >
                {/* --- Cuisine Filter Item --- */}
                <AccordionItem value="cuisines">
                  <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1"> {/* Adjust styling */}
                    Cuisines
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-2"> {/* Adjust padding */}
                    <CuisineFilter
                      selectedCuisines={searchParams.selectedCuisines}
                      onChange={handleCuisineChange}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* --- Rating Filter Item --- */}
                <AccordionItem value="ratings">
                  <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1">
                    Ratings
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-2">
                    <RatingsFilter
                      minRating={searchParams.minRating}
                      onChange={handleRatingChange}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* --- Sort Options Item --- */}
                <AccordionItem value="sort">
                  <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1">
                    Sort By
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-2">
                    <SortOptions
                      sortOption={searchParams.sortOption}
                      onChange={handleSortChange}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                    {searchParams.searchQuery && (
                      <span> for &apos;<span className="font-semibold">{searchParams.searchQuery}</span>&apos;</span>
                    )}
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