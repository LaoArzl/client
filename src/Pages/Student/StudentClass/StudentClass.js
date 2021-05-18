import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Axios from "axios";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import { Link, Redirect } from "react-router-dom";

const StudentClass = (props) => {
  const { valueID } = useContext(LoginContext);
  const [userId, setUserId] = valueID;
  const [createStream, showCreateStream] = useState(false);
  const [postNav, setPostNav] = useState("post");
  const [msg, setMsg] = useState("");

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
  }, []);

  return (
    <>
      <div className="teacher-class-wrapper">
        <div
          onClick={() => showCreateStream(false)}
          className={createStream ? "teacher-class-wrapper-after" : ""}
        ></div>
        <StudentDashboard />
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
                <p>No upcoming work</p>
              </div>
            </div>
            <div className="class-content-body-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentClass;
