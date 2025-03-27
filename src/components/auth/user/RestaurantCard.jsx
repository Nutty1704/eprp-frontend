import React from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from '../AuthDialog';
import useAuthStore from '@/src/stores/auth-store';
import RatingComponent from './RatingComponent';

const RestaurantCard = ({ 
  id, 
  name, 
  image, 
  reviewCount, 
  rating, 
  onWriteReview 
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

  const handleWriteReview = () => {
    if (isAuthenticated) {
      onWriteReview(id);
    }
  };

  return (
    <div className="w-full max-w-sm border border-[#8B0000] rounded-lg overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="px-4 flex items-center justify-between">
        <RatingComponent 
          ratings={{ overall: rating }}
          useBackground={true}
          size="lg"
        />      
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between px-4 pb-4">
        {isAuthenticated ? (
          <button 
            onClick={handleWriteReview} 
            className="bg-[#8B0000] text-white px-4 py-1 rounded"
          >
            Write a review
          </button>
        ) : (
          <AuthDialog>
            <button className="bg-[#8B0000] text-white px-4 py-1 rounded">
              Write a review
            </button>
          </AuthDialog>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;