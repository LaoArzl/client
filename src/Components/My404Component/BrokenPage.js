import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const BrokenPage = () => {
  const [toLogin, setToLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setToLogin(true), 2000);
  }, []);
  return <>{toLogin ? <Redirect to="/login" /> : <h2>Redirecting</h2>}</>;
};

export default BrokenPage;
