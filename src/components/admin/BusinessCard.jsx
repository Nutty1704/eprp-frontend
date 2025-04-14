import React from 'react';
import { Separator } from '@/components/ui/separator';

const BusinessCard = ({ name, location, url, avgRating, imageUrl, description }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex">
      {/* Left: Full-height image block */}
      {imageUrl && (
        <div className="w-40 h-auto">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content area: info + separator + description */}
      <div className="flex flex-1 px-6 py-4 gap-6 items-start">
        {/* Business Info */}
        <div className="flex flex-col gap-1 w-[55%]">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{location}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-blue-600 hover:underline block"
          >
            {url}
          </a>
          <p className="text-sm text-yellow-600 mt-1">⭐ {avgRating} / 5</p>
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
