import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Grades.css";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const Grades = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const { value00 } = useContext(StudentListContext);
  const [students, setStudents] = value00;

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="grades-wrapper">
          <Dashboard />
          <div className="grades-content">
            <DashboardHeader />
            <div className="grades-content-header">Grades</div>
            <div className="grades-content-body"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Grades;
