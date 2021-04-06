import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./CreateUser.css";
import Axios from "axios";

const CreateTeacher = (props) => {
  const submitTeacher = () => {
    Axios.post("http://localhost:3001/register-teacher", {
      id: props.regTeacher.id,
      password: props.regTeacher.password,
      rePassword: props.regTeacher.rePassword,
      gender: props.regTeacher.gender,
      lastname: props.regTeacher.lastname,
      firstname: props.regTeacher.firstname,
      middlename: props.regTeacher.middlename,
      fullname:
        props.regTeacher.firstname +
        " " +
        props.regTeacher.middlename[0] +
        "." +
        " " +
        props.regTeacher.lastname,
    }).then((response) => {
      if (response.data.err) {
        setErrMsgs(response.data.err);
      } else if (response.data.success) {
        setErrMsgs(response.data.success);
        setTimeout(() => setErrMsgs(""), 5000);
        props.setRegTeacher({
          id: "",
          password: "",
          rePassword: "",
          lastname: "",
          firstname: "",
          middlename: "",
          gender: "",
        });
        props.setTeachers([
          ...props.teachers,
          {
            _id: props.regTeacher.id,
            firstname: props.regTeacher.firstname,
            middlename: props.regTeacher.middlename,
            lastname: props.regTeacher.lastname,
            fullname:
              props.regTeacher.firstname +
              " " +
              props.regTeacher.middlename[0] +
              "." +
              " " +
              props.regTeacher.lastname,
            gender: props.regTeacher.gender,
          },
        ]);
      }
    });
  };
  const [errMsgs, setErrMsgs] = useState("");
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="user-wrapper">
        <div
          className={
            errMsgs === ""
              ? "error-prompt"
              : errMsgs === "Successfully created account"
              ? "error-prompt-green"
              : "error-prompt-red"
          }
        >
          {errMsgs}
        </div>
        <div className="error-prompt"></div>
        <div className="left-right-wrapper">
          <div className="user-wrapper-left">
            <div>
              <label>Teacher ID *</label>
              <input
                type="text"
                value={props.regTeacher.id}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: value,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: props.regTeacher.rePassword,
                    lastname: props.regTeacher.lastname,
                    firstname: props.regTeacher.firstname,
                    middlename: props.regTeacher.middlename,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>Password *</label>
              <input
                type="text"
                value={props.regTeacher.password}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: value,
                    rePassword: props.regTeacher.rePassword,
                    lastname: props.regTeacher.lastname,
                    firstname: props.regTeacher.firstname,
                    middlename: props.regTeacher.middlename,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>Confirm Password *</label>
              <input
                type="text"
                value={props.regTeacher.rePassword}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: value,
                    lastname: props.regTeacher.lastname,
                    firstname: props.regTeacher.firstname,
                    middlename: props.regTeacher.middlename,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>Gender *</label>
              <select
                value={props.regTeacher.gender}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: props.regTeacher.rePassword,
                    lastname: props.regTeacher.lastname,
                    firstname: props.regTeacher.firstname,
                    middlename: props.regTeacher.middlename,
                    gender: value,
                  });
                }}
              >
                <option disabled value="">
                  Select Option
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="user-wrapper-right">
            <div>
              <label>Last Name *</label>
              <input
                type="text"
                value={props.regTeacher.lastname}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: props.regTeacher.rePassword,
                    lastname: value,
                    firstname: props.regTeacher.firstname,
                    middlename: props.regTeacher.middlename,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>

            <div>
              <label>First Name *</label>
              <input
                type="text"
                value={props.regTeacher.firstname}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: props.regTeacher.rePassword,
                    lastname: props.regTeacher.lastname,
                    firstname: value,
                    middlename: props.regTeacher.middlename,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>
            <div>
              <label>Middle Name *</label>
              <input
                type="text"
                value={props.regTeacher.middlename}
                onChange={(e) => {
                  let value = e.target.value;
                  props.setRegTeacher({
                    id: props.regTeacher.id,
                    userType: props.regTeacher.userType,
                    password: props.regTeacher.password,
                    rePassword: props.regTeacher.rePassword,
                    lastname: props.regTeacher.lastname,
                    firstname: props.regTeacher.firstname,
                    middlename: value,
                    gender: props.regTeacher.gender,
                  });
                }}
              ></input>
            </div>



            <span>
              <input
                onClick={submitTeacher}
                id="submit-btn"
                type="submit"
                value="Create"
              />
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default withRouter(CreateTeacher);
