import { motion, HTMLMotionProps } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, name, description, id } = brand;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      {...({
        variants: {
          hidden: {
            opacity: 0,
            y: -20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        },
        initial: "hidden",
        whileInView: "visible",
        transition: { duration: 1, delay: id * 0.1 },
        viewport: { once: true },
        className: "relative flex items-center justify-center p-2 bg-slate-100 h-36 sm:h-28 lg:h-48 hover:shadow-lg transition-shadow duration-300 rounded-lg mx-2",
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        //whileHover: { scale: 1.01 },
        tabIndex: 0,
        "aria-label": `Brand: ${name}`,
        onFocus: () => setIsHovered(true),
        onBlur: () => setIsHovered(false),
      } as HTMLMotionProps<"div">)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          className="transition-all duration-300 p-4"
          src={image}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      {isHovered && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-black/80 text-white flex items-center justify-center text-center rounded-b-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-sm px-2 p-1 font-bold">{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SingleBrand;