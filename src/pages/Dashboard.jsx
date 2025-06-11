import { useEffect } from 'react';
import SearchBar from '@/src/components/search/SearchBar';
import useAuthStore from '@/src/stores/auth-store';
import PopularSpots from '@/src/components/business/dashboard/PopularSpots';
import CuisineSection from '@/src/components/business/dashboard/CuisineSection';
import DealsSection from '../components/business/dashboard/DealsSection';

const Dashboard = () => {
  const { checkAuthStatus } = useAuthStore();

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
            <br/>and if you don&apos;t like it, critique it!
          </p>
          <SearchBar />
        </div>
      </div>
      <DealsSection/>

      <CuisineSection />
      
      <PopularSpots />

    </div>
  );
};

export default Dashboard;