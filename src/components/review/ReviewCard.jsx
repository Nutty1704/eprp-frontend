import React from 'react';
import PropTypes from 'prop-types';
import { Heart, Star, User } from 'lucide-react';
import { format } from 'date-fns'
import Rating from '../ui/Rating';
import { reviewIcons } from '@/src/config/Icons.jsx';
import LightboxGallery from '../ui/LightboxGallery';
import { voteReview } from '@/src/lib/api/review';
import { toast } from 'sonner';
import useAuthStore from '@/src/stores/auth-store';

const ReviewCard = ({
  review,
  onLikeChange = () => {},
}) => {
  const hasImages = review.images && Array.isArray(review.images) && review.images.length > 0;
  const { isAuthenticated } = useAuthStore();

  const renderReviewImages = ({ images, handleImageClick }) => (
    <div className="flex items-center gap-2">
      {images.slice(0, 3).map((imageUrl, imageIndex) => (
        <div
          key={imageIndex}
          className="aspect-square overflow-hidden rounded-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleImageClick(imageIndex)}
        >
          <img
            src={imageUrl}
            alt={`Review image ${imageIndex + 1}`}
            className="w-16 h-16 object-cover"
          />
        </div>
      ))}
    </div>
  );

  const onLikeClick = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to like a review');
      return;
    }

    const action = review.isLiked ? 'downvote' : 'upvote';
    const { success, error, message } = await voteReview(review._id, action);

    if (error) {
      toast.error(message);
      return;
    }
    
    if (success) {
      onLikeChange(review._id, !review.isLiked);
    }
  }

  return (
    <div className="bg-slate-100 rounded-lg shadow-md mb-4 max-w-6xl w-full inter-regular overflow-hidden">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className='flex items-center min-w-1/2 justify-between gap-3'>
            <h3 className="text-xl font-semibold rubik-bold">{review.title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-primary fill-primary mr-1" />
              <span className="text-primary text-sm font-medium">{review.rating?.toFixed(1)}/5</span>
            </div>
          </div>
          <span className="text-gray-600 font-medium text-xs ml-2">
            {format(new Date(review.createdAt), 'd MMMM yyyy')}
          </span>
        </div>

        <p className="text-gray-700 my-3">{review.text}</p>

        {/* Review Images */}
        {hasImages && (
          <div className="my-4">
            <LightboxGallery
              images={review.images}
              renderImages={renderReviewImages}
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Rating
            asInt={true}
            rating={review.foodRating}
            prefix={<span>{reviewIcons.food} Food</span>}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.serviceRating}
            prefix={<span>{reviewIcons.service} Service</span>}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.ambienceRating}
            prefix={<span>{reviewIcons.ambience} Ambience</span>}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-end mt-4 mb-4">
          <button
            onClick={onLikeClick}
            className="flex items-center inter-medium gap-1.5"
          >
            <Heart className={`h-5 w-5 text-primary ${review.isLiked && 'fill-primary'}`} />
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
  restaurantName: PropTypes.string,
};

export default ReviewCard;