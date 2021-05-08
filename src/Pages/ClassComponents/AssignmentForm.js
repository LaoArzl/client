import React, { useState, useEffect } from "react";
import Axios from "axios";

const AssignmentForm = (props) => {
  const [points, setPoints] = useState(100);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/class/populate-subjects/${props.id}`).then((response) => {
      setSubjects(response.data.year.subjects);
    })
  }, [])
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
              {subjects.map((value) => {
                return <option key={value._id} value={value.subjectName}>{value.subjectName}</option>
              })}
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
          <textarea placeholder="Instruction or description about the activity"></textarea>
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
