import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"; 

const MenuDialog = ({ restaurant, trigger }) => {
  if (!restaurant || !restaurant.menuItems) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h2 className="text-3xl font-bold text-center mt-7 mb-2 rubik-bold">
                {<>FOOD <span className='!text-primary'>MENU</span></>}
            </h2>
            <p className="text-center text-gray-600 inter-regular mb-7">Browse our delicious menu!</p>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menuItems.map((item, index) => (
            <div key={index} className="border rounded-md overflow-hidden ">
              <div className="h-48 relative">
                {
                  // <img 
                  //   src={item.imageUrl} 
                  //   alt={item.name}
                  //   className="w-full h-full object-cover"
                  // />
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  </div>
                }
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};


export { MenuDialog };