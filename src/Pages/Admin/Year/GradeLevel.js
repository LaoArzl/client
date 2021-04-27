import React, { useEffect, useState } from "react";
import Axios from "axios";

const GradeLevel = (props) => {
  const [grade, setGrade] = useState([]);
  const [number, setNumber] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/year/${props.id}`).then(
      (response) => {
        if (response.data.length === 0) {
          setGrade("");
          setNumber("");
        } else {
          setGrade(response.data.grade);
          setNumber(response.data.year);
        }
      }
    );
  }, []);

  const submitDelete = () => {
    Axios.put(`https://ecplcsms.herokuapp.com/year/${props.id}`, {}).then(
      (response) => {
        console.log("Ere");
      }
    );
  };
  return (
    <>
      <div className="edit-grade-level-wrapper">
        <div
          className={
            showDelete
              ? "edit-grade-level-wrapper-after"
              : "edit-grade-level-wrapper-after-hidden"
          }
        >
          <div className="edit-grade-level-wrapper-after-header">
            <h3>Warning</h3>
          </div>
          <div className="edit-grade-level-wrapper-after-body">
            <p>
              The action you are about to make is irreversible. Once deleted it
              cannot be undone. Type <b>{props.id}</b> to delete.
            </p>
            <input type="text" />
          </div>
        </div>
        <form
          className="edit-grade-level-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="edit-grade-level-form-header">
            <h3>Edit Grade Level</h3>
          </div>
          <div className="edit-grade-level-form-body">
            <div className="edit-grade-level-div">
              <label>Grade Level</label>
              <input ty="text" value={grade} />
            </div>
            <div className="edit-grade-level-div">
              <input value={number} type="text" />
            </div>

            <div className="edit-grade-level-div-submit">
              <input
                onClick={() => setShowDelete(true)}
                type="submit"
                value="Delete"
                className="edit-grade-level-delete-btn"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default GradeLevel;
