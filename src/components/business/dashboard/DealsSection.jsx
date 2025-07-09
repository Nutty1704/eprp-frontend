import React, { useEffect, useRef } from 'react';
import DealCouponCard from '@/src/components/business/card/DealCouponCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Assuming this is from shadcn/ui
// Import the hook for fetching deals
import { useGetActivePublicDeals } from '@/src/lib/api/MyBusinessApi'; // Adjust path as needed, e.g., dealsApi.js or your main api file
import SectionHeader from './SectionHeader';

const DealsSection = () => {
  // Fetch real data, requesting 10 deals
  const { deals, isLoading, error } = useGetActivePublicDeals(10);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    // Don't start interval if data is still loading or there's an error
    if (isLoading || error || !deals || deals.length === 0) {
      return;
    }

    if (!nextBtnRef || !nextBtnRef.current) {
      return;
    }

    const scrollInterval = setInterval(() => {
      if (nextBtnRef.current) {
        nextBtnRef.current.click();
      }
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, [isLoading, error, deals]);

  const renderCarouselContent = () => {
    if (isLoading) {
      return <div className="text-center py-8 h-60 flex items-center justify-center">Loading latest deals...</div>;
    }

    if (error) {
      return <div className="text-center py-8 text-red-600 h-60 flex items-center justify-center">Error loading deals. Please try again later.</div>;
    }

    if (!deals || deals.length === 0) {
      return <div className="text-center py-8 h-60 flex items-center justify-center">No deals available at the moment. Check back soon!</div>;
    }

    const itemsPerViewLarge = 4; // Max items visible on XL screens
    const enableLoop = deals.length > itemsPerViewLarge;
    const showCarousel = deals.length >= itemsPerViewLarge;


    return (
      <>
        <div className={`w-full px-4 justify-center hidden md:${showCarousel ? 'hidden' : 'flex'}`}>
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="pl-3 sm:pl-4 basis-full min-[500px]:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="py-1 h-full">
                <DealCouponCard
                  deal={{
                    ...deal,
                    businessName: deal.business_id?.name || 'Featured Business',
                    // promoCode: deal.promoCode // Pass if available on your deal object
                    // redemptionInfo: deal.redemptionInfo // Or pass this
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: enableLoop,
          }}
          className={`w-full md:${!showCarousel && 'hidden'}`} // Removed mt-8, spacing handled by header div now
        >
          <CarouselContent className="px-4">
            {deals.map((deal) => (
              <CarouselItem
                key={deal._id}
                className="pl-3 sm:pl-4 basis-full min-[500px]:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="py-1 h-full">
                  <DealCouponCard
                    deal={{
                      ...deal,
                      businessName: deal.business_id?.name || 'Featured Business',
                      // promoCode: deal.promoCode // Pass if available on your deal object
                      // redemptionInfo: deal.redemptionInfo // Or pass this
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {deals.length > 1 && (
            <React.Fragment>
              <CarouselPrevious className="absolute left-[-15px] min-[500px]:left-[-35px] top-1/2 -translate-y-1/2 hidden min-[500px]:inline-flex z-10 bg-white/80 hover:bg-white" />
              <CarouselNext
                ref={nextBtnRef}
                className="absolute right-[-15px] min-[500px]:right-[-35px] top-1/2 -translate-y-1/2 hidden min-[500px]:inline-flex z-10 bg-white/80 hover:bg-white"
              />
            </React.Fragment>
          )}
        </Carousel>
      </>
    );
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inline Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <SectionHeader
            title={<>Latest <span className="text-red-600">Deals & Offers</span></>}
            subtitle='Grab these amazing offers before they&apos;re gone!'
          />
        </div>
        {renderCarouselContent()}
      </div>
    </section>
  );
};

export default DealsSection;