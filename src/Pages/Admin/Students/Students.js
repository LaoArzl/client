import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { CreateStudentContext } from "../../../ContextFiles/CreateStudentContext";
import ReactPaginate from "react-paginate";
import Axios from "axios";

const Students = () => {
  const { value00, value03 } = useContext(StudentListContext);
  const [students, setStudents] = value00;
  const [searchItem, setSearchItem] = value03;

  const {
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value12,
  } = useContext(CreateStudentContext);
  const [userStudent, setUserStudent] = value1;
  const [studentNumber, setStudentNumber] = value2;
  const [usernameStudent, setUsernameStudent] = value3;
  const [passwordStudent, setPasswordStudent] = value4;
  const [rePasswordStudent, setRePasswordStudent] = value5;
  const [lastnameStudent, setLastnameStudent] = value6;
  const [middlenameStudent, setMiddlenameStudent] = value7;
  const [firstnameStudent, setFirstnameStudent] = value8;
  const [genderStudent, setGenderStudent] = value9;
  const [registerStatusStud, setRegisterStatusStud] = value10;

  const refresh = () => {
    setRegisterStatusStud("");
    setUsernameStudent("");
    setUserStudent("Student");
    setPasswordStudent("");
    setFirstnameStudent("");
    setGenderStudent("");
    setMiddlenameStudent("");
    setLastnameStudent("");
    setRePasswordStudent("");
    setStudentNumber("");
  };

  const submitRegister = () => {
    Axios.post("http://localhost:3001/register-student", {
      student_id: studentNumber,
      userStudent: userStudent,
      username: usernameStudent,
      password: passwordStudent,
      rePassword: rePasswordStudent,
      lastname: lastnameStudent,
      fullName:
        firstnameStudent +
        " " +
        middlenameStudent[0] +
        "." +
        " " +
        lastnameStudent,
      middlename: middlenameStudent,
      firstname: firstnameStudent,
      gender: genderStudent,
    }).then((response) => {
      if (response.data.empty) {
        setRegisterStatusStud(response.data.empty);
      } else if (response.data.kulangs) {
        setRegisterStatusStud(response.data.kulangs);
      } else if (response.data.kulangss) {
        setRegisterStatusStud(response.data.kulangss);
      } else if (response.data.notMatch) {
        setRegisterStatusStud(response.data.notMatch);
      } else if (response.data.err) {
        setRegisterStatusStud(response.data.err);
      } else if (response.data.success) {
        setStudents([
          ...students,
          {
            student_id: studentNumber,
            userStudent: userStudent,
            username: usernameStudent,
            password: passwordStudent,
            rePassword: rePasswordStudent,
            lastName: lastnameStudent,
            fullName:
              firstnameStudent +
              " " +
              middlenameStudent[0] +
              "." +
              " " +
              lastnameStudent,
            middleName: middlenameStudent,
            firstName: firstnameStudent,
            gender: genderStudent,
          },
        ]);
        setRegisterStatusStud(response.data.success);
      }
    });
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [showReg, setShowReg] = useState(false);
  const perPage = 10;
  const donePage = pageNumber * perPage;

  const pageCount = Math.ceil(students.length / perPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    setUserStudent("Student");
  }, []);

  return (
    <>
      <div className="students-wrapper">
        <Dashboard />
        <div className="students-content">
          <DashboardHeader />
          <div className="students-content-body">
            <div className="students-content-lists-header">
              {showReg ? <p>Add Student</p> : <p>List of students</p>}
            </div>
            <div className="students-content-lists-body">
              {showReg ? (
                <>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="create-student-form"
                    autoComplete="off"
                  >
                    <div
                      className={
                        registerStatusStud === ""
                          ? "hidinger"
                          : registerStatusStud ===
                            "Successfully created account."
                          ? "user-actual-error"
                          : "user-actual-error-red"
                      }
                    >
                      {registerStatusStud}
                    </div>
                    <div className="create-student-id create-div-first">
                      <div className="id-left">
                        <label>Student ID *</label>
                      </div>
                      <div className="id-right ">
                        <input
                          onChange={(e) => setStudentNumber(e.target.value)}
                          value={studentNumber}
                          className="ask-imp"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Username *</label>
                      </div>
                      <div className="id-right id-right-right">
                        <input
                          onChange={(e) => setUsernameStudent(e.target.value)}
                          value={usernameStudent}
                          type="text"
                          className="id-right-password"
                        />
                        <span className="id-right-generate">Generate</span>
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Password *</label>
                      </div>
                      <div className="id-right id-right-right">
                        <input
                          onChange={(e) => setPasswordStudent(e.target.value)}
                          value={passwordStudent}
                          type="password"
                          className="id-right-password"
                        />
                        <span className="id-right-generate">Generate</span>
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Confirm Password *</label>
                      </div>
                      <div className="id-right">
                        <input
                          onChange={(e) => setRePasswordStudent(e.target.value)}
                          value={rePasswordStudent}
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Last Name *</label>
                      </div>
                      <div className="id-right">
                        <input
                          onChange={(e) => setLastnameStudent(e.target.value)}
                          value={lastnameStudent}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>First Name *</label>
                      </div>
                      <div className="id-right">
                        <input
                          onChange={(e) => setFirstnameStudent(e.target.value)}
                          value={firstnameStudent}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Middle Name *</label>
                      </div>
                      <div className="id-right">
                        <input
                          onChange={(e) => setMiddlenameStudent(e.target.value)}
                          value={middlenameStudent}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="create-student-id">
                      <div className="id-left">
                        <label>Gender</label>
                      </div>
                      <div className="id-right">
                        <select
                          onChange={(e) => setGenderStudent(e.target.value)}
                          value={genderStudent}
                        >
                          <option value="">Select option</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="id-right-submit">
                      <input
                        onClick={refresh}
                        type="reset"
                        className="student-reset"
                        value="Reset"
                      />
                      <input
                        onClick={submitRegister}
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
                    <span
                      onClick={() => setShowReg(!showReg)}
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
                  <div className="student-list-header">
                    <div className="student-list-number">#</div>
                    <div className="student-list-id">Student ID</div>
                    <div className="student-list-name">Name</div>
                    <div className="student-list-gender">Gender</div>
                    <div className="student-list-gradelevel">Year</div>
                    <div className="student-list-action">Action</div>
                  </div>
                  {}
                  {students

                    .filter((val) => {
                      if (searchItem === "") {
                        return val;
                      } else if (val.student_id.includes(searchItem)) {
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
                              {value.student_id}
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
                    })
                    .slice(donePage, donePage + perPage)}
                </>
              )}
              <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginationContainer"
                previousLinkClassName="prevButton"
                nextLinkClassName="nextButton"
                disabledLinkClassName="disableButton"
                activeLinkClassName="activeButton"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Students);
