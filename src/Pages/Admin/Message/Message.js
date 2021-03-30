import React, { useContext } from "react";
import "./Message.css";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Message = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="message-wrapper">
          <Dashboard />
          <div className="message-content">
            <DashboardHeader />
            <div className="message-actual"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Message);
