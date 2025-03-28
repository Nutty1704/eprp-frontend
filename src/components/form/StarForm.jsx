import { Star } from "lucide-react";
import React, { useState } from "react";

const StarForm = ({
  onChange = (value) => {},
  size=24,
  strokeWidth=1.5,
  error,
  disabled = false,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            strokeWidth={strokeWidth}
            className={`cursor-pointer text-primary transition-all ${
              (hover || rating) >= star && "fill-primary"
            }`}
            onClick={() => !disabled && handleClick(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
          />
        ))}
      </div>
      {error && <span className="text-destructive text-xs">{error.message}</span>}
    </div>
  );
};

export default StarForm;
