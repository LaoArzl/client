import React, { useState } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./EditYear.css";
import GradeLevel from "./GradeLevel";
import Subject from "./Subject";

const EditYear = (props) => {
  const [status, setStatus] = useState("grade");
  const [success, setSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  

  return (
    <>
      <div className="year-wrapper">
        <div className={statusMsg === "" ? "hidden" : "year-wrapper-after-msg"}>
          {statusMsg}
        </div>
        <Dashboard />
        <div className="year-content">
          <DashboardHeader />
          <div className="edit-year-body">
            <div className="edit-year-left">
              <div
                onClick={() => setStatus("grade")}
                className={
                  status === "grade"
                    ? "edit-year-left-1-active"
                    : "edit-year-left-1"
                }
              >
                Grade Level
                <i
                  className={status === "grade" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
              <div
                onClick={() => setStatus("subject")}
                className={
                  status === "subject"
                    ? "edit-year-left-2-active"
                    : "edit-year-left-2"
                }
              >
                Subjects
                <i
                  className={status === "subject" ? "fas fa-chevron-right" : ""}
                ></i>
              </div>
            </div>
            <div className="edit-year-right">
              {status === "grade" && (
                <GradeLevel
                  success={success}
                  setSuccess={setSuccess}
                  id={props.id}
                  initial={props.initial}
                  setInitial={props.setInitial}
                  statusMsg={statusMsg}
                  setStatusMsg={setStatusMsg}
                />
              )}
              {status === "subject" && (
                <Subject
                  id={props.id}
                  initial={props.initial}
                  setInitial={props.setInitial}
                  statusMsg={statusMsg}
                  setStatusMsg={setStatusMsg}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditYear;
