import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SortOptions = ({ sortOption, onChange }) => {
  // Sort options
  const options = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'review_count', label: 'Most Reviewed' },
    { value: 'createdAt', label: 'Newest' },
    { value: '-createdAt', label: 'Oldest' }
  ];
  
  return (
    <div>
      <Label className="text-base font-medium mb-3 block">Sort By</Label>
      
      <RadioGroup
        value={sortOption}
        onValueChange={onChange}
        className="space-y-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem id={`sort-${option.value}`} value={option.value} />
            <Label 
              htmlFor={`sort-${option.value}`}
              className="text-sm cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SortOptions;