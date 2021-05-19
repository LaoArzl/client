import React, { useState, useEffect } from "react";
import "./Subject.css";
import Axios from "axios";

const Assignment = (props) => {
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setActivity({
      type: "Assignment",
      points: 100,
      due: "",
      time: "",
      topic: "",
      instructions: "",
      file: "",
      quarter: "",
    });
  }, []);

  const submitAssignment = () => {
    Axios.put(`http://ecplcsms.herokuapp.com/class/assignment/${props.id}`, {
      type: activity.type,
      points: activity.points,
      datetime: new Date().toLocaleDateString(),
      due: activity.due,
      time: activity.time,
      topic: activity.topic,
      instructions: activity.instructions,
      file: activity.file,
      active: true,
      subject: props.subject,
      quarter: activity.quarter,
    }).then((response) => {
      if (response.data.err) {
        setMessage(response.data.err);
      } else {
        setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => setMessage(""), 5000);
        setActivity({
          type: "Assignment",
          points: 100,
          due: "",
          time: "",
          topic: "",
          instructions: "",
          file: "",
          quarter: "",
        });
      }
    });
  };
  return (
    <>
      <div className="assignment-wrapper">
        <div
          className={
            message === "" || message !== "Successfully created activity."
              ? "hidden"
              : "assignment-wrapper-after"
          }
        >
          {message}
        </div>
        <div className="assignment-header">
          <h3>Create Assignment</h3>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="assignment-body">
          <div
            className={
              message === "" || message === "Successfully created activity."
                ? "hidden"
                : "assignment-div-topic-err"
            }
          >
            {message}
          </div>
          <div className="assignment-div-points">
            <label>Points</label>
            <input
              value={activity.points}
              onChange={(e) => {
                let value = e.target.value;
                setActivity({
                  type: activity.type,
                  points: value,
                  due: activity.due,
                  time: activity.time,
                  topic: activity.topic,
                  instructions: activity.instructions,
                  file: activity.file,
                  quarter: activity.quarter,
                });
              }}
              type="number"
            />
          </div>

          <div className="assignment-div-due">
            <div className="assignment-div-date">
              <label>Due date</label>
              <input
                type="date"
                value={activity.due}
                onChange={(e) => {
                  let value = e.target.value;
                  setActivity({
                    type: activity.type,
                    points: activity.points,
                    due: value,
                    time: activity.time,
                    topic: activity.topic,
                    instructions: activity.instructions,
                    file: activity.file,
                    quarter: activity.quarter,
                  });
                }}
              />
            </div>

            <div className="assignment-div-date">
              <label>Time </label>
              <input
                type="time"
                value={activity.time}
                onChange={(e) => {
                  let value = e.target.value;
                  setActivity({
                    type: activity.type,
                    points: activity.points,
                    due: activity.due,
                    time: value,
                    topic: activity.topic,
                    instructions: activity.instructions,
                    file: activity.file,
                    quarter: activity.quarter,
                  });
                }}
              />
            </div>
          </div>
          <div className="assignment-div-topic">
            <label>Quarter *</label>
            <select
              value={activity.quarter}
              onChange={(e) => {
                let value = e.target.value;
                setActivity({
                  type: activity.type,
                  points: activity.points,
                  due: activity.due,
                  time: activity.time,
                  topic: activity.topic,
                  instructions: activity.instructions,
                  file: activity.file,
                  quarter: value,
                });
              }}
            >
              <option value="">Select Quarter</option>
              <option value="1st Quarter">1st Quarter</option>
              <option value="2nd Quarter">2nd Quarter</option>
              <option value="3rd Quarter">3rd Quarter</option>
              <option value="4th Quarter">4th Quarter</option>
            </select>
          </div>

          <div className="assignment-div-topic">
            <label>Topic *</label>
            <input
              type="text"
              value={activity.topic}
              onChange={(e) => {
                let value = e.target.value;
                setActivity({
                  type: activity.type,
                  points: activity.points,
                  due: activity.due,
                  time: activity.time,
                  topic: value,
                  instructions: activity.instructions,
                  file: activity.file,
                  quarter: activity.quarter,
                });
              }}
            />
          </div>

          <div className="assignment-div-topic">
            <label>Description</label>
            <textarea
              value={activity.instructions}
              onChange={(e) => {
                let value = e.target.value;
                setActivity({
                  type: activity.type,
                  points: activity.points,
                  due: activity.due,
                  time: activity.time,
                  topic: activity.topic,
                  instructions: value,
                  file: activity.file,
                  quarter: activity.quarter,
                });
              }}
              placeholder="Additional Instruction (Optional)"
            ></textarea>
          </div>

          <div className="create-stream-post-divs">
            <input
              value={activity.file}
              onChange={(e) => {
                let value = e.target.value;
                setActivity({
                  type: activity.type,
                  points: activity.points,
                  due: activity.due,
                  time: activity.time,
                  topic: activity.topic,
                  instructions: activity.instructions,
                  file: value,
                  quarter: activity.quarter,
                });
              }}
              type="file"
              className="custom-file-input"
            />
          </div>

          <div className="assignment-div-submit">
            <input
              onClick={() => props.setAssignment(false)}
              type="submit"
              value="Cancel"
              className="cancel-assignment-btn"
            />
            <input
              onClick={submitAssignment}
              type="submit"
              value="Create"
              className="submit-assignment-btn"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Assignment;
