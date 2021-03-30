import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./StudentProfile.css";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import Axios from "axios";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const StudentProfile = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="student-wrapper">
          <StudentDashboard />
          <div className="student-content">
            <DashboardHeader />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
