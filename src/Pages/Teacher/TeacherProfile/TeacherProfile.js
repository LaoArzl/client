import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherProfile.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import ProfileHeader from "../../../Components/ProfileHeader/ProfileHeader";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";

const TeacherProfile = () => {
  const { loginRole, value3 } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="user-profile">
          <ProfileHeader />
          <div className="user-content">
            <DashboardHeader />
            {fullname}
            {userId}
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherProfile;
