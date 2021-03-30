import React, { useContext } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Grades.css";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Grades = () => {
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="grades-wrapper">
          <Dashboard />
          <div className="grades-content">
            <DashboardHeader />
            <div className="grades-content-header"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Grades;
