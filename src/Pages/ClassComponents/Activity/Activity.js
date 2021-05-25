import React, { useState } from "react";
import "./Activity.css";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Axios from "axios";

const Activity = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const markDone = () => {
    Axios.put(
      `http://ecplcsms.herokuapp.com/class/assignment/${props.id}/${props.activityId}`,
      { active: false }
    ).then((response) => {
      props.setInitial([]);
      if (response.data.success) {
        setActivityStatus("You mark this activity done.");
        setTimeout(() => setActivityStatus(""), 5000);
      }
    });
  };

  const downloadFile = () => {
    window.open(
      `https://ecplcsms.herokuapp.com/file/download/${props.filename}`,

      "_blank"
    );
  };

  const markUndone = () => {
    Axios.put(
      `http://ecplcsms.herokuapp.com/class/assignment/${props.id}/${props.activityId}`,
      { active: true }
    ).then((response) => {
      props.setInitial([]);
      if (response.data.success) {
        setActivityStatus("You reopen this activity.");
        setTimeout(() => setActivityStatus(""), 5000);
      }
    });
  };

  const [activityStatus, setActivityStatus] = useState("");
  return (
    <>
      <div className="actual-activity-wrapper">
        <div
          className={
            activityStatus === "" ? "hidden" : "actual-activity-wrapper-after"
          }
        >
          {activityStatus}
        </div>
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
              <span>
                {props.points < 0 ? (
                  "No points"
                ) : (
                  <>{props.points + " points"} </>
                )}
                {props.active.toString() === "true" ? (
                  <i>Assigned</i>
                ) : (
                  <>
                    <i>
                      Done {"  "}
                      <i className="fas fa-check"></i>
                    </i>
                  </>
                )}
              </span>
              <div className="actual-activity-body-left-header">
                <h3>
                  {props.topic}
                </h3>
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

            <div className="actual-activity-body-right">
              <div className="activity-done">
                <p>Mark Activity:</p>{" "}
                {props.active.toString() === "true" ? (
                  <span onClick={markDone}>Done</span>
                ) : (
                  <span onClick={markUndone}>Undone</span>
                )}
              </div>
              <div className="activity-turned-in">
                <p>Turned in:</p> 0
              </div>

              <div className="activity-turned-in">
                <p>Assigned:</p> 0
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
