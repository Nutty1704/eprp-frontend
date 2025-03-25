import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { cuisineOptions } from "../../types/cuisineoptions";
import { Alert, AlertDescription } from "../ui/alert";

const CuisineSelector = ({ selectedCuisines = [], onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter cuisines based on search term
  const filteredCuisines = cuisineOptions.filter(cuisine => 
    cuisine.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle checkbox change
  const handleCuisineToggle = (cuisineId) => {
    if (selectedCuisines.includes(cuisineId)) {
      // Remove if already selected
      onChange(selectedCuisines.filter(id => id !== cuisineId));
    } else {
      // Add if not selected
      onChange([...selectedCuisines, cuisineId]);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuisines</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription>
            Did we miss out on a cuisines you offer? Let us know by sending a support inquiry.
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
        
        <ScrollArea className="h-64 rounded-md border p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCuisines.map((cuisine) => (
              <div key={cuisine.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cuisine-${cuisine.id}`} 
                  checked={selectedCuisines.includes(cuisine.id)}
                  onCheckedChange={() => handleCuisineToggle(cuisine.id)}
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
                <div key={cuisine.id} className="bg-red-100 text-red-800 text-xs rounded-full px-3 py-1">
                  {cuisine.label}
                </div>
              ) : null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CuisineSelector;