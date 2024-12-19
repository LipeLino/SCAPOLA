"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './sliderStyles.css'; // Import your custom CSS file

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-blue-500`} // Tailwind class for blue color
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-blue-500`} // Tailwind class for blue color
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const Brands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
        <h2 className="text-3xl font-medium text-center mb-14">Clientes Atendidos</h2>
        <Slider {...settings}>
          {brandData.map((brand, key) => (
            // Check if the brand has an image before rendering
            brand.image ? (
              <SingleBrand brand={brand} key={key} />
            ) : null
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Brands;