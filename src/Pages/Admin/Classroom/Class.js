import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Class = () => {
  const { value01 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [classes, setClasses] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [subjectData, setSubjectData] = useState([]);

  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  useEffect(() => {
    Axios.get("http://localhost:3001/find-sub").then((response) => {
      try {
        setSubjectData(response.data);
        console.log(response.data[0].grade[0].k1_english[0].remarks);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);
  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
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
                      <option value={value.teacher_id}>
                        {value.firstName}
                      </option>
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
            <p>
              {/* {subjectData.map((value) => {
              return value.grade.Kinder_1.English.grade_1;
            })} */}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Class);
