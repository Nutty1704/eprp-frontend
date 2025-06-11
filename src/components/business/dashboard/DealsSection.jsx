import React from 'react';
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

const DealsSection = () => {
  // Fetch real data, requesting 10 deals
  const { deals, isLoading, error } = useGetActivePublicDeals(10);

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

    return (
      <Carousel
        opts={{
          align: "start",
          loop: enableLoop,
        }}
        className="w-full" // Removed mt-8, spacing handled by header div now
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
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
                <CarouselPrevious className="absolute left-[-15px] min-[500px]:left-[-20px] top-1/2 -translate-y-1/2 hidden min-[500px]:inline-flex z-10 bg-white/80 hover:bg-white" />
                <CarouselNext className="absolute right-[-15px] min-[500px]:right-[-20px] top-1/2 -translate-y-1/2 hidden min-[500px]:inline-flex z-10 bg-white/80 hover:bg-white" />
            </React.Fragment>
        )}
      </Carousel>
    );
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inline Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Latest <span className="text-red-600">Deals & Offers</span> {/* Assuming text-red-600 is your primary color, adjust if 'text-primary' is configured in Tailwind */}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:mt-4 sm:text-lg">
            Grab these amazing offers before they&apos;re gone!
          </p>
        </div>
        {renderCarouselContent()}
      </div>
    </section>
  );
};

export default DealsSection;