import React, { useState, useEffect } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";

const StudentLectureActual = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const [activityFile, setActivityFile] = useState([]);

  const downloadFile = () => {
    window.open(
      `http://localhost:3001/file/download/${props.filename}`,

      "_blank"
    );
  };

  return (
    <>
      <div className="actual-activity-wrapper">
        <StudentDashboard />
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
                <p>Attached file</p>
              </div>

              <div className="actual-activity-body-left-footer">
                <p className="footer-add-word">
                  <InsertDriveFileOutlinedIcon
                    className="material-document"
                    fontSize="small"
                  />
                  <i>{props.filename}</i>
                </p>
                <div onClick={downloadFile}>
                  Download <i className="fas fa-download"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLectureActual;
