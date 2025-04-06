import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const RatingBreakdown = ({ 
  averageRating, 
  totalReviews, 
  ratingCounts,
  growthText
}) => {
  // Colors for different rating bars
  const barColors = {
    5: 'bg-green-500',
    4: 'bg-blue-500',
    3: 'bg-yellow-500',
    2: 'bg-orange-500',
    1: 'bg-red-500'
  };

  // Calculate the highest count to determine the maximum bar width
  const maxCount = Math.max(...Object.values(ratingCounts));

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={`star-${index}`}
            className={`h-5 w-5 ${
              index < Math.floor(rating) 
                ? 'text-[#8B0000] fill-[#8B0000]' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full">
      <h2 className="text-xl font-bold mb-4 rubik-bold">Rating Breakdown</h2>
      
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
              {renderStars(averageRating)}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600">Total Reviews</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{totalReviews}</span>
              {growthText && (
                <span className="ml-2 text-xs text-gray-500">{growthText}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <div className="w-3 mr-2">{rating}</div>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${barColors[rating]}`} 
                  style={{ 
                    width: `${ratingCounts[rating] ? (ratingCounts[rating] / maxCount) * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500 w-6 text-right">
                {ratingCounts[rating] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

RatingBreakdown.propTypes = {
  averageRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  ratingCounts: PropTypes.shape({
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number
  }).isRequired,
  growthText: PropTypes.string
};

export default RatingBreakdown;