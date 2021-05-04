import React, { useState } from "react";

const AssignmentForm = () => {
  const [points, setPoints] = useState(100);
  return (
    <>
      <div className="create-stream-post-header">
        <h3>Create Assignment</h3>
      </div>

      <div className="create-stream-post-body">
        <div className="create-stream-post-div0">
          <label>Points</label>
          <div className="create-stream-post-div-points">
            <input
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              type="number"
              id="create-stream-post-div-points-input"
              min="1"
            />
          </div>
        </div>
        <div className="create-stream-post-div0">
          <label>Topic</label>
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

          <div className="create-stream-post-div3">
            <label>Time</label>
            <input type="time"></input>
          </div>
        </div>

        <div className="create-stream-post-div">
          <label>Description</label>
          <textarea placeholder="Instruction or description about the activity (Optional)"></textarea>
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
