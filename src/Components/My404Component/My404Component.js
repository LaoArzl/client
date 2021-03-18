import React from "react";
import { Link } from "react-router-dom";
import "./My404Component.css";
import Error from "./error.svg";

const My404Component = () => {
  return (
    <div>
      <div className="my404component">
        <div className="errorcomponent-wrapper">
          <img src={Error} alt="404" />
          <div className="error404message">
            <h2>Oops! Page not Found</h2>
            <p>
              Sorry but we could not find the page you are looking.{" "}
              <Link to="/">Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My404Component;
