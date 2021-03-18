import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";

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
              <p>Class of School Year {current} </p>
              <span onClick={changeYear}>
                <i className="fas fa-cog"></i> Change
              </span>
            </div>
            <div className="class-actual-body">
              <div className="class-actual-body-left">
                <div className="class-actual-section class-kinder1">
                  Kinder 1 <i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-kinder2">
                  Kinder 2<i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-grade1">
                  Grade 1<i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-grade2">
                  Grade 2<i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="class-actual-body-right">
                <div className="class-actual-section class-grade3">
                  Grade 3<i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-grade4">
                  Grade 4<i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-grade5">
                  Grade 5<i className="fas fa-chevron-down"></i>
                </div>
                <div className="class-actual-section class-grade6">
                  Grade 6<i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Class);
