import React, { useState, useEffect, useContext } from "react";
import "./Year.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const Year = () => {
  const [year, setYear] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [grade, setGrade] = useState("");
  const [number, setNumber] = useState("");
  const { valueAllYear } = useContext(StudentListContext);
  const [errMsg, setErrMsg] = useState("");

  const [yearList, setYearList] = valueAllYear;

  const submitCreate = () => {
    Axios.post("https://ecplcsms.herokuapp.com/year/create", {
      grade: grade,
      number: number,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
      } else {
        setErrMsg(response.data.success);
        setYearList([
          ...yearList,
          {
            _id: grade + " " + number,
            year: grade + " " + number,
          },
        ]);
      }
    });
  };

  return (
    <>
      <div className="year-wrapper">
        <div
          onClick={() => setShowForm(false)}
          className={showForm ? "year-wrapper-after" : ""}
        ></div>
        {showForm && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="year-form-header">
              <h3>Add Level</h3>
              <i
                onClick={() => setShowForm(false)}
                className="fas fa-times"
              ></i>
            </div>
            <div className="year-form-body">
              <div className="year-form-div">
                <label>Grade</label>
                <select onChange={(e) => setGrade(e.target.value)}>
                  <option disabled value="">
                    Select option
                  </option>
                  <option value="Kinder">Kinder</option>
                  <option value="Grade">Grade</option>
                </select>
              </div>

              <div className="year-form-div">
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  type="number"
                  min="1"
                  max="10"
                  placeholder="1 - 10"
                />
              </div>

              <div className="year-form-div-submit">
                <input
                  onClick={() => setShowForm(false)}
                  type="reset"
                  className="year-form-submit-cancel"
                  value="Cancel"
                />
                <input
                  onClick={submitCreate}
                  type="submit"
                  className="year-form-submit-submit"
                  value="Create"
                />
              </div>
            </div>
          </form>
        )}
        <Dashboard />
        <div className="year-content">
          <DashboardHeader />
          <div className="year-content-header-header">
            <div onClick={() => setShowForm(true)}>Create</div>
          </div>
          <div className="year-list-wrapper">
            <div className="year-list-header">
              <div className="list-grade-level-header">Grade Level</div>
            </div>
            {yearList.length === 0 ? (
              <div className="no-grade-level">
                <p>There is no grade level yet. Create one. </p>
                {/* <div onClick={() => setShowForm(true)} className="create-year">
                  <i class="far fa-plus-square"></i> Create
                </div> */}
              </div>
            ) : (
              yearList.map((value) => {
                return (
                  <div id={value._id} className="year-list-body">
                    <div className="year-id">{value._id}</div>
                    <div className="year-action"></div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Year;
