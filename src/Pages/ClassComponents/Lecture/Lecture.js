import React, { useState, useEffect } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "../../ClassComponents/SubjectClass/SubjectClass.css";
import { Link } from "react-router-dom";
import "../../ClassComponents/SubjectClass/Subject.css";
import Assignment from "../SubjectClass/Assignment";
import Quiz from "../SubjectClass/Quiz";
import Material from "../SubjectClass/Material";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const Lecture = (props) => {
  const [showAssigned, setShowAssigned] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [nav, setNav] = useState("activity");
  const [assignment, setAssignment] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [lecture, setLecture] = useState(false);

  /*Quarter state*/
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [filtered, setFiltered] = useState("All");

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
        setActivity(response.data.lecture);
      }
    });
  }, [props.initial]);

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
          />
        )}

        <TeacherDashboard />
        <div className="subject-class-content">
          <DashboardHeader />

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
              <div
                className={
                  dropdown ? "create-activity-dropdown-after" : "hidden"
                }
              >
                <div onClick={() => setAssignment(true)}>Assignment</div>
                <div onClick={() => setQuiz(true)}>Quiz</div>
                <div className="material-item" onClick={() => setLecture(true)}>
                  Material
                </div>
              </div>
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
                  <Link className="subject-content-body-right-header-nav-link-active">
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
                <div className="subject-content-assigned-headers">
                  <div
                    className="quarter-filtered"
                    onClick={() => setDropdown2(!dropdown2)}
                  >
                    <div
                      className={
                        dropdown2 ? "quarter-filtered-after" : "hidden"
                      }
                    >
                      <div
                        onClick={() => {
                          setFiltered("All");
                          setDropdown2(false);
                        }}
                        className="quarter-filtered-items"
                      >
                        All
                      </div>
                      <div
                        onClick={() => {
                          setFiltered("1st Quarter");
                          setDropdown2(false);
                        }}
                        className="quarter-filtered-items"
                      >
                        1st Quarter
                      </div>
                      <div
                        onClick={() => {
                          setFiltered("2nd Quarter");
                          setDropdown2(false);
                        }}
                        className="quarter-filtered-items"
                      >
                        2nd Quarter
                      </div>
                      <div
                        onClick={() => {
                          setFiltered("3rd Quarter");
                          setDropdown2(false);
                        }}
                        className="quarter-filtered-items"
                      >
                        3rd Quarter
                      </div>
                      <div
                        onClick={() => {
                          setFiltered("4th Quarter");
                          setDropdown2(false);
                        }}
                        className="quarter-filtered-items"
                      >
                        4th Quarter
                      </div>
                    </div>
                    Filter By: {filtered}
                    <i
                      className={
                        dropdown2 ? "fas fa-angle-up" : "fas fa-angle-down"
                      }
                    ></i>
                  </div>
                </div>

                {filtered === "All" ? (
                  <>
                    {activity.map((value) => {
                      return (
                        <Link
                          to={"/lecture/" + value._id}
                          className={
                            first ? "hidden" : "subject-content-assigned-body"
                          }
                        >
                          <span>
                            <MenuBookIcon fontSize="small" />
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
                  </>
                ) : (
                  <>
                    {activity
                      .filter((e) => e.quarter === filtered)
                      .map((value) => {
                        return (
                          <Link
                            to={"/lecture/" + value._id}
                            className={
                              first ? "hidden" : "subject-content-assigned-body"
                            }
                          >
                            <span>
                              <MenuBookIcon fontSize="small" />
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lecture;
