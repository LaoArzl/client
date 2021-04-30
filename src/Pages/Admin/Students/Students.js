import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Students = () => {
  const { value00, value03 } = useContext(StudentListContext);
  const [students, setStudents] = value00;
  const [searchItem, setSearchItem] = value03;

  // const generatePassword = () => {
  //   let result = "";
  //   let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   let charactersLength = characters.length;
  //   for (var i = 0; i < 5; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   setPasswordStudent("ECPLC" + result);
  // };

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
            <div className="students-content-lists-body-header">
              <div className="div-class-search">
                <i className="fas fa-search"></i>
                <input type="search" placeholder="Search for a student"></input>
              </div>
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

            <div className="students-content-lists-body">
              <div className="student-list-header">
                <div className="student-list-id">Student ID</div>
                <div className="student-list-name">Name</div>
                <div className="student-list-gender">Gender</div>
                <div className="student-list-gradelevel">Year</div>
                <div className="student-list-action">Action</div>
              </div>
              {students

                .filter((val) => {
                  if (searchItem === "") {
                    return val;
                  } else if (val._id.includes(searchItem)) {
                    return val;
                  } else if (
                    val.fullName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return val;
                  }
                })

                .map((value, key) => {
                  return (
                    <>
                      <div key={value._id} className="student-list-body">
                        <div className="student-list-id-span">{value._id}</div>
                        <div className="student-list-name-span">
                          {value.fullname}
                        </div>
                        <div className="student-list-gender-span">
                          {value.gender}
                        </div>
                        <div className="student-list-gradelevel-span">
                          {value.year}
                        </div>
                        <div className="student-list-action-span">
                          <Link
                            className="student-list-action-link"
                            to={"/admin/edit-user/" + value._id}
                          >
                            <i class="fas fa-pen"></i>
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

export default withRouter(Students);
