import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../../../Components/Dashboard/Dashboard";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import "./EditClass.css";
import Axios from "axios";
import ClassPeople from "./ClassPeople";
import ClassInfo from "./ClassInfo";
import Loader from "../../../Components/Loader/Loader";

const EditClass = (props) => {
  const [editPage, setEditPage] = useState("class");
  const [classess, setClassess] = useState([]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [initial, setInitial] = useState("");

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/class/class/${props.id}`).then(
      (response) => {
        let e = response.data[0];
        setClassess({
          classname: e.className,
          capacity: e.capacity,
          section: e.section,
          years: e.years,
          year: e.year,
        });
      }
    );
  }, [initial]);
  return (
    <>
      {loader && <Loader />}
      <div className="edit-class-wrapper">
        <Dashboard />
        <div className={message !== "" ? "successfully-created" : "hidden"}>
          {message}
        </div>
        <div className="edit-class-content">
          <DashboardHeader />
          <div className="edit-class-body">
            <div className="edit-class-left">
              <div
                onClick={() => setEditPage("class")}
                className={
                  editPage === "class"
                    ? "edit-class-left1-active"
                    : "edit-class-left1"
                }
              >
                Class Details
              </div>
              <div
                onClick={() => setEditPage("people")}
                className={
                  editPage === "people"
                    ? "edit-class-left1-active"
                    : "edit-class-left2"
                }
                className="edit-class-left2"
              >
                People
              </div>
            </div>
            <div className="edit-class-right">
              {editPage === "class" && (
                <ClassInfo
                  classess={classess}
                  setClassess={setClassess}
                  loader={loader}
                  setLoader={setLoader}
                  setMessage={setMessage}
                  setInitial={setInitial}
                  id={props.id}
                />
              )}

              {editPage === "people" && (
                <ClassPeople
                  loader={loader}
                  setLoader={setLoader}
                  setMessage={setMessage}
                  setInitial={setInitial}
                  id={props.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(EditClass);
