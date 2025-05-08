import React from 'react'
import CreateReviewDialog from '@/src/components/review/create-review/CreateReviewDialog'
import { Button } from '@/components/ui/button'
import { Globe, Mail, Pen, Phone, Share } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import useAuthStore from '@/src/stores/auth-store'
import AuthDialog from '@/src/components/auth/AuthDialog'
import Rating from '@/src/components/ui/Rating'
import Location from '../Location'
import BusinessAbout from './BusinessAbout'
import { reviewIcons } from '@/src/config/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import SocialMediaShareDialog from '../SocialMediaShareDialog'

const ReviewButton = React.forwardRef((props, ref) => (
    <Button
        className='flex items-center gap-2'
        ref={ref}
        {...props}
    >
        <Pen className='w-4 h-4' />
        Write a review
    </Button>
))

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
                    <SocialMediaShareDialog business={business}>
                        <Button variant='outline' className='flex items-center gap-2'>
                            <Share className='w-4 h-4' />
                            Share
                        </Button>
                    </SocialMediaShareDialog>


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

BusinessInfoSection.Skeleton = () => {
    return (
      <div className='flex flex-col w-full py-4 px-4 gap-3'>
        {/* Button area skeleton */}
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
          <Skeleton className="h-[1px] w-1/2" />
        </div>
  
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mt-2'>
          {/* Left column (ratings and location) */}
          <div className='flex flex-col gap-2.5 order-2 md:order-1'>
            {/* Rating Section Skeleton */}
            <div className='flex flex-col gap-2.5 items-start mx-1.5 my-1.5 w-full'>
              <Skeleton className="h-8 w-48 mb-2" />
              <div className='px-3 py-1 w-full space-y-2'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center w-full gap-2">
                    <Skeleton className="h-5 w-24" /> 
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
  
            {/* Location Skeleton */}
            <div className='flex flex-col gap-2.5 items-start mx-1.5 my-1.5'>
              <Skeleton className="h-8 w-32 mb-2" />
              <div className='px-3 py-1 w-full'>
                <Skeleton className="h-64 w-full mb-16" />
              </div>
            </div>
          </div>
  
          {/* Right column (about and contact) */}
          <div className='flex flex-col gap-4 items-start mx-1.5 my-1.5 w-full order-1 md:order-2'>
            {/* About Section Skeleton */}
            <div className='space-y-4 w-full'>
              <Skeleton className="h-8 w-24" />
              <div className='w-full pl-1.5'>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
  
            {/* Contact Section Skeleton */}
            <div className='space-y-4 w-full'>
              <Skeleton className="h-8 w-28" />
              <div className='w-full pl-1.5 gap-x-12 grid grid-cols-1 md:grid-cols-2'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default BusinessInfoSection
