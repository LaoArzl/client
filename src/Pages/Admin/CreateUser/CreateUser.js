import React, { useEffect, useState, useContext } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./CreateUser.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { CreateStudentContext } from "../../../ContextFiles/CreateStudentContext";
import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";

const CreateUser = () => {
  const { value01, value02 } = useContext(StudentListContext);
  const [users, setUsers] = value01;
  const { value11 } = useContext(CreateStudentContext);
  const [pickButton, setPickButton] = value11;

  const changeTeacher = () => {
    setPickButton(false);
  };
  const changeStudent = () => {
    setPickButton(true);
  };

  return (
    <>
      <div className="create-user-wrapper">
        <Dashboard />
        <div className="create-user-content">
          <DashboardHeader />
          <div className="create-user-actual">
            <div className="create-user-actual-left">
              <div
                onClick={changeTeacher}
                className={
                  pickButton
                    ? "create-student-button"
                    : "create-student-button-active"
                }
              >
                <p>Student</p>
              </div>
              <div
                onClick={changeStudent}
                className={
                  pickButton
                    ? "create-teacher-button-active"
                    : "create-teacher-button"
                }
              >
                <p>Teacher</p>
              </div>
            </div>
            <div className="create-user-actual-right">
              <div className="create-user-error-msg">
                <p>{pickButton ? "Teacher's Form" : "Student's Form"}</p>
              </div>
              {pickButton ? <TeacherForm /> : <StudentForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateUser);
