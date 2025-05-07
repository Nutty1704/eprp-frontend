import { ArrowDownUp, MessageSquareText } from 'lucide-react'
import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import { useReviews } from '@/src/hooks/useReviews'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SORT_OPTIONS } from '@/src/config/Review'

const ReviewDeck = ({ customerId, businessId }) => {
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
    
    const {
        reviews,
        isLoading, 
        isFetching,
        updateReview,
        error
    } = useReviews({
        customerId,
        businessId,
        sort: sortOption.value
    });

    const onLikeChange = (reviewId, isLiked) => {
        const review = reviews.find(review => review._id === reviewId);
        updateReview(reviewId, {
            isLiked,
            upvotes: isLiked ? review.upvotes + 1 : review.upvotes - 1
        });
    }

    return (
        <div className='bg-primary min-h-[50vh] w-full relative mt-40 flex items-start justify-center pt-10'>
            <div
                className="absolute -top-32 left-0 w-full h-96 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/review-wave.svg')",
                }}
            />

            <div className='shadow-[0_-8px_30px_rgba(0,0,0,0.1)] w-[90%] max-w-[1400px] bg-white rounded-t-[5rem] flex flex-col items-center px-10 py-12 z-10'>

                {/* Header */}
                <div className='flex flex-col gap-8 w-full px-10'>
                    <div className='rubik-bold text-2xl lg:text-4xl flex items-center justify-center py-3 gap-8 lg:gap-32'>
                        <div className='flex items-center gap-3'>
                            <MessageSquareText className='text-primary w-5 h-5 lg:w-9 lg:h-9' />
                            Reviews
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-4 lg:pr-20 text-sm inter-medium'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-2 rounded-full bg-slate-200 py-1 px-4 shadow-sm cursor-pointer hover:bg-slate-300'>
                                <ArrowDownUp className='w-4 h-4' />
                                Sort: {sortOption.label}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {SORT_OPTIONS.map((option) => (
                                    <DropdownMenuItem 
                                        key={option.label}
                                        onClick={() => setSortOption(option)}
                                        className={`${sortOption.label === option.label ? 'bg-slate-100 font-medium' : ''}`}
                                    >
                                        <span className="mr-2">{option.icon}</span>
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className='grid grid-col-1 lg:grid-cols-2 gap-y-4 gap-8 mt-8 w-full'>
                        {[...Array(6)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-40 shadow-lg"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className='text-red-500 my-8'>
                        Failed to load reviews. Please try again.
                    </div>
                )}

                {/* Reviews */}
                {!isLoading && !error && (
                    <div className='flex flex-col items-center gap-y-4 gap-8 mt-8 w-full'>
                        {reviews.length === 0 ? (
                            <div className='col-span-full text-center py-12 text-slate-500'>
                                No reviews found.<br />Be the <span className='text-primary'>first</span> to leave one!
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onLikeChange={onLikeChange}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Refreshing indicator */}
                {!isLoading && isFetching && (
                    <div className='text-sm text-slate-400 mt-4 text-center'>
                        Updating...
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewDeck