import React from 'react';
import DealCouponCard from '@/src/components/business/card/DealCouponCard';
import { useGetActivePublicDeals } from '@/src/lib/api/MyBusinessApi';
import ResponsiveCarousel from '../card/ResponsiveCarousel';
import SectionHeader from './SectionHeader';

const DealsSection = () => {
  // Fetch real data, requesting 10 deals
  const { deals, isLoading, error } = useGetActivePublicDeals(10);
  
  const renderDealItem = (deal) => (
    <DealCouponCard
      deal={{
        ...deal,
        businessName: deal.business_id?.name || 'Featured Business',
      }}
    />
  );

  return (
    <section className="py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use SectionHeader component */}
        <SectionHeader
          title={<>Latest <span className="text-red-600">Deals & Offers</span></>}
          subtitle="Grab these amazing offers before they're gone!"
        />

        <ResponsiveCarousel
          items={deals}
          renderItem={renderDealItem}
          isLoading={isLoading}
          error={error}
          loadingMessage="Loading latest deals..."
          errorMessage="Error loading deals. Please try again later."
          emptyMessage="No deals available at the moment. Check back soon!"
          itemsPerViewLarge={4}
          itemClassNames="pl-3 sm:pl-4 basis-full min-[500px]:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          contentClassName="-ml-3 sm:-ml-4 justify-center"
          height="h-60"
        />
      </div>
    </section>
  );
};

export default DealsSection;