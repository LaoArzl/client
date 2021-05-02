import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./EditClass.css";
import Axios from "axios";
import ClassPeople from "./ClassPeople";
import ClassInfo from "./ClassInfo";

const EditClass = (props) => {
  const [editPage, setEditPage] = useState("");
  return (
    <>
      <div className="edit-class-wrapper">
        <Dashboard />
        <div className="edit-class-content">
          <DashboardHeader />
          <div className="edit-class-body">
            <div className="edit-class-left">
              <div
                onClick={() => setEditPage("class")}
                className={
                  editPage === "class"
                    ? "edit-class-left1-active"
                    : "edit-class-left1"
                }
              >
                Class Details
              </div>
              <div
                onClick={() => setEditPage("students")}
                className={
                  editPage === "students"
                    ? "edit-class-left2-active"
                    : "edit-class-left2"
                }
                className="edit-class-left2"
              >
                Students
              </div>
              <div
                onClick={() => setEditPage("s")}
                className={
                  editPage === "s"
                    ? "edit-class-left3-active"
                    : "edit-class-left3"
                }
                className="edit-class-left3"
              >
                Teachers
              </div>
            </div>
            <div className="edit-class-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(EditClass);
