import React from 'react';
import SectionHeader from './SectionHeader';
import CuisineCard from '@/src/components/business/card/CuisineCard';
import { useGetCuisineSummary } from '@/src/lib/api/CuisineApi';
import ResponsiveCarousel from '../card/ResponsiveCarousel';

const CuisineSection = () => {
    const { cuisineSummary, isLoading, error } = useGetCuisineSummary();
    
    const renderCuisineItem = (cuisine) => (
        <CuisineCard
            name={cuisine.name}
            spots={cuisine.count}
            image={`/assets/cuisines/${cuisine.name.toLowerCase()}.jpg`}
        />
    );

    return (
        <section className="py-8 sm:py-12 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={<>Browse by <span className='text-primary'>Cuisine</span></>}
                    subtitle='Explore the diverse culinary scene'
                />
                <div className="mt-8">
                    <ResponsiveCarousel
                        items={cuisineSummary}
                        renderItem={renderCuisineItem}
                        isLoading={isLoading}
                        error={error}
                        loadingMessage="Loading cuisines..."
                        errorMessage="Error loading cuisines. Please try again later."
                        emptyMessage="No cuisines found."
                        itemsPerViewLarge={6}
                        itemClassNames="pl-4 basis-1/2 min-[480px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                        height="h-48"
                    />
                </div>
            </div>
        </section>
    );
}

export default CuisineSection;