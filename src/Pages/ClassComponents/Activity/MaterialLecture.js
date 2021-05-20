import React, { useState } from "react";
import "./Activity.css";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";

const MaterialLecture = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="actual-activity-wrapper">
        <TeacherDashboard />
        <div className="actual-activity-content">
          <DashboardHeader />
          <div className="actual-activity-header">
            <div className="go-back-btn" onClick={goBack}>
              <i className="fas fa-angle-left"></i>Back
            </div>
          </div>
          <div className="actual-activity-body">
            <div className="actual-activity-body-left">
              <div className="actual-activity-body-left-header">
                <h3>{props.topic}</h3>
                <p>Lecture</p>
              </div>

              <div
                className={
                  props.instructions === ""
                    ? "hidden"
                    : "actual-activity-body-left-body"
                }
              >
                <p> {props.instructions}</p>
              </div>

              <div className="actual-activity-body-left-attach">
                <p>
                  Attached file
                </p>
              </div>

              <div className="actual-activity-body-left-footer">
                <div className="footer-add-word">{props.file}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialLecture;
