import React, { useState, useContext } from "react";
import { StudentDashboardData } from "./StudentDashboardData";
import { Link } from "react-router-dom";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "./StudentDashboard.css";
import { DashboardContext } from "../../../ContextFiles/DashboardContext";

const StudentDashboard = () => {
  const [showName, setShowName] = useContext(DashboardContext);
  const dashboardMenu = () => {
    setShowName(!showName);
  };
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
              <Link className="router-link" to={val.link} key={key}>
                <Tippy content={val.name} arrow={false} placement="right">
                  <li
                    className="li-middle"
                    key={key}
                    id={
                      window.location.pathname === val.link ? "link-active" : ""
                    }
                  >
                    <div
                      className={
                        showName ? "dashboard-extra-icon" : "dashboard-icon"
                      }
                    >
                      {val.icon}
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
