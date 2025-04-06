import React from 'react';
import PropTypes from 'prop-types';
import { Phone, Globe, DollarSign, UtensilsCrossed, ExternalLink } from 'lucide-react';

const BusinessOverview = ({
  description,
  cuisineTypes = [],
  priceRange = 1,
  phone,
  website,
  socialMedia = {}
}) => {
  const renderPriceRange = (range) => {
    return [...Array(4)].map((_, index) => (
      <DollarSign
        key={`price-${index}`}
        className={`h-4 w-4 ${
          index < range 
            ? 'text-[#8B0000] fill-[#8B0000]' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const socialIcons = {
    instagram: '/icons/instagram.svg',
    facebook: '/icons/facebook.svg',
    twitter: '/icons/twitter.svg',
    tiktok: '/icons/tiktok.svg'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full">
      <h2 className="text-xl font-bold mb-4 rubik-bold">About</h2>
      
      <div className="mb-5">
        <p className="text-gray-700 inter-regular">{description}</p>
      </div>
      
      <div className="flex items-center mb-3">
        <UtensilsCrossed className="h-5 w-5 text-[#8B0000] mr-2" />
        <div className="flex flex-wrap gap-2">
          {cuisineTypes.map((cuisine, index) => (
            <span 
              key={index} 
              className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700"
            >
              {cuisine}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-[#8B0000] mr-2">Price:</span>
        <div className="flex">
          {renderPriceRange(priceRange)}
        </div>
      </div>
      
      {phone && (
        <div className="flex items-center mb-3">
          <Phone className="h-5 w-5 text-[#8B0000] mr-2" />
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-[#8B0000]">
            {phone}
          </a>
        </div>
      )}
      
      {website && (
        <div className="flex items-center mb-3">
          <Globe className="h-5 w-5 text-[#8B0000] mr-2" />
          <a 
            href={website.startsWith('http') ? website : `https://${website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#8B0000] flex items-center"
          >
            {website.replace(/^https?:\/\/(www\.)?/, '')}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      )}
      
      {Object.keys(socialMedia).length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Follow on social media</h3>
          <div className="flex space-x-3">
            {Object.entries(socialMedia).map(([platform, handle]) => (
              <a 
                key={platform}
                href={`https://${platform}.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#8B0000]"
                title={`@${handle} on ${platform}`}
              >
                {socialIcons[platform] ? (
                  <img src={socialIcons[platform]} alt={platform} className="h-6 w-6" />
                ) : (
                  <span className="text-sm capitalize">{platform}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

BusinessOverview.propTypes = {
  description: PropTypes.string.isRequired,
  cuisineTypes: PropTypes.arrayOf(PropTypes.string),
  priceRange: PropTypes.number,
  phone: PropTypes.string,
  website: PropTypes.string,
  socialMedia: PropTypes.objectOf(PropTypes.string)
};

export default BusinessOverview;