import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import { withRouter } from "react-router-dom";
import "./DashboardHome.css";
import Axios from "axios";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import DynamicFeedRoundedIcon from "@material-ui/icons/DynamicFeedRounded";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const DashboardHome = () => {
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const { value1, value2 } = useContext(LoginContext);
  const [accessToken, setAccesToken] = value1;
  const [role, setRole] = value2;

  useEffect(() => {
    Axios.get("http://localhost:3001/total-student").then((response) => {
      if (response) {
        setTotalStudent(Object.values(response.data[0]));
      } else {
        console.log("There is no return object");
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/total-teacher").then((response) => {
      if (response) {
        setTotalTeacher(Object.values(response.data[0]));
      } else {
        console.log("There is no return object");
      }
    });
  }, []);

  return (
    <>
      <div className="dashboard-wrapper">
        <Dashboard />
        <div className="dashboard-home-content">
          <DashboardHeader />
          <div className="dashboard-home-actual">
            <div className="dashboard-overview-card-wrapper">
              <div className="dashboard-overview-card card1">
                <div className="dashboard-overview-card-header">
                  <h1>{totalStudent}</h1>
                </div>
                <div className="dashboard-overview-card-body">
                  <p>Total Students</p>
                </div>
              </div>
              <div className="dashboard-overview-card card2">
                <div className="dashboard-overview-card-header">
                  <h1>{totalTeacher}</h1>
                </div>
                <div className="dashboard-overview-card-body">
                  <p>Total Teachers</p>
                </div>
              </div>
              <div className="dashboard-overview-card card3">
                <div className="dashboard-overview-card-header">
                  <h1>8</h1>
                </div>
                <div className="dashboard-overview-card-body">
                  <p>Total Year Levels</p>
                </div>
              </div>
              <div className="dashboard-overview-card card4">
                <div className="dashboard-overview-card-header">
                  <h1>8</h1>
                </div>
                <div className="dashboard-overview-card-body">
                  <p>Total Classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DashboardHome);
