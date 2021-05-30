import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../ContextFiles/LoginContext";
import Axios from "axios";
import BrokenPage from "../../Components/My404Component/BrokenPage";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import TeacherDashboard from "../Teacher/TeacherDashboard/TeacherDashboard";
import "./Class.css";
import Class from "./Class";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";

const ClassTeacher = (props) => {
  const { valueID, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
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
    Axios.get(`https://ecplc2021.herokuapp.com/class/post/${props.id}`).then(
      (response) => {
        if (!response.data.post[0]) {
          setActivities([]);
        } else {
          setActivities(response.data.post);
          console.log(response.data.post);
        }
      }
    );
  }, [props.initial]);

  const pageVariants = {
    initial: {
      opacity: 0.5,
      scale: 0.998,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 1,
      scale: 0.5,
    },
  };

  return (
    <>
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="teacher-class-wrapper"
        >
          <div
            onClick={() => showCreateStream(false)}
            className={createStream ? "teacher-class-wrapper-after" : ""}
          ></div>
          <TeacherDashboard />

          <div className={msg === "" ? "post-msg-hidden" : "post-msg"}>
            {msg}
          </div>
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
                  <p>Upcoming Work</p>
                </div>
                <div className="class-content-body-left-body"></div>
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
        </motion.div>
      )}
    </>
  );
};
export default ClassTeacher;
