import React, { useState, useEffect } from "react";
import "./Subject.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import MainLoader from "../../../Components/Loader/MainLoader";

const Draft = (props) => {
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState({
    type: "",
    points: "",
    due: "",
    time: "",
    topic: "",
    instructions: "",
    file: "",
  });
  const [dropdown, setDropdown] = useState(false);
  const [type, setType] = useState("Draft");
  const [discard, setDiscard] = useState(false);

  let history = useHistory();

  useEffect(() => {
    Axios.get(
      `http://ecplcsms.herokuapp.com/class/find-activity/${props.id}/${props.activityId}`
    ).then((response) => {
      if (response.data.length === 0) {
        setActivity({
          type: "",
          points: "",
          due: "",
          time: "",
          topic: "",
          instructions: "",
          file: "",
        });
      } else {
        setActivity({
          type: response.data.activityType,
          points: response.data.points,
          due: response.data.due,
          time: response.data.time,
          topic: response.data.topic,
          instructions: response.data.instructions,
          file: response.data.file,
        });
      }
    });
  }, [props.initial]);

  const submitAssignment = () => {
    Axios.put(
      `http://ecplcsms.herokuapp.com/class/update-activity/${props.id}/${props.activityId}`,
      {
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
      }
    ).then((response) => {
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
      }
    });
  };

  const submitDraft = () => {
    Axios.put(
      `http://ecplcsms.herokuapp.com/class/update-activity/${props.id}/${props.activityId}`,
      {
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
      }
    ).then((response) => {
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
      }
    });
  };
  return (
    <>
      {activity.type === "" && <MainLoader />}

      <div className="assignment-wrapper">
        <div
          onClick={() => setDiscard(false)}
          className={discard ? "assignment-wrapper-afters" : "hidden"}
        ></div>
        <div className={discard ? "show-discard" : "hidden"}>
          <div className="show-discard-header">
            <h4>Discard Draft</h4>
          </div>

          <div className="show-discard-body"></div>
          <div className="show-discard-footer"></div>
        </div>
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
          <h3>Create Assignment (Draft)</h3>
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
              onClick={history.goBack}
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
                value="Save"
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
                className={
                  dropdown ? "submit-btn-dropdown-after-draft" : "hidden"
                }
              >
                <div
                  onClick={() => setType("Assign")}
                  className="submit-btn-dropdown-after-item-draft"
                >
                  Assign
                </div>
                <div
                  onClick={() => setType("Draft")}
                  className="submit-btn-dropdown-after-item-draft"
                >
                  Draft
                </div>
                <div
                  onClick={() => setType("Schedule")}
                  className="submit-btn-dropdown-after-item-draft"
                >
                  Schedule
                </div>
                <div
                  onClick={() => setDiscard(true)}
                  className="submit-btn-dropdown-after-item-draft-discard"
                >
                  Discard Draft
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Draft;
