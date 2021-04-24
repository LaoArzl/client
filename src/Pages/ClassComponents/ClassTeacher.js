import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../ContextFiles/LoginContext";
import Axios from "axios";
import BrokenPage from "../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../Teacher/TeacherDashboard/TeacherDashboard";
import "./Class.css";
import People from "./People";
import Class from "./Class";

const ClassTeacher = (props) => {
  const classId = window.location.pathname.replace("/teacher-class/", "");
  const url = `https://ecplcsms.herokuapp.com/class/class/${props.id}`;
  const [classData, setClassData] = useState([]);
  const { loginRole, valueID } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const tempId = localStorage.getItem("id");
  const [teacherName, setTeacherName] = useState("");

  const [navOption, setNavOption] = useState("");
  const [createStream, showCreateStream] = useState(false);

  useEffect(() => {
    Axios.get(url).then((response) => {
      if (response.data.length === 0) {
        setClassData([]);
      } else {
        setClassData(response.data);
        setTeacherName(response.data[0].adviser_id.fullname);
      }
    });
  }, []);

  return (
    <>
      {role !== "Teacher" && <BrokenPage />}
      <div className="teacher-class-wrapper">
        <div
          onClick={() => showCreateStream(false)}
          className={createStream ? "teacher-class-wrapper-after" : ""}
        ></div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={
            createStream ? "create-stream-post" : "create-stream-post-hidden"
          }
        >
          <div className="create-stream-post-header">
            <h3>Create Activity</h3>
            <i
              onClick={() => showCreateStream(false)}
              className="fas fa-times"
            ></i>
          </div>
          <div className="create-stream-post-body">
            <div className="create-stream-post-div-wrapper">
              <div className="create-stream-post-div1">
                <label>Subject</label>
                <select>
                  <option value="" disabled>
                    Select option
                  </option>
                </select>
              </div>

              <div className="create-stream-post-div2">
                <label>Due Date</label>
                <input type="date"></input>
              </div>
            </div>

            <div className="create-stream-post-div">
              <label>Description</label>
              <textarea></textarea>
            </div>

            <div className="create-stream-post-div">
              <div></div>
            </div>

            <div className="create-stream-post-divs">
              <span>
                <i class="fas fa-paperclip"></i> Upload
              </span>
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
        <TeacherDashboard />
        <div className="class-content">
          <DashboardHeader />
          <div className="class-content-header">
            <div className="class-content-upper-header">
              {classData.map((key, value) => {
                return (
                  <>
                    <h2 key={value + 2}>{key.className}</h2>
                    <p key={value + 1}>{key.adviser_id.fullname}</p>
                  </>
                );
              })}
            </div>
            <div className="class-content-lower-header">
              <div
                onClick={() => setNavOption("")}
                className={
                  navOption === "" ? "nav-span-active" : "nav-span-diactive"
                }
              >
                Class
              </div>
              <div
                onClick={() => setNavOption("assignments")}
                className={
                  navOption === "assignments"
                    ? "nav-span-active"
                    : "nav-span-diactive"
                }
              >
                Assignments
              </div>
              <div
                onClick={() => setNavOption("grades")}
                className={
                  navOption === "grades"
                    ? "nav-span-active"
                    : "nav-span-diactive"
                }
              >
                Grades
              </div>
              <div
                onClick={() => setNavOption("students")}
                className={
                  navOption === "students"
                    ? "nav-span-active"
                    : "nav-span-diactive"
                }
              >
                Students
              </div>
            </div>
          </div>
          <div className="class-content-body">
            <div className="class-content-body-left">
              <div className="class-content-body-left-header">
                <p>Announcement</p>
              </div>
              <div className="class-content-body-left-body">
                <span>
                  <i className="fas fa-plus"></i> Create
                </span>
              </div>
            </div>
            <div className="class-content-body-right">
              {navOption === "" && (
                <Class showCreateStream={showCreateStream} />
              )}
              {navOption === "students" && (
                <People id={classId} name={teacherName} />
              )}
              {navOption === "assignments" && <p>Assignment Section</p>}
              {navOption === "grades" && <p>Grades Section</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClassTeacher;
