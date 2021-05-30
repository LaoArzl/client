import React, { useEffect, useState, useContext } from "react";
import "./Class.css";
import Axios from "axios";
import { LoginContext } from "../../ContextFiles/LoginContext";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Loader from "../.././Components/Loader/Loader";
import { motion } from "framer-motion";

const Class = (props) => {
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
  const { valueID, valueFirstname } = useContext(LoginContext);
  const [userID, setUserID] = valueID;
  const [firstname, setFirstname] = useState("");
  const [comment, setComment] = useState("");
  const [write, setWrite] = useState(false);
  const [post, setPost] = useState("");
  const date = new Date().toLocaleDateString();

  const [key, setKey] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [loader, setLoader] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [postDropdown, setPostDropdown] = useState(false);
  const [postTo, setPostTo] = useState("General");

  const submitComment = (commentId) => {
    Axios.put(`https://ecplc2021.herokuapp.com/${props.id}/${commentId}`, {
      comment: comment,
      commentor: firstname,
    }).then((response) => {
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

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/class/populate-subjects/${props.id}`
    ).then((response) => {
      if (response.data.length === 0) {
        setSubjects([]);
      } else {
        //setSubjects()
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

  return (
    <>
      <div className="create-something">
        {loader && <Loader />}
        <div className="create-something-header">
          <p>General Discussion</p>
        </div>
        <div className="create-something-body">
          <div className="create-something-body-wrapper">
            <div className={write ? "post-to" : "hidden"}>
              <div
                className="post-to-div"
                onClick={() => setPostDropdown(!postDropdown)}
              >
                Post to: {postTo}{" "}
                <i
                  className={
                    postDropdown ? "fas fa-angle-up" : "fas fa-angle-down"
                  }
                ></i>
                <div className={postDropdown ? "post-to-div-after" : "hidden"}>
                  <div
                    onClick={() => setPostTo("General")}
                    className="post-to-div-after-item"
                  >
                    General
                  </div>
                  {subjects.map((e) => {
                    return (
                      <div
                        onClick={() => setPostTo(e.subjectName)}
                        className="post-to-div-after-item"
                      >
                        {e.subjectName}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              onClick={() => setWrite(true)}
              className={
                write ? "create-something-textarea" : "create-something-input"
              }
              placeholder="Write something to the class"
            ></textarea>
          </div>

          <div className={write ? "create-something-file" : "hidden"}>
            <div
              className={
                filename !== null
                  ? "actual-activity-body-left-footer"
                  : "hidden"
              }
            >
              <p className="footer-add-word">
                <InsertDriveFileOutlinedIcon
                  className="material-document"
                  fontSize="small"
                />
                <i>{filename}</i>
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
            </div>
            <input
              key={key}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFilename(e.target.files[0].name);
                setKey(e.target.files[0].name);
              }}
              type="file"
              className={filename !== null ? "hidden" : "custom-file-input"}
            />
          </div>
          <div className={write ? "write-btns-div" : "write-btns-div-hidden"}>
            <input
              onClick={() => setWrite(false)}
              type="submit"
              value="Cancel"
              className="write-cancel-btn"
            />
            <input
              onClick={addPost}
              type="submit"
              value="Post"
              className={
                post === "" ? "write-post-btn-opacity" : "write-post-btn"
              }
            />
          </div>
        </div>
      </div>
      <div className="classes-wrapper">
        {props.activities.length === 0 ? (
          <span>Nothing to show. Create one to reflect here.</span>
        ) : (
          <>
            {props.activities.map((value) => {
              return (
                <div key={value._id} className="class-posts">
                  <div className="class-posts-body">
                    <div
                      onClick={() => setOption(!option)}
                      className="option-menu"
                    >
                      <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate={value.isEditing ? "visible" : ""}
                        transition={{ duration: 0.1 }}
                        className="option-menu-after"
                      >
                        <div className="option-menu-item">
                          <p>Edit</p>
                        </div>
                        <div className="option-menu-item">
                          <p onClick={() => setDel(true)}>Delete</p>
                        </div>
                      </motion.div>
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
                    <div className="class-posts-body-body">{value.body}</div>
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
          </>
        )}
      </div>
    </>
  );
};

export default Class;
