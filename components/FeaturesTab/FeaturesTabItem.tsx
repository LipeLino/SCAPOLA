import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, desc3, image, linkedin } = featureTab;

  return (
    <div className="bg-white dark:bg-blacksection shadow-solid-5 dark:shadow-solid-6 rounded-lg overflow-hidden">
      <div className="relative w-fitt h-64 md:h-96 rounded-t-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-medium text-black dark:text-white">
          {title}
        </h2>
        <p className="mb-4">{desc1}</p>
        <p className="mb-4">{desc2}</p>
        <p className="mb-4">{desc3}</p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 mr-2" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

export default FeaturesTabItem;