import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ 
  restaurantName,
  reviewDate,
  reviewText,
  overallRating,
  foodRating,
  serviceRating,
  valueRating,
  likeCount
}) => {
  // Function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={`star-${index}`}
            className={`h-4 w-4 ${
              index < Math.floor(rating) 
                ? 'text-[#8B0000] fill-[#8B0000]' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-500">{rating}/5</span>
      </div>
    );
  };

  // Category icons
  const categoryIcons = {
    food: '🍔',
    service: '👨‍🍳',
    value: '💰'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-6xl w-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold rubik-bold">{restaurantName}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-[#8B0000] fill-[#8B0000] mr-1" />
            <span className="text-[#8B0000] text-sm font-medium">{overallRating}/5</span>
            <span className="text-gray-500 text-xs ml-2">{reviewDate}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 my-3 inter-regular">{reviewText}</p>

      <div className="flex flex-wrap gap-2 mt-4 mb-3">
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
          <span className="mr-1">{categoryIcons.food}</span>
          {renderStars(foodRating)}
        </div>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
          <span className="mr-1">{categoryIcons.service}</span>
          {renderStars(serviceRating)}
        </div>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
          <span className="mr-1">{categoryIcons.value}</span>
          {renderStars(valueRating)}
        </div>
      </div>

      <div className="flex items-center justify-end mt-2">
        <button className="flex items-center text-gray-600 hover:text-[#8B0000]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;