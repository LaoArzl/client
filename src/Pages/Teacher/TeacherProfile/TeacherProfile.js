import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherProfile.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import ProfileHeader from "../../../Components/ProfileHeader/ProfileHeader";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";

const TeacherProfile = () => {
  const { value2, value3 } = useContext(LoginContext);
  const [role, setRole] = value2;

  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/user-login").then((response) => {
      if (response) {
        setFullname(
          response.data.user[0].firstName +
            " " +
            response.data.user[0].middleName +
            " " +
            response.data.user[0].lastName
        );
        setUserId(response.data.user[0].user_id);
      }
    });
  }, []);

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="user-profile">
          <ProfileHeader />
          <div className="user-content">
            {fullname}
            {userId}
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherProfile;
