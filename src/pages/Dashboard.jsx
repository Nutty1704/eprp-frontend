import React, { useEffect } from 'react';
import SearchBar from '@/src/components/ui/SearchBar';
import CuisineCard from '@/src/components/business/CuisineCard';
import useAuthStore from '@/src/stores/auth-store';
import PopularSpots from '@/src/components/business/PopularSpots';
import cuisines from "@/test_data/cuisines.json";

const Dashboard = () => {
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus('customer');
  }, [checkAuthStatus]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-hidden">
      
      <div className="relative h-[45vh] bg-cover bg-center" style={{ backgroundImage: 'url("/dashboard-hero.jpg")' }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 rubik-bold">Discover Best Eats in Monash!</h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl inter-regular">
            Find and review your favorite food spots or try something new
            <br/>and if you don't like it, critique it!
          </p>
          <SearchBar />
        </div>
      </div>
      
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 rubik-bold">Browse by Cuisine</h2>
          <p className="text-center text-gray-600 mb-8 inter-regular">Browse Unique Cuisines in Monash</p>
          
          <div className="relative">
            <div className="flex overflow-x-auto justify-between gap-4 py-4 px-2 scrollbar-hide">
              {cuisines.map((cuisine, index) => (
                <CuisineCard 
                  key={index}
                  name={cuisine.name}
                  spots={cuisine.spots}
                  image={`/assets/cuisines/${cuisine.name.toLowerCase()}.jpg`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <PopularSpots />

    </div>
  );
};

export default Dashboard;