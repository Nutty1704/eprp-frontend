import React from 'react';
import { Utensils, SmilePlus, Lamp, Star } from 'lucide-react';

export const reviewIcons = {
  overall: <Star className='inline-block h-5 w-5 text-primary mr-1' />,
  food: <Utensils className="inline-block h-5 w-5 text-primary mr-1" />,
  service: <SmilePlus className="inline-block h-5 w-5 text-primary mr-1" />,
  ambience: <Lamp className="inline-block h-5 w-5 text-primary mr-1" />
};
