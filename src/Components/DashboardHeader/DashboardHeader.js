import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import Logo from "./logo.png";
import Axios from "axios";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import { LoginContext } from "../../ContextFiles/LoginContext";

const DashboardHeader = () => {
  const [logout, setLogout] = useState(false);
  const [currUser, setCurrUser] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [chat, setChat] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [picture, setPicture] = useState("");
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
        setFirstname("");
      } else if (response.data.loggedIn) {
        setFirstname(response.data.firstname);
       setPicture(response.data.picture)
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
              <div className="dashboard-header-profile1">
               <img src={picture} />
              </div>
              <div className="dashboard-header-profile-name">
                
                <i className="fas fa-caret-down"></i>
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
                  <div className="dashboard-header-profile2">
                  <img src={picture} />
                  </div>
                </div>
                <div className="dashboard-profile-name-wrapper2">
                  {firstname}
                  <div className="view-profile">View Profile</div>
                </div>
              </span>
              <span className="dashboard-profile-span2">
                <p>
                  <i className="fas fa-cog"></i>Account Settings
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
    </>
  );
};

export default DashboardHeader;
