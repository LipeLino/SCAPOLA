"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from 'react';
import AnimatedText from './animatedtext'; 

interface Podcast {
  id: number;
  title: string;
  image: string;
  link: string;
  alt: string;
}

const About = () => {
  const podcasts: Podcast[] = [
    {
      id: 1,
      title: "Unishop - Papo Limpo Podcast #13",
      image: "/images/podcast/papo_limpo_13.jpeg",
      link: "https://www.youtube.com/watch?v=zTIsD0JrGaQ",
      alt: "Podcast 1"
    },
    {
      id: 2,
      title: "AlumeCast - Empreendedorismo",
      image: "/images/podcast/alumecast_.jpeg",
      link: "https://www.youtube.com/watch?v=3RflyS9cl1E",
      alt: "Podcast 2" 
    }
  ];

  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30 pt-14">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5 justify-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right"
            >
              <h2 className="relative mb-6 text-4xl font-medium text-black dark:text-white">
                Soluções inteligentes para <br />
                <span className="text-center inline-block mt-1">
                    <AnimatedText />
                </span>
              </h2>
              <p>
                Visibilidade Orgânica e Conexões Estratégicas sob medida, <br />
                Consultoria e Assessoria de Ponta a Ponta.
              </p>

              {["Sua demanda", "Solução artesanal"].map((title, index) => (
                <div className="mt-7.5 flex items-center gap-5" key={index}>
                  <div className="flex h-15 w-15 items-center justify-center rounded-full border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle2 font-semibold text-black dark:text-white">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                      {title}
                    </h3>
                    <p>{index === 0 ? "Recebemos sua demanda com um olhar humano." : "Construimos a melhor estratégia para a sua marca."}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* <!-- ===== Podcasts Section Start ===== --> */}
      <div className="text-center mb-12">
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
            Conversas que transformam
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Nossas presenças em podcasts
          </p>
        </motion.div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* First podcast card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="animate_top z-40 rounded-lg border border-white bg-white p-4 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark"
        >
          <div className="overflow-hidden rounded-lg mb-4">
            <Image 
              src={podcasts[0].image} 
              width={400} 
              height={250} 
              alt={podcasts[0].alt}
              className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="px-2">
            <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
              {podcasts[0].title}
            </h3>
            <a
              href={podcasts[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
              aria-label={`Assistir ${podcasts[0].title}`}
            >
              <span className="duration-300 group-hover:pr-2">Assistir</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Featured center card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="animate_top z-40 rounded-lg border border-white bg-white p-4 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark 
          md:col-span-2 row-span-2 transform scale-105 border-primary/20 flex items-center"
        >
          <Image 
            src="/images/podcast/top_voice.png" 
            width={800} 
            height={500} 
            alt="Featured Podcast" className="rounded-lg w-full h-full object-cover"
          />
        </motion.div>

        {/* Second podcast card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="animate_top z-40 rounded-lg border border-white bg-white p-4 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark"
        >
          <div className="overflow-hidden rounded-lg mb-4">
            <Image 
              src={podcasts[1].image} 
              width={400} 
              height={250} 
              alt={podcasts[1].alt}
              className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="px-2">
            <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
              {podcasts[1].title}
            </h3>
            <a
              href={podcasts[1].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
              aria-label={`Assistir ${podcasts[1].title}`}
            >
              <span className="duration-300 group-hover:pr-2">Assistir</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;