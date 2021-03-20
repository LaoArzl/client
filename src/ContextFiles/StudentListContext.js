import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";

export const StudentListContext = createContext();

export const StudentListProvider = (props) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [userType, setUserType] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/student-list").then((response) => {
      if (response) {
        setStudents(response.data);
      } else {
        setStudents([{ error: "No User" }, { error: "Unavailable" }]);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/teacher-list").then((response) => {
      if (response) {
        setTeachers(response.data);
      } else {
        setTeachers([{ error: "No User" }, { error: "Unavailable" }]);
      }
    });
  }, []);

  return (
    <StudentListContext.Provider
      value={{
        value00: [students, setStudents],
        value01: [teachers, setTeachers],
        value02: [userType, setUserType],
        value03: [searchItem, setSearchItem],
        value04: [searchTeacher, setSearchTeacher],
      }}
    >
      {props.children}
    </StudentListContext.Provider>
  );
};
