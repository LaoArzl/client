import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "../../Teacher/TeacherProfile/TeacherProfile.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import MainLoader from "../../../Components/Loader/MainLoader";

const StudentProfile = (props) => {
  const { loginRole, valueID, valueFirstname } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [firstname, setFirstname] = valueFirstname;
  const pops = props.id;
  const [yourClass, setYourClass] = useState([]);
  const [showClass, setShowClass] = useState(true);
  const [studentData, setStudentData] = useState([]);

  const url = `https://ecplc2021.herokuapp.com/class/student/${props.id}`;

  useEffect(() => {
    Axios.get(url).then((response) => {
      if (response.data.length === 0) {
        setYourClass([]);
      } else {
        setYourClass(response.data);
        console.log(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/student/${pops}`).then(
      (response) => {
        if (response.data.length === 0) {
          setStudentData([]);
        } else {
          setStudentData(response.data);
        }
      }
    );
  }, []);

  return (
    <>
      {studentData.length === 0 && <MainLoader />}
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="user-profile">
          <StudentDashboard id={pops} />
          <div className="user-content">
            <DashboardHeader />
            <div className="user-content-header">
              <h2>Hello {studentData.firstname}!</h2>
            </div>
            <div className="user-content-sub-header">
              <p onClick={() => setShowClass(!showClass)}>
                Your Class
                <i
                  className={
                    showClass ? "fas fa-caret-down" : "fas fa-caret-right"
                  }
                ></i>
              </p>
              <span></span>
            </div>
            <div
              className={
                showClass ? "user-content-body" : "user-content-body-hidden"
              }
            >
              {yourClass.map((value, key) => {
                return (
                  <Link
                    to={"/student-class/" + value._id}
                    key={key}
                    className="user-class-class-wrapper"
                  >
                    <div className="user-class-class-wrapper-upper">
                      <span>
                        <LibraryBooksOutlinedIcon fontSize="large" />
                      </span>
                    </div>
                    <div className="user-class-class-wrapper-lower">
                      <h3>{value.className}</h3>
                      <b>{value.adviser_id.fullname}</b>
                      <span> {value.students.length}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
