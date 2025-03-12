import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedText = () => {
  const texts = ["sua marca", "seu negócio", "sua carreira", "seu crescimento"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex align-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            scale: 0.9,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(10px)'
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText;