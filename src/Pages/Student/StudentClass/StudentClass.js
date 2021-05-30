import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import Axios from "axios";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import { Link, Redirect } from "react-router-dom";
import BrokenPage from "../../../Components/My404Component/BrokenPage";

const StudentClass = (props) => {
  const { valueID, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  const [userId, setUserId] = valueID;
  const [createStream, showCreateStream] = useState(false);
  const [postNav, setPostNav] = useState("post");
  const [msg, setMsg] = useState("");

  const [userID, setUserID] = valueID;
  const [firstname, setFirstname] = useState("");
  const [comment, setComment] = useState("");
  const [write, setWrite] = useState(false);
  const [post, setPost] = useState("");
  const date = new Date().toLocaleDateString();

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/class/post/${props.id}`).then(
      (response) => {
        if (!response.data.post[0]) {
          setActivities([]);
        } else {
          setActivities(response.data.post);
        }
      }
    );
  }, [props.initial]);

  const submitComment = (commentId) => {
    Axios.put(
      `https://ecplc2021.herokuapp.com/class/comment/${props.id}/${commentId}`,
      {
        comment: comment,
        commentor: firstname,
      }
    ).then((response) => {
      if (response.data.success) {
        props.setInitial([]);
        setComment("");
      }
    });
  };

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setFirstname("");
      } else if (response.data.loggedIn) {
        setFirstname(response.data.firstname);
      }
    });
  }, [props.initial]);

  //Activity List
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/assignment/${props.id}`
    ).then((response) => {
      if (response.data.length === 0) {
        setActivity([]);
      } else {
        setActivity(response.data.activity);
      }
    });
  }, [props.initial]);

  return (
    <>
      {role !== "Student" ? (
        <BrokenPage />
      ) : (
        <div className="teacher-class-wrapper">
          <div
            onClick={() => showCreateStream(false)}
            className={createStream ? "teacher-class-wrapper-after" : ""}
          ></div>
          <StudentDashboard />
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
                  to={"/student-class/" + props.id + "/subjects"}
                >
                  Subjects
                </Link>

                <Link
                  className="nav-span-diactive"
                  to={"/student-class/" + props.id + "/people"}
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
                <div className="class-content-body-left-body">
                  {activity
                    .filter((active) => active.active === true)
                    .map((value) => {
                      return (
                        <Link
                          className="link"
                          to={"/student/activity/" + value._id}
                        >
                          {value.topic}
                        </Link>
                      );
                    })}

                  <Link
                    to="/student/activity/all"
                    className={
                      activity.length === 0 ? "hidden" : "view-all-link"
                    }
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="class-content-body-right">
                <div className="classes-wrapper">
                  {activities.map((value) => {
                    return (
                      <div key={value._id} className="class-posts">
                        <div className="class-posts-body">
                          <div className="class-posts-body-header">
                            <div className="class-posts-body-header-left"></div>
                            <div className="class-posts-body-header-right">
                              <h5>{value.poster}</h5>
                              <p>{value.date}</p>
                            </div>
                          </div>
                          <div className="class-posts-body-body">
                            {value.body}
                          </div>
                          <div className="class-posts-body-comment">
                            {value.comments.map((comment) => {
                              return (
                                <div
                                  className={
                                    value.comments === 0
                                      ? "class-posts-body-comment-lower-hidden"
                                      : "class-posts-body-comment-lower"
                                  }
                                >
                                  <div className="class-posts-body-header-left"></div>
                                  <div className="class-posts-body-comment-user">
                                    <h5>{comment.commentor}</h5>
                                    {comment.comment}
                                  </div>
                                </div>
                              );
                            })}
                            <form
                              onSubmit={(e) => e.preventDefault()}
                              className="class-posts-body-comment-upper"
                            >
                              <div className="class-posts-body-header-left">
                                <img src={props.picture} />
                              </div>
                              <input
                                value={comment}
                                className="commentBtn"
                                type="text"
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment"
                              />
                              <input
                                onClick={() => {
                                  submitComment(value._id);
                                }}
                                className="comment-submit-btn"
                                type="submit"
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StudentClass;
