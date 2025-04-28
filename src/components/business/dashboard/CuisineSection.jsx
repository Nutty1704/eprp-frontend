import React from 'react';
import SectionHeader from './SectionHeader'
import CuisineCard from '@/src/components/business/cuisine/CuisineCard'
import { useGetCuisineSummary } from '@/src/lib/api/CuisineApi'; 

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "@/components/ui/carousel";

const CuisineSection = () => {
    const { cuisineSummary, isLoading, error } = useGetCuisineSummary();

    // Helper function to render the main content (loading/error/carousel)
    const renderCarouselContent = () => {
        if (isLoading) {  
            return <div className="text-center py-8 h-48 flex items-center justify-center">Loading cuisines...</div>;
        }

        if (error) {
            return <div className="text-center py-8 text-red-600 h-48 flex items-center justify-center">Error loading cuisines: {error}</div>;
        }

        if (!cuisineSummary || cuisineSummary.length === 0) {
            return <div className="text-center py-8 h-48 flex items-center justify-center">No cuisines found.</div>;
        }

        const enableLoop = cuisineSummary.length > 7; 

        return (
            <Carousel
                opts={{
                    align: "start", 
                    loop: enableLoop, 
                }}
                className="w-full mt-8" 
            >
                <CarouselContent className="-ml-4"> 
                    {cuisineSummary.map((cuisine) => (
                        <CarouselItem
                            key={cuisine.name} 
                            className="pl-4 basis-1/2 min-[480px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                        >
                            <div className="py-1">
                                <CuisineCard
                                    name={cuisine.name}
                                    spots={cuisine.count} // Use the count from summary
                                    image={`/assets/cuisines/${cuisine.name.toLowerCase()}.jpg`}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {enableLoop && ( 
                    <React.Fragment>
                        <CarouselPrevious className="absolute left-[-30px] sm:left-[-20px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10" />
                        <CarouselNext className="absolute right-[-15px] sm:right-[-20px] top-1/2 -translate-y-1/2 hidden sm:inline-flex z-10" />
                    </React.Fragment>
                )}
            </Carousel>
        );
    }

    return (
        <section className="py-12 px-4 bg-slate-50"> {/* Example background */}
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={<>Browse by <span className='text-primary'>Cuisine</span></>} 
                    subtitle='Explore the diverse culinary scene' // Refined subtitle
                />
                {renderCarouselContent()}

            </div>
        </section>
    );
}

export default CuisineSection
