import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";
export const SchoolYearContext = createContext();

export const SchoolYearState = (props) => {
  const [current, setCurrent] = useState(null);
  const [listYear, setListYear] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectDes, setSubjectDes] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [subjectCapacity, setSubjectCapacity] = useState(0);

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/current-sy").then((response) => {
      if ((response.data.result = null)) {
        setCurrent(0);
      } else if (response.data.result) {
        setCurrent(response.data.result[0].schoolYear);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/all-sy").then((response) => {
      setListYear(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/add-subject").then((response) => {
      if (response.data.length === 0) {
        setSubjects("");
      } else {
        setSubjects(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/create-class").then((response) => {
      if (response.data.length === 0) {
        setClasses("");
      } else {
        setClasses(response.data);
      }
    });
  });

  return (
    <SchoolYearContext.Provider
      value={{
        value1: [current, setCurrent],
        value2: [listYear, setListYear],
        sub1: [subjectCode, setSubjectCode],
        sub2: [subject, setSubject],
        sub3: [subjectDes, setSubjectDes],
        sub4: [subjectError, setSubjectError],
        sub5: [subjectCapacity, setSubjectCapacity],
        sub6: [subjects, setSubjects],
        class1: [classes, setClasses],
      }}
    >
      {props.children}
    </SchoolYearContext.Provider>
  );
};
