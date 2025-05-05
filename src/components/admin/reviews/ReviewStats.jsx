import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useBusinessStats } from '@/src/lib/api/MyBusinessApi';
import { Star, Utensils, Users, Building, BadgeCheck } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import Rating from '../../ui/Rating';
import MetricCard from './stats/MetricCard';


const ReviewStats = ({
    businessId,
    avgFoodRating = 0,
    avgAmbienceRating = 0,
    avgServiceRating = 0,
    averageRating = 0
}) => {
    const { stats, isLoading, error } = useBusinessStats(businessId);

    useEffect(() => {
        if (!error) return;
        toast.error(error);
    }, [error]);

    // Loading state
    if (isLoading) {
        return <ReviewStats.Skeleton />;
    }

    // Error fallback
    if (error && !stats) {
        return (
            <Card className="w-full border-red-200">
                <CardContent className="p-6">
                    <div className="text-red-500">Unable to load review statistics</div>
                </CardContent>
            </Card>
        );
    }

    const {
        count5Star = 0,
        count4Star = 0,
        count3Star = 0,
        count2Star = 0,
        count1Star = 0
    } = stats || {};

    const reviewCount = count5Star + count4Star + count3Star + count2Star + count1Star;

    const starCounts = {
        5: count5Star,
        4: count4Star,
        3: count3Star,
        2: count2Star,
        1: count1Star
    };

    const starPercentages = {};
    Object.keys(starCounts).forEach(star => {
        starPercentages[star] = reviewCount > 0
            ? (starCounts[star] / reviewCount) * 100
            : 0;
    });

    return (
        <div className="w-full inter-regular">
            {/* Overview section */}
            <div className="p-6 border-b space-y-4">
                <div className='grid md:grid-cols-2 gap-4'>
                    <MetricCard
                        icon={<Users size={16} />}
                        label="Total Reviews"
                        value={reviewCount}
                    />
                    <MetricCard
                        icon={<Star size={16} />}
                        label="Overall Rating"
                        value={averageRating.toFixed(1)}
                    >
                        <Rating rating={averageRating} showValue={false} />
                    </MetricCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MetricCard
                        icon={<Utensils size={16} />}
                        label="Food Rating"
                        value={avgFoodRating.toFixed(1)}
                    >
                        <Rating rating={avgFoodRating} showValue={false} />
                    </MetricCard>

                    <MetricCard
                        icon={<Building size={16} />}
                        label="Ambience Rating"
                        value={avgAmbienceRating.toFixed(1)}
                    >
                        <Rating rating={avgAmbienceRating} showValue={false} />
                    </MetricCard>
                    <MetricCard
                        icon={<BadgeCheck size={16} />}
                        label="Service Rating"
                        value={avgServiceRating.toFixed(1)}
                    >
                        <Rating rating={avgServiceRating} showValue={false} />
                    </MetricCard>
                </div>
            </div>

            {/* Star breakdown section */}
            <div className="p-6">
                <h3 className="text-base font-semibold mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-12">
                                <span className="text-sm font-medium">{star}</span>
                                <Star className="h-4 w-4 text-primary fill-primary" />
                            </div>
                            <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-yellow-500 rounded-full"
                                    style={{ width: `${starPercentages[star]}%` }}
                                ></div>
                            </div>
                            <div className="w-16 text-sm font-medium">
                                {starCounts[star]} ({starPercentages[star].toFixed(0)}%)
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex justify-end">
                <div className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};

// Skeleton loader for the ReviewStats component
ReviewStats.Skeleton = () => {
    return (
        <Card className="w-full shadow-md">
            <CardHeader className="bg-gray-50 border-b pb-4">
                <Skeleton className="h-7 w-64" />
            </CardHeader>

            <CardContent className="p-0">
                {/* Overview section skeleton */}
                <div className="p-6 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((_, index) => (
                            <MetricCard.Skeleton />
                        ))}
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-8 w-16 mt-1" />
                            <Skeleton className="h-4 w-24 mt-2" />
                        </div>
                    </div>
                </div>

                {/* Star breakdown skeleton */}
                <div className="p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Skeleton className="h-5 w-12" />
                                <Skeleton className="h-6 flex-1 rounded-full" />
                                <Skeleton className="h-5 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>

            <div className="p-4 bg-gray-50 border-t flex justify-end">
                <Skeleton className="h-4 w-40" />
            </div>
        </Card>
    );
};

export default ReviewStats;