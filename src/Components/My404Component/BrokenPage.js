import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./BrokenPage.css";
import { BarLoader } from "react-spinners";

const BrokenPage = () => {
  const [toLogin, setToLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setToLogin(true), 3000);
  }, []);
  return (
    <>
      {toLogin ? (
        <Redirect to="/" />
      ) : (
        <div className="broken-page-wrapper">
          <BarLoader color={`#2ab56f`} width={`100%`} height={4} loading />
        </div>
      )}
    </>
  );
};

export default BrokenPage;
