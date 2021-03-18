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
            <div className="users-actual-student-header">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="user-actual-search"
              >
                <input
                  type="search"
                  placeholder="Search"
                  className="user-actual-search-input"
                  onChange={(e) => setSearchItem(e.target.value)}
                  value={searchItem}
                />
                <input
                  type="submit"
                  value="Search"
                  className="user-actual-search-search"
                />
              </form>
              <Link to="/admin/create-user" className="user-actual-link-create">
                <i class="fas fa-plus"></i>
                <p>Add User</p>
              </Link>
            </div>
            <div className="user-actual-navigation">
              <span
                onClick={changeStudent}
                className={
                  userType
                    ? "user-actual-nav-student"
                    : "user-actual-nav-student-active"
                }
              >
                <p>Student</p>
              </span>
              <span
                onClick={changeTeacher}
                className={
                  userType
                    ? "user-actual-nav-teacher-active"
                    : "user-actual-nav-teacher"
                }
              >
                <p>Teacher</p>
              </span>
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
