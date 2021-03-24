import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./StudentProfile.css";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import Axios from "axios";

const StudentProfile = () => {
  return (
    <>
      <div className="student-wrapper">
        <StudentDashboard />
        <div className="student-content">
          <DashboardHeader />
          Hello
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
