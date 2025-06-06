import React, { useEffect } from 'react'
import BusinessHeader from '@/src/components/business/business_page/BusinessHeader';
import { useParams } from 'react-router-dom';
import BusinessInfoSection from '@/src/components/business/business_page/BusinessInfoSection';
import ReviewDeck from '@/src/components/review/ReviewDeck';
import { useGetBusinessById } from '@/src/lib/api/MyBusinessApi';
import { toast } from 'sonner';

const BusinessPage = () => {
    const { id } = useParams();
    const { business, isLoading, error } = useGetBusinessById(id);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className='flex flex-col'>
            {
                (business && !isLoading)
                    ? (<BusinessHeader business={business} />)
                    : (<BusinessHeader.Skeleton />)
            }
            {
                (business && !isLoading)
                ? <BusinessInfoSection business={business} />
                : <BusinessInfoSection.Skeleton />
            }
            <ReviewDeck businessId={id} business={business} />
        </div>
    )
}

export default BusinessPage
