import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, desc3, image, imageDark, linkedin } = featureTab;

  return (
    <>
      <div className="flex items-center gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h2 className="mb-7 text-3xl font-medium text-black dark:text-white xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-5">{desc1}</p>
          <p className="w-11/12">{desc2}</p>
          <p className="mt-5 w-11/12">{desc3}</p>
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
        <div className="relative mx-auto hidden aspect-[562/366] max-w-[550px] md:block md:w-1/2">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      </div>
    </>
  );
};

const featuresTabData: FeatureTab[] = [
  {
    id: "tabOne",
    title: "Rodrigo Scapolatempore",
    desc1: `Sócio-fundador`,
    desc2: ``,
    desc3: ``,
    image: "/images/features/rodrigo.png",
    imageDark: "/images/features/rodrigo.png",
    linkedin: "https://www.linkedin.com/in/rodrigo-scapolatempore/"
  },
  {
    id: "tabTwo",
    title: "Alexandre Diniz",
    desc1: `Coodernador de Relações Públicas e Conteúdo`,
    desc2: ``,
    desc3: ``,
    image: "/images/features/alexandre.png",
    imageDark: "/images/features/alexandre.png",
    linkedin: "https://www.linkedin.com/in/alexandre-diniz/"
  },
  {
    id: "tabThree",
    title: "Samira Batalha",
    desc1: `Executiva de atendimento de Relações Públicas`,
    desc2: ``,
    desc3: ``,
    image: "/images/features/samira.png",
    imageDark: "/images/features/samira.png",
    linkedin: "https://www.linkedin.com/in/samira-batalha/"
  },
  
];

export default featuresTabData;
