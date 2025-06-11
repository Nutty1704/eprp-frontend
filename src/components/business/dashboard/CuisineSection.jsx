import React from 'react';
import SectionHeader from './SectionHeader';
import CuisineCard from '@/src/components/business/cuisine/CuisineCard';
import { useGetCuisineSummary } from '@/src/lib/api/CuisineApi';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"; // Assuming this is from shadcn/ui or similar

const CuisineSection = () => {
    const { cuisineSummary, isLoading, error } = useGetCuisineSummary();

    // Helper function to render the main content (loading/error/carousel)
    const renderCarouselContent = () => {
        if (isLoading) {
            return <div className="text-center py-8 h-48 flex items-center justify-center">Loading cuisines...</div>;
        }

        if (error) {
            // Consider providing a more user-friendly error message or a retry mechanism
            return <div className="text-center py-8 text-red-600 h-48 flex items-center justify-center">Error loading cuisines. Please try again later.</div>;
        }

        if (!cuisineSummary || cuisineSummary.length === 0) {
            return <div className="text-center py-8 h-48 flex items-center justify-center">No cuisines found.</div>;
        }

        // Determine loop enablement based on if there are more items than can be shown on the largest configured view.
        // lg:basis-1/6 means 6 items are visible. Loop if more than 6 items.
        // Adjust this number if you change the basis for lg or add xl/2xl breakpoints.
        const itemsPerViewLarge = 6;
        const enableLoop = cuisineSummary.length > itemsPerViewLarge;

        return (
            <Carousel
                opts={{
                    align: "start",
                    loop: enableLoop,
                }}
                className="w-full mt-8" // `mt-8` provides space from the SectionHeader
            >
                <CarouselContent className="-ml-4"> {/* Negative margin to visually align items with edge padding */}
                    {cuisineSummary.map((cuisine) => (
                        <CarouselItem
                            key={cuisine.name}
                            // This responsive basis is excellent for mobile-friendliness
                            className="pl-4 basis-1/2 min-[480px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                        >
                            <div className="py-1"> {/* Minimal vertical padding for the card itself within the item */}
                                <CuisineCard
                                    name={cuisine.name}
                                    spots={cuisine.count}
                                    image={`/assets/cuisines/${cuisine.name.toLowerCase()}.jpg`}
                                    // Ensure CuisineCard itself is responsive (image, text sizes)
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Carousel navigation buttons, hidden on xs, visible sm and up */}
                {enableLoop && ( // Or show them always if cuisineSummary.length > items visible at current breakpoint
                    <React.Fragment>
                        <CarouselPrevious className="absolute left-[-18px] sm:left-[-20px] md:left-[-25px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10 bg-white/80 hover:bg-white" />
                        <CarouselNext className="absolute right-[-18px] sm:right-[-20px] md:right-[-25px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10 bg-white/80 hover:bg-white" />
                    </React.Fragment>
                )}
            </Carousel>
        );
    }

    return (
        <section className="py-8 sm:py-12 px-4 bg-slate-50"> {/* Adjusted vertical padding */}
            <div className="max-w-6xl mx-auto"> {/* Constrains width and centers content */}
                <SectionHeader
                    title={<>Browse by <span className='text-primary'>Cuisine</span></>}
                    subtitle='Explore the diverse culinary scene'
                    // Ensure SectionHeader is responsive (font sizes, text wrapping)
                />
                {renderCarouselContent()}
            </div>
        </section>
    );
}

export default CuisineSection;