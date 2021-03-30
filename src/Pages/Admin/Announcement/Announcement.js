import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./Announcement.css";

const Announcement = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="announce-wrapper">
          <Dashboard />
          <div className="announce-content">
            <DashboardHeader />
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Announcement);
