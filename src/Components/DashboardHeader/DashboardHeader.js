import React, { useContext } from "react";
import "./DashboardHeader.css";
import Logo from "./logo.png";
import { LogoutContext } from "../../ContextFiles/LogoutContext";
import Axios from "axios";

const DashboardHeader = () => {
  const [logout, setLogout] = useContext(LogoutContext);
  const logoutMenu = () => {
    setLogout(!logout);
  };

  const submitLogout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      if (response) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-wrapper">
        <div className="dashboard-spanner-left">
          <img src={Logo} alt="logo" />
          <h2>ECPLC</h2>
        </div>
        <div className="dashboard-spanner-right">
          <div className="dashboard-header-help">
            <i className="far fa-question-circle"></i>Help
          </div>
          <div className="middle-separator"></div>
          <div onClick={logoutMenu} className="dashboard-admin-profile">
            <div className="dashboard-header-profile">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="dashboard-header-profile-name">
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={
                logout
                  ? "administrator-div-after"
                  : "administrator-div-after-hidden "
              }
            >
              <span className="dashboard-profile-span1">
                <p>
                  <i className="fas fa-user-circle"></i>Profile
                </p>
              </span>
              <span onClick={submitLogout} className="dashboard-profile-span2">
                <p>
                  <i className="fas fa-sign-out-alt"></i>Logout
                </p>
              </span>
            </div>
          </div>
        </div>
        {/* <i className="far fa-question-circle"></i> Help */}
      </div>
    </div>
  );
};

export default DashboardHeader;
