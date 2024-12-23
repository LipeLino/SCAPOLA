"use client";

import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './sliderStyles.css';

// Custom arrow components with TypeScript props
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow prev-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    aria-label="Previous slide"
  />
);

const CustomNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow next-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    aria-label="Next slide"
  />
);

const Brands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0'
        }
      }
    ]
  };

  return (
    <section className="border border-x-0 mt-10 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <h2 className="text-3xl font-medium text-center mb-14 dark:text-white">
          Clientes Atendidos
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
          <Slider {...settings}>
            {brandData.map((brand) => (
              brand.image && (
                <SingleBrand 
                  key={brand.id} 
                  brand={brand} 
                />
              )
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Brands;