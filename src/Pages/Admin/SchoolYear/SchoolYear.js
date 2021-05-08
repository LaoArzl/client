import React, { useContext } from "react";
import "./SchoolYear.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const SchoolYear = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="schoolyear-wrapper">
          <Dashboard />
          <div className="schoolyear-content">
            <DashboardHeader />
          </div>
        </div>
      )}
    </>
  );
};

export default SchoolYear;
