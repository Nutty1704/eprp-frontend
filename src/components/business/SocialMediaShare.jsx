import React from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'

const SocialMediaShare = ({ 
  business, 
  reviewText = '', 
  rating = 0,
  iconSize = 32,
}) => {
  const url = `http://localhost:5173/business/${business?.id || ''}`;
  const hashtags = ['foodreview', 'dining'];
  
  const getShareText = () => {
    if (reviewText) {
      return `${reviewText}. I'd give ${rating}/5 stars for ${business?.name}!`;
    }
    return `Check out ${business?.name} on Taste Monash food review platform!`;
  };
  
  return (
    <div className="flex items-center gap-2">
    <FacebookShareButton url={url} hashtag={getShareText()}>
      <FacebookIcon size={iconSize} round />
    </FacebookShareButton>
    
    <TwitterShareButton url={url} title={getShareText()} hashtags={hashtags}>
      <TwitterIcon size={iconSize} round />
    </TwitterShareButton>
    
    <WhatsappShareButton url={url} title={getShareText()}>
      <WhatsappIcon size={iconSize} round />
    </WhatsappShareButton>
  </div>
  );
};

export default SocialMediaShare;