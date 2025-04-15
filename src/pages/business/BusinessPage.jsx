import React from 'react'
import businesses from '@/test_data/businesses.json'
import BusinessHeader from '@/src/components/business/business_page/BusinessHeader';
import { useParams } from 'react-router-dom';
import BusinessInfoSection from '@/src/components/business/business_page/BusinessInfoSection';
import ReviewDeck from '@/src/components/review/ReviewDeck';

const BusinessPage = () => {
    const { id } = useParams();
    const business = businesses.find(b => b._id === id);

  return (
      <div className='flex flex-col'>
          <BusinessHeader business={business} />
          <BusinessInfoSection business={business} />
          <ReviewDeck reviews={[]} />
      </div>
  )
}

export default BusinessPage
