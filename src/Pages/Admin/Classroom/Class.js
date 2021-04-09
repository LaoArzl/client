import React, { useEffect, useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import "./Class.css";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import Axios from "axios";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const Class = () => {
  const { value01, valueAllClass } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [activeClass, setActiveClass] = useState(0);
  const [archivedClass, setArchivedClass] = useState(0);

  const [showCreate, setShowCreate] = useState(false);

  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const [activeArch, setActiveArch] = useState(false);

  const [classroom, setClassroom] = valueAllClass;

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/class/class-active").then(
      (response) => {
        if (response.data.length === 0) {
          setActiveClass(0);
        } else {
          setActiveClass(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/class/class-archived").then(
      (response) => {
        if (response.data.length === 0) {
          setArchivedClass(0);
        } else {
          setArchivedClass(response.data);
        }
      }
    );
  });

  const makeFalse = () => {
    setShowCreate(false);
    setErrMsg("");
  };

  const [className, setClassName] = useState("");
  const [classCapacity, setClassCapacity] = useState(0);
  const [classYear, setClassYear] = useState("");
  const [classAdviser, setClassAdviser] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitCreate = () => {
    Axios.post("https://ecplcsms.herokuapp.com/class/create-class", {
      className: className,
      classCapacity: classCapacity,
      classYear: classYear,
      classAdviser: classAdviser,
    }).then((response) => {
      if (response.data.err) {
        setErrMsg(response.data.err);
      } else if (response.data.success) {
        setClassName("");
        setClassCapacity("");
        setClassYear("");
        setClassAdviser("");
        setErrMsg(response.data.success);
        setTimeout(() => setErrMsg(""), 5000);
        setClassroom([
          ...classroom,
          {
            className: className,
            adviser_id: classAdviser,
            capacity: classCapacity,
          },
        ]);
      }
    });
  };

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <div className="class-wrapper">
          {showCreate ? (
            <>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="create-subject-form"
              >
                <div
                  className={
                    errMsg === ""
                      ? "class-error-message"
                      : errMsg === "Successfully created"
                      ? "class-error-message-green"
                      : "class-error-message-red"
                  }
                >
                  <i className="fas fa-exclamation-circle"></i>
                  {errMsg}
                </div>
                <div className="create-class-div">
                  <label>Class Name</label>
                  <input
                    onChange={(e) => setClassName(e.target.value)}
                    value={className}
                    type="text"
                  ></input>
                </div>
                <div className="create-class-div">
                  <label>Capacity</label>
                  <input
                    onChange={(e) => setClassCapacity(e.target.value)}
                    value={classCapacity}
                    type="number"
                    min="1"
                    max="40"
                  ></input>
                </div>
                <div className="create-class-div">
                  <label>Grade Year</label>
                  <select
                    onChange={(e) => setClassYear(e.target.value)}
                    value={classYear}
                  >
                    <option disabled value="">
                      Select Option
                    </option>
                    <option value="Kinder 1">Kinder 1</option>
                    <option value="Kinder 2">Kinder 2</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                  </select>
                </div>

                <div className="create-class-div">
                  <label>Class Adviser</label>
                  <select
                    onChange={(e) => setClassAdviser(e.target.value)}
                    value={classAdviser}
                  >
                    <option disabled value="">
                      Select Option
                    </option>
                    {teachers.map((value, key) => {
                      return (
                        <option key={key} value={value._id}>
                          {value.fullname}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="create-class-div-submit">
                  <input
                    onClick={makeFalse}
                    type="button"
                    className="create-class-reset-btn"
                    value="Cancel"
                  />
                  <input
                    onClick={submitCreate}
                    type="submit"
                    className="create-class-create-btn"
                    value="Create"
                  />
                </div>
              </form>
            </>
          ) : (
            ""
          )}
          <Dashboard />
          <div
            onClick={() => setShowCreate(!showCreate)}
            className={showCreate ? "class-wrapper-active" : ""}
          ></div>
          <div className="class-content">
            <DashboardHeader />
            <div className="class-actual-body-header">
              <div className="div-class-search">
                <i className="fas fa-search"></i>
                <input type="search" placeholder="Search for a class"></input>
              </div>
              <div className="div-class-active">
                <span
                  className={
                    activeArch === false
                      ? "class-actual-body-header-1-active"
                      : "class-actual-body-header-1"
                  }
                >
                  Active
                </span>
                <span
                  className={
                    activeArch === true
                      ? "class-actual-body-header-2-active"
                      : "class-actual-body-header-1"
                  }
                >
                  Archive
                </span>
              </div>
              <span
                onClick={() => setShowCreate(true)}
                className="add-class-button"
              >
                <i className="fas fa-plus"></i>
                Create
              </span>
            </div>
            <div className="class-actual-body">
              {activeArch === false ? (
                <div className="class-actual-body-active">
                  <div className="class-actual-body-active-header">
                    <div className="class-actual-body-active-name">
                      Class name
                    </div>
                    <div className="class-actual-body-active-adviser">
                      Class adviser
                    </div>
                    <div className="class-actual-body-active-capacity">
                      Size
                    </div>
                    <div className="class-actual-body-active-action">
                      Action
                    </div>
                  </div>
                  {classroom.map((key) => {
                    return (
                      <div
                        key={key._id}
                        className="class-actual-body-active-body"
                      >
                        <div className="class-actual-body-active-name">
                          {key.className}
                        </div>
                        <div className="class-actual-body-active-adviser">
                          {key.adviser_id.fullname}
                        </div>
                        <div className="class-actual-body-active-capacity">
                          {key.capacity}
                        </div>
                        <div className="class-actual-body-active-action">
                          <Link
                            className="router"
                            to={"/admin/class/edit/" + key._id}
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="class-actual-body-archive">
                  {archivedClass === 0 ? (
                    <p>There is no archived class.</p>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
            <p></p>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Class);
