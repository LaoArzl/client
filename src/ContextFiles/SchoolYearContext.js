import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";
export const SchoolYearContext = createContext();

export const SchoolYearState = (props) => {
  const [current, setCurrent] = useState(null);
  const [listYear, setListYear] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectDes, setSubjectDes] = useState("");
  const [subjectYear, setSubjectYear] = useState("");
  const [subjectCapacity, setSubjectCapacity] = useState(0);

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

  return (
    <SchoolYearContext.Provider
      value={{
        value1: [current, setCurrent],
        value2: [listYear, setListYear],
        sub1: [subjectCode, setSubjectCode],
        sub2: [subject, setSubject],
        sub3: [subjectDes, setSubjectDes],
        sub4: [subjectYear, setSubjectYear],
        sub5: [subjectCapacity, setSubjectCapacity],
      }}
    >
      {props.children}
    </SchoolYearContext.Provider>
  );
};
