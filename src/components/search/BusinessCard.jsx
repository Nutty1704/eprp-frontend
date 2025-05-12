import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const BusinessCard = ({ business, onClick }) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-row"
      onClick={() => onClick(business._id)}
    >
      <div className="w-1/4 overflow-hidden bg-gray-100">
        {/* Using local temp image as placeholder */}
        <img 
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{business.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">
              {business.rating ? business.rating.toFixed(1) : 'New'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({business.review_count || 0} reviews)
          </span>
        </div>
        
        {business.cuisines && business.cuisines.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {business.cuisines.slice(0, 3).map((cuisine, idx) => (
              <span 
                key={idx} 
                className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
              >
                {cuisine}
              </span>
            ))}
            {business.cuisines.length > 3 && (
              <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
                +{business.cuisines.length - 3}
              </span>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-1">
          {business.description || 'No description available'}
        </p>
        
        <div className="text-sm text-gray-600">
          {business.address}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;