import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const MenuCard = ({ number, name, price, imageUrl, onEdit }) => {
  return (
    <Card className="overflow-hidden bg-pink-50 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">
            {number}. {name}
          </h3>
          <span className="font-medium text-gray-900">${price.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;