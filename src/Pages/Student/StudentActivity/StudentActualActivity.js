import React, { useState, useEffect } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";

const StudentActualActivity = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
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
              <span>
                {props.points < 0 ? (
                  "No points"
                ) : (
                  <>{props.points + " points"} </>
                )}
                <input type="submit" value="Turn in"></input>
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
                <div className="footer-add-word">{props.file}</div>
              </div>

              <div className="actual-activity-body-left-attach">
                <p>
                  <i class="fas fa-paperclip"></i> My work
                </p>
              </div>

              <div className="actual-activity-body-left-attach">
                <input type="file" className="custom-file-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentActualActivity;
