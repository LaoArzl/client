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
  const [firstname, setFirstname] = valueFirstname;
  const [comment, setComment] = useState("");
  const [real, setReal] = useState([
    {
      comment: "",
    },
  ]);

  const submitComment = (commentId) => {
    Axios.put(
      `https://ecplcsms.herokuapp.com/class/comment/${props.id}/${commentId}`,
      {
        comment: comment,
        commentor: firstname,
      }
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <div className="create-something">
        <div className="create-something-left">
          <div></div>
        </div>
        <div
          onClick={() => props.showCreateStream(true)}
          className="create-something-right"
        >
          Post something or create activites here.
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
                  <div
                    className={value.title === "" ? "" : "class-posts-header"}
                  >
                    <h4>{value.title}</h4>
                  </div>
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

                      <div
                        className={
                          value.comments === 0
                            ? "class-posts-body-comment-lower-hidden"
                            : "class-posts-body-comment-lower"
                        }
                      >
                        <div className="class-posts-body-header-left"></div>

                        {value.comments.map((comment) => {
                          return (
                            <div className="class-posts-body-comment-user">
                              {comment.comment}
                              {comment.commentor}
                            </div>
                          );
                        })}
                      </div>
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
