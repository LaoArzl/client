import React from "react";
import "./Subject.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";

const Subject = () => {
  return (
    <>
      <div className="subject-wrapper">
        <Dashboard />
        <div className="subject-content">
          <DashboardHeader />
        </div>
      </div>
    </>
  );
};

export default Subject;
