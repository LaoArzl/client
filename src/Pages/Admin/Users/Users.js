import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Users.css";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import TeacherList from "./TeacherList";
import StudentList from "./StudentList";

const Users = () => {
  const { value00, value01, value02, value03 } = useContext(StudentListContext);
  const [students, setStudents] = value00;
  const [userType, setUserType] = value02;
  const [searchItem, setSearchItem] = value03;

  const changeTeacher = () => {
    setUserType(true);
  };

  const changeStudent = () => {
    setUserType(false);
  };

  const [filterMenu, setFilterMenu] = useState(false);

  const toggleFilter = () => {
    setFilterMenu(!filterMenu);
  };

  const [filterType, setFilterType] = useState("");
  const all = () => {
    setFilterType("All");
  };

  return (
    <>
      <div className="users-wrapper">
        <Dashboard />
        <div className="users-content">
          <DashboardHeader />
          <div className="users-actual">
            <div className="user-actual-navigation">
              <div className="student-teacher-nav">
                <span
                  onClick={changeStudent}
                  className={
                    userType ? "student-nav-span" : "student-nav-span-active"
                  }
                >
                  Students
                </span>
                <span
                  onClick={changeTeacher}
                  className={
                    userType ? "teacher-nav-span-active" : "teacher-nav-span"
                  }
                >
                  Teachers
                </span>
              </div>
              <Link to="/admin/create-user" className="user-actual-link-create">
                <i class="fas fa-plus"></i>
                <p>Add User</p>
              </Link>
            </div>
            <div className="user-actual-userlist">
              {userType ? <TeacherList /> : <StudentList />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Users);
