import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface PartnerLogo {
  src: string;
  alt: string;
  href: string;
}

interface AnimatedPartnerLogoProps {
  logos: PartnerLogo[];
}

const AnimatedPartnerLogo: React.FC<AnimatedPartnerLogoProps> = ({ logos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="w-[150px] h-[50px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <Link href={logos[currentIndex].href} target="_blank" legacyBehavior>
            <a>
              <Image
                src={logos[currentIndex].src}
                alt={logos[currentIndex].alt}
                width={150}
                height={60}
                className="partner-logo object-contain"
                style={{ width: '100%', height: '100%' }}
              />
            </a>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedPartnerLogo;