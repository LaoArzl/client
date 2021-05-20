import React, { useState, useContext, useEffect } from "react";
import { StudentDashboardData } from "./StudentDashboardData";
import { Link } from "react-router-dom";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { DashboardContext } from "../../../ContextFiles/DashboardContext";
import Axios from "axios";

const StudentDashboard = () => {
  const [showName, setShowName] = useContext(DashboardContext);
  const [userID, setUserID] = useState("");
  const dashboardMenu = () => {
    setShowName(!showName);
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setUserID("")
      } else if (response.data.loggedIn) {
        setUserID(response.data.id);
      }
    });
  }, []);
  return (
    <>
      <div className={showName ? "extra-sidebar" : "sidebar"}>
        <div
          className={
            showName ? "dashboard-extra-menu-section" : "dashboard-menu-section"
          }
        >
          <i onClick={dashboardMenu} class="fas fa-bars"></i>
        </div>
        <ul className={showName ? "dashboard-extra-links" : "dashboard-links"}>
          {StudentDashboardData.map((val, key) => {
            return (
              <Link className="router-link" to={val.link + userID} key={key}>
                <Tippy content={val.name} enabled={showName ? false : true} arrow={false} placement="right">
                  <li
                    className="li-middle"
                    key={key}
                    id={
                      window.location.pathname === val.link + userID ? "link-active" : ""
                    }
                  >
                    <div
                      className={
                        showName ? "dashboard-extra-icon" : "dashboard-icon"
                      }
                      id={
                        window.location.pathname === val.link + userID
                          ? "icon-active"
                          : "icon-inactive"
                      }
                    >
                     {window.location.pathname === val.link + userID
                        ? val.icons
                        : val.icon}
                    </div>
                    <div
                      className={
                        showName
                          ? "dashboard-link-names"
                          : "dashboard-link-name"
                      }
                    >
                      {val.name}
                    </div>
                  </li>
                </Tippy>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StudentDashboard;
