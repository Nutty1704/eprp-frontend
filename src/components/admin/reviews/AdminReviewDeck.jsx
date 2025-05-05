import { ArrowDownUp } from 'lucide-react'
import React from 'react'
import { useReviews } from '@/src/hooks/useReviews'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SORT_OPTIONS } from '@/src/config/Review.js'
import AdminReviewCard from './AdminReviewCard'

/**
 * A simplified Review Deck component for business owners/admins
 * Focuses on functionality and clean layout for easy management
 */
const AdminReviewDeck = ({ businessId }) => {
    const [sortOption, setSortOption] = React.useState(SORT_OPTIONS[0]);
    
    const {
        reviews,
        isLoading, 
        isFetching,
        error
    } = useReviews({
        businessId,
        sort: sortOption.value
    });

    return (
        <Card className="shadow-md w-full">
            <CardHeader className="bg-gray-50 border-b pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">
                        Customer Reviews
                    </CardTitle>
                
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-white px-3 py-2 border hover:bg-gray-50 text-sm">
                            <ArrowDownUp className="w-4 h-4" />
                            <span>{sortOption.label}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {SORT_OPTIONS.map((option) => (
                                <DropdownMenuItem 
                                    key={option.label}
                                    onClick={() => setSortOption(option)}
                                    className={`${sortOption.label === option.label ? 'bg-gray-100 font-medium' : ''}`}
                                >
                                    <span className="mr-2">{option.icon}</span>
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            
            <CardContent className="p-4">
                {/* Loading state */}
                {isLoading && (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-32 w-full"
                            />
                        ))}
                    </div>
                )}
                
                {/* Error state */}
                {error && (
                    <div className="p-6 text-center text-red-500">
                        Failed to load reviews. Please try again.
                    </div>
                )}
                
                {/* Empty state */}
                {!isLoading && !error && reviews.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No reviews yet for your business.
                    </div>
                )}
                
                {/* Reviews list */}
                {!isLoading && !error && reviews.length > 0 && (
                    <div className="flex flex-col gap-4 items-center">
                        {reviews.map((review) => (
                            <AdminReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
                
                {/* Refreshing indicator */}
                {!isLoading && isFetching && (
                    <div className="text-xs text-gray-400 text-center mt-2">
                        Updating...
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AdminReviewDeck;