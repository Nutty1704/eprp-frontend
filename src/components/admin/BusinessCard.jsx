import React from 'react';
import { Separator } from '@/components/ui/separator';

const BusinessCard = ({ name, location, url, avgRating, imageUrl, description, reviewCount }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex">
      {/* Left: Full-height image block */}
      <div className="w-40 h-32 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Content area: info + separator + description */}
      <div className="flex flex-1 px-6 py-4 gap-6 items-start">
        {/* Business Info */}
        <div className="flex flex-col gap-1 w-[55%]">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-600 break-words">
            {url}
          </p>
          <p className="text-sm mt-1">
            <span className="text-yellow-600">⭐ {avgRating.toFixed(1)} / 5</span>
            <span className="text-gray-500 ml-1">({reviewCount || 0} reviews)</span>
          </p>
        </div>

        <Separator orientation="vertical" className="self-stretch w-[1px] bg-gray-300" />
        
        {/* Description */}
        <div className="w-[45%]">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
