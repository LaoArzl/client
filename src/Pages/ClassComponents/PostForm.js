import React, { useState } from "react";
import Axios from "axios";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const date = new Date().toLocaleDateString();

  const addPost = () => {
    Axios.put(`https://ecplcsms.herokuapp.com/class/post/${props.id}`, {
      title: title,
      body: body,
      date: date,
      poster: props.firstname,
    }).then((response) => {
      if (response.data.err) {
        setMsg(response.data.err);
      } else {
        setMsg(response.data.success);
        setBody("");
        setTitle("");
        props.setActivities([
          ...props.activities,
          {
            poster: props.firstname,
            title: title,
            body: body,
            date: date,
          },
        ]);
      }
    });
  };
  return (
    <>
      <div className="post-msg">
        {msg}{" "}
        <span
          onClick={() => {
            props.showCreateStream(false);
          }}
        >
          View
        </span>
      </div>
      <div className="create-stream-post-header">
        <h3>Create Post</h3>
      </div>
      <div className="create-stream-post-body">
        <div className="create-stream-post-div0">
          <label>Topic</label>
          <input
            placeholder="Optional"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>

        <div className="create-stream-post-div">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write something for the class"
          ></textarea>
        </div>

        <div className="create-stream-post-divs">
          <input type="file" class="custom-file-input" />
          <input
            onClick={addPost}
            type="submit"
            className="stream-post-submit-btn"
            value="Create"
          />
        </div>
      </div>
    </>
  );
};

export default PostForm;
