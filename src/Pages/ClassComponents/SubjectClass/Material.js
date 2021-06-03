import React, { useState, useEffect, useContext } from "react";
import "./Subject.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import Loader from "../../../Components/Loader/Loader";

const Material = (props) => {
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState([]);
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [loader, setLoader] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setActivity({
      topic: "",
      instructions: "",
      quarter: "",
    });
  }, []);

  const date = new Date();

  let today = new Date();
  let getDate =
    String(today.getUTCDate()).padStart(2, "0") +
    String(today.getUTCMonth() + 1).padStart(2, "0") +
    String(today.getUTCFullYear()).replace("20", "");

  const submitBtn = (e) => {
    setLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.put(`https://ecplc2021.herokuapp.com/class/lecture/${props.id}`, {
      datetime: new Date().toLocaleDateString(),
      topic: activity.topic,
      instructions: activity.instructions,
      subject: props.subject,
      quarter: activity.quarter,
      filename: getDate + "_" + filename,
    }).then((response) => {
      if (response.data.err) {
        props.setMessage(response.data.err);
        setLoader(false);
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
        props.setLecture(false);
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
        setActivity({
          topic: "",
          instructions: "",
          quarter: "",
        });
        history.push(props.url);
        setLoader(false);
        setFile(null);
        setFilename(null);
        setKey(null);
      }
    });
  };
  return (
    <>
      {loader && <Loader />}
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="assignment-wrapper">
          <div
            className={
              message === "" || message !== "Successfully added lecture."
                ? "hidden"
                : "assignment-wrapper-after"
            }
          >
            {message}
          </div>
          <div className="assignment-header">
            <h3>Upload Lecture</h3>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="assignment-body"
          >
            <div
              className={
                message === "" || message === "Successfully added lecture."
                  ? "hidden"
                  : "assignment-div-topic-err"
              }
            >
              {message}
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
                    topic: value,
                    instructions: activity.instructions,
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
                    topic: activity.topic,
                    instructions: value,
                    quarter: activity.quarter,
                  });
                }}
                placeholder="Additional Instruction (Optional)"
              ></textarea>
            </div>

            <div className="outside-label">
              File (
              <i style={{ fontSize: " 0.75rem" }}>
                {" "}
                .pdf, .docx, .pptx, .xlsx{" "}
              </i>
              )
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
                type="file"
                className="custom-file-input"
              />
            </div>

            <div className="assignment-div-submit">
              <input
                onClick={() => props.setLecture(false)}
                type="submit"
                value="Cancel"
                className="cancel-assignment-btn"
              />
              <input
                onClick={submitBtn}
                type="submit"
                value="Upload"
                className={
                  activity.quarter === "" || activity.topic === ""
                    ? "submit-assignment-btn-opacity"
                    : "submit-assignment-btn"
                }
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Material;
