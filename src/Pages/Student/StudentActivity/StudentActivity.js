import React, { useState, useEffect } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { Link } from "react-router-dom";
import Axios from "axios";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { useHistory } from "react-router-dom";

const StudentActivity = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [lecture, setLecture] = useState(false);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  //Activity List
  const [activity, setActivity] = useState([]);

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
  }, [props.initial]);

  return (
    <>
      <div className="subject-class-wrapper">

        <StudentDashboard />
        <div className="subject-class-content">
          <DashboardHeader />

          <div className="actual-activity-header">
            <Link to={props.goBack} className="go-back-btn">
              <i className="fas fa-angle-left"></i>Back
            </Link>
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

export default StudentActivity;
