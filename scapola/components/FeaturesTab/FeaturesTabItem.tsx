import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, desc3, image, linkedin } = featureTab;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-19">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="mb-7 text-3xl font-medium text-black dark:text-white xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-5">{desc1}</p>
          <p className="w-11/12 mx-auto md:mx-0">{desc2}</p>
          <p className="mt-5 w-11/12 mx-auto md:mx-0">{desc3}</p>
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
        <div className="md:w-1/2">
          <Image
            src={image}
            alt={title}
            layout="responsive"
            width={500}
            height={300}
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;