import React, { useContext, useEffect } from "react";
import "./CreateUser.css";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { CreateTeacherContext } from "../../../ContextFiles/CreateTeacherContext";

const StudentForm = () => {
  const { value01, value02 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;

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

  const similarUsername = () => {
    if (teacherNumber) {
      const tempUsername = teacherNumber.replace(/\D/g, "");
      setUsernameTeacher("ECPLC" + tempUsername);
    } else {
      setUsernameTeacher("");
    }
  };

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
      idnumber: teacherNumber,
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
            user_id: teacherNumber,
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

  const generatePassword = () => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setPasswordTeacher(result);
  };

  return (
    <>
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
      <form autoComplete="off" className="create-user-form">
        <div className="create-user-form-wrapper">
          <div className="left-form">
            <div className="type-of-user">
              <label>Type of User *</label>
              <input name="userTeacher" value={userTeacher} />
            </div>

            <div className="type-of-user">
              <label>I.D Number *</label>
              <input
                type="text"
                name="Idnumber"
                onChange={(e) => setTeacherNumber(e.target.value)}
                value={teacherNumber}
              />
            </div>

            <div className="type-of-user">
              <label>Username *</label>
              <input
                type="text"
                onChange={(e) => setUsernameTeacher(e.target.value)}
                name="Username"
                value={usernameTeacher}
              />
            </div>

            <div className="type-of-user">
              <label>Password *</label>
              <input
                type="password"
                name="Password"
                onClick={generatePassword}
                onChange={(e) => setPasswordTeacher(e.target.value)}
                value={passwordTeacher}
              />
            </div>

            <div className="type-of-user">
              <label>Confirm password *</label>
              <input
                type="password"
                name="rePassword"
                onChange={(e) => setRePasswordTeacher(e.target.value)}
                value={rePasswordTeacher}
              />
            </div>
          </div>
          <div className="right-form">
            <div className="type-of-user">
              <label>Last Name *</label>
              <input
                type="text"
                name="Lastname"
                onChange={(e) => setLastnameTeacher(e.target.value)}
                value={lastnameTeacher}
              />
            </div>

            <div className="type-of-user">
              <label>First Name *</label>
              <input
                type="text"
                name="firstname"
                onChange={(e) => {
                  setFirstnameTeacher(e.target.value);
                }}
                value={firstnameTeacher}
              />
            </div>

            <div className="type-of-user">
              <label>Middle Name *</label>
              <input
                type="text"
                name="Middlename"
                onChange={(e) => setMiddlenameTeacher(e.target.value)}
                value={middlenameTeacher}
              />
            </div>

            <div className="type-of-user">
              <label>Gender *</label>
              <select
                name="Gender"
                onChange={(e) => setGenderTeacher(e.target.value)}
                value={genderTeacher}
              >
                <option value="">Select option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="submit-button">
              <input
                type="reset"
                id="reset-button"
                value="Reset"
                onClick={refresh}
              />
              <button type="button" id="submit-button" onClick={submitRegister}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default StudentForm;
