import React, { useState, useEffect } from "react";
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

const Lecture = (props) => {
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
        {lecture && <Material setLecture={setLecture} />}

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
                <div onClick={() => setLecture(true)}>Lecture</div>
                <div onClick={() => setQuiz(true)}>Quiz</div>
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
                </div>
              </div>
              <div className="subject-content-body-right-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lecture;
