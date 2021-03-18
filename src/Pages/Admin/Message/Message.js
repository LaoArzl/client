import React from "react";
import "./Message.css";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";

const Message = () => {
  return (
    <>
      <div className="message-wrapper">
        <Dashboard />
        <div className="message-content">
          <DashboardHeader />
          <div className="message-actual"></div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Message);
