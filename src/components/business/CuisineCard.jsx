import React from 'react';
import { Link } from 'react-router-dom';

const CuisineCard = ({ name, spots, image }) => {
  return (
    <Link 
      to={`/cuisine/${name.toLowerCase()}`} 
      className="flex-shrink-0 group"
    >
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-3 transition transform group-hover:scale-105">
        <img 
          src={image} 
          alt={`${name} cuisine`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="font-medium rubik-bold text-gray-900 group-hover:text-red-600">{name}</h3>
        <p className="text-sm text-gray-600 inter-regular">({spots} {spots === 1 ? 'spot' : 'spots'})</p>
      </div>
    </Link>
  );
};

export default CuisineCard;