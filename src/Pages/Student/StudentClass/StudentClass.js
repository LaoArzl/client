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

  const [createStream, showCreateStream] = useState(false);
  const [postNav, setPostNav] = useState("post");
  const [msg, setMsg] = useState("");

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

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setFirstname("");
      } else if (response.data.loggedIn) {
        setFirstname(response.data.firstname);
      }
    });
  }, [props.initial]);

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/populate-subjects/${props.id}`
    ).then((response) => {
      if (response.data.length === 0) {
        setSubjects([]);
      } else {
        setSubjects(response.data.year[0].subjects);
      }
    });
  }, [props.initial]);

  const addPost = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("caption", filename);
    formData.append("file", file);

    Axios.put(`https://ecplc2021.herokuapp.com/class/post/${props.id}`, {
      body: post,
      date: date,
      poster: firstname,
      tags: postTo,
      file: filename,
    }).then((response) => {
      if (response.data.err) {
        props.setMsg(response.data.err);
        setLoader(false);
      } else {
        Axios.post(
          "https://ecplc2021.herokuapp.com/file/upload-file",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        props.setMsg(response.data.success);
        setPost("");
        props.setInitial([]);
        setTimeout(() => props.setMsg(""), 5000);
        setLoader(false);
        setKey(null);
        setFilename(null);
        setFile(null);
      }
    });
  };

  const dropdownVariants = {
    visible: {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 3,
    },
    initial: {
      y: -50,
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    },
  };
  const [del, setDel] = useState(false);
  const [option, setOption] = useState(false);

  const [key, setKey] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [loader, setLoader] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [postDropdown, setPostDropdown] = useState(false);
  const [postTo, setPostTo] = useState("General");

  // const submitComment = (commentId) => {
  //   Axios.put(`https://ecplc2021.herokuapp.com/${props.id}/${commentId}`, {
  //     comment: comment,
  //     commentor: firstname,
  //   }).then((response) => {
  //     if (response.data.success) {
  //       props.setInitial([]);
  //       setComment("");
  //     }
  //   });
  // };
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/user-login`).then((response) => {
      if (response.data.loggedIn === false) {
        setUserId("");
      } else {
        setUserId(response.data.id);
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
                  <p>Upcoming Works</p>
                </div>
                <div className="class-content-body-left-body">
                  {activity
                    .filter((active) => active.active === true)
                    .map((value) => {
                      return (
                        <Link
                          className="link"
                          to={"/student/activity/" + userId + "/" + value._id}
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
                <div className="create-something-body">
                  {activities.map((value) => {
                    return (
                      <div key={value._id} className="class-posts">
                        <div className="class-posts-body">
                          <div
                            onClick={() => setOption(!option)}
                            className="option-menu"
                          >
                            <div
                              // variants={dropdownVariants}
                              // initial="initial"
                              // animate={value.isEditing ? "visible" : ""}
                              // transition={{ duration: 0.1 }}
                              className="hidden"
                            >
                              <div className="option-menu-item">
                                <p>Edit</p>
                              </div>
                              <div className="option-menu-item">
                                <p onClick={() => setDel(true)}>Delete</p>
                              </div>
                            </div>
                            <i className="fas fa-ellipsis-v"></i>
                          </div>
                          <div className="class-posts-body-header">
                            <div className="class-posts-body-header-left"></div>
                            <div className="class-posts-body-header-right">
                              <h5>{value.poster}</h5>
                              <p>{value.date}</p>
                              <div className="tags">{value.tags}</div>
                            </div>
                          </div>
                          <div className="class-posts-body-body">
                            {value.body}
                          </div>
                          {/* <div className="actual-activity-body-left-footer">
                      <p className="footer-add-word">
                        <InsertDriveFileOutlinedIcon
                          className="material-document"
                          fontSize="small"
                        />
                        <i>{value.file}</i>
                      </p>
                      <span
                        onClick={() => {
                          setFilename(null);
                          setFile(null);
                          setKey(null);
                        }}
                      >
                        <i className="far fa-times-circle"></i>
                      </span>
                    </div> */}
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
                                    <p>{comment.comment} </p>
                                  </div>
                                </div>
                              );
                            })}
                            <form
                              onSubmit={(e) => e.preventDefault()}
                              className="class-posts-body-comment-upper"
                            >
                              <div className="class-posts-body-header-left"></div>
                              <input
                                className="commentBtn"
                                type="text"
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment"
                              />
                              <input
                                onClick={() => {
                                  submitComment(value._id);
                                  setComment("");
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
