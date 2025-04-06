import React from 'react';
import AuthDialog from '../auth/AuthDialog';
import useAuthStore from '@/src/stores/auth-store';
import RatingComponent from '../ui/RatingComponent';
import { Button } from '@/components/ui/button';
import CreateReviewDialog from '../review/create-review/CreateReviewDialog';

const RestaurantCard = ({
  business,
}) => {
  const { isAuthenticated } = useAuthStore();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-[#8B0000]">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-[#8B0000]">★</span>);
    }

    for (let i = 0; i < 5 - (fullStars + (hasHalfStar ? 1 : 0)); i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  return (
    <div className="w-full max-w-sm border border-[#8B0000] rounded-lg overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between pt-2 mb-2">
        <h3 className='inter-semibold text-xl'>{business.name}</h3>
        <RatingComponent
          ratings={{ overall: business.rating }}
          useBackground={true}
          size="md"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between px-4 pb-4">
        {isAuthenticated ? (
          <CreateReviewDialog business={business}>
            <Button>
              Write a review
            </Button>
          </CreateReviewDialog>
        ) : (
          <AuthDialog>
            <button className="bg-primary text-primary-foreground px-4 py-1 rounded">
              Write a review
            </button>
          </AuthDialog>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;