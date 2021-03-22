import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Subjects.css";
import Axios from "axios";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";

const Subjects = () => {
  const [subjectList, setSubjectList] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { sub1, sub2, sub3, sub4, sub5 } = useContext(SchoolYearContext);
  const [subjectCode, setSubjectCode] = sub1;
  const [subject, setSubject] = sub2;
  const [subjectDes, setSubjectDes] = sub3;
  const [subjectYear, setSubjectYear] = sub4;
  const [subjectCapacity, setSubjectCapacity] = sub5;

  const addSubject = () => {
    Axios.post("http://localhost:3001/add-subject", {
      subjectCode,
      subject,
      subjectDes,
      subjectYear,
      subjectCapacity,
    });
  };

  useEffect(() => {
    console.log(subjectYear);
  }, [99]);
  return (
    <>
      <div className="subject-wrapper">
        {showForm ? (
          <>
            <form className="add-subject-form">
              <div className="add-subject-form-header">
                <h2>Add Subject</h2>
              </div>
              <div className="add-subject-form-body">
                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Subject Code *</label>
                  </div>
                  <div className="add-subject-right">
                    <input
                      value={subjectCode}
                      onChange={(e) => setSubjectCode(e.target.value)}
                      type="text"
                      className="subject-code"
                    />
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Subject *</label>
                  </div>
                  <div className="add-subject-right">
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      type="text"
                      className="subject-name"
                    />
                  </div>
                </div>

                <div className="add-subject-textarea">
                  <div className="add-subject-left-textarea">
                    <label>Description *</label>
                  </div>
                  <div className="add-subject-right">
                    <textarea
                      value={subjectDes}
                      onChange={(e) => setSubjectDes(e.target.value)}
                      type="text"
                      className="subject-description"
                    />
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Year *</label>
                  </div>
                  <div className="add-subject-right">
                    <select onChange={(e) => setSubjectYear(e.target.value)}>
                      <option value="">Select option</option>
                      <option value="1">Kinder 1</option>
                      <option value="2">Kinder 2</option>
                      <option value="3">Grade 1</option>
                      <option value="4">Grade 2</option>
                      <option value="5">Grade 3</option>
                      <option value="6">Grade 4</option>
                      <option value="7">Grade 5</option>
                      <option value="8">Grade 6</option>
                    </select>
                  </div>
                </div>

                <div className="add-subject-input">
                  <div className="add-subject-left">
                    <label>Capacity *</label>
                  </div>
                  <div className="add-subject-right">
                    <input
                      value={subjectCapacity}
                      onChange={(e) => setSubjectCapacity(e.target.value)}
                      type="number"
                      max="40"
                      min="1"
                      className="subject-capacity"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  className="add-subject-submit"
                  value="Submit"
                />
              </div>
            </form>
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
              <p>List of Subjects</p>
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
