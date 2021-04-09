import React from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./EditClass.css";
import Axios from "axios";
import ClassPeople from "./ClassPeople";
import ClassInfo from "./ClassInfo";

const EditClass = (props) => {
  return (
    <>
      <div className="edit-class-wrapper">
        <Dashboard />
        <div className="edit-class-content">
          <DashboardHeader />
          <div className="edit-class-body">
            <div className="edit-class-left"></div>
            <div className="edit-class-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(EditClass);
