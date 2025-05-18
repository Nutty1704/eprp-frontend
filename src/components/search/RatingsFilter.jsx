import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from 'lucide-react';

const RatingsFilter = ({ minRating, onChange }) => {
  // Convert minRating to number to ensure correct comparison
  const currentRating = Number(minRating);
  
  // Handle radio option change
  const handleRatingChange = (value) => {
    onChange(Number(value));
  };
  
  // Generate stars for display
  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < count 
              ? "fill-yellow-400 text-yellow-400" 
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ));
  };
  
  return (
    <div>    
      <RadioGroup
        value={String(currentRating)}
        onValueChange={handleRatingChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="rating-all" value="0" />
          <Label htmlFor="rating-all" className="text-sm flex items-center cursor-pointer">
            All Ratings
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="rating-4" value="4" />
          <Label htmlFor="rating-4" className="text-sm flex items-center cursor-pointer">
            <div className="flex mr-1">{renderStars(4)}</div>
            <span className="ml-1">& up</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="rating-3" value="3" />
          <Label htmlFor="rating-3" className="text-sm flex items-center cursor-pointer">
            <div className="flex mr-1">{renderStars(3)}</div>
            <span className="ml-1">& up</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="rating-2" value="2" />
          <Label htmlFor="rating-2" className="text-sm flex items-center cursor-pointer">
            <div className="flex mr-1">{renderStars(2)}</div>
            <span className="ml-1">& up</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="rating-1" value="1" />
          <Label htmlFor="rating-1" className="text-sm flex items-center cursor-pointer">
            <div className="flex mr-1">{renderStars(1)}</div>
            <span className="ml-1">& up</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RatingsFilter;