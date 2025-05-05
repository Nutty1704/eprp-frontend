import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cuisineOptions } from "../../config/Cuisine";

const CuisineFilter = ({ selectedCuisines, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisinesList, setSelectedCuisinesList] = useState([]);
  
  // Parse selected cuisines string to array on component mount
  useEffect(() => {
    if (selectedCuisines) {
      setSelectedCuisinesList(selectedCuisines.split(','));
    } else {
      setSelectedCuisinesList([]);
    }
  }, [selectedCuisines]);
  
  // Filter cuisines based on search term
  const filteredCuisines = cuisineOptions.filter(cuisine => 
    cuisine.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Display only first 5 cuisines if not expanded
  const displayCuisines = expanded ? filteredCuisines : filteredCuisines.slice(0, 5);
  
  // Handle checkbox change
  const handleCheckboxChange = (cuisineId) => {
    let newSelectedCuisines;
    
    if (selectedCuisinesList.includes(cuisineId)) {
      // Remove cuisine if already selected
      newSelectedCuisines = selectedCuisinesList.filter(c => c !== cuisineId);
    } else {
      // Add cuisine if not selected
      newSelectedCuisines = [...selectedCuisinesList, cuisineId];
    }
    
    // Update parent component
    onChange(newSelectedCuisines.join(','));
  };
  
  // Clear all selected cuisines
  const handleClearAll = () => {
    onChange('');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        {selectedCuisinesList.length > 0 && (
          <Button 
            variant="link" 
            className="text-xs p-0 h-auto text-red-500"
            onClick={handleClearAll}
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="relative mb-3">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cuisines"
          className="pr-8"
        />
        <Search className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        {displayCuisines.map((cuisine) => (
          <div key={cuisine.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`cuisine-${cuisine.id}`} 
              checked={selectedCuisinesList.includes(cuisine.id)}
              onCheckedChange={() => handleCheckboxChange(cuisine.id)}
            />
            <Label 
              htmlFor={`cuisine-${cuisine.id}`}
              className="text-sm cursor-pointer"
            >
              {cuisine.label}
            </Label>
          </div>
        ))}
        
        {filteredCuisines.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs mt-1 flex items-center justify-center"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}
        
        {filteredCuisines.length === 0 && (
          <p className="text-sm text-gray-500 py-1">No cuisines found</p>
        )}
      </div>
    </div>
  );
};

export default CuisineFilter;