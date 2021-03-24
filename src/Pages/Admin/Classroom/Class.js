import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const Class = () => {
  const { value01 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const { class1 } = useContext(SchoolYearContext);
  const [classes, setClasses] = class1;

  const [showCreate, setShowCreate] = useState(false);
  return (
    <>
      <div className="class-wrapper">
        {showCreate ? (
          <>
            <form className="create-subject-form">
              <select>
                <option disabled value="">
                  Select Option
                </option>
                {teachers.map((value) => {
                  return (
                    <option value={value.teacher_id}>{value.firstName}</option>
                  );
                })}
              </select>
            </form>
          </>
        ) : (
          ""
        )}
        <Dashboard />
        <div
          onClick={() => setShowCreate(!showCreate)}
          className={showCreate ? "class-wrapper-active" : ""}
        ></div>
        <div className="class-content">
          <DashboardHeader />
          <div className="class-actual-header">Class</div>
          <div className="class-actual-body">
            <div className="class-actual-body-header">
              <span
                onClick={() => setShowCreate(true)}
                className="add-class-button"
              >
                <i className="fas fa-plus"></i>
                Create Class
              </span>
            </div>
            {classes === "" ? (
              <>
                <div className="class-actual-body-empty">
                  There is currently no class.
                </div>
              </>
            ) : (
              <>
                <div className="class-actual-body-have"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Class);
