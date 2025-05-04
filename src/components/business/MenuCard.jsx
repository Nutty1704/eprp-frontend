import React from "react";

const MenuCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="h-48 relative">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 p-3 border-t">
        <h3 className="font-medium text-base truncate">
          {item.name}
        </h3>
        <p className="text-right font-medium">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export { MenuCard };