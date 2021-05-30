import React, { useState, useEffect, useContext } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const StudentActualActivity = (props) => {
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const history = useHistory();
  const [key, setKey] = useState("");

  const goBack = () => {
    history.goBack();
  };

  const [activityStatus, setActivityStatus] = useState("");

  const downloadFile = () => {
    window.open(
      `https://ecplc2021.herokuapp.com/file/filename/${props.filename}`,

      "_blank"
    );
  };

  return (
    <>
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="actual-activity-wrapper">
          <div
            className={
              activityStatus === "" ? "hidden" : "actual-activity-wrapper-after"
            }
          >
            {activityStatus}
          </div>
          <StudentDashboard />
          <div className="actual-activity-content">
            <DashboardHeader />
            <div className="actual-activity-header">
              <div className="go-back-btn" onClick={goBack}>
                <i className="fas fa-angle-left"></i>Back
              </div>
            </div>
            <div className="actual-activity-student-body">
              <div className="actual-activity-student-body-left">
                <span>
                  {props.points < 0 ? (
                    "No points"
                  ) : (
                    <>{props.points + " points"} </>
                  )}
                </span>
                <div className="actual-activity-body-left-header">
                  <h3>{props.topic}</h3>
                  <p>
                    {!props.due ? (
                      "No due date "
                    ) : (
                      <>
                        Due: {props.due} {props.time}
                      </>
                    )}
                  </p>
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
                    {props.filename}
                  </p>
                  <div onClick={downloadFile}>
                    Download <i className="fas fa-download"></i>
                  </div>
                </div>
              </div>

              <div className="actual-activity-body-left-footers">
                <div className="add-your-work-header">
                  <h4>Add your work</h4>
                </div>
                <div className="actual-activity-body-left-attach">
                  <p>
                    <i className="fas fa-paperclip"></i> My work
                  </p>
                </div>

                <div className="actual-activity-body-left-attach">
                  <input
                    type="file"
                    onChange={(e) => {
                      setKey(e.target.files[0].name);
                    }}
                    className="custom-file-input"
                  />
                </div>

                <input
                  type="submit"
                  className="actual-activity-body-left-submit-btn"
                  value="Turn in"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentActualActivity;
