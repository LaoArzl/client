import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";

export const StudentListContext = createContext();

export const StudentListProvider = (props) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classroom, setClassroom] = useState([]);
  const [userType, setUserType] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/student-list").then((response) => {
      if (response.data.length == 0) {
        setStudents([]);
      } else {
        setStudents(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/teacher-list").then((response) => {
      if (response.data.length === 0) {
        setTeachers([]);
      } else {
        setTeachers(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/class/populate-teacher").then(
      (response) => {
        if (response.data.length === 0) {
          setClassroom(null);
        } else {
          setClassroom(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/all-users").then((response) => {
      if (response.data.length == 0) {
        setAllUsers([]);
      } else {
        setAllUsers(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/year/create").then((response) => {
      if (response.data.length === 0) {
        setYearList([]);
      } else {
        setYearList(response.data);
        console.log(response.data);
      }
    });
  }, [initials]);

  return (
    <StudentListContext.Provider
      value={{
        value00: [students, setStudents],
        value01: [teachers, setTeachers],
        value02: [userType, setUserType],
        value03: [searchItem, setSearchItem],
        value04: [searchTeacher, setSearchTeacher],
        valueAllUsers: [allUsers, setAllUsers],
        valueAllClass: [classroom, setClassroom],
        valueAllYear: [yearList, setYearList],
        valueInitial: [initials, setInitials],
      }}
    >
      {props.children}
    </StudentListContext.Provider>
  );
};
