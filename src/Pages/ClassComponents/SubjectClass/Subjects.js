import React, { useState } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./SubjectClass.css";
import { Link } from "react-router-dom";
import "./Subject.css";
import "./Assignment";
import Assignment from "./Assignment";

const Subjects = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  return (
    <>
      <div className="subject-class-wrapper">
        {assignment && <Assignment setAssignment={setAssignment} />}
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
                  <i className="fas fa-plus"></i>Create
                  <div
                    className={
                      dropdown ? "create-activity-dropdown-after" : "hidden"
                    }
                  >
                    <div onClick={() => setAssignment(true)}>Assignment</div>
                    <div>Quiz</div>
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
                    <div
                      className={
                        showAssigned
                          ? "hidden"
                          : "subject-content-assigned-body"
                      }
                    >
                      Hello
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

                    <div
                      className={
                        showCompleted
                          ? "hidden"
                          : "subject-content-assigned-body"
                      }
                    >
                      Done
                    </div>
                    <div
                      className={
                        showCompleted
                          ? "hidden"
                          : "subject-content-assigned-body"
                      }
                    >
                      Done
                    </div>
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
