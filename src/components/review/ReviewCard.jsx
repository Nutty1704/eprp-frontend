import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, Star, User } from 'lucide-react';
import { format } from 'date-fns'
import Rating from '../ui/Rating';
import { reviewIcons } from '@/src/config/Icons';

const ReviewCard = ({
  review,
  restaurantName = "ABC",
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSubmit = () => {
    onReplySubmit(replyText);
    setIsReplying(false);
    setReplyText('');
  };

  if (review.response) console.log(review.response);

  return (
    <div className="bg-slate-100 rounded-lg shadow-md mb-4 max-w-6xl w-full inter-regular overflow-hidden">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className='flex items-center min-w-1/2 justify-between gap-3'>
            <h3 className="text-xl font-semibold rubik-bold">{restaurantName}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-primary fill-primary mr-1" />
              <span className="text-primary text-sm font-medium">{review.rating?.toFixed(2)}/5</span>
            </div>
          </div>
          <span className="text-gray-600 font-medium text-xs ml-2">
            {format(new Date(review.createdAt), 'd MMMM yyyy')}
          </span>
        </div>

        <p className="text-gray-700 my-3">{review.text}</p>

        <div className="space-y-1.5">
          <Rating
            asInt={true}
            rating={review.foodRating}
            prefix={`Food ${reviewIcons.food}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.serviceRating}
            prefix={`Service ${reviewIcons.service}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.ambienceRating}
            prefix={`Ambience ${reviewIcons.ambience}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-end mt-4 mb-4">
          <button className="flex items-center inter-medium gap-1.5">
            <Heart className='h-5 w-5 fill-primary text-primary' />
            <span>{review.upvotes}</span>
          </button>
        </div>
      </div>

      {/* Owner's Response */}
      {review.response && (
        <div className="bg-blue-50 border-l-4 border-primary mt-4">
          <div className="p-4">
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium text-sm text-primary">Owner's Response</span>
              <span className="text-gray-500 text-xs ml-auto">
                {format(new Date(review.response.updatedAt), 'd MMMM yyyy')}
              </span>
            </div>
            <p className="text-gray-700 inter-regular text-sm">
              {review.response.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;