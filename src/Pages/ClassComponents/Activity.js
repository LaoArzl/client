import React from "react";
import "./Activity.css";

const Activity = () => {
  return (
    <>
      <div className="activity-wrapper">
        <div className="activity-body">
          <div className="activity-body-active">
            <div className="activity-body-active-header">
              <div className="activity-body-active-header1">
                Assigned <i className="fas fa-caret-down"></i>
              </div>
              <div className="activity-body-active-header2"></div>
            </div>
            <div className="activity-body-active-body">
              <div className="activity-1">
                <h5>Module 4</h5>
                <p>English Module</p>
              </div>
            </div>
          </div>

          <div className="activity-body-active">
            <div className="activity-body-active-header">
              <div className="activity-body-active-header1">
                Completed <i className="fas fa-caret-down"></i>
              </div>
              <div className="activity-body-active-header2"></div>
            </div>
            <div className="activity-body-active-body">
              <div className="complete-1">
                <p>Nothing to show.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
