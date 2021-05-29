import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherProfile.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";
import MainLoader from "../../../Components/Loader/MainLoader";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

const TeacherProfile = (props) => {
  const { loginRole, valueID } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const pops = props.id;
  const [teacherData, setTeacherData] = useState([]);
  const [yourClass, setYourClass] = useState([]);
  const [showClass, setShowClass] = useState(true);

  const url = `http://localhost:3001/class/${props.id}`;

  useEffect(() => {
    Axios.get(url).then((response) => {
      if (response.data.length === 0) {
        setYourClass([]);
      } else {
        setYourClass(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/teacher/${pops}`).then((response) => {
      if (response.data.length === 0) {
        setTeacherData([]);
      } else {
        setTeacherData(response.data);
      }
    });
  }, []);

  return (
    <>
      {/* {teacherData.length === 0 && <MainLoader />} */}

      <div className="user-profile">
        <TeacherDashboard />
        <div className="user-content">
          <DashboardHeader />
          <div className="user-content-header">
            <h2>Teacher {teacherData.firstname}</h2>
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
                  to={"/teacher-class/" + value._id}
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
    </>
  );
};

export default TeacherProfile;
