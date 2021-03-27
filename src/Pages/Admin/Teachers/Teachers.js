import React, { useContext, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "../Students/Students.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { CreateTeacherContext } from "../../../ContextFiles/CreateTeacherContext";
import Axios from "axios";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Teachers = () => {
  const { value01, value04 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [searchTeacher, setSearchTeacher] = value04;

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
  } = useContext(CreateTeacherContext);
  const [userTeacher, setUserTeacher] = value1;
  const [teacherNumber, setTeacherNumber] = value2;
  const [usernameTeacher, setUsernameTeacher] = value3;
  const [passwordTeacher, setPasswordTeacher] = value4;
  const [rePasswordTeacher, setRePasswordTeacher] = value5;
  const [lastnameTeacher, setLastnameTeacher] = value6;
  const [middlenameTeacher, setMiddlenameTeacher] = value7;
  const [firstnameTeacher, setFirstnameTeacher] = value8;
  const [genderTeacher, setGenderTeacher] = value9;
  const [registerStatusTeac, setRegisterStatusTeac] = value10;

  const refresh = () => {
    setRegisterStatusTeac("");
    setUsernameTeacher("");
    setUserTeacher("Teacher");
    setPasswordTeacher("");
    setFirstnameTeacher("");
    setGenderTeacher("");
    setMiddlenameTeacher("");
    setLastnameTeacher("");
    setRePasswordTeacher("");
    setTeacherNumber("");
  };
  const submitRegister = () => {
    Axios.post("http://localhost:3001/register-teacher", {
      teacher_id: teacherNumber,
      userTeacher: userTeacher,
      username: usernameTeacher,
      password: passwordTeacher,
      rePassword: rePasswordTeacher,
      lastname: lastnameTeacher,
      middlename: middlenameTeacher,
      firstname: firstnameTeacher,
      fullName:
        firstnameTeacher +
        " " +
        middlenameTeacher[0] +
        "." +
        " " +
        lastnameTeacher,
      gender: genderTeacher,
    }).then((response) => {
      if (response.data.empty) {
        setRegisterStatusTeac(response.data.empty);
      } else if (response.data.kulangs) {
        setRegisterStatusTeac(response.data.kulangs);
      } else if (response.data.kulangss) {
        setRegisterStatusTeac(response.data.kulangss);
      } else if (response.data.notMatch) {
        setRegisterStatusTeac(response.data.notMatch);
      } else if (response.data.err) {
        setRegisterStatusTeac(response.data.err);
      } else if (response.data.success) {
        setTeachers([
          ...teachers,
          {
            _id: teacherNumber,
            userTeacher: userTeacher,
            username: usernameTeacher,
            password: passwordTeacher,
            rePassword: rePasswordTeacher,
            lastName: lastnameTeacher,
            middleName: middlenameTeacher,
            firstName: firstnameTeacher,
            fullName:
              firstnameTeacher +
              " " +
              middlenameTeacher[0] +
              "." +
              " " +
              lastnameTeacher,
            gender: genderTeacher,
          },
        ]);
        setRegisterStatusTeac(response.data.success);
      }
    });
  };

  useEffect(() => {
    setUserTeacher("Teacher");
  }, []);

  const [showReg, setShowReg] = useState(false);

  return (
    <>
      <div className="students-wrapper">
        <Dashboard />
        <div className="students-content">
          <DashboardHeader />
          <div className="students-content-lists-header">
            {showReg ? "" : <p>List of Teachers</p>}
            <div onClick={() => setShowReg(!showReg)} className="add-students">
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
                    Add Teacher
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
                  autoComplete="off"
                >
                  <div
                    className={
                      registerStatusTeac === ""
                        ? "hidinger"
                        : registerStatusTeac === "Successfully created account."
                        ? "user-actual-error"
                        : "user-actual-error-red"
                    }
                  >
                    {registerStatusTeac}
                  </div>
                  <div className="create-student-id create-div-first">
                    <div className="id-left">
                      <label>Teacher ID *</label>
                    </div>
                    <div className="id-right ">
                      <input
                        onChange={(e) => setTeacherNumber(e.target.value)}
                        value={teacherNumber}
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
                        onChange={(e) => setUsernameTeacher(e.target.value)}
                        value={usernameTeacher}
                        type="text"
                        className="id-right-username"
                      />
                    </div>
                  </div>
                  <div className="create-student-id">
                    <div className="id-left">
                      <label>Password *</label>
                    </div>
                    <div className="id-right id-right-right">
                      <input
                        onChange={(e) => setPasswordTeacher(e.target.value)}
                        value={passwordTeacher}
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
                        onChange={(e) => setRePasswordTeacher(e.target.value)}
                        value={rePasswordTeacher}
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
                        onChange={(e) => setLastnameTeacher(e.target.value)}
                        value={lastnameTeacher}
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
                        onChange={(e) => setFirstnameTeacher(e.target.value)}
                        value={firstnameTeacher}
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
                        onChange={(e) => setMiddlenameTeacher(e.target.value)}
                        value={middlenameTeacher}
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
                        onChange={(e) => setGenderTeacher(e.target.value)}
                        value={genderTeacher}
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
                    onChange={(e) => setSearchTeacher(e.target.value)}
                    value={searchTeacher}
                  />
                </div>
                <div className="student-list-header">
                  <div className="student-list-number">#</div>
                  <div className="student-list-id">Teacher ID</div>
                  <div className="student-list-name">Name</div>
                  <div className="student-list-gender">Gender</div>
                  <div className="student-list-gradelevel">Year</div>
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
                          <div className="student-list-id-span">
                            {value._id}
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
                          <div className="student-list-action-span">
                            <Tippy
                              content="Edit"
                              arrow={false}
                              placement="left"
                            >
                              <Link
                                className="student-list-action-link"
                                to={"/admin/users/teacher-profile/" + value._id}
                              >
                                <i class="far fa-edit"></i>
                              </Link>
                            </Tippy>
                            <Tippy
                              content="Delete"
                              arrow={false}
                              placement="right"
                            >
                              <i class="far fa-trash-alt"></i>
                            </Tippy>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Teachers);
