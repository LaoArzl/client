import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";
export const SchoolYearContext = createContext();

export const SchoolYearState = (props) => {
  const [current, setCurrent] = useState(null);
  const [listYear, setListYear] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/current-sy").then((response) => {
      if (!response.data.result) {
        setCurrent(0);
      } else {
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
      value={{ value1: [current, setCurrent], value2: [listYear, setListYear] }}
    >
      {props.children}
    </SchoolYearContext.Provider>
  );
};
