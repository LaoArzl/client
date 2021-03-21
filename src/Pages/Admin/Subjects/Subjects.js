import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Subjects.css";

const Subjects = () => {
  const [subjectList, setSubjectList] = useState("");
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="subject-wrapper">
        {showForm ? (
          <>
            <form className="add-subject-form"></form>
          </>
        ) : null}
        <Dashboard />
        <div
          onClick={() => setShowForm(!showForm)}
          className={showForm ? "subject-wrapper-active" : ""}
        ></div>
        <div className="subject-content">
          <DashboardHeader />
          <div className="subject-content-body">
            <div className="subject-content-body-header">
              <h2>List of Subjects</h2>
            </div>
            <div className="subject-content-body-body">
              <div className="subject-content-body-body-header">
                <input
                  type="search"
                  className="subject-content-search"
                  placeholder="Type to Search"
                />
                <span
                  onClick={() => setShowForm(true)}
                  className="add-subject-span"
                >
                  <i class="fas fa-plus"></i>Add Subject
                </span>
              </div>
              <div className="subject-lists-header">
                <div className="subject-lists-code">Subject Code</div>
                <div className="subject-lists-name">Subject</div>
                <div className="subject-lists-capacity">Student capacity</div>
                <div className="subject-lists-action">Action</div>
              </div>
              <div
                className={
                  subjectList === ""
                    ? "subject-lists-empty"
                    : "subject-lists-wrapper"
                }
              >
                {subjectList === "" ? (
                  <p>There is currently no subject.</p>
                ) : (
                  "Have"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Subjects);
