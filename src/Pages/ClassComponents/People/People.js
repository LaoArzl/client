import React, { useEffect, useState } from "react";
import "./People.css";
import Axios from "axios";
import AddPeople from "./AddPeople";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";

const People = (props) => {
  const [teacher, setTeacher] = useState("");
  const url = `https://ecplcsms.herokuapp.com/class/class${props.id}`;
  const [showStudents, setShowStudents] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentState, setStudentState] = useState([]);

  const setStudent = () => {
    setShowStudents(true);
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/add-class-student").then(
      (response) => {
        let customer = response.data;
        setStudentState(
          customer.map((d) => {
            return {
              select: false,
              id: d._id,
              name: d.fullname,
            };
          })
        );
      }
    );
  }, []);

  const sendSubmit = () => {
    const arr = [];
    studentState.forEach((d) => {
      if (d.select) {
        arr.push(d.id);
      }
    });

    Axios.put("https://ecplcsms.herokuapp.com/class/update-class", {
      id: props.id,
      studentState: arr,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className="people-wrapper">
        <TeacherDashboard />
        <div className="people-content">
          <DashboardHeader />
          <div className="class-content-header">
            <div className="class-content-upper-header">
              <h2>{props.name}</h2>
              <p>{props.adviser}</p>
            </div>
            <div className="class-content-lower-header">
              <Link
                to={"/teacher-class/" + props.id}
                className="nav-span-diactive"
              >
                Posts
              </Link>

              <Link
                className="nav-span-diactive"
                to={"/teacher-class/" + props.id + "/subjects"}
              >
                Subjects
              </Link>

              <Link className="nav-span-active">People</Link>
            </div>
          </div>

          <div className="people-teacher-header">
            <h3>Teacher</h3>
          </div>
          <div className="people-teacher-body">
            <p>{props.name}</p> (Adviser)
          </div>
          <div className="people-teacher-header">
            <h3>Student</h3>
            <span onClick={setStudent}>Add Students</span>
          </div>
          <div className="people-student-body"></div>
          <div
            className={
              showStudents === true
                ? "people-wrapper-add-after-active"
                : "people-wrapper-add-inactive"
            }
          >
            <div className="people-wrapper-add-student-header">
              <i
                onClick={() => setShowStudents(false)}
                class="fas fa-times"
              ></i>
            </div>
            <div className="people-wrapper-add-student-body-0">
              <input
                type="checkbox"
                id="input-checkbox"
                onChange={(e) => {
                  let value = e.target.checked;
                  setStudentState(
                    studentState.map((d) => {
                      d.select = value;
                      return d;
                    })
                  );
                }}
              />
              <p>Select All</p>
            </div>
            <AddPeople
              studentState={studentState}
              setStudentState={setStudentState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default People;
