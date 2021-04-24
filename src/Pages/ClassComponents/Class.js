import React, { useEffect, useState } from "react";
import "./Class.css";
import Axios from "axios";
import Empty from "./empty.png";

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
          Hi Teach! Create activities here.
        </div>
      </div>
      <div className="classes-wrapper">
        {activities.length === 0 && (
          <span>
            <img src={Empty} alt="Empty" />
            Nothing to show. Create one to reflect here.{" "}
          </span>
        )}
      </div>
    </>
  );
};

export default Class;
