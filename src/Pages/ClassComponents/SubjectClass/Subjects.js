import React, { useState, useEffect } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./SubjectClass.css";
import { Link } from "react-router-dom";
import "./Subject.css";
import "./Assignment";
import Assignment from "./Assignment";
import Quiz from "./Quiz";
import Axios from "axios";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";

const Subjects = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [material, setMaterial] = useState(false);

  //Activity List
  const [activity, setActivity] = useState([]);
  let newA;

  useEffect(() => {
    Axios.get(
      `http://ecplcsms.herokuapp.com/class/assignment/${props.id}`
    ).then((response) => {
      if (response.data.length === 0) {
        setActivity([]);
      } else {
        setActivity(response.data.activity);
      }
    });
  }, [activity]);

  return (
    <>
      <div className="subject-class-wrapper">
        {assignment && (
          <Assignment
            setAssignment={setAssignment}
            id={props.id}
            subject={props.subject}
            setActivity={setActivity}
            activity={activity}
          />
        )}
        {quiz && <Quiz setQuiz={setQuiz} />}

        <TeacherDashboard />
        <div className="subject-class-content">
          <DashboardHeader />
          <div className="class-content-header">
            <div className="class-content-upper-header">
              <h2>{props.name}</h2>
              <p>{props.adviser}</p>
            </div>
            <div className="class-content-lower-header">
              <Link
                to={"/teacher-class/" + props.id}
                className="nav-span-diactive"
              >
                Posts
              </Link>

              <Link
                to={"/teacher-class/" + props.id + "/subjects"}
                className="nav-span-active"
              >
                Subjects
              </Link>

              <Link
                className="nav-span-diactive"
                to={"/teacher-class/" + props.id + "/people"}
              >
                People
              </Link>
            </div>
          </div>

          <div className="subject-content-body">
            <div className="subject-content-body-left">
              <div
                onClick={() => setNav("activity")}
                className={
                  nav === "activity"
                    ? "subject-content-body-left1-active"
                    : "subject-content-body-left1"
                }
              >
                Activities
              </div>
              <div
                onClick={() => setNav("grade")}
                className={
                  nav === "grade"
                    ? "subject-content-body-left2-active"
                    : "subject-content-body-left2"
                }
              >
                Grades
              </div>
            </div>
            <div className="subject-content-body-right">
              <div className="subject-content-body-right-header">
                <b>{props.subject}</b>
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="create-activity-dropdown"
                >
                  Create
                  <i
                    className={
                      dropdown ? "fas fa-angle-up" : "fas fa-angle-down"
                    }
                  ></i>
                  <div
                    className={
                      dropdown ? "create-activity-dropdown-after" : "hidden"
                    }
                  >
                    <div onClick={() => setAssignment(true)}>Assignment</div>
                    <div onClick={() => setQuiz(true)}>Quiz</div>
                  </div>
                </div>
              </div>
              {nav === "activity" ? (
                <>
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
                    {activity
                      .filter((subject) => subject.subject === props.subject)
                      .filter((active) => active.active === true)
                      .map((value) => {
                        return (
                          <Link
                            to={"/activity/" + value._id}
                            className={
                              showAssigned
                                ? "hidden"
                                : "subject-content-assigned-body"
                            }
                          >
                            <span>
                              <LibraryBooksIcon fontSize="small" />
                            </span>
                            <div className="subject-content-assigned-body-right">
                              <b>{value.activityType}</b>
                              <div className="sub-subject-content-assigned-body-right">
                                <div className="activity-topic-value">
                                  <p>{value.topic} |</p>
                                </div>
                                <div className="activity-due-value">
                                  <p>Due {value.due}</p>
                                </div>
                                <div className="activity-time-value">
                                  <p>{value.time}</p>
                                </div>
                              </div>
                            </div>

                            <div className="activity-points-after">
                              {value.points} points
                            </div>
                          </Link>
                        );
                      })}

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
                          <div
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
                              <b>{value.activityType}</b>
                              <div className="sub-subject-content-assigned-body-right">
                                <div className="activity-topic-value">
                                  <p>{value.topic} |</p>
                                </div>
                                <div className="activity-due-value">
                                  <p>Due {value.due}</p>
                                </div>
                                <div className="activity-time-value">
                                  <p>{value.time}</p>
                                </div>
                              </div>
                            </div>

                            <div className="activity-points-after">
                              {value.points} points
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <p>Grade</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
