import { motion, AnimatePresence } from "framer-motion";

const TextProgressBadge = ({ 
  currentLength, 
  maxLength, 
  minLength, 
  showTextWhenFull = true 
}) => {
  const percentage = Math.min(100, (currentLength / minLength) * 100);
  
  const size = 20;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const showText = showTextWhenFull && currentLength >= minLength;
  
  const getProgressColor = () => {
    if (currentLength > maxLength) return 'text-destructive';
    if (currentLength >= minLength) return 'text-gray-400';
    return 'text-emerald-500';
  };
  
  return (
    <AnimatePresence mode="wait">
      {showText ? (
        <motion.span
          key="counter"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={`text-gray-400 text-xs ${currentLength > maxLength ? '!text-destructive' : ''}`}
        >
          {currentLength} / {maxLength}
        </motion.span>
      ) : (
        <motion.div 
          key="progress"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          <motion.span 
            className="text-xs text-gray-500"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            {currentLength >= minLength 
              ? `${currentLength}/${minLength}` 
              : `At least ${minLength} characters needed`}
          </motion.span>
          
          {currentLength < minLength && (
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {/* SVG with proper viewBox */}
              <svg 
                width={size} 
                height={size} 
                viewBox={`0 0 ${size} ${size}`} 
                className="overflow-visible"
              >
                {/* Background circle */}
                <circle 
                  cx={size/2} 
                  cy={size/2} 
                  r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth={strokeWidth} 
                  className="text-gray-200" 
                />
                
                {/* Progress circle */}
                <motion.circle 
                  cx={size/2} 
                  cy={size/2} 
                  r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth={strokeWidth} 
                  strokeDasharray={circumference} 
                  strokeLinecap="round" 
                  className={getProgressColor()}
                  transform={`rotate(-90 ${size/2} ${size/2})`}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TextProgressBadge;