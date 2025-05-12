import React from 'react'; // Added React import for completeness, though often implicit with JSX
import RestaurantCard from '../card/RestaurantCard';
import SectionHeader from './SectionHeader';
import { useGetPopularBusinesses } from '@/src/lib/api/popular-spots-api';

const PopularSpots = () => {
  const { businesses, isLoading, error } = useGetPopularBusinesses(12); // Fetches 12 businesses

  return (
    <section className="py-6 sm:py-8"> {/* Adjusted vertical padding */}
      <div className="max-w-6xl mx-auto px-4"> {/* Standard container for content */}
        <SectionHeader
          title={<>Browse <span className='text-primary'>Popular Spots</span></>}
          subtitle='Browse top reviewed eating spots in Monash'
          // Ensure SectionHeader itself is responsive (font sizes, text wrapping)
        />

        {isLoading && (
          <div className="flex justify-center items-center py-10 text-center"> {/* Added text-center for consistency */}
            <p>Loading popular spots...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center text-red-600 py-10">
            <p>Could not load popular spots.</p>
            {/* Displaying the error message content, ensure it's user-friendly or sanitized if it's a raw error object */}
            <p className="text-sm">{typeof error === 'string' ? error : error?.message || 'An unknown error occurred.'}</p>
          </div>
        )}

        {!isLoading && !error && businesses && businesses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"> {/* Added mt-8 for spacing from header */}
            {businesses.map(business => (
              <RestaurantCard
                key={business._id}
                business={business}
                // CRITICAL: Ensure RestaurantCard is internally responsive (image, text, layout)
              />
            ))}
          </div>
        )}

        {!isLoading && !error && (!businesses || businesses.length === 0) && (
            // Added check for !businesses to be safe
          <div className="text-center text-gray-500 py-10">
            <p>No popular spots found matching the criteria in this area.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSpots;