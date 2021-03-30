import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./AdminFees.css";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const AdminFees = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="adminfees-wrapper">
          <Dashboard />
          <div className="adminfees-content">
            <DashboardHeader />
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(AdminFees);
