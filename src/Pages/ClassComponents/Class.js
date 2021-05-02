import React, { useEffect, useState } from "react";
import "./Class.css";
import Axios from "axios";

const Class = (props) => {
  const [activities, setActivities] = useState([]);
  return (
    <>
      <div className="create-something">
        <div className="create-something-left">
          <div></div>
        </div>
        <div
          onClick={() => props.showCreateStream(true)}
          className="create-something-right"
        >
          Post something or create activites here.
        </div>
      </div>
      <div className="classes-wrapper">
        {activities.length === 0 && (
          <span>
            Nothing to show. Create one to reflect here.
          </span>
        )}
      </div>
    </>
  );
};

export default Class;
