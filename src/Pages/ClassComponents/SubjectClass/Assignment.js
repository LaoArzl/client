import React, { useState, useEffect } from "react";
import "./Subject.css";
import Axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

const Assignment = (props) => {
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [type, setType] = useState("Assign");

  useEffect(() => {
    setActivity({
      type: "",
      points: 100,
      due: "",
      time: "",
      topic: "",
      instructions: "",
      file: "",
    });
  }, []);

  const submitAssignment = () => {
    Axios.put(`http://ecplcsms.herokuapp.com/class/assignment/${props.id}`, {
      type: "Assignment",
      points: activity.points,
      datetime: new Date().toLocaleDateString(),
      due: activity.due,
      time: activity.time,
      topic: activity.topic,
      instructions: activity.instructions,
      file: activity.file,
      active: true,
      subject: props.subject,
    }).then((response) => {
      if (response.data.err) {
        setMessage(response.data.err);
      } else {
        setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => setMessage(""), 5000);
        setActivity({
          type: "",
          points: 100,
          due: "",
          time: "",
          topic: "",
          instructions: "",
          file: "",
        });
        props.setAssignment(false);
      }
    });
  };

  const submitDraft = () => {
    Axios.put(`http://ecplcsms.herokuapp.com/class/assignment/${props.id}`, {
      type: "Draft",
      points: activity.points,
      datetime: new Date().toLocaleDateString(),
      due: activity.due,
      time: activity.time,
      topic: activity.topic,
      instructions: activity.instructions,
      file: activity.file,
      active: true,
      subject: props.subject,
    }).then((response) => {
      if (response.data.err) {
        setMessage(response.data.err);
      } else {
        setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => setMessage(""), 5000);
        setActivity({
          type: "",
          points: 100,
          due: "",
          time: "",
          topic: "",
          instructions: "",
          file: "",
        });
        props.setAssignment(false);
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
                });
              }}
              type="number"
            />
          </div>

          <div className="assignment-div-due">
            <div className="assignment-div-date">
              <label>Due date</label>
            </div>
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
            {type === "Assign" && (
              <input
                onClick={submitAssignment}
                type="submit"
                value={type}
                className={
                  activity.topic === ""
                    ? "submit-assignment-btn-opacity"
                    : "submit-assignment-btn"
                }
              />
            )}

            {type === "Draft" && (
              <input
                type="submit"
                onClick={submitDraft}
                value={type}
                className={
                  activity.topic === ""
                    ? "submit-assignment-btn-opacity"
                    : "submit-assignment-btn"
                }
              />
            )}

            {type === "Schedule" && (
              <input
                type="submit"
                value={type}
                className={
                  activity.topic === "" || activity.quarter === ""
                    ? "submit-assignment-btn-opacity"
                    : "submit-assignment-btn"
                }
              />
            )}
            <div
              onClick={() => setDropdown(!dropdown)}
              className="submit-btn-dropdown"
            >
              <i className="fas fa-caret-down"></i>
              <div
                className={dropdown ? "submit-btn-dropdown-after" : "hidden"}
              >
                <div
                  onClick={() => setType("Assign")}
                  className="submit-btn-dropdown-after-item"
                >
                  Assign
                </div>
                <div
                  onClick={() => setType("Draft")}
                  className="submit-btn-dropdown-after-item"
                >
                  Draft
                </div>
                <div
                  onClick={() => setType("Schedule")}
                  className="submit-btn-dropdown-after-item"
                >
                  Schedule
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Assignment;
