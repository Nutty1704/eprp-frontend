import React from 'react'
import RatingComponent from '@/src/components/ui/RatingComponent'
import { Button } from '@/components/ui/button'
import OpenBadge from '../card/OpenBadge'

const BusinessHeader = ({ business }) => {
    return (
        <div className='min-h-[30vh] lg:min-h-[35vh] w-full flex relative'>

            <div className='grid grid-cols-3 lg:grid-cols-5 w-full brightness-50 bg-black'>
                {business.images.slice(0, 5).map((img, idx) => (
                    <div
                        key={idx}
                        className={`w-full bg-center bg-cover
                            ${idx % 2 == 0 ? 'bg-gray-500' : 'bg-gray-400'}
                            ${idx >= 3 && 'hidden md:block'}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
            </div>

            <div className='absolute left-3 bottom-3 flex flex-col gap-1.5 z-10'>
                <h3 className='text-white rubik-bold text-2xl lg:text-4xl'>{business.name}</h3>
                <div className='flex items-center gap-1.5 lg:hidden'>
                    {/* Rating Component for mobile */}
                    <RatingComponent
                        size='md'
                        ratings={{ overall: business.rating }}
                        useBackground={false}
                        ratingTextClass='text-white font-medium text-sm'
                    />
                    <span className='inter-medium text-gray-200 text-sm'>({business.review_count} reviews)</span>
                </div>
                <div className='items-center gap-1.5 hidden lg:flex'>
                    {/* Rating component for desktop */}
                    <RatingComponent
                        size='lg'
                        ratings={{ overall: business.rating }}
                        useBackground={false}
                        ratingTextClass='text-white font-medium text-sm'
                    />
                    <span className='inter-medium text-gray-200 text-sm'>({business.review_count} reviews)</span>
                </div>
                <div className='gap-2'>
                    <OpenBadge
                        openingHours={business.openingHours}
                        showMessage={true}
                        messageClass='text-white'
                    />
                </div>
            </div>
            <div className='absolute right-3 bottom-3 flex flex-col gap-1.5 z-10'>
                <Button variant='translucent'>
                    See all {business.images.length} photos
                </Button>
            </div>
        </div>
    )
}

export default BusinessHeader
