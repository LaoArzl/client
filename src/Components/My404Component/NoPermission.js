import React from "react";
import { Link } from "react-router-dom";
import "./My404Component.css";

const NoPermission = () => {
  return (
    <div>
      <div className="my404component">
        <div className="errorcomponent-wrapper">
          <div className="error404message">
            <h2>Oops! Access Denied</h2>
            <p>
              You are not allowed to access this page. Please Log in with
              authorize account. <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPermission;
