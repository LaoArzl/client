import React from "react";
import Header from "../../../Components/Header/Header";
import ImageSlider from "../../../Components/ImageSlider/ImageSlider";
import { ImageSliderData } from "../../../Components/ImageSlider/ImageSliderData";

const Homepage = () => {
  return (
    <>
      <Header />
      <ImageSlider slides={ImageSliderData} />
    </>
  );
};

export default Homepage;
