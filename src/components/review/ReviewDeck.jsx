import { ArrowDownUp, MessageSquareText } from 'lucide-react'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReviewCard from './ReviewCard'
import { useReviews } from '@/src/hooks/useReviews'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SORT_OPTIONS } from '@/src/config/Review'
import useAuthStore from '@/src/stores/auth-store'

const ReviewDeck = ({ businessId }) => {
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
    const loadMoreRef = useRef(null);
    const observerRef = useRef(null);
    const { user } = useAuthStore();
    
    const {
        reviews,
        isLoading, 
        isFetching,
        updateReview,
        error,
        loadMore,
        hasMore
    } = useReviews({
        businessId,
        customerId: !businessId && user ? user._id : undefined, 
        sort: sortOption.value,
        infiniteScroll: true
    });
    

    console.log("Reviews:", reviews);


    // Setup the intersection observer
    useEffect(() => {
        // Cleanup previous observer if it exists
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        
        // Only create a new observer if we have more reviews to load
        if (!hasMore) return;
        
        // Create and store the observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                // Only trigger loadMore if element is intersecting and we have more to load
                if (entry.isIntersecting && hasMore && !isFetching) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        
        // Start observing if we have the element
        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }
        
        // Cleanup on unmount or when dependencies change
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isFetching, loadMore]);

    const onLikeChange = (reviewId, isLiked) => {
        const review = reviews.find(review => review._id === reviewId);
        if (!review) return;
        
        updateReview(reviewId, {
            isLiked,
            upvotes: isLiked ? review.upvotes + 1 : review.upvotes - 1
        });
    }

    const getDisplayTitle = () => {
        if (businessId) return "Reviews";
        return "My Reviews";
    };



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
                            {getDisplayTitle()}
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
                                        className={sortOption.label === option.label ? 'bg-slate-100 font-medium' : ''}
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
                {isLoading && reviews.length === 0 && (
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
                                {businessId ? (
                                    <>No reviews found.<br />Be the <span className='text-primary'>first</span> to leave one!</>
                                ) : (
                                    <>You haven't written any reviews yet.<br />Visit businesses to share your <span className='text-primary'>experience</span>!</>
                                )}
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <ReviewCard
                                    key={review._id}
                                    review={review}
                                    onLikeChange={onLikeChange}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Loading indicator */}
                {isFetching && reviews.length > 0 && (
                    <div className='text-sm text-slate-400 mt-6 py-4 text-center'>
                        Loading more reviews...
                    </div>
                )}
                
                {/* Observer target - only render when hasMore is true */}
                {hasMore && reviews.length > 0 && (
                    <div 
                        ref={loadMoreRef} 
                        className="h-10 w-full mt-4"
                        aria-hidden="true"
                    />
                )}
                
                {/* End of results message */}
                {!hasMore && reviews.length > 0 && (
                    <div className='text-sm text-slate-400 mt-6 py-4 text-center'>
                        You've reached the end of the reviews.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewDeck