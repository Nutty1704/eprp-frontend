import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useMemo } from 'react';

const getAdjustedWidth = (value) => {
    if (value === 1) return "100%";
    if (value === 0) return "0%";

    if (value <= 0.25) {
        return `${(value * 1.7) * 100}%`;
    } else if (value <= 0.4) {
        return `${(value * 1.17) * 100}%`
    } else if (value <= 0.5) {
        return `${(value * 1) * 100}%`
    } else {
        return `${(value * 0.9) * 100}%`;
    }
};

const Rating = ({
    rating,
    prefix = '',
    icon: IconComponent = Star,
    iconClass = 'h-5 w-5',
    textClass = 'text-sm',
    prefixClass,
    showValue = true,
    max = 5,
    asInt = false,
}) => {
    const stars = useMemo(() => {
        const clampedRating = Math.max(0, Math.min(max, rating));

        return Array(max).fill(0).map((_, index) => {
            const starValue = index + 1;

            if (starValue <= Math.floor(clampedRating)) {
                return { fill: 'full', value: 1 };
            }

            if (starValue === Math.ceil(clampedRating) && clampedRating % 1 !== 0) {
                return { fill: 'partial', value: clampedRating % 1 };
            }

            return { fill: 'empty', value: 0 };
        });
    }, [rating, max]);

    return (
        <div className="flex items-center gap-2">
            {prefix && <span className={cn("font-medium", textClass, prefixClass)}>{prefix}</span>}
            <div className="flex">
                {stars.map((star, index) => (
                    <div key={index} className="relative inline-block">
                        {/* Background (empty) star */}
                        <IconComponent className={cn("text-gray-300", iconClass)} />

                        {/* Filled star overlay */}
                        {star.value > 0 && (
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: getAdjustedWidth(star.value) }}
                            >
                                <IconComponent className={cn("fill-primary text-primary", iconClass)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showValue && (
                <span className={cn("font-medium text-gray-500", textClass)}>
                    {typeof rating === 'number' ? ( asInt ? Math.round(rating) : rating.toFixed(1) ) : rating}/{max}
                </span>
            )}
        </div>
    );
};

export default Rating;