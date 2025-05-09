// SearchPage.jsx
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
  // Initial state setup (will be potentially overridden by URL params)
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

  // Ensure useSearchBusinesses hook provides stable searchBusinesses function if included in deps
  const { searchBusinesses, isLoading } = useSearchBusinesses();

  // --- UPDATED useEffect: Reads ALL relevant parameters from URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q') || '';
    const cuisinesParam = params.get('selectedCuisines') || ''; // Read selectedCuisines
    const pageParam = parseInt(params.get('page') || '1', 10);
    const sortParam = params.get('sort') || 'createdAt';
    const ratingParam = parseInt(params.get('rating') || '0', 10); // Example if you add rating to URL

    setSearchParams(prev => {
      const newState = {
        ...prev, // Start with previous state/defaults
        searchQuery: queryParam,
        selectedCuisines: cuisinesParam, // Set from URL
        page: !isNaN(pageParam) && pageParam > 0 ? pageParam : 1, // Set from URL, ensure valid
        sortOption: sortParam, // Set from URL
        minRating: !isNaN(ratingParam) ? ratingParam : 0, // Set from URL, ensure valid
        // pageSize typically stays fixed
      };
      // Avoid unnecessary state updates if nothing actually changed
      if (JSON.stringify(newState) !== JSON.stringify(prev)) {
        return newState;
      }
      return prev;
    });
  }, [location.search]); // Re-run ONLY when the URL search string changes

  // Fetch results when relevant search parameters change
  useEffect(() => {
    const fetchResults = async () => {
      // Fetch only if there's a query OR selected cuisines
      if (!searchParams.searchQuery && !searchParams.selectedCuisines) {
        setBusinesses([]);
        setPagination({ total: 0, page: 1, pages: 1 });
        return; // Don't fetch if nothing is being searched/filtered
      }

      try {
        const results = await searchBusinesses(
          searchParams.searchQuery,
          searchParams.selectedCuisines,
          searchParams.page,
          searchParams.pageSize,
          searchParams.sortOption
          // minRating is filtered client-side in this setup
        );
        setBusinesses(results.data);
        setPagination(results.pagination);
      } catch (error) {
        console.error('Search error:', error);
        setBusinesses([]); // Reset on error
        setPagination({ total: 0, page: 1, pages: 1 });
      }
    };

    fetchResults();
    // This effect runs when the state values used in fetchResults change
  }, [
    searchParams.searchQuery,
    searchParams.selectedCuisines,
    searchParams.page,
    searchParams.pageSize,
    searchParams.sortOption,
    searchBusinesses // Include if it's stable (useCallback) or might change
  ]);

  // --- (Rest of your handlers: handleCuisineChange, handleRatingChange, etc.) ---
  const handleCuisineChange = (newSelectedCuisines) => {
    setSearchParams(prev => ({
      ...prev,
      selectedCuisines: newSelectedCuisines, // Use the new value passed from CuisineFilter
      page: 1 // Reset to first page
    }));
    // Optional: Update URL
    // updateUrl({ ...searchParams, selectedCuisines: newSelectedCuisines, page: 1 });
  };

  const handleRatingChange = (minRating) => {
    setSearchParams(prev => ({ ...prev, minRating, page: 1 }));
     // Optional: Update URL
    // updateUrl({ ...searchParams, minRating, page: 1 });
  };

  const handleSortChange = (sortOption) => {
    setSearchParams(prev => ({ ...prev, sortOption, page: 1 }));
     // Optional: Update URL
    // updateUrl({ ...searchParams, sortOption, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
     // Optional: Update URL
    // updateUrl({ ...searchParams, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBusiness = (businessId) => {
    navigate(`/business/${businessId}`);
  };

  // Client-side filtering for rating
  const filteredBusinesses = businesses.filter(
    business => business.rating >= searchParams.minRating
  );

  const defaultOpenFilters = ["cuisines", "ratings", "sort"];
  const searchAttempted = searchParams.searchQuery || searchParams.selectedCuisines;

  return (
    <>
      {/* Full Width Wave Section */}
      <div className="relative mb-6 md:mb-10 b-lg md:b-xl overflow-hidden shadow-inner bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className='absolute inset-0 z-0 bg-primary' />
        <div className="relative z-10 py-8 sm:py-10 md:py-10">
           <div className="container mx-auto pt-5 flex justify-center">
             <SearchBar className=" max-w-4xl w-full mx-auto" placeholder="Search by Business Name or Cuisine" />
           </div>
        </div>
      </div>

      {/* Main Centered Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="md:col-span-1">
            <Card>
               <CardContent className="p-3 md:p-4">
                  <Label className="text-base font-medium mb-3 block px-1">Filters</Label>
                  <Accordion type="multiple" defaultValue={defaultOpenFilters} className="w-full space-y-1">
                    {/* Cuisine Filter Item */}
                    <AccordionItem value="cuisines">
                       <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1">Cuisines</AccordionTrigger>
                       <AccordionContent className="pt-3 pb-2">
                          {/* Pass the current state value and the handler */}
                         <CuisineFilter
                            selectedCuisines={searchParams.selectedCuisines} // Reflects state (incl. from URL)
                            onChange={handleCuisineChange}
                         />
                       </AccordionContent>
                    </AccordionItem>
                    {/* Rating Filter Item */}
                    <AccordionItem value="ratings">
                       <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1">Minimum Rating</AccordionTrigger>
                       <AccordionContent className="pt-3 pb-2">
                         <RatingsFilter
                           minRating={searchParams.minRating} // Reflects state (incl. from URL)
                           onChange={handleRatingChange}
                         />
                       </AccordionContent>
                    </AccordionItem>
                    {/* Sort Options Item */}
                    <AccordionItem value="sort">
                       <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline py-2 px-1">Sort By</AccordionTrigger>
                       <AccordionContent className="pt-3 pb-2">
                         <SortOptions
                            sortOption={searchParams.sortOption} // Reflects state (incl. from URL)
                            onChange={handleSortChange}
                         />
                       </AccordionContent>
                    </AccordionItem>
                  </Accordion>
               </CardContent>
            </Card>
          </div>

         
           <div className="md:col-span-3">
             {isLoading ? (
               <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div></div>
             ) : filteredBusinesses.length > 0 ? (
                <>
                  <div className="mb-4">
                     <p className="text-gray-600">
                        Showing {filteredBusinesses.length} of {pagination.total} results
                        {searchParams.searchQuery && (<span> for &apos;<span className="font-semibold">{searchParams.searchQuery}</span>&apos;</span>)}
                        {!searchParams.searchQuery && searchParams.selectedCuisines && (<span> for &apos;<span className="font-semibold">{searchParams.selectedCuisines.split(',').join(', ')}</span>&apos;</span>)}
                     </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     {filteredBusinesses.map((business) => <BusinessCard key={business._id} business={business} onClick={() => handleSelectBusiness(business._id)}/>)}
                  </div>
                  {pagination.pages > 1 && (
                   <div className="mt-8"><Pagination><PaginationContent>
                      <PaginationItem><PaginationPrevious onClick={() => handlePageChange(Math.max(1, pagination.page - 1))} className={pagination.page <= 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}/></PaginationItem>
                      {(() => { /* Pagination number logic */
                          const pageNumbers = []; const totalPages = pagination.pages; const currentPage = pagination.page; const pageNeighbours = 1; pageNumbers.push(1); if (currentPage > pageNeighbours + 2) pageNumbers.push('...'); const startPage = Math.max(2, currentPage - pageNeighbours); const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours); for (let i = startPage; i <= endPage; i++) pageNumbers.push(i); if (currentPage < totalPages - pageNeighbours - 1 && endPage < totalPages - 1) pageNumbers.push('...'); if (totalPages > 1) pageNumbers.push(totalPages); const uniquePageNumbers = [...new Set(pageNumbers)];
                          return uniquePageNumbers.map((page, index) => (<PaginationItem key={`${page}-${index}`}>{page === '...' ? <PaginationEllipsis /> : <PaginationLink isActive={page === currentPage} onClick={() => page !== currentPage && handlePageChange(page)} className={page !== currentPage ? "cursor-pointer" : ""}>{page}</PaginationLink>}</PaginationItem>));
                      })()}
                      <PaginationItem><PaginationNext onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))} className={pagination.page >= pagination.pages ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}/></PaginationItem>
                   </PaginationContent></Pagination></div>
                  )}
                </>
             ) : searchAttempted ? (
                  <Card className="w-full"><CardContent className="flex flex-col items-center justify-center py-12"><p className="text-xl text-gray-600 mb-4">No results found</p><p className="text-gray-500 mb-6 text-center">Try adjusting your search query or filters.</p><Button variant="outline" onClick={() => { setSearchParams({ searchQuery: '', selectedCuisines: '', minRating: 0, page: 1, pageSize: 8, sortOption: 'createdAt' }); }}>Clear Search & Filters</Button></CardContent></Card>
             ) : (
               <div className="text-center py-12 text-gray-500">Enter a search or select filters to begin.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;