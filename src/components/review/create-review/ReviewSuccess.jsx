import React, { useState } from 'react';
import { motion } from "motion/react";
import { Check } from "lucide-react";

const ReviewSuccess = ({
    message,
    waitDuration = 2000
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
                        backgroundPosition: "124% 50%"
                    }}
                    transition={{
                        duration: 6,
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
            </div>
        </div>
    );
};

export default ReviewSuccess;