/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Clock, Tag, ShoppingBag } from 'lucide-react'; // Using lucide-react for icons

// Helper function to format the discount display
const formatDiscount = (type, value) => {
  switch (type) {
    case 'PERCENTAGE':
      return `${value}% OFF`;
    case 'FIXED_AMOUNT':
      return `$${value} OFF`;
    case 'BOGO':
      return 'Buy 1 Get 1 FREE';
    case 'FREE_ITEM':
      return 'FREE Item';
    case 'SET_MENU':
      return 'Special Set Menu';
    default:
      return 'Special Offer';
  }
};

// Helper to format dates (basic example)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const DealCouponCard = ({ deal }) => {
  if (!deal) return null;

  const businessPageLink = `/business/${deal.business_id._id}`;

  return (
    // Wrap the entire card content with the Link component
    <Link
      to={businessPageLink}
      className="block h-full transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02]" // Added hover effects
      aria-label={`View details for deal: ${deal.title} at ${deal.businessName || deal.business_id?.name}`}
    >
      <div className="bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-50 p-1.5 shadow-lg rounded-lg h-full flex flex-col border-2 border-dashed border-amber-400 relative overflow-hidden">
        {/* Decorative circles for coupon effect */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-2 border-dashed border-amber-400"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-2 border-dashed border-amber-400"></div>

        <div className="bg-white rounded-md p-4 flex-grow flex flex-col justify-between h-full">
          <div>
            <div className="mb-3">
              <span className="inline-block bg-red-500 text-white text-sm sm:text-base font-bold px-4 py-1.5 rounded-md shadow-md">
                {formatDiscount(deal.type, deal.discountValue)}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 leading-tight">
              {deal.title}
            </h3>

            {/* Use deal.business_id.name if deal.businessName is not explicitly passed */}
            {(deal.businessName || deal.business_id?.name) && (
              <p className="text-xs sm:text-sm text-amber-700 font-medium mb-2 flex items-center">
                <ShoppingBag size={14} className="mr-1.5 opacity-80" />
                {deal.businessName || deal.business_id.name}
              </p>
            )}

            {deal.description && (
              <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-snug line-clamp-2">
                {deal.description}
              </p>
            )}
          </div>

          <div className="mt-auto border-t border-dashed border-gray-300 pt-3">
            {deal.appliesTo && (
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <Tag size={14} className="mr-1.5 opacity-70" />
                Applies to: {deal.appliesTo}
              </p>
            )}
            <p className="text-xs text-gray-500 flex items-center">
              <Clock size={14} className="mr-1.5 opacity-70" />
              Valid until: {formatDate(deal.endDate)}
            </p>
            {deal.promoCode && (
              <p className="mt-2 text-center text-xs sm:text-sm font-mono tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded py-1 px-2">
                CODE: {deal.promoCode}
              </p>
            )}
            {/* If using redemptionInfo instead of promoCode and it's more relevant:
            {deal.redemptionInfo && !deal.promoCode && ( 
             <p className="mt-2 text-center text-xs sm:text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded py-1 px-2">
               {deal.redemptionInfo}
             </p>
            )}
            */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCouponCard;