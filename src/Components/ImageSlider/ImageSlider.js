import React, { useState } from "react";
import { ImageSliderData } from "./ImageSliderData";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const nextArrow = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevArrow = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <>
      <div className="image-slider">
        <div className="arrow-left-container arrow-arrow" onClick={prevArrow}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="arrow-right-container arrow-arrow" onClick={nextArrow}>
          <i className="fas fa-chevron-right"></i>
        </div>
        {ImageSliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <>
                  <img src={slide.image} alt="Cover" className="image" />
                  <div className="indicator">{slide.indicator}</div>
                  <div className="school-slider-name">
                    <h2>{slide.title}</h2>
                    <p>{slide.subTitle}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageSlider;
