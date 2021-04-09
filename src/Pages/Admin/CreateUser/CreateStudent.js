import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./CreateUser.css";
import Axios from "axios";

const CreateStudent = (props) => {
  const submitStudent = () => {
    Axios.post("https://ecplcsms.herokuapp.com/register-student", {
      id: props.regStudent.id,
      year: props.regStudent.year,
      password: props.regStudent.password,
      rePassword: props.regStudent.rePassword,
      gender: props.regStudent.gender,
      lastname: props.regStudent.lastname,
      firstname: props.regStudent.firstname,
      middlename: props.regStudent.middlename,
      fullname:
        props.regStudent.firstname +
        " " +
        props.regStudent.middlename[0] +
        "." +
        " " +
        props.regStudent.lastname,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
      } else if (response.data.success) {
        setErrMsg(response.data.success);
        setTimeout(() => setErrMsg(""), 15000);
        props.setRegStudent({
          id: "",
          year: "",
          password: "",
          rePassword: "",
          lastname: "",
          firstname: "",
          middlename: "",
          gender: "",
        });
        props.setStudents([
          ...props.students,
          {
            _id: props.regStudent.id,
            firstname: props.regStudent.firstname,
            middlename: props.regStudent.middlename,
            lastname: props.regStudent.lastname,
            fullname:
              props.regStudent.firstname +
              " " +
              props.regStudent.middlename[0] +
              "." +
              " " +
              props.regStudent.lastname,
            year: props.regStudent.year,
            gender: props.regStudent.gender,
          },
        ]);
      }
    });
  };
  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="user-wrapper">
        <div
          className={
            errMsg === ""
              ? "error-prompt"
              : errMsg === "Successfully created account"
              ? "error-prompt-green"
              : "error-prompt-red"
          }
        >
          {errMsg}
        </div>
        <div className="student-account-information">
          <h3>Account Information</h3>
        </div>
        <div>
          <label>Student ID *</label>
          <input
            type="text"
            value={props.regStudent.id}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: value,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
              });
            }}
          ></input>
        </div>

        <div>
          <label>Grade *</label>
          <select
            value={props.regStudent.year}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: value,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
              });
            }}
          >
            <option disabled value="">
              Select Option
            </option>
            <option value="Kinder 1">Kinder 1</option>
            <option value="Kinder 2">Kinder 2</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>

        <div>
          <label>Password *</label>
          <input
            type="text"
            value={props.regStudent.password}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: value,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
              });
            }}
          ></input>
        </div>

        <div>
          <label>Confirm Password *</label>
          <input
            type="text"
            value={props.regStudent.rePassword}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: value,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
              });
            }}
          ></input>
        </div>

        <div className="student-personal-information">
          <h3>Personal Information</h3>
        </div>
        <div>
          <label>Gender *</label>
          <select
            value={props.regStudent.gender}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
                gender: value,
              });
            }}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Last Name *</label>
          <input
            type="text"
            value={props.regStudent.lastname}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: value,
                firstname: props.regStudent.firstname,
                middlename: props.regStudent.middlename,
              });
            }}
          ></input>
        </div>

        <div>
          <label>First Name *</label>
          <input
            type="text"
            value={props.regStudent.firstname}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: value,
                middlename: props.regStudent.middlename,
              });
            }}
          ></input>
        </div>
        <div>
          <label>Middle Name *</label>
          <input
            type="text"
            value={props.regStudent.middlename}
            onChange={(e) => {
              let value = e.target.value;
              props.setRegStudent({
                id: props.regStudent.id,
                userType: props.regStudent.userType,
                year: props.regStudent.year,
                password: props.regStudent.password,
                rePassword: props.regStudent.rePassword,
                gender: props.regStudent.gender,
                lastname: props.regStudent.lastname,
                firstname: props.regStudent.firstname,
                middlename: value,
              });
            }}
          ></input>
        </div>

        <span>
          <input
            onClick={submitStudent}
            id="submit-btn"
            type="submit"
            value="Create"
          />
        </span>
      </form>
      <div className="create-student-info">
        <div className="create-student-info1">
          <div className="create-student-info1-img">
            <div>
              <i class="fas fa-info"></i>
            </div>
          </div>
          <div className="create-student-info1-msg">
            <p>
              Please take note that you are registering a user "<b>student</b>"
              account.
            </p>
          </div>
        </div>
        <div className="create-student-info1">
          <div className="create-student-info1-img">
            <div>
              <i class="fas fa-id-card"></i>
            </div>
          </div>
          <div className="create-student-info1-msg">
            <p>The username of the student is their student ID number.</p>
          </div>
        </div>
        <div className="create-student-info1">
          <div className="create-student-info1-img">
            <div>
              <i class="fas fa-user-edit"></i>
            </div>
          </div>
          <div className="create-student-info1-msg">
            <p>
              User details such as personal information, contact information,
              and password can be edited under user management.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateStudent);
