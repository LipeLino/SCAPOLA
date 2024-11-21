import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, desc3, image, imageDark, linkedin } = featureTab;

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
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="block mt-5">
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="mx-auto md:mx-0" />
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
