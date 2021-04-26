import React, { useContext, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "./CreateUser.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import CreateTeacher from "./CreateTeacher";
import CreateStudent from "./CreateStudent";
import { CreateStudentContext } from "../../../ContextFiles/CreateStudentContext";
import { CreateTeacherContext } from "../../../ContextFiles/CreateTeacherContext";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import Axios from "axios";

const CreateUser = () => {
  const { loginRole } = useContext(LoginContext);
  const { valueRegTeacher } = useContext(CreateTeacherContext);
  const { valueRegStudent, btnState, valueError } = useContext(
    CreateStudentContext
  );
  const { value00, value01 } = useContext(StudentListContext);
  const [students, setStudents] = value00;
  const [teachers, setTeachers] = value01;
  const [regStudent, setRegStudent] = valueRegStudent;
  const [regTeacher, setRegTeacher] = valueRegTeacher;
  const [role, setRole] = loginRole;

  useEffect(() => {
    setRegStudent({
      id: "",
      year: "",
      password: "",
      rePassword: "",
      lastname: "",
      firstname: "",
      middlename: "",
      gender: "",
    });
  }, []);

  useEffect(() => {
    setRegTeacher({
      id: "",
      password: "",
      rePassword: "",
      lastname: "",
      firstname: "",
      middlename: "",
      gender: "",
    });
  }, []);

  const [buttonState, setButtonState] = btnState;

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="create-user-wrapper">
          <Dashboard />
          <div className="create-user-content">
            <DashboardHeader />
            <div className="year-content-header">
              <h3>Admission</h3>
            </div>
            <div className="create-user-content-header">
              <div className="create-user-content-header-wrapper">
                <span
                  onClick={() => setButtonState(false)}
                  className={
                    buttonState === false
                      ? "create-student-btn"
                      : "create-btn-diactive"
                  }
                >
                  Student
                </span>
                <span
                  onClick={() => setButtonState(true)}
                  className={
                    buttonState === true
                      ? "create-teacher-btn"
                      : "create-btn-diactive"
                  }
                >
                  Teacher
                </span>
              </div>
            </div>
            <div className="create-user-content-body">
              {buttonState === false && (
                <CreateStudent
                  setRegStudent={setRegStudent}
                  regStudent={regStudent}
                  students={students}
                  setStudents={setStudents}
                />
              )}
              {buttonState === true && (
                <CreateTeacher
                  setRegTeacher={setRegTeacher}
                  regTeacher={regTeacher}
                  teachers={teachers}
                  setTeachers={setTeachers}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(CreateUser);
