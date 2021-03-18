import React from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Announcement.css";

const Announcement = () => {
  return (
    <>
      <div className="announce-wrapper">
        <Dashboard />
        <div className="announce-content">
          <DashboardHeader />
        </div>
      </div>
    </>
  );
};

export default withRouter(Announcement);
