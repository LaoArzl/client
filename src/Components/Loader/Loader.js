import React from "react";
import "./Loader.css";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="div-loader-spinner-wrapper">
        <PulseLoader color={`#0464fc`} size={5} loading />
      </div>
    </>
  );
};

export default Loader;
