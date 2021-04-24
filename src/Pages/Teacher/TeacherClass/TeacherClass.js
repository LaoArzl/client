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
      {role !== "Teacher" && <BrokenPage />}
      <div className="user-class">
        <TeacherDashboard />
        <div className="user-class-content">
          <DashboardHeader />
          <div className="user-class-content-header">
            <b>Your Class </b>
          </div>
          <div className="user-class-content-body">
            {yourClass === null ? (
              <p className="sorry-no-class">
                Sorry but there is no class assigned to you.
              </p>
            ) : (
              <>
                {yourClass.map((value, key) => {
                  return (
                    <Link
                      to={"/teacher-class/" + value._id}
                      key={key}
                      className="user-class-class-wrapper"
                    >
                      <div className="user-class-class-wrapper-upper">
                        <p>Adviser</p>
                        <b>{value.adviser_id.fullname}</b>
                      </div>
                      <div className="user-class-class-wrapper-lower">
                        <h3>{value.className}</h3>
                        <p>Total Students: {value.students.length}</p>
                        <span>See more</span>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherClass;
