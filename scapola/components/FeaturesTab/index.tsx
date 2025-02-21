"use client";
import React from "react";
import FeaturesTabItem from "./FeaturesTabItem";
import featuresTabData from "./featuresTabData"; // Ensure correct import
import { motion } from "framer-motion";

const FeaturesTab = () => {
  if (!Array.isArray(featuresTabData)) {
    console.error("featuresTabData is not an array");
    return null; // or some other error handling
  }

  return (
    <section className="relative pb-24 pt-24 lg:pb-32 lg:pt-32">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="text-center mb-16">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-4">
              Nossa equipe
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              sempre prontos para trazer o melhor para você
            </p>
          </motion.div>
        </div>
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
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5"
        >
          {featuresTabData.map((feature, key) => (
            <FeaturesTabItem featureTab={feature} key={key} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesTab;