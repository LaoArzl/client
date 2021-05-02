import React from "react";

const AssignmentForm = () => {
  return (
    <>
      <div className="create-stream-post-header">
        <h3>Create Assignment</h3>
      </div>
      <div className="create-stream-post-body">
        <div className="create-stream-post-div0">
          <label>Title</label>
          <input type="text" />
        </div>
        <div className="create-stream-post-div-wrapper">
          <div className="create-stream-post-div1">
            <label>Subject</label>
            <select>
              <option value="" disabled>
                Select option
              </option>
            </select>
          </div>

          <div className="create-stream-post-div2">
            <label>Due Date</label>
            <input type="date"></input>
          </div>
        </div>

        <div className="create-stream-post-div">
          <label>Description</label>
          <textarea placeholder="Optional"></textarea>
        </div>

        <div className="create-stream-post-divs">
          <input type="file" class="custom-file-input" />
          <input
            className="stream-post-submit-btn"
            type="submit"
            value="Create"
          />
        </div>
      </div>
    </>
  );
};

export default AssignmentForm;
