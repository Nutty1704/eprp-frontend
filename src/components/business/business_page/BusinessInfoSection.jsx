import React from 'react'
import CreateReviewDialog from '@/src/components/review/create-review/CreateReviewDialog'
import { Button } from '@/components/ui/button'
import { Globe, Mail, Pen, Phone, Share } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import useAuthStore from '@/src/stores/auth-store'
import AuthDialog from '../../auth/AuthDialog'
import Rating from '@/src/components/ui/Rating'
import Location from '../Location'
import BusinessAbout from './BusinessAbout'
import { reviewIcons } from '@/src/config/Icons'

const ReviewButton = () => (
    <Button className='flex items-center gap-2'>
        <Pen className='w-4 h-4' />
        Write a review
    </Button>
)

const BusinessInfoSection = ({ business }) => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className='flex flex-col w-full py-4 px-4 gap-3'>

            <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                    {isAuthenticated
                        ? (
                            <CreateReviewDialog business={business}>
                                <ReviewButton />
                            </CreateReviewDialog>
                        ) : (
                            <AuthDialog>
                                <ReviewButton />
                            </AuthDialog>
                        )
                    }
                    <Button variant='outline'>
                        <Share className='w-4 h-4' />
                        Share
                    </Button>

                    <Button variant='outline'>
                        View Menu
                    </Button>
                </div>

                <Separator className='w-1/2' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mt-2'>
                <div className='flex flex-col gap-2.5 order-2 md:order-1'>
                    {/* Rating Section */}
                    <div className='flex flex-col gap-2.5 items-start mx-1.5 my-1.5 w-full'>
                        <span className='rubik-bold text-2xl'>Rating Breakdown</span>
                        <div className='px-3 py-1 w-full space-y-2'>
                            <Rating
                                rating={business.rating}
                                prefix="Overall:"
                                textClass="text-sm text-gray-700"
                                prefixClass="font-medium text-black min-w-24"
                            />
                            <Rating
                                rating={business.foodRating}
                                prefix={`Food ${reviewIcons.food}`}
                                textClass="text-sm text-gray-700"
                                prefixClass="font-medium text-black min-w-24"
                            />
                            <Rating
                                rating={business.serviceRating}
                                prefix={`Service ${reviewIcons.service}`}
                                textClass="text-sm text-gray-700"
                                prefixClass="font-medium text-black min-w-24"
                            />
                            <Rating
                                rating={business.ambienceRating}
                                prefix={`Ambience ${reviewIcons.ambience}`}
                                textClass="text-sm text-gray-700"
                                prefixClass="font-medium text-black min-w-24"
                            />
                        </div>
                    </div>

                    {/* Location & Hours */}
                    <div className='flex flex-col gap-2.5 items-start mx-1.5 my-1.5'>
                        <span className='rubik-bold text-2xl'>Location</span>
                        <div className='px-3 py-1 w-full space-y-3 h-64 mb-16'>
                            <Location address={business.address} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 items-start mx-1.5 my-1.5 w-full order-1 md:order-2'>
                    {/* About Section */}
                    <div className='space-y-4'>
                        <span className='rubik-bold text-2xl'>About</span>
                        <div className='w-full h-full pl-1.5'>
                            <BusinessAbout business={business} />
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className='space-y-4'>
                        <span className='rubik-bold text-2xl'>Contact</span>
                        <div className='w-full h-full pl-1.5 gap-x-12 grid grid-cols-1 md:grid-cols-2'>
                            <div className='flex items-center gap-2.5'>
                                <Globe className='w-4 h-4 text-primary' />
                                <a
                                    target='_blank'
                                    href='https://www.example.com/'
                                    className='hover:underline decoration-primary'
                                >
                                    {'https://www.example.com/'}
                                </a>
                            </div>
                            <div className='flex items-center gap-2.5'>
                                <Mail className='w-4 h-4 text-primary' />
                                <a
                                    href={`mailto:${business.email}`}
                                    target='_blank'
                                    className='hover:underline decoration-primary'>
                                    {business.email}
                                </a>
                            </div>
                            <div className='flex items-center gap-2.5'>
                                <Phone className='w-4 h-4 text-primary' />
                                <a href={`tel:${business.phone}`} className='hover:underline decoration-primary'>
                                    {business.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BusinessInfoSection
