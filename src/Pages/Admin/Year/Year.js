import React, { useState, useEffect } from "react";
import "./Year.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";

const Year = () => {
  const [year, setYear] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="year-wrapper">
        <div
          onClick={() => setShowForm(false)}
          className={showForm ? "year-wrapper-after" : ""}
        ></div>
        {showForm && (
          <form>
            <div className="year-form-header">
              <h3>Add Level</h3>
              <i
                onClick={() => setShowForm(false)}
                className="fas fa-times"
              ></i>
            </div>
          </form>
        )}
        <Dashboard />
        <div className="year-content">
          <DashboardHeader />
          <div className="year-content-header">
            <h3>Grade Levels</h3>
          </div>
          <div
            className={
              year.length === 0
                ? "year-content-body-empty"
                : "year-content-body"
            }
          >
            {year.length === 0 && (
              <>
                <p>There is no grade level yet. Create one. </p>
                <div onClick={() => setShowForm(true)} className="create-year">
                  <i class="far fa-plus-square"></i> Create
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Year;
