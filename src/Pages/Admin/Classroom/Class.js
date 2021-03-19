import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";
import Empty from "./Empty.js";

const Class = () => {
  const { value1, value2 } = useContext(SchoolYearContext);
  const [current, setCurrent] = value1;
  const [listYear, setListYear] = value2;
  const [showChanges, setShowChanges] = useState(false);
  const changeYear = () => {
    setShowChanges(true);
  };

  const changeYearTwo = () => {
    setShowChanges(false);
  };
  return (
    <>
      <div
        onClick={changeYearTwo}
        className={showChanges ? "class-wrapper-black" : "class-wrapper-black"}
      >
        <Dashboard />
        <div className="class-content">
          <DashboardHeader />
          <div className="class-actual">
            <div
              className={showChanges === true ? "class-actual-after" : ""}
            ></div>
            <div className="class-actual-header">
              <p>School Year {current} </p>
              <span onClick={changeYear}>
                <i className="fas fa-cog"></i> Change
              </span>
            </div>
            <div className="class-actual-body">
              {current === 0 ? <Empty /> : <p> There is</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Class);
