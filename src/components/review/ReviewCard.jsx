import React from 'react';
import PropTypes from 'prop-types';
import { Heart, Star } from 'lucide-react';
import RatingComponent from '../ui/RatingComponent';

const ReviewCard = ({
  review,
  restaurantName = "ABC",
}) => {
  return (
    <div className="bg-slate-100 rounded-lg shadow-md p-4 mb-4 max-w-6xl w-full">
      <div className="flex justify-between items-start mb-2 w-full">
        <div className='flex items-center min-w-1/2 justify-between gap-3'>
          <h3 className="text-xl font-semibold rubik-bold">{restaurantName}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-primary fill-primary mr-1" />
            <span className="text-primary text-sm font-medium">{review.rating}/5</span>
            <span className="text-gray-500 text-xs ml-2">{review.createdAt}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 my-3 inter-regular">{review.text}</p>

      <RatingComponent 
        ratings={{ 
          food: review.foodRating, 
          service: review.serviceRating, 
          ambience: review.ambienceRating 
        }}
        useBackground={true}
        size="md"
      />

      <div className="flex items-center justify-end mt-2">
        <button className="flex items-center inter-medium gap-1">
          <Heart className='h-3.5 w-3.5 fill-primary text-primary' />
          <span>{review.upvotes}</span>
        </button>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;