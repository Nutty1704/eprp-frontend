import React from 'react';
import { Button } from '@/components/ui/button';
import { Info, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoHeader from './InfoHeader';
import OpenBadge from './OpenBadge';
import Rating from '@/src/components/ui/Rating';
import ToolTip from '@/src/components/ui/Tooltip';
import { reviewIcons } from '@/src/config/Icons.jsx'

const formatReviewCount = (count) => {
  if (count >= 500) {
    return '500+';
  } else {
    return `${Math.floor(count / 10) * 10}+`
  }
}

const RestaurantCard = ({
  business,
}) => {
  const navigate = useNavigate();

  const onBusinessClick = () => {
    navigate(`/business/${business._id}`);
  }

  const subtitleClass = 'text-xs text-gray-500 inter-regular';

  return (
    <div className="w-full max-w-sm border rounded-lg cursor-pointer overflow-hidden hover:shadow-xl group" onClick={onBusinessClick}>
      <div className="h-48 overflow-hidden relative">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover"
        />

        {/* Open badge */}
        <OpenBadge openingHours={business.openingHours} className="absolute top-2 left-2 shadow-md hidden group-hover:block" />
      </div>

      <div className="px-4 flex flex-col items-start pt-1 mb-2 gap-2">

        {/* Cuisines */}
        <div className='-mb-2.5 w-full'>
          <InfoHeader cuisines={business.cuisines} className={subtitleClass} />
        </div>

        {/* Name, address, and view */}
        <div className='grid grid-cols-6 w-full'>
          <div className='col-span-5'>
            <div className='flex flex-col'>
              <h3 className='inter-semibold text-xl'>{business.name}</h3>
              <span className={subtitleClass}>{business.address}</span>
            </div>
          </div>
          <Button size='sm'>View</Button>
        </div>

        {/* Rating */}
        <ToolTip
          side="top"
          align="center"
          text={
            <div className="px-3 py-1 w-full space-y-2">
              {[
                { rating: business.rating, label: "Overall", icon: reviewIcons.overall },
                { rating: business.foodRating, label: "Food", icon: reviewIcons.food },
                { rating: business.serviceRating, label: "Service", icon: reviewIcons.service },
                { rating: business.ambienceRating, label: "Ambience", icon: reviewIcons.ambience },
              ].map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="min-w-28 font-medium text-black text-sm flex-shrink-0">
                    {item.icon} {item.label}
                  </span>
                  <Rating
                    rating={item.rating}
                    textClass="text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          }
        >
          <div className="flex items-center justify-center inter-regular text-sm gap-1">
            <span className="flex items-center font-medium">
              {business.rating.toFixed(1)}
              <Star className="h-4 w-4 fill-primary" stroke="none" />
            </span>
            <span className="text-gray-500">
              ({formatReviewCount(business.review_count)} reviews)
            </span>
            <Info className='w-4 h-4 text-gray-500' />
          </div>
        </ToolTip>
      </div>      
    </div>
  );
};

export default RestaurantCard;