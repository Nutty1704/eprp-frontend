import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search for a food provider in Monash"
          className="w-full py-3 px-6 outline-none inter-regular"
        />
        {/* <button className="p-3 text-gray-500 hover:text-gray-700">
          <Filter className="h-5 w-5" />
        </button> */}
        <button className="p-3 text-gray-500 hover:text-gray-700">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;