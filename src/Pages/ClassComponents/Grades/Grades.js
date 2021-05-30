import React, { useState, useEffect, useContext } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "../../ClassComponents/SubjectClass/SubjectClass.css";
import { Link } from "react-router-dom";
import "../../ClassComponents/SubjectClass/Subject.css";
import Assignment from "../../ClassComponents/SubjectClass/Assignment";
import Quiz from "../../ClassComponents/SubjectClass/Quiz";
import Material from "../../ClassComponents/SubjectClass/Material";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import { motion } from "framer-motion";

const Grades = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [lecture, setLecture] = useState(false);

  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  //Activity List
  const [activity, setActivity] = useState([]);

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

  /*Quarter state*/
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);

  const dropdownVariants = {
    visible: {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 3,
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
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="subject-class-wrapper">
          {assignment && (
            <Assignment
              setAssignment={setAssignment}
              id={props.id}
              subject={props.subject}
              setActivity={setActivity}
              activity={activity}
              setInitial={props.setInitial}
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
                  <div
                    className="material-item"
                    onClick={() => setLecture(true)}
                  >
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
                    <Link
                      to={props.activityLink}
                      className="subject-content-body-right-header-nav-link-inactive"
                    >
                      Activities
                    </Link>
                    <Link
                      to={props.lectureLink}
                      className="subject-content-body-right-header-nav-link-inactive"
                    >
                      Lectures
                    </Link>
                    <Link className="subject-content-body-right-header-nav-link-active">
                      Grades
                    </Link>
                  </div>
                </div>
                <div className="subject-content-body-right-body">
                  <div className="subject-content-assigned-header">
                    <p onClick={() => setFirst(!first)}>
                      1st Quarter
                      <i
                        className={
                          first ? "fas fa-caret-right" : "fas fa-caret-down"
                        }
                      ></i>
                    </p>
                  </div>

                  {activity
                    .filter((e) => e.quarter === "1st Quarter")
                    .map((value) => {
                      return (
                        <Link
                          to={"/lecture/" + value._id}
                          className={
                            first ? "hidden" : "subject-content-assigned-body"
                          }
                        >
                          <span>
                            <LibraryAddCheckIcon fontSize="small" />
                          </span>
                          <div className="subject-content-assigned-body-right">
                            <b>{value.topic}</b>
                            <div className="sub-subject-content-assigned-body-right">
                              <div className="activity-topic-value">
                                <p>Lecture</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                  <div className="subject-content-assigned-header">
                    <p onClick={() => setSecond(!second)}>
                      2nd Quarter
                      <i
                        className={
                          second ? "fas fa-caret-right" : "fas fa-caret-down"
                        }
                      ></i>
                    </p>
                  </div>

                  {activity
                    .filter((e) => e.quarter === "2nd Quarter")
                    .map((value) => {
                      return (
                        <Link
                          to={"/lecture/" + value._id}
                          className={
                            second ? "hidden" : "subject-content-assigned-body"
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
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                  <div className="subject-content-assigned-header">
                    <p onClick={() => setThird(!third)}>
                      3rd Quarter
                      <i
                        className={
                          third ? "fas fa-caret-right" : "fas fa-caret-down"
                        }
                      ></i>
                    </p>
                  </div>

                  {activity
                    .filter((e) => e.quarter === "3rd Quarter")
                    .map((value) => {
                      return (
                        <Link
                          to={"/lecture/" + value._id}
                          className={
                            third ? "hidden" : "subject-content-assigned-body"
                          }
                        >
                          <span>
                            <LibraryAddCheckIcon fontSize="small" />
                          </span>
                          <div className="subject-content-assigned-body-right">
                            <b>{value.topic}</b>
                            <div className="sub-subject-content-assigned-body-right">
                              <div className="activity-topic-value">
                                <p>Lecture</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                  <div className="subject-content-assigned-header">
                    <p onClick={() => setFourth(!fourth)}>
                      4th Quarter
                      <i
                        className={
                          fourth ? "fas fa-caret-right" : "fas fa-caret-down"
                        }
                      ></i>
                    </p>
                  </div>

                  {activity
                    .filter((e) => e.quarter === "4th Quarter")
                    .map((value) => {
                      return (
                        <Link
                          to={"/lecture/" + value._id}
                          className={
                            fourth ? "hidden" : "subject-content-assigned-body"
                          }
                        >
                          <span>
                            <LibraryAddCheckIcon fontSize="small" />
                          </span>
                          <div className="subject-content-assigned-body-right">
                            <b>{value.topic}</b>
                            <div className="sub-subject-content-assigned-body-right">
                              <div className="activity-topic-value">
                                <p>Lecture</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Grades;
