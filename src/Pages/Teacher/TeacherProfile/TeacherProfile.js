import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import "./TeacherProfile.css";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import ProfileHeader from "../../../Components/ProfileHeader/ProfileHeader";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";

const TeacherProfile = (props) => {
  const { loginRole, valueID } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const pops = props.id;
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/teacher/${pops}`).then(
      (response) => {
        if (response.data.length === 0) {
          setTeacherData([]);
        } else {
          setTeacherData(response.data);
        }
      }
    );
  }, []);

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="user-profile">
          <TeacherDashboard id={pops} />
          <div className="user-content">
            <DashboardHeader />
            <div className="user-content-header">
              <h2>Teacher {teacherData.firstname}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherProfile;
