import React, { useContext, useEffect, useState } from "react";
import "./DashboardHeader.css";
import Logo from "./logo.png";
import { LogoutContext } from "../../ContextFiles/LogoutContext";
import { LoginContext } from "../../ContextFiles/LoginContext";
import Axios from "axios";

const DashboardHeader = () => {
  const [logout, setLogout] = useContext(LogoutContext);
  const [currUser, setCurrUser] = useState([]);
  const logoutMenu = () => {
    setLogout(!logout);
  };

  const submitLogout = () => {
    Axios.get("https://ecplcsms.herokuapp.com/logout").then((response) => {
      if (response) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setCurrUser([]);
      } else if (
        response.data.loggedIn === "true" ||
        response.data.loggedIn === true
      ) {
        setCurrUser(response.data.session.user[0]);
      } else {
        setCurrUser([]);
      }
    });
  }, []);

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
            <div className="dashboard-header-profile"></div>
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
                  <i className="fas fa-user-circle"></i>
                  {currUser.fullname}
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
      </div>
    </div>
  );
};

export default DashboardHeader;
