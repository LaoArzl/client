import React, { useState, useEffect } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./SubjectClass.css";
import { Link } from "react-router-dom";
import "./Subject.css";
import "./Assignment";
import Assignment from "./Assignment";
import Quiz from "./Quiz";
import Material from "./Material";
import Axios from "axios";
import Draft from "./Draft";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../../Components/Loader/Loader";

const Subjects = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [draft, setDraft] = useState(false);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  //Activity List
  const [activity, setActivity] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/assignment/${props.id}`
    ).then((response) => {
      if (response.data.length === 0) {
        setActivity([]);
      } else {
        setActivity(response.data.activity);
      }
    });
  }, [props.initial]);

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

  return (
    <>
      <div className="subject-class-wrapper">
        <div className={message === "" ? "hidden" : "assignment-wrapper-after"}>
          {message}
        </div>
        {assignment && (
          <Assignment
            setAssignment={setAssignment}
            id={props.id}
            subject={props.subject}
            setActivity={setActivity}
            setInitial={props.setInitial}
            message={message}
            setMessage={setMessage}
          />
        )}
        {quiz && <Quiz setQuiz={setQuiz} />}
        {lecture && (
          <Material
            id={props.id}
            subject={props.subject}
            setInitial={props.setInitial}
            setLecture={setLecture}
            message={props.message}
            setMessage={props.setMessage}
          />
        )}

        {draft && <Draft setInitial={props.setInitial} setDraft={setDraft} />}

        <TeacherDashboard />
        <div className="subject-class-content">
          <DashboardHeader />
          <div
            className={
              props.message === "" ? "hidden" : "assignment-wrapper-after"
            }
          >
            {props.message}
          </div>

          <div className="actual-activity-header">
            <Link to={props.goBack} className="go-back-btn">
              <i className="fas fa-angle-left"></i>Back
            </Link>
            <div
              onClick={() => setDropdown(!dropdown)}
              className="create-activity-dropdown"
            >
              Create
              <i
                className={dropdown ? "fas fa-angle-up" : "fas fa-angle-down"}
              ></i>
              <motion.div
                variants={dropdownVariants}
                initial="initial"
                animate={dropdown ? "visible" : ""}
                transition={{ duration: 0.1 }}
                className="create-activity-dropdown-after"
              >
                <div onClick={() => setAssignment(true)}>Assignment</div>
                <div onClick={() => setQuiz(true)}>Quiz</div>
                <div className="material-item" onClick={() => setLecture(true)}>
                  Material
                </div>
              </motion.div>
            </div>
          </div>

          <div className="subject-content-body">
            <div className="subject-content-body-right">
              <div className="subject-content-body-right-header">
                <b>{props.subject}</b>
                <div className="subject-content-body-right-header-nav">
                  <Link className="subject-content-body-right-header-nav-link-active">
                    Activities
                  </Link>
                  <Link
                    to={props.lectureLink}
                    className="subject-content-body-right-header-nav-link-inactive"
                  >
                    Lectures
                  </Link>
                  <Link
                    to={props.gradeLink}
                    className="subject-content-body-right-header-nav-link-inactive"
                  >
                    Grades
                  </Link>
                </div>
              </div>
              <div className="subject-content-body-right-body">
                <div className="subject-content-assigned-header">
                  <p onClick={() => setShowAssigned(!showAssigned)}>
                    Assigned
                    <i
                      className={
                        showAssigned
                          ? "fas fa-caret-right"
                          : "fas fa-caret-down"
                      }
                    ></i>
                  </p>
                </div>
                <div className="subject-content-assigned-body-wrapper">
                  {activity
                    .filter((subject) => subject.subject === props.subject)
                    .filter((active) => active.active === true)
                    .map((value) => {
                      return (
                        <Link
                          to={
                            value.activityType === "Draft"
                              ? "/draft/" + value._id
                              : "/activity/" + value._id
                          }
                          className={
                            showAssigned
                              ? "hidden"
                              : value.activityType === "Draft"
                              ? "subject-content-assigned-body-draft"
                              : "subject-content-assigned-body"
                          }
                        >
                          <span>
                            <LibraryBooksIcon fontSize="small" />
                          </span>
                          <div className="subject-content-assigned-body-right">
                            <div
                              className={
                                value.activityType === "Draft"
                                  ? "subject-content-assigned-body-draft-title"
                                  : "subject-content-assigned-body-right-title"
                              }
                            >
                              <b>{value.topic}</b>{" "}
                              {value.activityType === "Draft" && <p>(Draft)</p>}
                            </div>
                            <div
                              className={
                                value.activityType === "Draft"
                                  ? "hidden"
                                  : "sub-subject-content-assigned-body-right"
                              }
                            >
                              <div className="activity-topic-value">
                                <p>{value.activityType}</p>
                              </div>
                              <div className="activity-due-value">
                                {value.due === "" ? "" : <p>Due {value.due}</p>}
                              </div>
                              <div className="activity-time-value">
                                {value.due === "" ? "" : <p>{value.time}</p>}
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              value.activityType === "Draft"
                                ? "hidden"
                                : "activity-points-after"
                            }
                          >
                            {value.points < 0 ? (
                              "No points"
                            ) : (
                              <>{value.points + " points"} </>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                </div>

                <div className="subject-content-completed-header">
                  <p onClick={() => setShowCompleted(!showCompleted)}>
                    Completed
                    <i
                      className={
                        showCompleted
                          ? "fas fa-caret-right"
                          : "fas fa-caret-down"
                      }
                    ></i>
                  </p>
                </div>

                {activity
                  .filter((subject) => subject.subject === props.subject)
                  .filter((active) => active.active === false)
                  .map((value) => {
                    return (
                      <Link
                        to={"/activity/" + value._id}
                        className={
                          showCompleted
                            ? "hidden"
                            : "subject-content-completed-body"
                        }
                      >
                        <span>
                          <LibraryAddCheckIcon fontSize="small" />
                        </span>
                        <div className="subject-content-assigned-body-right">
                          <b>{value.topic}</b>
                          <div className="sub-subject-content-assigned-body-right">
                            <div className="activity-topic-value">
                              <p>{value.activityType}</p>
                            </div>
                            <div className="activity-due-value">
                              {value.due === "" ? "" : <p>Due {value.due}</p>}
                            </div>
                            <div className="activity-time-value">
                              {value.due === "" ? "" : <p>{value.time}</p>}
                            </div>
                          </div>
                        </div>

                        <div className="activity-points-after">
                          {value.points < 0 ? (
                            "No points"
                          ) : (
                            <>{value.points + " points"} </>
                          )}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
