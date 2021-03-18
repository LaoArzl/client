import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./UsersProfile.css";

const UserStudent = () => {
  const tempUser = window.location.pathname.replace(
    "/admin/users/student-profile/",
    ""
  );
  //const [temp, setTemp] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [adviser, setAdviser] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  let temporaryData = [];

  useEffect(() => {
    Axios.get("http://localhost:3001/student-list").then((response) => {
      temporaryData = response.data.map((value) => {
        if (value.user_id === tempUser) {
          setStudentId(value.user_id);
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
          <div className="usersprofile-actual"></div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UserStudent);
