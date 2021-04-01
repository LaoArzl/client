import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherClass.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";

const TeacherClass = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="user-class">
          <TeacherDashboard />
          <div className="user-class-content">
            <DashboardHeader />
            <div className="user-class-content-header">
              <p>Your Class</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherClass;
