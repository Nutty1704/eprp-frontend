import React from 'react';
import RestaurantCard from '../card/RestaurantCard';
import restaurants from '@/test_data/businesses.json';
import SectionHeader from './SectionHeader';

const PopularSpots = () => {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title={<>Browse <span className='text-primary'>Popular Spots</span></>}
          subtitle='Browse top reviewed eating spots in Monash'
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              business={restaurant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpots;