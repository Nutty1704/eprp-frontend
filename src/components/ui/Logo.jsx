import React from 'react';


const Logo = ({ className = '', theme = 'light' }) => {
  const logoUrl = theme === 'dark' || theme === 'red' 
    ? "https://res.cloudinary.com/dazd4lwcs/image/upload/v1746766476/logo_cropped_2_red_lwgayd.png"
    : "https://res.cloudinary.com/dazd4lwcs/image/upload/v1746765509/logo_cropped_2_d6pwem.png"; 

  return (
    <div className={`relative ${className}`}>
      <img
        src={logoUrl}
        alt="TM Logo"
        className="w-full h-full object-contain"
        style={{ minWidth: '120px' }}
      />
    </div>
  );
};

export default Logo;