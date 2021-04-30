import React, { useState, useEffect } from "react";
import Axios from "axios";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Admission.css";
import StudentAdmission from "./StudentAdmission";
import TeacherAdmission from "./TeacherAdmission";

const Admission = () => {
  const [typeUser, setTypeUser] = useState("student");
  const [studentMsg, setStudentMsg] = useState("");
  const [teacherMsg, setTeacherMsg] = useState("");
  return (
    <>
      <div className="admission-wrapper">
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
                />
              )}
              {typeUser === "teacher" && (
                <TeacherAdmission
                  teacherMsg={teacherMsg}
                  setTeacherMsg={setTeacherMsg}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admission;
