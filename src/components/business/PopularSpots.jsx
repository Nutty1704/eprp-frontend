import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import restaurants from '@/test_data/businesses.json';

const PopularSpots = () => {
  const navigate = useNavigate();

  
  const handleWriteReview = (restaurantId) => {
    navigate(`/review/${restaurantId}`);
  };
  
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-1">Browse by Popular Spots</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Browse top reviewed eating spots in Monash</p>
        
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