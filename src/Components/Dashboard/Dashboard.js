import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { DashboardData } from "./DashboardData";
import { UsersData } from "./UsersData";
import { Link } from "react-router-dom";
import { DashboardContext } from "../../ContextFiles/DashboardContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";

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
          <i onClick={dashboardMenu} className="fas fa-bars"></i>
        </div>
        <ul className={showName ? "dashboard-extra-links" : "dashboard-links"}>
          <Link
            className={showName ? "router-link" : "router-link-extra"}
            to="/admin/dashboard"
          >
            <Tippy
              enabled={showName ? false : true}
              content={"Dashboard"}
              arrow={false}
              placement="right"
            >
              <li
                className="li-middle"
                id={
                  window.location.pathname === "/admin/dashboard"
                    ? "link-active"
                    : ""
                }
              >
                <div
                  className={
                    showName ? "dashboard-extra-icon" : "dashboard-icon"
                  }
                  id={
                    window.location.pathname === "/admin/dashboard"
                      ? "icon-active"
                      : ""
                  }
                >
                  {window.location.pathname === "/admin/dashboard" ? (
                    <DashboardIcon fontSize="small" />
                  ) : (
                    <DashboardOutlinedIcon fontSize="small" />
                  )}
                </div>
                <div
                  className={
                    showName ? "dashboard-link-names" : "dashboard-link-name"
                  }
                >
                  Dashboard
                </div>
              </li>
            </Tippy>
          </Link>
          <div
            className={
              showName ? "dashboard-management" : "dashboard-management-extra"
            }
          >
            {showName ? "Management" : ""}
          </div>
          {DashboardData.map((val, key) => {
            return (
              <Link
                className={showName ? "router-link" : "router-link-extra"}
                to={val.link}
                key={key}
              >
                <Tippy
                  enabled={showName ? false : true}
                  content={val.name}
                  arrow={false}
                  placement="right"
                >
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
                      id={
                        window.location.pathname === val.link
                          ? "icon-active"
                          : ""
                      }
                    >
                      {window.location.pathname === val.link
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
          <div
            className={
              showName ? "dashboard-management" : "dashboard-management-extra"
            }
          >
            {showName ? "Users" : ""}
          </div>
          {UsersData.map((val, key) => {
            return (
              <Link
                className={showName ? "router-link" : "router-link-extra"}
                to={val.link}
                key={key}
              >
                <Tippy
                  enabled={showName ? false : true}
                  content={val.name}
                  arrow={false}
                  placement="right"
                >
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
                      id={
                        window.location.pathname === val.link
                          ? "icon-active"
                          : ""
                      }
                    >
                      {window.location.pathname === val.link
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

export default Dashboard;
