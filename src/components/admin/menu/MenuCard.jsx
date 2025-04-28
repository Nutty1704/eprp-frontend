import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';

const MenuCard = ({ number, name, price, imageUrl, onEdit, onDelete }) => {
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
          <h3 className="font-medium text-gray-900 truncate">
            {number}. {name}
          </h3>
          <div className='flex items-center gap-2'>
            <span className="font-medium text-gray-900">${price.toFixed(2)}</span>
            <Trash2 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;