import React, { useState, useEffect, useContext } from "react";
import "./Year.css";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const Year = () => {
  const [showForm, setShowForm] = useState(false);
  const [grade, setGrade] = useState("");
  const [number, setNumber] = useState("");
  const { valueAllYear, valueInitial } = useContext(StudentListContext);
  const [errMsg, setErrMsg] = useState("");
  const [initials, setInitials] = valueInitial;
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  const [yearList, setYearList] = valueAllYear;

  const submitCreate = () => {
    Axios.post("https://ecplc2021.herokuapp.com/year/create", {
      grade: grade,
      number: number,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
      } else {
        setErrMsg(response.data.success);
        setGrade("");
        setNumber("");
        setInitials(response.data.success);
      }
    });
  };

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="year-wrapper">
          <div
            onClick={() => setShowForm(false)}
            className={showForm ? "year-wrapper-after" : ""}
          ></div>
          {showForm && (
            <form
              className="year-wrapper-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="year-form-header">
                <h3>Add Level</h3>
              </div>
              <div className="year-form-body">
                <div
                  className={
                    errMsg === "Successfully added."
                      ? "error-year-msg-green"
                      : "error-year-msg-red"
                  }
                >
                  {errMsg}
                </div>
                <div className="year-form-div">
                  <label>Grade Level</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  >
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
                    value={number}
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1 - 10"
                  />
                </div>

                <div className="year-form-div-submit">
                  <input
                    onClick={() => {
                      setShowForm(false);
                      setErrMsg("");
                    }}
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
                <div className="list-grade-level-header">
                  <p>Grade Level</p>
                  <Tippy
                    content={
                      "You can add different subjects for each grade level in edit section."
                    }
                    arrow={true}
                    placement="bottom"
                  >
                    <i class="far fa-question-circle"></i>
                  </Tippy>
                </div>
              </div>
              {yearList.length === 0 ? (
                <div className="no-grade-level">
                  <p>There is no grade level yet. Create one. </p>
                </div>
              ) : (
                yearList.map((value) => {
                  return (
                    <div id={value._id} className="year-list-body">
                      <div className="year-id">{value._id}</div>
                      <div className="year-action">
                        <Link
                          className="router"
                          to={"/admin/edit-year/" + value._id}
                        >
                          <i className="fas fa-pen"></i>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Year;
