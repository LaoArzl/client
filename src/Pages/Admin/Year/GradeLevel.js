import React, { useEffect, useState } from "react";
import Axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { withRouter, useHistory } from "react-router-dom";

const GradeLevel = (props) => {
  const [grade, setGrade] = useState("");
  const [number, setNumber] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [confirm, setConfirm] = useState("");

  const history = useHistory();

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
        if (response) {
          history.push("/admin/year");
        }
      }
    );
  };

  return (
    <>
      {grade === "" ? (
        <Loader />
      ) : (
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
                <h3>
                  Warning <i class="fas fa-exclamation-triangle"></i>
                </h3>
              </div>
              <div className="edit-grade-level-wrapper-after-body">
                <p>
                  The action you are about to make is irreversible. This will
                  permanently delete the grade level {props.id}.
                </p>
                <p>
                  Type <b>{props.id}</b> to confirm.
                </p>
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="text"
                  className="grade-level-edit-input-btn"
                />
                <div className="grade-level-edit-btn-wrapper">
                  <input
                    onClick={() => {
                      setShowDelete(false);
                      setConfirm("");
                    }}
                    type="submit"
                    className="grade-level-edit-btn-cancel-btn"
                    value="Cancel"
                  />
                  <input
                    onClick={submitDelete}
                    type="submit"
                    className={
                      confirm === props.id
                        ? "grade-level-edit-btn-delete-btn"
                        : "grade-level-edit-btn-delete-btn-false"
                    }
                    value="Delete"
                  />
                </div>
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
      )}
    </>
  );
};

export default withRouter(GradeLevel);
