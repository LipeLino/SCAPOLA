"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="overflow-hidden pt-35 md:pt-40 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2 text-center">
              <h4 className="mt-4 text-lg font-light text-black dark:text-white">
                Assessoria em Relações Públicas e Comunicação
              </h4>
              <h1 className="mb-4 text-6xl font-medium text-black dark:text-white">
                Scapola Comunica                 
              </h1>          
              {/* <div className="mt-10">
                <form>
                  <div className="flex flex-wrap gap-5">
                  </div>
                </form>
              </div> */}
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl">
                <div className="relative text-center">
                  <h4 className="text-3xl font-light mb-4 text-black dark:text-white">
                    Uma marca é feita de histórias,
                  </h4>
                  <h4 className="text-5xl font-light mt-4 text-black dark:text-white">
                    vamos contar a sua?
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/5531996955494"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6"/>
      </a>
    </>
  );
};

export default Hero;
