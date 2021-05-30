import React, { useEffect, useState, useContext } from "react";
import "../../ClassComponents/People/People.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import StudentDashboard from "../../Student/StudentDashboard/StudentDashboard";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const StudentPeople = (props) => {
  const { valueID, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [teacher, setTeacher] = useState("");
  const url = `https://ecplc2021.herokuapp.com/class/class${props.id}`;
  const [showStudents, setShowStudents] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentState, setStudentState] = useState([]);

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/class/class/${props.id}`).then(
      (response) => {
        setStudentData(response.data[0].students);
      }
    );
  }, [props.initial]);

  return (
    <>
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="people-wrapper">
          <StudentDashboard />
          <div className="people-content">
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

                <Link
                  className="nav-span-diactive"
                  to={"/student-class/" + props.id + "/subjects"}
                >
                  Subjects
                </Link>

                <Link className="nav-span-active">People</Link>
              </div>
            </div>

            <div className="people-content-body">
              <div className="people-content-body-wrapper">
                <div className="people-people-teacher-body">
                  <div className="people-teacher-header">
                    <h3>Teacher</h3>
                  </div>
                  <div className="people-teacher-body">
                    <p>{props.adviser}</p> (Adviser)
                  </div>
                </div>
                <div className="people-people-student-body">
                  <div className="people-teacher-header">
                    <h3>Student</h3>
                  </div>
                  <div className="people-student-body">
                    {studentData.map((value) => {
                      return (
                        <div
                          key={value._id}
                          className="people-student-body-wrapper"
                        >
                          {value.fullname}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentPeople;
