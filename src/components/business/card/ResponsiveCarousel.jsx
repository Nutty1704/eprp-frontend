import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

// A reusable responsive carousel component
const ResponsiveCarousel = ({
  items,
  renderItem,
  isLoading = false,
  error = null,
  loadingMessage = "Loading items...",
  errorMessage = "Error loading items. Please try again later.",
  emptyMessage = "No items available.",
  itemsPerViewLarge = 4, // Default value - can be overridden by props
  itemClassNames = "pl-4 basis-1/2 min-[480px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6", // Default value
  contentClassName = "-ml-4 justify-center", // Default value
  height = "h-48" // Default height for loading/error/empty states
}) => {
  
  // Handle loading state
  if (isLoading) {
    return <div className={`text-center py-8 ${height} flex items-center justify-center`}>{loadingMessage}</div>;
  }
  
  // Handle error state
  if (error) {
    return <div className={`text-center py-8 text-red-600 ${height} flex items-center justify-center`}>{errorMessage}</div>;
  }
  
  // Handle empty state
  if (!items || items.length === 0) {
    return <div className={`text-center py-8 ${height} flex items-center justify-center`}>{emptyMessage}</div>;
  }
  
  // Determine if looping should be enabled
  const enableLoop = items.length > itemsPerViewLarge;
  
  return (
    <Carousel
      opts={{
        align: "start",
        loop: enableLoop,
      }}
      className="w-full"
    >
      <CarouselContent className={contentClassName}>
        {items.map((item, index) => (
          <CarouselItem
            key={item._id || item.id || index}
            className={itemClassNames}
          >
            <div className="py-1 h-full">
              {renderItem(item)}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {enableLoop && (
        <React.Fragment>
          <CarouselPrevious className="absolute left-[-18px] sm:left-[-20px] md:left-[-25px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10 bg-white/80 hover:bg-white" />
          <CarouselNext className="absolute right-[-18px] sm:right-[-20px] md:right-[-25px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10 bg-white/80 hover:bg-white" />
        </React.Fragment>
      )}
    </Carousel>
  );
};

export default ResponsiveCarousel;