import React, { useState, useEffect } from "react";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import "../../ClassComponents/SubjectClass/SubjectClass.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const StudentSubject = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const playSpin = () => {
    setSpinner(true);
  };
  const stopSpin = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  };
  useEffect(() => {
    Axios.get(
      `https://ecplcsms.herokuapp.com/class/populate-subjects/${props.id}`
    ).then((response) => {
      let tempSub = response.data.year;
      setSubjects(
        tempSub.map((sub) => {
          return sub.subjects;
        })
      );
    });
  }, []);

  return (
    <>
      <div className="subject-class-wrapper">
        <StudentDashboard />
        <div className="subject-class-content">
          <DashboardHeader />

          <div className="class-content-header">
            <div className="class-content-upper-header">
              <h2>{props.name}</h2>
              <p>{props.adviser}</p>
            </div>
            <div className="class-content-lower-header">
              <Link
                to={"/student-class/" + props.id}
                className="nav-span-diactive"
              >
                Posts
              </Link>

              <Link className="nav-span-active">Subjects</Link>

              <Link
                className="nav-span-diactive"
                to={"/student-class/" + props.id + "/people"}
              >
                People
              </Link>
            </div>
          </div>

          <div className="subject-class-content-body">
            {subjects.length === 0 ? (
              <>
                {stopSpin()}
                {spinner && <Loader />}
                {spinner === false && (
                  <div className="show-no-subjects">No Subjects</div>
                )}
              </>
            ) : (
              <>
                {subjects[0].map((value) => {
                  return (
                    <Link
                      className="class-by-subject"
                      to={props.activeLink + "/" + value.subjectName + "/activities"}
                    >
                      <i className="far fa-folder"></i>
                      {value.subjectName}
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSubject;
