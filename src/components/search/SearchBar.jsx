import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchBusinesses } from '../../lib/api/SearchApi';
import _ from 'lodash';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const { searchBusinesses, isLoading } = useSearchBusinesses();
  
  // Create a debounced search function
  const debouncedSearch = useRef(
    _.debounce(async (query) => {
      if (query.length >= 2) {
        try {
          const results = await searchBusinesses(query, '', 1, 5);
          setSearchResults(results.data);
          setDropdownVisible(true);
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        setSearchResults([]);
        setDropdownVisible(false);
      }
    }, 300)
  ).current;
  
  // Call debounced search when input changes
  useEffect(() => {
    debouncedSearch(searchQuery);
    
    // If search query is empty, hide dropdown
    if (!searchQuery) {
      setDropdownVisible(false);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setDropdownVisible(false);
    }
  };
  
  // Handle business selection from dropdown
  const handleSelectBusiness = (businessId) => {
    navigate(`/business/${businessId}`);
    setDropdownVisible(false);
  };
  
  return (
    <div className={`relative w-full max-w-2xl`} ref={searchBarRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a food provider in Monash"
            className="w-full pl-4 pr-12 py-6 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600"
          />
          <button 
            type="submit" 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <Search size={20} />
          </button>
          
          {isLoading && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-red-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        
        {dropdownVisible && searchResults.length > 0 && (
          <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg mt-2 border border-gray-200 max-h-60 overflow-y-auto">
            {searchResults.map((business) => (
              <div
                key={business._id}
                onClick={() => handleSelectBusiness(business._id)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                {business.imageUrl && (
                  <img 
                    src={business.imageUrl} 
                    alt={business.name} 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                )}
                <div>
                  <p className="font-medium">{business.name}</p>
                  {business.cuisines && business.cuisines.length > 0 && (
                    <p className="text-sm text-gray-500">
                      {business.cuisines.slice(0, 3).join(', ')}
                      {business.cuisines.length > 3 && '...'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;