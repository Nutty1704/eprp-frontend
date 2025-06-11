import React from 'react'
import { Button } from '@/components/ui/button'
import OpenBadge from '../card/OpenBadge'
import GalleryDialog from '@/src/components/ui/GalleryDialog'
import Rating from '@/src/components/ui/Rating'
import { Skeleton } from '@/components/ui/skeleton'

const getGalleryTitle = (name) => {
    return name.endsWith('s') ? (
        <span>
            <span className="text-primary">{name}</span>' Gallery
        </span>
    ) : (
        <span>
            <span className="text-primary">{name}</span>'s Gallery
        </span>
    )
}


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
                <div className='flex items-center gap-1.5'>
                    <Rating
                        rating={business.rating}
                        textClass='text-sm text-white'
                        iconClass='h-4 w-4'
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
                <GalleryDialog images={business.images} title={getGalleryTitle(business.name)}>
                    <Button variant='translucent'>
                        See all {business.images.length} photos
                    </Button>
                </GalleryDialog>
            </div>
        </div>
    )
}


BusinessHeader.Skeleton = () => {
    return (
        <div className='min-h-[30vh] lg:min-h-[35vh] w-full flex relative'>

            <div className='grid grid-cols-3 lg:grid-cols-5 w-full brightness-50 bg-black'>
                {[1, 2, 3, 4, 5].map((_, idx) => (
                    <Skeleton
                        key={idx}
                        className={`w-full bg-center bg-cover rounded-none
                            ${idx % 2 == 0 ? 'bg-gray-500' : 'bg-gray-400'}
                            ${idx >= 3 && 'hidden md:block'}`}
                    />
                ))}
            </div>

            <div className='absolute left-3 bottom-3 flex flex-col gap-1.5 z-10'>
                <Skeleton className='h-4 w-12 bg-gray-500' />
                <Skeleton className='h-4 w-32 bg-gray-500' />
                <div className='gap-2'>
                    <OpenBadge.Skeleton />
                </div>
            </div>
            <div className='absolute right-3 bottom-3 flex flex-col gap-1.5 z-10'>
                <Button variant='translucent'>
                    See all photos
                </Button>
            </div>
        </div>
    )
}

export default BusinessHeader
