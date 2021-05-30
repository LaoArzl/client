import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Admission.css";
import StudentAdmission from "./StudentAdmission";
import TeacherAdmission from "./TeacherAdmission";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import Loader from "../../../Components/Loader/Loader";

const Admission = (props) => {
  const [typeUser, setTypeUser] = useState("student");
  const [studentMsg, setStudentMsg] = useState("");
  const [teacherMsg, setTeacherMsg] = useState("");
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader && <Loader />}
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="admission-wrapper">
          <div
            className={
              studentMsg === "Successfully created."
                ? "successfully-created"
                : "successfully-created-hidden"
            }
          >
            {studentMsg}
            <i
              onClick={() => setStudentMsg("")}
              className="fas fa-times-circle"
            ></i>
          </div>

          <div
            className={
              teacherMsg === "Successfully created."
                ? "successfully-created"
                : "successfully-created-hidden"
            }
          >
            {teacherMsg}
            <i
              onClick={() => setTeacherMsg("")}
              className="fas fa-times-circle"
            ></i>
          </div>
          <Dashboard />
          <div className="admission-content">
            <DashboardHeader />
            <div className="admission-content-body">
              <div className="admission-navigation">
                <div
                  onClick={() => setTypeUser("student")}
                  className={
                    typeUser === "student"
                      ? "admission-nav-student-active"
                      : "admission-nav-student"
                  }
                >
                  Student
                  <i
                    class={typeUser === "student" ? "fas fa-chevron-right" : ""}
                  ></i>
                </div>
                <div
                  onClick={() => setTypeUser("teacher")}
                  className={
                    typeUser === "teacher"
                      ? "admission-nav-teacher-active"
                      : "admission-nav-teacher"
                  }
                >
                  Teacher
                  <i
                    class={typeUser === "teacher" ? "fas fa-chevron-right" : ""}
                  ></i>
                </div>
              </div>
              <div className="admission-right">
                {typeUser === "student" && (
                  <StudentAdmission
                    studentMsg={studentMsg}
                    setStudentMsg={setStudentMsg}
                    setInitial={props.setInitial}
                    setLoader={setLoader}
                  />
                )}
                {typeUser === "teacher" && (
                  <TeacherAdmission
                    setLoader={setLoader}
                    teacherMsg={teacherMsg}
                    setTeacherMsg={setTeacherMsg}
                    setInitial={props.setInitial}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admission;
