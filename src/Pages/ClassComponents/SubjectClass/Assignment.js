import React, { useState, useEffect, useContext } from "react";
import "./Subject.css";
import Axios from "axios";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Loader from "../../../Components/Loader/Loader";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import Rubrics from "./Rubrics";

const Assignment = (props) => {
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [activity, setActivity] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [type, setType] = useState("Assign");

  const [file, setFile] = useState({});
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);
  const [encryptFile, setEncryptFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [pointType, setPointType] = useState("points");
  const [rubrics, setRubrics] = useState(false);
  const [showRubrics, setShowRubrics] = useState(false);

  useEffect(() => {
    setActivity({
      type: "",
      points: 100,
      due: "",
      time: "",
      topic: "",
      instructions: "",
    });
  }, []);

  const date = new Date();

  let today = new Date();
  let getDate =
    String(today.getUTCDate()).padStart(2, "0") +
    String(today.getUTCMonth() + 1).padStart(2, "0") +
    String(today.getUTCFullYear()).replace("20", "");

  const submitAssignment = () => {
    //setLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.put(`https://ecplc2021.herokuapp.com/class/assignment/${props.id}`, {
      type: "Assignment",
      points: activity.points,
      datetime: date,
      due: activity.due,
      time: activity.time,
      topic: activity.topic,
      instructions: activity.instructions,
      active: true,
      subject: props.subject,
      filename: getDate + "_" + filename,
    }).then((response) => {
      if (response.data.err) {
        setLoader(false);
        props.setMessage(response.data.err);
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
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
        setActivity({
          type: "",
          points: 100,
          due: "",
          time: "",
          topic: "",
          instructions: "",
          filename: "",
        });
        props.setAssignment(false);
        setLoader(false);
        setKey(null);
      }
    });
  };

  const submitDraft = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);
    formData.append("encryptFile", encryptFile);

    Axios.put(`https://ecplc2021.herokuapp.com/class/assignment/${props.id}`, {
      type: "Draft",
      points: activity.points,
      datetime: date,
      due: activity.due,
      time: activity.time,
      topic: activity.topic,
      instructions: activity.instructions,
      active: true,
      subject: props.subject,
      filename: getDate + "_" + filename,
    }).then((response) => {
      if (response.data.err) {
        props.setMessage(response.data.err);
        setLoader(false);
      } else {
        // Axios.post("http://localhost:3001/file/upload-file", formData, {
        //   headers: {
        //     "content-type": "multipart/form-data",
        //   },
        // });
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
        setActivity({
          type: "",
          points: 100,
          due: "",
          time: "",
          topic: "",
          instructions: "",
          filename: "",
        });
        props.setAssignment(false);
        setLoader(false);
        setKey(null);
        setLoader(false);
      }
    });
  };

  const generateSecret = () => {
    let result1 = [];

    let characters1 = "1234567890";
    let charactersLength1 = characters1.length;

    for (var i = 0; i < 16; i++) {
      result1.push(
        characters1.charAt(Math.floor(Math.random() * charactersLength1))
      );
    }
    setEncryptFile(result1.join(""));
  };
  return (
    <>
      {showRubrics && <Rubrics setShowRubrics={setShowRubrics} />}
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="assignment-wrapper">
          <div
            onClick={() => {
              setRubrics(false);
              setPointType("none");
            }}
            className={rubrics ? "assignment-wrapper-afterss" : "hidden"}
          ></div>
          <div className={rubrics ? "rubrics-form" : "hidden"}>
            <div className="rubrics-header">
              <p>Select a rubric</p>
              <input
                onClick={() => setShowRubrics(true)}
                type="submit"
                value="Create"
              />
            </div>
            <div className="rubrics-body">
              <p
                style={{
                  color: "grey",
                  fontSize: ".9rem",
                  position: "absolute",
                  fontWeight: 300,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                No items to show
              </p>
            </div>
          </div>
          {loader && <Loader />}
          <div className="assignment-header">
            <h3>Create Assignment</h3>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="assignment-body"
          >
            <div className="assignment-div-points">
              <label>Points</label>
              <div className="assignment-div-points-div ">
                {pointType === "points" && (
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
                      });
                    }}
                    type="number"
                  />
                )}
                {pointType === "rubric" && (
                  <div className="type-rubric">Rubrics</div>
                )}

                {pointType === "none" && (
                  <div className="type-rubric">No points set</div>
                )}
                <div onClick={() => setDropdown2(!dropdown2)} className="agent">
                  <i className="fas fa-caret-down"></i>
                  <div className={dropdown2 === true ? "agent-2" : "hidden"}>
                    <p onClick={() => setPointType("points")}>Points</p>
                    <p
                      onClick={() => {
                        setPointType("rubric");
                        setRubrics(true);
                      }}
                    >
                      Rubrics
                    </p>
                    <p
                      onClick={() => {
                        setPointType("none");
                        setActivity({
                          type: activity.type,
                          points: 0,
                          due: activity.due,
                          time: activity.time,
                          topic: activity.topic,
                          instructions: activity.instructions,
                        });
                      }}
                    >
                      None
                    </p>
                  </div>
                </div>
              </div>
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
                  });
                }}
                placeholder="Additional Instruction (Optional)"
              ></textarea>
            </div>

            <div
              className={
                filename === null
                  ? "hidden"
                  : "actual-activity-body-left-footer"
              }
            >
              <p className="footer-add-word">
                <InsertDriveFileOutlinedIcon
                  className="material-document"
                  fontSize="small"
                />
                <i>{filename}</i>
              </p>
              <span
                onClick={() => {
                  setFilename(null);
                  setFile(null);
                  setKey(null);
                }}
              >
                <i className="far fa-times-circle"></i>
              </span>
            </div>

            <div
              className={
                filename !== null ? "hidden" : "create-stream-post-divs"
              }
            >
              <input
                key={key}
                onChange={(e) => {
                  setFilename(e.target.files[0].name);
                  setFile(e.target.files[0]);
                  setKey(e.target.files[0].name);
                }}
                onClick={generateSecret}
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
                    activity.topic === "" || filename === null
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
                    activity.topic === ""
                      ? "submit-assignment-btn-opacity"
                      : "submit-assignment-btn"
                  }
                />
              )}
              <div
                onClick={() => setDropdown(!dropdown)}
                className={
                  activity.topic === "" || filename === null
                    ? "submit-btn-dropdown-opacity"
                    : "submit-btn-dropdown"
                }
              >
                <i className="fas fa-caret-down"></i>
                <div
                  className={dropdown ? "submit-btn-dropdown-after" : "hidden"}
                >
                  <div
                    onClick={submitDraft}
                    className="submit-btn-dropdown-after-item"
                  >
                    Save as draft
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
      )}
    </>
  );
};

export default Assignment;
