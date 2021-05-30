import React, { useState, useEffect, useContext } from "react";
import "./Subject.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import MainLoader from "../../../Components/Loader/MainLoader";
import { motion } from "framer-motion";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Loader from "../../../Components/Loader/Loader";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const Draft = (props) => {
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [activity, setActivity] = useState({
    type: "",
    points: "",
    due: "",
    time: "",
    topic: "",
    instructions: "",
    file: "",
  });

  const date = new Date();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + dd + yyyy;
  const [dropdown, setDropdown] = useState(false);
  const [type, setType] = useState("Draft");
  const [discard, setDiscard] = useState(false);

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);

  let history = useHistory();

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/find-activity/${props.id}/${props.activityId}`
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
    setShowLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.put(
      `https://ecplc2021.herokuapp.com/class/update-activity/${props.id}/${props.activityId}`,
      {
        type: "Assignment",
        points: activity.points,
        datetime: date,
        due: activity.due,
        time: activity.time,
        topic: activity.topic,
        instructions: activity.instructions,
        file: filename === null ? activity.file : today + "_" + filename,
        active: true,
        subject: props.subject,
      }
    ).then((response) => {
      if (response.data.err) {
        console.log(response.data.err);
        props.setMessage(response.data.err);
        setShowLoader(false);
      } else {
        Axios.post(
          "https://ecplc2021.herokuapp.com/file/upload-file",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        history.goBack();
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
        setShowLoader(false);
      }
    });
  };

  const submitDraft = () => {
    setShowLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.put(
      `https://ecplc2021.herokuapp.com/class/update-activity/${props.id}/${props.activityId}`,
      {
        type: "Draft",
        points: activity.points,
        datetime: date,
        due: activity.due,
        time: activity.time,
        topic: activity.topic,
        instructions: activity.instructions,
        file: filename === null ? activity.file : today + "_" + filename,
        active: true,
        subject: props.subject,
      }
    ).then((response) => {
      if (response.data.err) {
        console.log(response.data.err);
        props.setMessage(response.data.err);
        setShowLoader(false);
      } else {
        Axios.post(
          "https://ecplc2021.herokuapp.com/file/upload-file",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        history.goBack();
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
        setShowLoader(false);
      }
    });
  };

  const dropdownVariants = {
    visible: {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 1,
    },
    initial: {
      y: -50,
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    },
  };

  const pageVariants = {
    initial: {
      opacity: 0.5,
      scale: 0.988,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 1,
      scale: 0.5,
    },
  };

  const submitDiscard = () => {
    Axios.put(
      `https://ecplc2021.herokuapp.com/class/delete-activity/${props.id}/${props.activityId}`
    ).then((response) => {
      if (response.data.err) {
        setShowLoader(false);
      } else {
        setShowLoader(false);
        history.goBack();
        props.setMessage(response.data.success);
        setTimeout(() => props.setMessage(""), 5000);
        props.setInitial(response.data.success);
      }
    });
  };

  const [showLoader, setShowLoader] = useState(false);
  return (
    <>
      {activity.type === "" && <MainLoader />}
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="assignment-wrapper"
        >
          {showLoader && <Loader />}
          <div
            onClick={() => setDiscard(false)}
            className={discard ? "assignment-wrapper-afters" : "hidden"}
          ></div>
          <div className={discard ? "show-discard" : "hidden"}>
            <div className="show-discard-header">
              <p>Are you really sure you want to discard this draft?</p>
            </div>

            <div className="show-discard-body">
              <div
                onClick={() => setDiscard(false)}
                className="cancel-discard-btn"
              >
                Cancel
              </div>
              <div
                onClick={() => {
                  setShowLoader(true);
                  submitDiscard();
                }}
                className="confirm-discard-btn"
              >
                Confirm
              </div>
            </div>
          </div>

          <div className="assignment-header">
            <h3>Create Assignment (Draft)</h3>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="assignment-body"
          >
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

            <div
              className={
                activity.file === "" && filename === null
                  ? "hidden"
                  : "actual-activity-body-left-footer"
              }
            >
              <p className="footer-add-word">
                <InsertDriveFileOutlinedIcon
                  className="material-document"
                  fontSize="small"
                />
                <i>{activity.file !== "" ? activity.file : filename}</i>
              </p>
              <span
                onClick={() => {
                  setFilename(null);
                  setFile(null);
                  setKey(null);
                  setActivity({
                    type: activity.type,
                    points: activity.points,
                    due: activity.due,
                    time: activity.time,
                    topic: activity.topic,
                    instructions: activity.instructions,
                    file: "",
                  });
                }}
              >
                <i className="far fa-times-circle"></i>
              </span>
            </div>

            <div
              className={
                filename === null && activity.file === ""
                  ? "create-stream-post-divs"
                  : "hidden"
              }
            >
              <input
                key={key}
                type="file"
                onChange={(e) => {
                  setFilename(e.target.files[0].name);
                  setFile(e.target.files[0]);
                  setKey(e.target.files[0].name);
                }}
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
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate={dropdown ? "visible" : ""}
                  transition={{ duration: 0.3 }}
                  className="submit-btn-dropdown-after-draft"
                >
                  <div
                    onClick={submitAssignment}
                    className="submit-btn-dropdown-after-item-draft"
                  >
                    Assign
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
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default Draft;
