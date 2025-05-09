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

  const formatRating = (rating) => {
    return Number(rating).toFixed(2);
  };
  
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
        <div className='w-full'>
          <InfoHeader cuisines={business.cuisines} className={subtitleClass} />
        </div>

        {/* Name, address, and view */}
        {/* <div className='grid grid-cols-6 w-full h-[4.5rem]'> */}
        <div className='w-full h-[3rem]'>
          <div className='col-span-5 flex flex-col justify-between'>
            <div className='flex flex-col'>
              <h3 className='inter-semibold text-xl truncate' title={business.name}>{business.name}</h3>
              <span className={`${subtitleClass} truncate`} title={business.address}>{business.address}</span>
            </div>
          </div>
          {/* <div className="flex items-start justify-end">
            <Button size='sm'>View</Button>
          </div> */}
        </div>

        {/* Rating */}
        <ToolTip
          side="top"
          align="center"
          text={
            <div className="px-3 py-1 w-full space-y-2">
              <Rating
                rating={business.rating}
                prefix={<span>{reviewIcons.overall} Overall</span>}
                textClass="text-sm text-gray-700"
                prefixClass="font-medium text-black min-w-24"
              />
              <Rating
                rating={business.foodRating}
                prefix={<span>{reviewIcons.food} Food</span>}
                textClass="text-sm text-gray-700"
                prefixClass="font-medium text-black min-w-24"
              />
              <Rating
                rating={business.serviceRating}
                prefix={<span>{reviewIcons.service} Service</span>}
                textClass="text-sm text-gray-700"
                prefixClass="font-medium text-black min-w-24"
              />
              <Rating
                rating={business.ambienceRating}
                prefix={<span>{reviewIcons.ambience} Ambience</span>}
                textClass="text-sm text-gray-700"
                prefixClass="font-medium text-black min-w-24"
              />
            </div>
          }
        >
          <div className="flex items-center justify-center inter-regular text-sm gap-1">
            <span className="flex items-center font-medium">
              {formatRating(business.rating)}
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