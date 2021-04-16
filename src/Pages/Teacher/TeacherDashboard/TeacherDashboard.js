import React, { useState, useContext } from "react";
import { TeacherDashboardData } from "./TeacherDashboardData";
import { Link } from "react-router-dom";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { DashboardContext } from "../../../ContextFiles/DashboardContext";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const TeacherDashboard = (props) => {
  const [showName, setShowName] = useContext(DashboardContext);
  const { valueID } = useContext(LoginContext);
  const [userID, setUserID] = valueID;

  const dashboardMenu = () => {
    setShowName(!showName);
  };

  const id = localStorage.getItem("id");

  return (
    <>
      <div className={showName ? "extra-sidebar" : "sidebar"}>
        <div
          className={
            showName ? "dashboard-extra-menu-section" : "dashboard-menu-section"
          }
        >
          <i onClick={dashboardMenu} className="fas fa-bars"></i>
        </div>
        <ul className={showName ? "dashboard-extra-links" : "dashboard-links"}>
          {TeacherDashboardData.map((val, key) => {
            return (
              <Link className="router-link" to={val.link + id} key={key}>
                <Tippy content={val.name} arrow={false} placement="right">
                  <li
                    className="li-middle"
                    id={
                      window.location.pathname === val.link + id
                        ? "link-active"
                        : ""
                    }
                  >
                    <div
                      className={
                        showName ? "dashboard-extra-icon" : "dashboard-icon"
                      }
                      id={
                        window.location.pathname === val.link + id
                          ? "icon-active"
                          : "icon-inactive"
                      }
                    >
                      {window.location.pathname === val.link + id
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

export default TeacherDashboard;
