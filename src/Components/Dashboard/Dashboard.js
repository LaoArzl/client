import React, { useState, useContext } from "react";
import "./Dashboard.css";
import { DashboardData } from "./DashboardData";
import { Link } from "react-router-dom";
import { DashboardContext } from "../../ContextFiles/DashboardContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Dashboard = () => {
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
          {DashboardData.map((val, key) => {
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

export default Dashboard;
