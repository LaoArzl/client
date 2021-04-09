import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherClass.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";
import { Link } from "react-router-dom";

const TeacherClass = (props) => {
  const { loginRole, valueID } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [yourClass, setYourClass] = useState([]);
  const [userID, setUserID] = valueID;

  const url = `https://ecplcsms.herokuapp.com/class/${props.id}`;

  useEffect(() => {
    Axios.get(url).then((response) => {
      if (response.data.length === 0) {
        setYourClass(null);
      } else {
        setYourClass(response.data);
      }
    });
  }, []);

  const id = localStorage.getItem("id");

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : props.id !== id ? (
        <>
          <div className="user-class">
            <TeacherDashboard />
            <div className="user-class-content">
              <DashboardHeader />
              <div className="user-class-content-header">
                <p>Your Class {userID}</p>
              </div>
              <div className="user-class-content-body">
                <p>You cannot access the class of other teachers.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="user-class">
          <TeacherDashboard />
          <div className="user-class-content">
            <DashboardHeader />
            <div className="user-class-content-header">
              <h3>Your Class </h3>
            </div>
            <div className="user-class-content-body">
              {yourClass === null ? (
                <p>Null</p>
              ) : (
                <>
                  {yourClass.map((value, key) => {
                    return (
                      <Link
                        to={"/teacher-class/" + value._id}
                        key={key}
                        className="user-class-class-wrapper"
                      >
                        <div className="user-class-class-wrapper-upper"></div>
                        <div className="user-class-class-wrapper-lower">
                          <h3>{value.className}</h3>
                          <p>{value.adviser_id.fullname}</p>
                          <span className="total-students">
                            <i className="fas fa-user"></i>
                            {value.students.length}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherClass;
