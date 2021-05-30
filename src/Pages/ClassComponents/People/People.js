import React, { useEffect, useState, useContext } from "react";
import "./People.css";
import Axios from "axios";
import AddPeople from "./AddPeople";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const People = (props) => {
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [teacher, setTeacher] = useState("");
  const url = `https://ecplc2021.herokuapp.com/class/class${props.id}`;
  const [showStudents, setShowStudents] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentState, setStudentState] = useState([]);

  const [msg, setMsg] = useState("");

  const setStudent = () => {
    setShowStudents(true);
  };

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/add-class-student").then(
      (response) => {
        let customer = response.data;
        setStudentState(
          customer
            .filter((g) => g.year === props.year)
            .map((d) => {
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

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/class/class/${props.id}`).then(
      (response) => {
        setStudentData(response.data[0].students);
      }
    );
  }, [props.initial]);

  const sendSubmit = () => {
    const arr = [];
    studentState.forEach((d) => {
      if (d.select) {
        arr.push(d.id);
      }

      Axios.put(
        `https://ecplc2021.herokuapp.com/class/add-student/${props.id}`,
        {
          studentId: arr,
        }
      ).then((response) => {
        if (response.data.success) {
          setMsg("Successfully added students");
          setTimeout(() => setMsg(""), 5000);
          props.setInitial([]);
        }
      });
    });

    // Axios.put("https://ecplcsms.herokuapp.com/class/update-class", {
    //   id: props.id,
    //   studentState: arr,
    // }).then((response) => {
    //   console.log(response);
    // });
  };

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="people-wrapper">
          <div className={msg === "" ? "hidden" : "people-wrapper-after"}>
            {msg}
          </div>
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

            <div className="people-content-body">
              {showStudents ? (
                <>
                  <div className="add-people">
                    <div className="add-people-header">
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
                      sendSubmit={sendSubmit}
                      studentState={studentState}
                      setStudentState={setStudentState}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="people-content-body-wrapper">
                    <div className="people-people-teacher-body">
                      <div className="people-teacher-header">
                        <h3>Teacher</h3>
                      </div>
                      <div className="people-teacher-body">
                        <p>{props.adviser}</p> (Adviser)
                      </div>
                    </div>
                    <div className="people-people-student-body">
                      <div className="people-teacher-header">
                        <h3>Student</h3>
                        <span onClick={() => setShowStudents(true)}>
                          Add Students
                        </span>
                      </div>
                      <div className="people-student-body">
                        {studentData.map((value) => {
                          return (
                            <div
                              key={value._id}
                              className="people-student-body-wrapper"
                            >
                              {value.fullname}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default People;
