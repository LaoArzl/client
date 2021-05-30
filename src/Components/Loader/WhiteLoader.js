import React from "react";
import "./Loader.css";
import { PulseLoader } from "react-spinners";

const WhiteLoader = () => {
  return (
    <>
      <div className="div-loader-spinner-wrapper">
        <PulseLoader color={`#fff`} size={8} margin={2} loading />
      </div>
    </>
  );
};

export default WhiteLoader;
