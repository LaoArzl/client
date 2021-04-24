import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import Logo from "./logo.png";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const DashboardHeader = () => {
  const [logout, setLogout] = useState(false);
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
    <Redirect to="/" />;
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setCurrUser([]);
      } else if (!response.data.sess) {
        setCurrUser([]);
      } else {
        setCurrUser(response.data.sess[0]);
      }
    });
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-header-wrapper">
          <div className="dashboard-spanner-left">
            <img src={Logo} alt="logo" />
            <h2>ECPLC</h2>
          </div>
          <div className="dashboard-spanner-right">
            <div onClick={logoutMenu} className="dashboard-admin-profile">
              <div className="dashboard-header-profile1"></div>
              <div className="dashboard-header-profile-name">
                {/* {currUser.firstname} */}
                <i class="fas fa-caret-down"></i>
              </div>
            </div>
            <div
              className={
                logout
                  ? "administrator-div-after"
                  : "administrator-div-after-hidden "
              }
            >
              <span className="dashboard-profile-span1">
                <div className="dashboard-profile-name-wrapper1">
                  <div className="dashboard-header-profile2"></div>
                </div>
                <div className="dashboard-profile-name-wrapper2">
                  {currUser.firstname}
                  <div className="view-profile">View Profile</div>
                </div>
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
    </>
  );
};

export default DashboardHeader;
