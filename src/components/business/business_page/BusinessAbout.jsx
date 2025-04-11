import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import Hours from '../Hours'

const BusinessAbout = ({ business, containerClass }) => {
    return (
        <div className={cn('inter-regular text-sm w-full h-full relative', containerClass)}>
            <div className='space-y-2'>
                <section id='business-description' className='space-y-1'>
                    <div className='flex flex-wrap items-center gap-y-1 gap-x-2 inter-medium'>
                        {business.description}
                    </div>
                </section>

                <section id='business-cuisines' className='flex flex-wrap items-center gap-y-1 gap-x-2 inter-medium'>
                    {business.cuisines.map(cuisine => (
                        <span className='rounded-full bg-gray-100 shadow-sm px-2 py-1 cursor-pointer hover:bg-gray-200 text-gray-600'>{cuisine}</span>
                    ))}
                </section>

                <section id='business-hours' className='inter-medium'>
                    <Hours
                        hours={business.openingHours}
                        className='bg-transparent pl-0'
                    />
                </section>
            </div>
        </div>
    )
}

export default BusinessAbout
