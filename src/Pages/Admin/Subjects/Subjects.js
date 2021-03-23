import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./Subjects.css";
import Axios from "axios";
import { SchoolYearContext } from "../../../ContextFiles/SchoolYearContext";

const Subjects = () => {
  const [showForm, setShowForm] = useState(false);
  const { sub1, sub2, sub3, sub4, sub5, sub6 } = useContext(SchoolYearContext);
  const [subjectCode, setSubjectCode] = sub1;
  const [subject, setSubject] = sub2;
  const [subjectDes, setSubjectDes] = sub3;
  const [subjectError, setSubjectError] = sub4;
  const [subjectCapacity, setSubjectCapacity] = sub5;
  const [subjects, setSubjects] = sub6;

  const addSubject = () => {
    Axios.post("http://localhost:3001/add-subject", {
      subjectCode: subjectCode,
      subject: subject,
      subjectDes: subjectDes,
      subjectCapacity: subjectCapacity,
    }).then((response) => {
      if (response.data.error) {
        setSubjectError(response.data.error);
      } else if (response.data.empty) {
        setSubjectError(response.data.empty);
      } else if (response.data.success) {
        setSubjectCode("");
        setSubject("");
        setSubjectDes("");
        setSubjectCapacity(0);
        setSubjectError(response.data.success);
        setTimeout(() => setSubjectError(""), 5000);
        setSubjects([
          ...subjects,
          {
            subjectCode: subjectCode,
            subject: subject,
            subjectDes: subjectDes,
            subjectCapacity: subjectCapacity,
          },
        ]);
      }
    });
  };

  const refresh = () => {
    setSubjectCode("");
    setSubject("");
    setSubjectCapacity(0);
    setSubjectDes("");
    setShowForm(false);
  };

  return (
    <>
      <div className="subject-wrapper">
        {showForm ? (
          <>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="add-subject-form"
            >
              <div className="add-subject-form-header">
                <h2>Add Subject</h2>
              </div>
              <div className="add-subject-form-error">{subjectError}</div>
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
                  onClick={addSubject}
                  type="submit"
                  className="add-subject-submit"
                  value="Submit"
                />
                <input
                  onClick={refresh}
                  type="reset"
                  className="add-subject-cancel"
                  value="Cancel"
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

              {subjects === "" ? (
                <div className="subject-lists-empty"></div>
              ) : (
                subjects.map((value, key) => {
                  return (
                    <>
                      <div className="subject-lists-wrapper">
                        <div className="subject-lists-code-span">
                          {value.subject_id}
                        </div>
                        <div className="subject-lists-name-span">
                          {value.subjectName}
                        </div>
                        <div className="subject-lists-capacity-span">
                          {value.capacity}
                        </div>
                        <div className="subject-lists-action-span">
                          {value.subject_id}
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Subjects);
