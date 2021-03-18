import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./UsersProfile.css";

const UserTeacher = () => {
  const tempUser = window.location.pathname.replace(
    "/admin/users/teacher-profile/",
    ""
  );
  //const [temp, setTemp] = useState([]);
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [advising, setAdvising] = useState("");
  const [gender, setGender] = useState("");
  let temporaryData = [];

  useEffect(() => {
    Axios.get("http://localhost:3001/teacher-list").then((response) => {
      temporaryData = response.data.map((value) => {
        if (value.user_id === tempUser) {
          setUserId(value.user_id);
          setFirstname(value.firstName);
          setMiddlename(value.middleName);
          setLastname(value.lastName);
          setGender(value.gender);
        }
      });
    });
  }, []);
  return (
    <>
      <div className="usersprofile-wrapper">
        <Dashboard />
        <div className="usersprofile-content">
          <DashboardHeader />
          {userId}
        </div>
      </div>
    </>
  );
};

export default withRouter(UserTeacher);
