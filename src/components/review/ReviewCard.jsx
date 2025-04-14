import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import RatingComponent from '../ui/RatingComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReviewCard = ({ 
  restaurantName,
  reviewDate,
  reviewText,
  overallRating,
  foodRating,
  serviceRating,
  valueRating,
  likeCount,
  isOwner = false, // Optional prop to determine if the user is the owner
  onReplySubmit = () => {}, // Optional callback for reply submission
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

      <RatingComponent 
        ratings={{ 
          food: foodRating, 
          service: serviceRating, 
          value: valueRating 
        }}
        useBackground={true}
        size="md"
      />

      <div className="mt-2">
        {isReplying && isOwner ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full"
            />
            <Button onClick={handleSubmit} className="sm:w-auto w-full">
              Submit
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {isOwner && (
              <Button
                variant="ghost"
                className="text-sm px-0 text-primary hover:underline"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </Button>
            )}
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
        )}
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  overallRating: PropTypes.number.isRequired,
  foodRating: PropTypes.number.isRequired,
  serviceRating: PropTypes.number.isRequired,
  valueRating: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  isOwner: PropTypes.bool,
};

export default ReviewCard;