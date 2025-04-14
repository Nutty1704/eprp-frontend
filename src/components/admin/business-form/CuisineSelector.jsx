import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cuisineOptions } from "@/src/config/Cuisine";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CuisineSelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { control, formState: { errors }, setValue, watch } = useFormContext();
  
  // Get the current value of cuisines from the form
  const selectedCuisines = watch("cuisines") || [];
  
  // Filter cuisines based on search term
  const filteredCuisines = cuisineOptions.filter(cuisine => 
    cuisine.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle checkbox change
  const handleCuisineToggle = (cuisineId) => {
    let newCuisines;
    
    if (selectedCuisines.includes(cuisineId)) {
      // Remove if already selected
      newCuisines = selectedCuisines.filter(id => id !== cuisineId);
    } else {
      // Add if not selected
      newCuisines = [...selectedCuisines, cuisineId].sort();
    }
    
    // Update form value with validation
    setValue("cuisines", newCuisines, { shouldValidate: true });
  };
  
  return (
    <div>
      <div>
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription>
            Did we miss out on a cuisine you offer? Let us know by sending a support inquiry.
          </AlertDescription>
        </Alert>
        <div className="mb-4">
          <Input
            placeholder="Search cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          Selected: {selectedCuisines.length} cuisines
        </div>
        
        {errors.cuisines && (
          <div className="text-sm text-red-500 mb-2">
            {errors.cuisines.message}
          </div>
        )}
        
        <ScrollArea className={`h-64 rounded-md border p-4 ${errors.cuisines ? 'border-red-500' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCuisines.map((cuisine) => (
              <div key={cuisine.id} className="flex items-center space-x-2">
                <Controller
                  name={`cuisines.${cuisine.id}`} // Using a unique path for each checkbox
                  control={control}
                  defaultValue={selectedCuisines.includes(cuisine.id)}
                  render={({ field }) => (
                    <Checkbox 
                      id={`cuisine-${cuisine.id}`} 
                      checked={selectedCuisines.includes(cuisine.id)}
                      onCheckedChange={() => handleCuisineToggle(cuisine.id)}
                    />
                  )}
                />
                <Label 
                  htmlFor={`cuisine-${cuisine.id}`}
                  className="text-sm cursor-pointer"
                >
                  {cuisine.label}
                </Label>
              </div>
            ))}
            
            {filteredCuisines.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-4">
                No cuisines found matching "{searchTerm}"
              </div>
            )}
          </div>
        </ScrollArea>
        
        {selectedCuisines.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCuisines.map(cuisineId => {
              const cuisine = cuisineOptions.find(c => c.id === cuisineId);
              return cuisine ? (
                <div key={cuisine.id} className="bg-gray-200 font-medium text-xs rounded-full px-3 py-1">
                  {cuisine.label}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineSelector;