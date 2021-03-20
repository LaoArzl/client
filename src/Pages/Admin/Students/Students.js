import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import StudentRegister from "./StudentRegister";

const Students = () => {
  const { value00, value03 } = useContext(StudentListContext);
  const [students, setStudents] = value00;
  const [searchItem, setSearchItem] = value03;

  const [showReg, setShowReg] = useState(false);
  return (
    <>
      <div className="students-wrapper">
        <Dashboard />
        <div className="students-content">
          <DashboardHeader />
          <div className="students-content-body">
            <div className="students-content-lists-header">
              {showReg ? <p>Add Student</p> : <p>List of students</p>}
              <div
                onClick={() => setShowReg(!showReg)}
                className="add-students"
              >
                <span
                  className={
                    showReg ? "add-students-cancel" : "add-students-span"
                  }
                >
                  {showReg ? (
                    <>
                      <i class="fas fa-window-close"></i> Return
                    </>
                  ) : (
                    <>
                      <i class="fas fa-plus"></i>
                      Add Student
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="students-content-lists-body">
              {showReg ? (
                <>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="create-student-form"
                  >
                    <div className="create-student-form-error"></div>
                    <div className="create-student-id create-div-first">
                      <div className="id-left">
                        <label>Student ID *</label>
                      </div>
                      <div className="id-right ">
                        <input className="ask-imp" type="text" />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Username *</label>
                      </div>
                      <div className="id-right id-right-right">
                        <input type="text" className="id-right-password" />
                        <span className="id-right-generate">Generate</span>
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Password *</label>
                      </div>
                      <div className="id-right id-right-right">
                        <input type="password" className="id-right-password" />
                        <span className="id-right-generate">Generate</span>
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Confirm Password *</label>
                      </div>
                      <div className="id-right">
                        <input type="password" />
                      </div>
                    </div>

                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Last Name *</label>
                      </div>
                      <div className="id-right">
                        <input type="text" />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>First Name *</label>
                      </div>
                      <div className="id-right">
                        <input type="text" />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Middle Name *</label>
                      </div>
                      <div className="id-right">
                        <input type="text" />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Gender</label>
                      </div>
                      <div className="id-right">
                        <select>
                          <option value="">Select option</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="id-right-submit">
                      <input
                        type="reset"
                        className="student-reset"
                        value="Reset"
                      />
                      <input
                        type="submit"
                        className="student-submit"
                        value="Create"
                      />
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="students-content-lists-body-header">
                    <input
                      type="search"
                      className="students-content-search"
                      placeholder="Type to Search"
                      onChange={(e) => setSearchItem(e.target.value)}
                      value={searchItem}
                    />
                  </div>
                  <div className="student-list-header">
                    <div className="student-list-number">#</div>
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
                      } else if (val.user_id.includes(searchItem)) {
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
                          <div className="student-list-body">
                            <div className="student-list-number-span">
                              {key + 1}
                            </div>
                            <div className="student-list-id-span">
                              {value.user_id}
                            </div>
                            <div className="student-list-name-span">
                              {value.fullName}
                            </div>
                            <div className="student-list-gender-span">
                              {value.gender}
                            </div>
                            <div className="student-list-gradelevel-span">
                              {value.gradeLevel}
                            </div>
                            <div className="student-list-action-span">Edit</div>
                          </div>
                        </>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Students);
