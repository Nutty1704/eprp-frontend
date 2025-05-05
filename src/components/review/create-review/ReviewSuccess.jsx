import React, { useState } from 'react';
import { motion } from "motion/react";
import { Check } from "lucide-react";

const ReviewSuccess = ({
    message,
    waitDuration = 2000,
    business,
    reviewData
}) => {
    const [ isReversed, setIsReversed ] = useState(false);

    return (
        <div
            className="relative flex flex-col items-center justify-around text-center p-6 rounded-lg text-white overflow-hidden"
        >

            <motion.div
                className="absolute bottom-0 left-0 right-0 z-10"
                initial={{ height: 0 }}
                animate={isReversed ? { height: 0 } : { height: "102%" }}
                transition={{
                    duration: 1,
                    ease: "easeOut"
                }}
                onAnimationComplete={() => {
                    setTimeout(() => setIsReversed((prev) => !prev), waitDuration);
                }}
            >
                <motion.div
                    initial={{
                        backgroundPosition: "0% 50%"
                    }}
                    animate={{
                        backgroundPosition: "200% 50%"
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundImage: "url('/assets/flow-wave.svg')",
                        backgroundSize: "auto 100%",
                        backgroundRepeat: "repeat-x"
                    }}
                    className='w-full h-full'
                />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-16">
                <Check className="h-64 w-64" />
                <h3 className="text-2xl inter-semibold">
                    {message}
                </h3>

                <div className="mt-4 bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-white mb-3 text-sm">Share your review:</p>
                    <SocialMediaShare 
                        business={business}
                        reviewText={reviewData?.reviewText}
                        rating={reviewData?.foodRating}
                        iconSize={36}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewSuccess;