import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "../Teachers/UserProfile.css";
import NavStudProfile from "./NavStudProfile";
import NavStudAccount from "./NavStudAccount";
import UserProfilePicture from "./UserProfilePicture";

const UserStudent = (props) => {
  const [userNav, setUserNav] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUserNav("Profile");
  }, []);

  return (
    <>
      <div className="userprofile-wrapper">
        <div className={message === "" ? "hidden" : "assignment-wrapper-after"}>
          {message}
        </div>
        <Dashboard />
        <div className="userprofile-content">
          <DashboardHeader />
          <div className="user-profile-content">
            <div className="user-student-navigation">
              <div
                onClick={() => setUserNav("Profile")}
                className={
                  userNav === "Profile"
                    ? "user-navigation-profile-profile"
                    : "user-navigation-profile"
                }
              >
                User Profile
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
                onClick={() => setUserNav("Grades")}
                className={
                  userNav === "Grades"
                    ? "user-navigation-profile-advising"
                    : "user-navigation-profile"
                }
              >
                Profile Picture
                <i
                  className={userNav === "Grades" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
            </div>
            <div className="user-profile-content-actual">
              {userNav === "Profile" && (
                <NavStudProfile
                  id={props.id}
                  initial={props.initial}
                  setInitial={props.setInitial}
                  message={message}
                  setMessage={setMessage}
                />
              )}
              {userNav === "Account" && <NavStudAccount id={props.id} />}
              {userNav === "Grades" && (
                <UserProfilePicture
                  picture={props.picture}
                  id={props.id}
                  initial={props.initial}
                  setInitial={props.setInitial}
                  message={message}
                  setMessage={setMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserStudent);
