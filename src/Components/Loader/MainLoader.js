import React from "react";
import "./MainLoader.css";
import { BarLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="main-loader-spinner-wrapper">
        <BarLoader color={`#2ab56f`} width={`100%`} height={4} loading />
      </div>
    </>
  );
};

export default Loader;
