import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "../Students/Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Teachers = () => {
  const { value01, value04 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [searchTeacher, setSearchTeacher] = value04;
  const [showExport, setShowExport] = useState(false);
  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="students-wrapper">
          <Dashboard />
          <div className="students-content">
            <DashboardHeader />
            <div className="students-content-lists-header">
              <h2>Teachers</h2>
            </div>
            <div className="students-content-lists-body">
              <div className="students-content-lists-body-header">
                <input
                  type="search"
                  className="students-content-search"
                  placeholder="Type to Search"
                  onChange={(e) => setSearchTeacher(e.target.value)}
                  value={searchTeacher}
                />
                <div className="add-student-span-wrapper">
                  <span
                    onClick={() => setShowExport(!showExport)}
                    className="add-students-span-two"
                  >
                    Export <i class="fas fa-caret-square-down"></i>
                    <ul
                      className={
                        showExport ? "add-students-span-two-after" : "hidinger"
                      }
                    >
                      <li>.CSV</li>
                      <li>.pdf</li>
                      <li>.docx</li>
                    </ul>
                  </span>
                </div>
              </div>
              <div className="student-list-header">
                <div className="student-list-number">#</div>
                <div className="student-list-id">Teacher ID</div>
                <div className="student-list-name">Name</div>
                <div className="student-list-gender">Gender</div>
                <div className="student-list-gradelevel">Advising</div>
                <div className="student-list-action">Action</div>
              </div>
              {teachers
                .filter((val) => {
                  if (searchTeacher === "") {
                    return val;
                  } else if (val._id.includes(searchTeacher)) {
                    return val;
                  } else if (
                    val.fullName
                      .toLowerCase()
                      .includes(searchTeacher.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((value, key) => {
                  return (
                    <>
                      <div className="student-list-body">
                        <div className="student-list-number-span">
                          {key + 1}
                        </div>
                        <div className="student-list-id-span">{value._id}</div>
                        <div className="student-list-name-span">
                          {value.fullname}
                        </div>
                        <div className="student-list-gender-span">
                          {value.gender}
                        </div>
                        <div className="student-list-gradelevel-span">
                          {value.username}
                        </div>
                        <div className="student-list-action-span">
                          <Link
                            className="student-list-action-link"
                            to={"/admin/edit-user/" + value._id}
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Teachers);
