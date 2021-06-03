import React, { useEffect, useState, useContext } from "react";
import "./DashboardHeader.css";
import Logo from "./logo.png";
import Axios from "axios";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import { LoginContext } from "../../ContextFiles/LoginContext";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  const { valuePicture, valueID, valueFirstname } = useContext(LoginContext);
  const [picture, setPicture] = valuePicture;
  const [logout, setLogout] = useState(false);
  const [firstname, setFirstname] = valueFirstname;
  const [userID, setUserID] = valueID;

  const logoutMenu = () => {
    setLogout(!logout);
  };

  const submitLogout = () => {
    Axios.get("https://ecplc2021.herokuapp.com/logout").then((response) => {
      if (response) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setFirstname("");
      } else if (response.data.loggedIn) {
        setUserID(response.data.id);
        setFirstname(response.data.firstname);
        setPicture(response.data.picture);
      }
    });
  }, []);

  const dropdownVariants = {
    visible: {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 1,
    },
    initial: {
      y: 0,
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    },
  };

  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-header-wrapper">
          <div className="dashboard-spanner-left">
            <h2>ECPLC </h2>
            <p>LMS</p>
          </div>
          <div className="dashboard-spanner-right">
            <div
              onClick={logoutMenu}
              className={
                logout ? "dashboard-admin-profile-2" : "dashboard-admin-profile"
              }
            >
              <div className="dashboard-header-profile1">
                <img src={picture} />
              </div>
              <div className="dashboard-header-profile-name">
                <p> {firstname}</p>
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate={logout ? "visible" : ""}
              transition={{ duration: 0.2 }}
              className="administrator-div-after"
            >
              <span className="dashboard-profile-span1">
                <div className="dashboard-profile-name-wrapper1">
                  <div className="dashboard-header-profile2">
                    <img src={picture} />
                  </div>
                </div>
                <div className="dashboard-profile-name-wrapper2">
                  {firstname}
                  <div className="view-profile">ECPLC LMS</div>
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
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
