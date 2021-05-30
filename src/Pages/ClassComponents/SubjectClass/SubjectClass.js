import React, { useState, useEffect, useContext } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import "./SubjectClass.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const SubjectClass = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const playSpin = () => {
    setSpinner(true);
  };
  const stopSpin = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 6000);
  };
  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/populate-subjects/${props.id}`
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
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="subject-class-wrapper">
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

                <Link className="nav-span-active">Subjects</Link>

                <Link
                  className="nav-span-diactive"
                  to={"/teacher-class/" + props.id + "/people"}
                >
                  People
                </Link>
              </div>
            </div>

            <div className="subject-class-content-body">
              {subjects.length === 0 ? (
                <>
                  {stopSpin()}
                  {spinner && (
                    <>
                      <div className="subject-loader">
                        <PulseLoader
                          color={`#2ab56f`}
                          size={8}
                          margin={2}
                          loading
                        />
                      </div>
                    </>
                  )}
                  {spinner === false && (
                    <div className="show-no-subjects">No subjects</div>
                  )}
                </>
              ) : (
                <>
                  {subjects[0].map((value) => {
                    return (
                      <Link
                        className="class-by-subject"
                        to={
                          props.activeLink +
                          "/" +
                          value.subjectName +
                          "/activities"
                        }
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
      )}
    </>
  );
};

export default SubjectClass;
