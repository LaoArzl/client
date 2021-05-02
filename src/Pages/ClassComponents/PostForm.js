import React from "react";

const PostForm = () => {
  return (
    <>
      <div className="create-stream-post-header">
        <h3>Create Post</h3>
      </div>
      <div className="create-stream-post-body">
        <div className="create-stream-post-div0">
          <label>Title</label>
          <input type="text" />
        </div>

        <div className="create-stream-post-div">
          <label>Description</label>
          <textarea placeholder="Write something for the class"></textarea>
        </div>

        <div className="create-stream-post-divs">
          <input type="file" class="custom-file-input" />
          <input
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
