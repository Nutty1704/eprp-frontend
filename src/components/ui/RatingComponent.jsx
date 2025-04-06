import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const RatingComponent = ({
  ratings = {}, 
  useBackground = true,
  size = 'md',
  prefix
}) => {
  const categoryIcons = {
    food: '🍔',
    service: '👨‍🍳',
    value: '💰'
  };

  const getStarSize = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'lg':
        return 'h-6 w-6';
      case 'md':
      default:
        return 'h-4 w-4';
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starSize = getStarSize();
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`star-full-${index}`}
            className={`${starSize} text-primary fill-primary`}
          />
        ))}
        
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${starSize} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${starSize} text-primary fill-primary`} />
            </div>
          </div>
        )}
        
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <Star
            key={`star-empty-${index}`}
            className={`${starSize} text-gray-300`}
          />
        ))}
        
        <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}/5</span>
      </div>
    );
  };

    const displayRatings = Object.entries(ratings).filter(([_, value]) => value !== undefined);
    const pillClass = useBackground ? "flex items-center bg-gray-100 px-2 py-1 rounded" : "flex items-center px-2 py-1";

    return (
    <div className="flex flex-wrap gap-2 mt-2 mb-2">
        {displayRatings.map(([type, rating]) => (
        <div key={type} className={pillClass}>
            {categoryIcons[type] ? (
            <span className="mr-1">{categoryIcons[type]}</span>
            ) : prefix ? (
            <span className="mr-1 font-medium text-xs">{prefix}</span>
            ) : null}
            
            {renderStars(rating)}
        </div>
        ))}
    </div>
    );
};

RatingComponent.propTypes = {
  ratings: PropTypes.objectOf(PropTypes.number),
  useBackground: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default RatingComponent;