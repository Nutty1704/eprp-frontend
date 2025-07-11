import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OpenBadge from './OpenBadge';
import { getCuisineLabel } from '@/src/lib/utils';

const formatReviewCount = (count) => {
    if (count >= 500) {
        return '500+';
    } else if (count < 10) {
        return count
    } else {
        return `${Math.floor(count / 10) * 10}+`
    }
}

const RestaurantCard = ({
    business,
}) => {
    const navigate = useNavigate();

    const onBusinessClick = () => {
        navigate(`/business/${business._id}`);
    }

    const formatRating = (rating) => {
        return Number(rating).toFixed(1);
    };

    const handleCuisineClick = (e, cuisine) => {
        e.stopPropagation();
        navigate(`/search?selectedCuisines=${encodeURIComponent(cuisine)}`);
    }

    return (
        <div className="group w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-gray-200" onClick={onBusinessClick}>
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={business.imageUrl}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Open badge */}
                <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-105">
                    <OpenBadge
                      variant='lighter-larger'
                      openingHours={business.openingHours}
                      className=''
                    />
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg transform transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold text-gray-900">{formatRating(business.rating)}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-4">
                {/* Cuisines */}
                {business.cuisines?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {business.cuisines.slice(0, 3).map((cuisine, index) => (
                            <span
                                key={index}
                                onClick={(e) => handleCuisineClick(e, cuisine)}
                                className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium capitalize transition-colors duration-200 hover:bg-red-100"
                                style={{ backgroundColor: 'hsl(0 72.2% 50.6% / 0.1)', color: 'hsl(0 72.2% 50.6%)' }}
                            >
                                { getCuisineLabel(cuisine) }
                            </span>
                        ))}
                        {business.cuisines.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                +{business.cuisines.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Restaurant Info */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors duration-200"
                        style={{ color: 'inherit' }}
                        onMouseEnter={(e) => e.target.style.color = 'hsl(0 72.2% 50.6%)'}
                        onMouseLeave={(e) => e.target.style.color = 'inherit'}
                        title={business.name}>
                        {business.name}
                    </h3>

                    <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm line-clamp-1 leading-relaxed" title={business.address}>
                            {business.address}
                        </span>
                    </div>
                </div>

                {/* Rating Details - Simple 3 column grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{formatRating(business.foodRating)}</div>
                        <div className="text-xs text-gray-500">Food</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{formatRating(business.serviceRating)}</div>
                        <div className="text-xs text-gray-500">Service</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{formatRating(business.ambienceRating)}</div>
                        <div className="text-xs text-gray-500">Ambience</div>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex items-center justify-between">

                    <div className='flex gap-1.5 items-center text-gray-500'>
                        <UsersRound className='h-4 w-4' />
                        <span className='inter-regular'>
                            {formatReviewCount(business.review_count)} reviews
                        </span>
                    </div>


                    <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
                        style={{ backgroundColor: 'hsl(0 72.2% 50.6%)', borderColor: 'hsl(0 72.2% 50.6%)' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'hsl(0 72.2% 45.6%)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'hsl(0 72.2% 50.6%)'}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;