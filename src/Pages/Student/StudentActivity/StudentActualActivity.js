import React, { useState, useEffect, useContext } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";

const StudentActualActivity = (props) => {
  const [myWork, setMyWork] = useState([]);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  var dt = new Date();
  var d = dt.toLocaleString("default", options);
  var t = dt.toLocaleTimeString();
  t = t.replace(/\u200E/g, "");
  t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, "$1$2");
  var result = d + " " + t;

  const [init, setInit] = useState(null);
  let today = new Date();
  let getDate =
    String(today.getUTCDate()).padStart(2, "0") +
    String(today.getUTCMonth() + 1).padStart(2, "0") +
    String(today.getUTCFullYear()).replace("20", "");

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/find-activity/${props.id}/${props.activityId}`
    ).then((response) => {
      console.log(response.data.turnedIn);
      let result;
      setMyWork(
        (result = response.data.turnedIn.filter((e) => {
          return e.studentId === props.studentId;
        }))
      );
    });
  }, [init]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/class/user-login").then(
      (response) => {
        console.log(response.data);
      }
    );
  }, []);

  const submitTurnIn = () => {
    setLoader(true);
    Axios.put(
      `https://ecplc2021.herokuapp.com/class/turn-in/${props.id}/${props.activityId}`,
      {
        activityId: props.activityId,
        studentId: props.studentId,
        activityFile: getDate + "_" + filename,
        points: props.points,
        activityType: props.activityType,
        dateSubmitted: result,
        fullname: props.fullname,
      }
    ).then((response) => {
      if (response.data.err) {
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
        setActivityStatus(response.data.success);
        setLoader(false);
        setInit(response.data.success);
        setKey(null);
        setFile(null);
        setFilename(null);
        setActivityStatus(response.data.success);
        setTimeout(() => {
          setActivityStatus("");
          setInit(null);
        }, 5000);
      }
    });
  };
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);
  const { valueID, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [showUndo, setShowUndo] = useState(false);

  let formData = new FormData();
  formData.append("caption", filename);
  formData.append("file", file);

  const goBack = () => {
    history.goBack();
  };

  const [activityStatus, setActivityStatus] = useState("");

  const downloadFile = () => {
    window.open(
      `https://ecplc2021.herokuapp.com/file/filename/${props.filename}`,

      "_blank"
    );
  };

  const downloadWork = () => {
    myWork.map((e) => {
      return window.open(
        `https://ecplc2021.herokuapp.com/file/filename/${e.activityFile}`,
        "_blank"
      );
    });
  };

  const unsubmit = () => {
    setLoader(true);
    myWork.map((e) => {
      return Axios.put(
        `https://ecplc2021.herokuapp.com/class/delete-turnIn/${props.id}/${props.activityId}/${e._id}`
      ).then((response) => {
        console.log(response.data);
        setLoader(false);
        setInit(response.data.success);
        setActivityStatus(response.data.success);
        setTimeout(() => {
          setActivityStatus("");
          setInit(null);
        }, 5000);
        setShowUndo(false);
      });
    });
  };

  return (
    <>
      {loader && <Loader />}
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="actual-activity-wrapper">
          <div
            className={showUndo ? "actual-activity-wrapper-afters" : "hidden"}
          ></div>
          <div
            className={
              activityStatus === "" ? "hidden" : "actual-activity-wrapper-after"
            }
          >
            {activityStatus}
          </div>

          <div className={showUndo ? "show-discard" : "hidden"}>
            <div className="show-discard-header">
              <p>Are you really sure you want to discard this draft?</p>
            </div>

            <div className="show-discard-body">
              <div
                onClick={() => setShowUndo(false)}
                className="cancel-discard-btn"
              >
                Cancel
              </div>
              <div onClick={unsubmit} className="confirm-discard-btn">
                Confirm
              </div>
            </div>
          </div>
          <StudentDashboard />
          <div className="actual-activity-content">
            <DashboardHeader />
            <div className="actual-activity-header">
              <div className="go-back-btn" onClick={goBack}>
                <i className="fas fa-angle-left"></i>Back
              </div>
            </div>
            <div className="actual-activity-student-body">
              <div className="actual-activity-student-body-left">
                <span>
                  {props.points < 0 ? (
                    "No points"
                  ) : (
                    <>{props.points + " points"} </>
                  )}
                  {myWork.length === 0 ? null : (
                    <>
                      {myWork.map((e) => {
                        return (
                          <i>
                            Turned in: {e.dateSubmitted}{" "}
                            <i className="fas fa-check"></i>
                          </i>
                        );
                      })}
                    </>
                  )}
                </span>
                <div className="actual-activity-body-left-header">
                  <h3>{props.topic}</h3>
                  <p>
                    {!props.due ? (
                      "No due date "
                    ) : (
                      <>
                        Due: {props.due} {props.time}
                      </>
                    )}
                  </p>
                </div>
                <div
                  className={
                    props.instructions === ""
                      ? "hidden"
                      : "actual-activity-body-left-body"
                  }
                >
                  <p> {props.instructions}</p>
                </div>

                <div className="actual-activity-body-left-attach">
                  <p>Attached file</p>
                </div>

                <div className="actual-activity-body-left-footer">
                  <p className="footer-add-word">
                    <InsertDriveFileOutlinedIcon
                      className="material-document"
                      fontSize="small"
                    />
                    {props.filename}
                  </p>
                  <div onClick={downloadFile}>
                    Download <i className="fas fa-download"></i>
                  </div>
                </div>
              </div>

              <div className="actual-activity-body-left-footers">
                <div className="add-your-work-header">
                  <h4>Add your work</h4>
                </div>
                <div className="actual-activity-body-left-attach">
                  <p>
                    <i className="fas fa-paperclip"></i> My work
                  </p>
                </div>

                <div
                  className={
                    myWork.length === 0
                      ? "actual-activity-body-left-attach"
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
                    className={
                      filename === null ? "custom-file-input" : "hidden"
                    }
                  />
                </div>

                {myWork.map((e) => {
                  return (
                    <>
                      <div
                        onClick={downloadWork}
                        className="actual-activity-body-left-footer-file"
                      >
                        <p className="footer-add-word">
                          <InsertDriveFileOutlinedIcon
                            className="material-document"
                            fontSize="small"
                          />
                          <i>{e.activityFile}</i>
                        </p>
                      </div>
                    </>
                  );
                })}
                <input
                  onClick={() => setShowUndo(true)}
                  type="submit"
                  className={
                    myWork.length === 0
                      ? "hidden"
                      : "actual-activity-body-left-submit-btn"
                  }
                  value="Undo turn in"
                />

                <div
                  className={
                    filename !== null
                      ? "actual-activity-body-left-footer-file"
                      : "hidden"
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

                <div className={myWork.length === 0 ? "" : "hidden"}>
                  <input
                    onClick={submitTurnIn}
                    type="submit"
                    className={
                      filename === null
                        ? "actual-activity-body-left-submit-btn-opacity"
                        : "actual-activity-body-left-submit-btn"
                    }
                    value="Turn in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentActualActivity;
