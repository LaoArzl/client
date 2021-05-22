import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../ContextFiles/LoginContext";
import Axios from "axios";
import BrokenPage from "../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../Teacher/TeacherDashboard/TeacherDashboard";
import "./Class.css";
import Class from "./Class";
import { Link, Redirect } from "react-router-dom";

const ClassTeacher = (props) => {
  const { valueID, } = useContext(LoginContext);
  const [userId, setUserId] = valueID;
  const [createStream, showCreateStream] = useState(false);
  const [postNav, setPostNav] = useState("post");
  const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   Axios.get(`https://ecplcsms.herokuapp.com/class/class/${props.id}`).then(
  //     (response) => {
  //       if (response.data.length === 0) {
  //         setClassData([]);
  //       } else {
  //         setClassData(response.data);
  //         setTeacherName(response.data[0].adviser_id.fullname);
  //       }
  //     }
  //   );
  // }, []);

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/class/post/${props.id}`).then(
      (response) => {
        if (!response.data.post[0]) {
          setActivities([]);
        } else {
          setActivities(response.data.post);
        }
      }
    );
  }, [props.initial]);

  return (
    <>
      <div className="teacher-class-wrapper">
        <div
          onClick={() => showCreateStream(false)}
          className={createStream ? "teacher-class-wrapper-after" : ""}
        ></div>
        <TeacherDashboard />
        <div className={msg === "" ? "post-msg-hidden" : "post-msg"}>{msg}</div>
        <div className="class-content">
          <DashboardHeader />
          <div className="class-content-header">
            <div className="class-content-upper-header">
              <h2>{props.name}</h2>
              <p>{props.adviser}</p>
            </div>
            <div className="class-content-lower-header">
              <Link className="nav-span-active">Posts</Link>

              <Link
                className="nav-span-diactive"
                to={"/teacher-class/" + props.id + "/subjects"}
              >
                Subjects
              </Link>

              <Link
                className="nav-span-diactive"
                to={"/teacher-class/" + props.id + "/people"}
              >
                People
              </Link>
            </div>
          </div>

          <div className="class-content-body">
            <div className="class-content-body-left">
              <div className="class-content-body-left-header">
                <p>Bulletin Board</p>
              </div>
              <div className="class-content-body-left-body">
              </div>
            </div>
            <div className="class-content-body-right">
              <Class
                id={props.id}
                showCreateStream={showCreateStream}
                activities={activities}
                setActivities={setActivities}
                msg={msg}
                setMsg={setMsg}
                setInitial={props.setInitial}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClassTeacher;
