import React from 'react'
import SectionHeader from './SectionHeader'
import CuisineCard from '@/src/components/business/cuisine/CuisineCard'
import cuisines from '@/test_data/cuisines.json'

const CuisineSection = () => {
    return (
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title={<>Browse by <span className='!text-primary'>Cuisine</span></>}
                    subtitle='Browse Unique Cuisines in Monash'
                />

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
    )
}

export default CuisineSection
