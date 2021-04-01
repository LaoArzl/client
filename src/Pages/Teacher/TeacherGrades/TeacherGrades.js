import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherGrades.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";

const TeacherGrades = () => {
  const { loginRole, value3 } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="user-class">
          <TeacherDashboard />
          <div className="user-class-content">
            <DashboardHeader />
            {fullname}
            {userId}
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherGrades;
