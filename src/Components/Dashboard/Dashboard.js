import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    console.log(window.location.pathname.replace(/[0-9]/g, "."));
  }, []);

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
          {DashboardData.map((val, key) => {
            return (
              <Link className="router-link" to={val.link} key={key}>
                <Tippy content={val.name} arrow={false} placement="right">
                  <li
                    className="li-middle"
                    key={key}
                    id={
                      window.location.pathname === val.link ||
                      window.location.pathname.replace(/[0-9]/g, ".") ===
                        val.links ||
                      window.location.pathname.replace(/[0-9]/g, ",") ===
                        val.links
                        ? "link-active"
                        : ""
                    }
                  >
                    <div
                      className={
                        showName ? "dashboard-extra-icon" : "dashboard-icon"
                      }
                      id={
                        window.location.pathname === val.link ||
                        window.location.pathname.replace(/[0-9]/g, ".") ===
                          val.links ||
                        window.location.pathname.replace(/[0-9]/g, ",") ===
                          val.links
                          ? "icon-active"
                          : "icon-inactive"
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
