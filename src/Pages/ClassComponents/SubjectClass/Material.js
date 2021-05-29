import React, { useState, useEffect } from "react";
import "./Subject.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";

const Material = (props) => {
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState([]);
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);

  let history = useHistory();

  useEffect(() => {
    setActivity({
      topic: "",
      instructions: "",
      quarter: "",
    });
  }, []);

  // const submitAssignment = () => {
  //   Axios.put(`http://ecplcsms.herokuapp.com/class/lecture/${props.id}`, {
  //     datetime: new Date().toLocaleDateString(),
  //     topic: activity.topic,
  //     instructions: activity.instructions,
  //     subject: props.subject,
  //     quarter: activity.quarter,
  //     filename: filename,
  //   }).then((response) => {
  //     if (response.data.err) {
  //       setMessage(response.data.err);
  //     } else {
  //       setMessage(response.data.success);
  //       props.setInitial([]);
  //       setTimeout(() => setMessage(""), 5000);
  //       setActivity({
  //         topic: "",
  //         instructions: "",
  //         quarter: "",
  //       });

  //     }
  //   });
  // };

  const submitBtn = (e) => {
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.all([
      Axios.post("http://localhost:3001/file/upload-file", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),

      Axios.put(`http://localhost:3001/class/lecture/${props.id}`, {
        datetime: new Date().toLocaleDateString(),
        topic: activity.topic,
        instructions: activity.instructions,
        subject: props.subject,
        quarter: activity.quarter,
        filename: filename,
      }),
    ]).then(
      Axios.spread((data1, data2) => {
        if (data2.data.err) {
          props.setMessage(data2.data.err);
        } else {
          props.setLecture(false);
          props.setMessage(data2.data.success);
          props.setInitial([]);
          setTimeout(() => props.setMessage(""), 5000);
          setActivity({
            topic: "",
            instructions: "",
            quarter: "",
          });
          history.push(props.url);
        }
      })
    );
  };
  return (
    <>
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

        <form onSubmit={(e) => e.preventDefault()} className="assignment-body">
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

          <div className="outside-label">File *</div>

          <div
            className={
              filename === null ? "hidden" : "actual-activity-body-left-footer"
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
            className={filename !== null ? "hidden" : "create-stream-post-divs"}
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
              value="Create"
              className={
                activity.quarter === "" || activity.topic === ""
                  ? "submit-assignment-btn-opacity"
                  : "submit-assignment-btn"
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Material;
