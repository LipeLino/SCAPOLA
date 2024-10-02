import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const texts = ["Sua Marca", "Seu Negócio", "Sua Carreira", "Seu Crescimento"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark animate-fadeInOut">
      {texts[currentIndex]}
    </span>
  );
};

export default AnimatedText;