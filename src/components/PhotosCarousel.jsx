"use client";
import React from "react";
import "react-photo-view/dist/react-photo-view.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import leftIcon from "public@/leftIcon.svg";
import rightIcon from "public@/rightIcon.svg";


const PhotosCarousel = ({ photos }) => {
  const PhotosArray =
    photos.length < 4
      ? Array.from({ length: 2 }, (_, i) => photos[i % photos.length])
      : photos;

  const customArrowClass =
    "!p-2 z-10 !bg-black rounded-full !size-8 opacity-70 !text-black";
  const CustomLeftArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        onClick={onClick}
        className={`${className} ${customArrowClass} !left-4 !pl-1.5`}
        style={{ ...style, display: "block" }}
        src={leftIcon}
        alt="Left icon svg"
      />
    );
  };

  const CustomRightArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        onClick={onClick}
        className={`${className} ${customArrowClass} !right-4 !pr-1.5`}
        style={{ ...style, display: "block" }}
        src={rightIcon}
        alt="Right icon svg"
      />
    );
  };

  const settings = {
    arrows: false,
    nextArrow: <CustomRightArrow />,
    prevArrow: <CustomLeftArrow />,
  };

  return (
    <PhotoProvider maskOpacity={0.5}>
      <div className="flex w-full md:w-1/2">
        <Slider
          {...settings}
          className="h-72 md:h-[36vh]  lg:h-[52vh] overflow-hidden"
          autoplaySpeed={4000}
          autoplay={true}
          swipeToSlide={true}
        >
          {PhotosArray.map((photo, index) => (
            <div
              key={index}
              className={`cursor-pointer pb-3 h-72 md:h-[36vh] lg:h-[52vh] w-full`}
            >
              <PhotoView key={photo} src={photo}>
                <img
                  className="object-contain rounded-md w-full h-full"
                  src={photo}
                  alt={`imagem ${index}`}
                />
              </PhotoView>
            </div>
          ))}
        </Slider>
      </div>
    </PhotoProvider>
  );
};

export default PhotosCarousel;
