import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./BrokenPage.css";
import { PuffLoader } from "react-spinners";

const BrokenPage = () => {
  const [toLogin, setToLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setToLogin(true), 2000);
  }, []);
  return (
    <>
      {toLogin ? (
        <Redirect to="/login" />
      ) : (
        <div className="broken-page-wrapper">
          <PuffLoader color={`#0D8B33`} size={45} loading />
        </div>
      )}
    </>
  );
};

export default BrokenPage;
