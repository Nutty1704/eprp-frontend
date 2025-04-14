import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const contentVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      overflow: 'hidden',
      padding: '0px 16px'
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      overflow: 'visible',
      padding: '16px 16px',
      transition: { 
        height: { 
          duration: 0.3,
          ease: "easeInOut" 
        },
        opacity: { 
          duration: 0.25,
          delay: 0.05 
        }
      }
    }
  };

  return (
    <div className="border rounded-xl mb-4 overflow-hidden">
      <button
        type="button" // Prevent form submission
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 transition-colors"
      >
        <span className="text-base font-medium text-gray-800">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <motion.div
        className="bg-white"
        initial={isOpen ? "visible" : "hidden"}
        animate={isOpen ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}