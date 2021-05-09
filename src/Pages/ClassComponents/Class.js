import React, { useEffect, useState, useContext } from "react";
import "./Class.css";
import Axios from "axios";
import { LoginContext } from "../../ContextFiles/LoginContext";

const Class = (props) => {
  // const [activities, setActivities] = useState([]);
  // useEffect(() => {
  //   Axios.get(`https://ecplcsms.herokuapp.com/class/post/${props.id}`).then((response) => {
  //     if(response.data.length === 0) {
  //       setActivities([])
  //     } else {
  //       setActivities(response.data.post)
  //     }
  //   })
  // }, [])

  const commentPost = (id) => {};

  const { valueID, valueFirstname } = useContext(LoginContext);
  const [userID, setUserID] = valueID;
  const [firstname, setFirstname] = useState("");
  const [comment, setComment] = useState("");
  const [write, setWrite] = useState(false);
  const [post, setPost] = useState("");
  const date = new Date().toLocaleDateString();

  const submitComment = (commentId) => {
    Axios.put(
      `https://ecplcsms.herokuapp.com/class/comment/${props.id}/${commentId}`,
      {
        comment: comment,
        commentor: firstname,
      }
    ).then((response) => {
      console.log(response.data.success);
    });
  };

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        setFirstname("");
      } else if (response.data.loggedIn) {
        setFirstname(response.data.firstname);
      }
    });
  }, []);

  const addPost = () => {
    Axios.put(`https://ecplcsms.herokuapp.com/class/post/${props.id}`, {
      body: post,
      date: date,
      poster: firstname,
    }).then((response) => {
      if (response.data.err) {
        props.setMsg(response.data.err);
      } else {
        props.setMsg(response.data.success);
        setPost("");
        props.setActivities([
          ...props.activities,
          {
            poster: firstname,
            body: post,
            date: date,
          },
        ]);
      }
    });
  };
  return (
    <>
      <div className="create-something">
        <div className="create-something-body-wrapper">
          <div className="create-something-left">
            <div></div>
          </div>

          <textarea
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            onClick={() => setWrite(true)}
            className={
              write ? "create-something-textarea" : "create-something-input"
            }
            placeholder="Write something to the class"
          ></textarea>
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
      <div className="classes-wrapper">
        {props.activities.length === 0 ? (
          <span>Nothing to show. Create one to reflect here.</span>
        ) : (
          <>
            {props.activities.map((value) => {
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
                    <div className="class-posts-body-body">{value.body}</div>
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
                        <div className="class-posts-body-header-left"></div>
                        <input
                          className="commentBtn"
                          type="text"
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write a comment"
                        />
                        {/* <i className="fas fa-share"></i> */}
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
