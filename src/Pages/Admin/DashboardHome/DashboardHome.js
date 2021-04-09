import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import { withRouter } from "react-router-dom";
import "./DashboardHome.css";
import Axios from "axios";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import Student from "./student.png";
import Teacher from "./teacher.png";
import Class from "./class.png";
import Empty from "./empty.png";

const DashboardHome = () => {
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalClass, setTotalClass] = useState(0);
  const { value1, loginRole } = useContext(LoginContext);
  const [accessToken, setAccesToken] = value1;
  const [role, setRole] = loginRole;

  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/total-student").then(
      (response) => {
        if (response.data.length === 0) {
          setTotalStudent(0);
        } else {
          setTotalStudent(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/total-teacher").then(
      (response) => {
        if (response.data.length === 0) {
          setTotalTeacher(0);
        } else {
          setTotalTeacher(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/class/total-class").then(
      (response) => {
        if (response.data.length === 0) {
          setTotalClass(0);
        } else {
          setTotalClass(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="dashboard-wrapper">
          <Dashboard />
          <div className="dashboard-content">
            <DashboardHeader />
            <div className="dashboard-actual-header">
              <h3>Dashboard</h3>
            </div>
            <div className="dashboard-actual-body">
              <div className="dashboard-actual-body-left">
                <div className="total-stastics-section">
                  <div className="total-card card-student">
                    <div className="total-card-left">
                      <img src={Student} />
                    </div>
                    <div className="total-card-right">
                      <h3>{totalStudent}</h3>
                      <p>Students</p>
                    </div>
                  </div>
                  <div className="total-card card-teacher">
                    <div className="total-card-left">
                      <img src={Teacher} />
                    </div>
                    <div className="total-card-right">
                      <h3>{totalTeacher}</h3>
                      <p>Teachers</p>
                    </div>
                  </div>
                  <div className="total-card card-class">
                    <div className="total-card-left">
                      <img src={Class} />
                    </div>
                    <div className="total-card-right">
                      <h3>{totalClass}</h3>
                      <p>Classes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-actual-body-right">
                <div className="calendar-section">
                  <div className="calendar-section-header">
                    <h3>Upcoming Events</h3>
                  </div>
                  <div className="calendar-section-body">
                    <img src={Empty} alt="Empty" />
                    <p>Nothing found.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(DashboardHome);
