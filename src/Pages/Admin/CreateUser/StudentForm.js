import React, { useContext, useEffect } from "react";
import "./CreateUser.css";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { CreateStudentContext } from "../../../ContextFiles/CreateStudentContext";

const TeacherForm = () => {
  const { value00, value01, value02 } = useContext(StudentListContext);
  const [students, setStudents] = value00;

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
  const [studFullname, setStudFullname] = value12;

  const similarUsername = () => {
    if (studentNumber) {
      const tempUsername = studentNumber.replace(/\D/g, "");
      setUsernameStudent("ECPLC" + tempUsername);
    } else {
      setUsernameStudent("");
    }
  };

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
      idnumber: studentNumber,
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
            user_id: studentNumber,
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

  useEffect(() => {
    setUserStudent("Student");
  }, []);

  return (
    <>
      <div
        className={
          registerStatusStud === ""
            ? "hidinger"
            : registerStatusStud === "Successfully created account."
            ? "user-actual-error"
            : "user-actual-error-red"
        }
      >
        {registerStatusStud}
      </div>
      <form autoComplete="off" className="create-user-form">
        <div className="create-user-form-wrapper">
          <div className="left-form">
            <div className="type-of-user">
              <label>Type of User *</label>
              <input name="userStudent" value={userStudent} />
            </div>

            <div className="type-of-user">
              <label>I.D Number *</label>
              <input
                type="text"
                name="Idnumber"
                onChange={(e) => setStudentNumber(e.target.value)}
                value={studentNumber}
              />
            </div>

            <div className="type-of-user">
              <label>Username *</label>
              <input
                type="text"
                name="Username"
                onChange={(e) => setUsernameStudent(e.target.value)}
                value={usernameStudent}
              />
            </div>

            <div className="type-of-user">
              <label>Password *</label>
              <input
                type="password"
                name="Password"
                onChange={(e) => setPasswordStudent(e.target.value)}
                value={passwordStudent}
              />
            </div>

            <div className="type-of-user">
              <label>Confirm password *</label>
              <input
                type="password"
                name="rePassword"
                onChange={(e) => setRePasswordStudent(e.target.value)}
                value={rePasswordStudent}
              />
            </div>
          </div>
          <div className="right-form">
            <div className="type-of-user">
              <label>Last Name *</label>
              <input
                type="text"
                name="Lastname"
                onChange={(e) => {
                  setLastnameStudent(e.target.value);
                }}
                value={lastnameStudent}
              />
            </div>

            <div className="type-of-user">
              <label>First Name *</label>
              <input
                type="text"
                name="firstname"
                onChange={(e) => setFirstnameStudent(e.target.value)}
                value={firstnameStudent}
              />
            </div>

            <div className="type-of-user">
              <label>Middle Name *</label>
              <input
                type="text"
                name="Middlename"
                onChange={(e) => setMiddlenameStudent(e.target.value)}
                value={middlenameStudent}
              />
            </div>

            <div className="type-of-user">
              <label>Gender *</label>
              <select
                name="Gender"
                onChange={(e) => setGenderStudent(e.target.value)}
                value={genderStudent}
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

export default TeacherForm;
