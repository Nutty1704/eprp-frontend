import { motion } from 'framer-motion';

const WavyBackground = ({
  className,
  animationDuration = 30, // Slower duration for background
  backgroundImageUrl = '/assets/flow-wave.svg', // Make path configurable
  backgroundSize = "auto 100%",
  ...props // Pass any other motion.div props
}) => {
  // Ensure the background image path is correct.
  // If '/assets/' is in your 'public' folder, this should work.
  // Otherwise, you might need to import the image if using a bundler like Vite/Webpack.

  return (
    <motion.div
      initial={{
        backgroundPosition: "0% 50%"
      }}
      animate={{
        // Animate to -200% or 200% to ensure seamless loop with repeat-x
        backgroundPosition: "200% 50%"
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: backgroundSize,
        backgroundRepeat: "repeat-x"
      }}
      // Combine default classes with any passed className
      className={`w-full h-full ${className || ''}`}
      {...props} // Spread remaining props
    />
  );
};

export default WavyBackground;