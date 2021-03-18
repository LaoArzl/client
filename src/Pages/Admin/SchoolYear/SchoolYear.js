import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./SchoolYear.css";
import Axios from "axios";

const SchoolYear = () => {
  const [schoolYear, setSchoolYear] = useState(0);
  const [data, setData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmCreate, setConfirmCreate] = useState(false);

  const creating = () => {
    setConfirmCreate(!confirmCreate);
  };

  const createSY = () => {
    Axios.post("http://localhost:3001/create-sy", {
      schoolYear: schoolYear,
    }).then((response) => {
      if (response.data.dup) {
        setErrorMsg(response.data.dup);
      } else if (response.data.empty) {
        setErrorMsg(response.data.empty);
      } else if (response.data.erring) {
        setErrorMsg(response.data.erring);
      } else if (response.data.old) {
        setErrorMsg(response.data.old);
      } else if (response.data.success) {
        setErrorMsg(response.data.success);
        setTimeout(() => setErrorMsg(""), 10000);
      }
    });
  };

  const createGL = () => {
    Axios.post("http://localhost/create-grade").then((response) => {
      if (response) {
        console.log(response);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/create-sy").then((response) => {
      if (response) {
        setData(response.data);
      }
    });
  }, []);

  // const closeConfirm = () => {
  //   setConfirmCreate(false);
  // };
  return (
    <>
      <div className="schoolyear-wrapper">
        <Dashboard />
        <div
          onClick={creating}
          className={confirmCreate ? "schoolyear-content-after" : ""}
        ></div>
        <div className="schoolyear-content">
          <DashboardHeader />

          <div
            className={
              confirmCreate
                ? "confirm-createsy-card"
                : "confirm-createsy-card-null"
            }
          >
            <div className="confirm-createsy-card-header">
              <h2>New School Year</h2>
            </div>
            <div className="confirm-createsy-card-body">
              <div
                className={
                  errorMsg === ""
                    ? "hidinger"
                    : errorMsg === "Successfully added."
                    ? "confirm-createsy-card-body-error-green"
                    : "confirm-createsy-card-body-error"
                }
              >
                {errorMsg}
              </div>
              <div className="confirm-createsy-card-body-input">
                <input
                  type="number"
                  className="confirm-createsy-card-body-input1"
                  min="2021"
                  placeholder="e.g 2021"
                  onChange={(e) => setSchoolYear(e.target.value)}
                />
              </div>
              <input
                onClick={createSY}
                type="submit"
                value="Create"
                className="confirm-createsy-card-body-create"
              />
            </div>
          </div>
          <div className="schoolyear-actual">
            <div className="schoolyear-actual-bodys">
              <div className="schoolyear-actual-head">
                <div className="schoolyear-actual-form">
                  <input
                    type="submit"
                    value="Add School Year"
                    className="schoolyear-actual-form-submit"
                    onClick={creating}
                  />
                </div>
              </div>

              <div className="schoolyear-actual-body">
                <div className="schoolyear-actual-body-head">
                  <span className="schoolyear-actual-span-number">#</span>
                  <span className="schoolyear-actual-span-sy">School Year</span>
                  <span className="schoolyear-actual-span-date">
                    Date Created
                  </span>
                </div>
                <div className="schoolyear-actual-body-body">
                  {data.map((value, key) => {
                    return (
                      <div className="schoolyear-actual-body-wrapper">
                        <div className="schoolyear-actual-body-number">
                          {key + 1}
                        </div>

                        <div className="schoolyear-actual-body-sy">
                          {value.schoolYear}
                        </div>
                        <div className="schoolyear-actual-body-date">
                          {value.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SchoolYear);
