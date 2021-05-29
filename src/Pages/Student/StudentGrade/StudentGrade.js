import React, { useState, useEffect } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "../../ClassComponents/SubjectClass/SubjectClass.css";
import { Link } from "react-router-dom";
import "../../ClassComponents/SubjectClass/Subject.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const StudentGrade = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  //Activity List
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/class/assignment/${props.id}`).then(
      (response) => {
        if (response.data.length === 0) {
          setActivity([]);
        } else {
          setActivity(response.data.activity);
        }
      }
    );
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
              <div className="subject-content-body-right-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentGrade;
