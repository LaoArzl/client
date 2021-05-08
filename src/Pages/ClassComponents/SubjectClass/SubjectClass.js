import React, { useState, useEffect } from "react";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import "./SubjectClass.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";

const SubjectClass = (props) => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://ecplcsms.herokuapp.com/class/populate-subjects/${props.id}`
    ).then((response) => {
      setSubjects(response.data.year.subjects);
    });
  }, []);

  return (
    <>
      <div className="subject-class-wrapper">
        <TeacherDashboard />
        <div className="subject-class-content">
          <DashboardHeader />
          {subjects.map((value) => {
            return <p>{value.subjectName}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default SubjectClass;
