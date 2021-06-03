import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./UserProfile.css";
import NavProfile from "./NavProfile";
import NavAccount from "./NavAccount";
import NavDelete from "./NavDelete";

const UserTeacher = (props) => {
  const [userNav, setUserNav] = useState("");

  useEffect(() => {
    setUserNav("Profile");
  }, []);

  return (
    <>
      <div className="userprofile-wrapper">
        <div
          className={
            props.message === "" ? "hidden" : "assignment-wrapper-after"
          }
        >
          {props.message}
        </div>
        <Dashboard />
        <div className="userprofile-content">
          <DashboardHeader />
          <div className="user-profile-content">
            <div className="user-profile-navigation">
              <div
                onClick={() => setUserNav("Profile")}
                className={
                  userNav === "Profile"
                    ? "user-navigation-profile-profile"
                    : "user-navigation-profile"
                }
              >
                User Profile{" "}
                <i
                  class={userNav === "Profile" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
              <div
                onClick={() => setUserNav("Account")}
                className={
                  userNav === "Account"
                    ? "user-navigation-profile-account"
                    : "user-navigation-profile"
                }
              >
                Password and Security
                <i
                  class={userNav === "Account" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
              <div
                onClick={() => setUserNav("Advising")}
                className={
                  userNav === "Advising"
                    ? "user-navigation-profile-advising"
                    : "user-navigation-profile"
                }
              >
                Profile Picture
                <i
                  class={userNav === "Advising" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
            </div>
            <div className="user-profile-content-actual">
              {userNav === "Profile" && (
                <NavProfile
                  id={props.id}
                  message={props.message}
                  setMessage={props.setMessage}
                  initial={props.initial}
                  setInitial={props.setInitial}
                />
              )}
              {userNav === "Account" && <NavAccount />}
              {userNav === "Advising" && (
                <NavDelete
                  id={props.id}
                  message={props.message}
                  setMessage={props.setMessage}
                  initial={props.initial}
                  setInitial={props.setInitial}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserTeacher);
