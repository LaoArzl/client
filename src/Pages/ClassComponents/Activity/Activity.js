import React from "react";
import "./Activity.css";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";

const Activity = (props) => {
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
            <div onClick={goBack}>
              <i className="fas fa-angle-left"></i>Back
            </div>
          </div>
          <div className="actual-activity-body">
            <div className="actual-activity-body-left">
              <span>{props.points} points</span>
              <div className="actual-activity-body-left-header">
                <h3>{props.activityType}</h3>
                <p>{props.topic}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
