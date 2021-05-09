import React from "react";
import "./Subject.css";

const Assignment = (props) => {
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setAssignment(false)}>Create Assignment</h3>
        </div>
      </div>
    </>
  );
};

export default Assignment;
