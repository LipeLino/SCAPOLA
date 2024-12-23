import React, { useState } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, name, description, id } = brand;
  const [isHovered, setIsHovered] = useState(false);

  // Determine the current color mode (light or dark)
  const isDarkMode = document.body.classList.contains("dark-mode");

  return (
<<<<<<< HEAD
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}
        href={href}
        className="animate_top mx-w-full relative block h-10 w-[98px]"
      >
        <Image
          className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
          src={image}
          alt={name}
          fill
        />
        <Image
          className="hidden opacity-50 transition-all duration-300 hover:opacity-100"
          src={imageLight}
          alt={name}
          fill
        />
      </motion.a>
    </>
=======
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: id }}
      viewport={{ once: true }}
      className={`relative contain flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200' }  w-48 h-48 backdrop-blur transition-opacity duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'contain' }}
      />
      <Image
        className="hidden opacity-65 transition-all duration-300 hover:opacity-100 dark:block"
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'contain' }}
      />
      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm p-2 text-center">
          {description}
        </div>
      )}
    </motion.div>
>>>>>>> origin/main
  );
};

export default SingleBrand;