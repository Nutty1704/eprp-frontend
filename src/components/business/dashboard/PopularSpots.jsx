import RestaurantCard from '../card/RestaurantCard';
import SectionHeader from './SectionHeader';
import { useGetPopularBusinesses } from '@/src/lib/api/popular-spots-api'; 

const PopularSpots = () => {
  const { businesses, isLoading, error } = useGetPopularBusinesses(12);
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={<>Browse <span className='text-primary'>Popular Spots</span></>}
          subtitle='Browse top reviewed eating spots in Monash'
        />

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <p>Loading popular spots...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="text-center text-red-600 py-10">
            <p>Could not load popular spots.</p>
            <p className="text-sm">{error}</p> 
          </div>
        )}
        {!isLoading && !error && businesses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map(business => (
              <RestaurantCard
                key={business._id} 
                business={business}
              />
            ))}
          </div>
        )}
        {!isLoading && !error && businesses.length === 0 && (
           <div className="text-center text-gray-500 py-10">
            <p>No popular spots found matching the criteria in this area.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSpots;