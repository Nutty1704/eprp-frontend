import React from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from '../AuthDialog';
import useAuthStore from '@/src/stores/auth-store';

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
      {/* Restaurant Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Rating & Reviews */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          {renderStars(rating)}
        </div>
        <div className="text-sm text-gray-600">
          {reviewCount} Reviews
        </div>
        <div className="font-bold text-lg text-[#8B0000]">
          {rating}/5
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between p-4">
        <button className="bg-[#8B0000] text-white px-4 py-1 rounded">
          Like
        </button>
        
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