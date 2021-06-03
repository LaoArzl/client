import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [picture, setPicture] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentPicture, setStudentPicture] = useState("");
  const [teacherPicture, setTeacherPicture] = useState("");
  const [classroom, setClassroom] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [teachername, setTeachername] = useState("");

  // useEffect(() => {
  //   Axios.get("https://ecplc2021.herokuapp.com/user-login").then((response) => {
  //     if (response.data.length === 0) {
  //       console.log("No User");
  //       setRole("");
  //       setUserID("");
  //     } else if (response.data.loggedIn) {
  //       setRole(response.data.user);
  //       setUserID(response.data.id);
  //       setFirstname(response.data.firstname);
  //       setPicture(response.data.picture);
  //     }
  //   });
  // }, []);

  return (
    <LoginContext.Provider
      value={{
        value1: [accessToken, setAccessToken],
        loginRole: [role, setRole],
        valueID: [userID, setUserID],
        valueFirstname: [firstname, setFirstname],
        valuePicture: [picture, setPicture],
        valueStudents: [students, setStudents],
        valueTeachers: [teachers, setTeachers],
        valueStudentPicture: [studentPicture, setStudentPicture],
        valueClassroom: [classroom, setClassroom],
        valueStudentname: [studentname, setStudentname],
        valueTeachername: [teachername, setTeachername],
        valueTeacherPicture: [teacherPicture, setTeacherPicture],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
