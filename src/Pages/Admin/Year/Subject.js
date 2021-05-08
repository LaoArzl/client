import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import "./EditYear.css";

const Subject = (props) => {
  const [subject, setSubject] = useState([]);
  // const { valueAllYear } = useContext(StudentListContext);
  const [yearList, setYearList] = useState([]);
  const [addSubject, setAddSubject] = useState(false);

  // Updating/Adding subjects to class
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/year/${props.id}`).then(
      (response) => {
        if (response.data.subjects.length === 0) {
          setYearList([]);
        } else {
          setYearList(response.data.subjects);
        }
      }
    );
  }, []);

  const submitAdd = () => {
    Axios.put(`https://ecplcsms.herokuapp.com/year/add/${props.id}`, {
      subjectName: subjectName,
      subjectDescription: subjectDescription,
    }).then((response) => {
      if (response.data.err) {
        setStatusMsg(response.data.err);
      } else {
        setStatusMsg(response.data.success);
        setSubjectName("");
        setSubjectDescription("");
      }
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={
          addSubject
            ? "add-subject-form-after"
            : "add-subject-form-after-hidden"
        }
      >
        <div className="add-subject-form-after-header">
          <h3>Add Subject</h3>
        </div>

        <div className="add-subject-form-after-body">
          <div
            className={
              statusMsg === ""
                ? "add-subject-form-status-hidden"
                : statusMsg === "Successfully added subject (1)."
                ? "add-subject-form-status-green"
                : "add-subject-form-status"
            }
          >
            {statusMsg}
          </div>
          <div className="add-subject-div">
            <label>Subject Name</label>
            <input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              type="text"
            />
          </div>

          <div className="add-subject-div">
            <label>Description</label>
            <textarea
              value={subjectDescription}
              onChange={(e) => setSubjectDescription(e.target.value)}
              placeholder="Optional"
            ></textarea>
          </div>

          <div className="add-subject-div-submit">
            <input
              onClick={() => setAddSubject(false)}
              type="submit"
              value="Cancel"
              className="add-subject-cancel-btn"
            />
            <input
              onClick={submitAdd}
              type="submit"
              className="add-subject-btn-2"
            />
          </div>
        </div>
      </form>
      <div
        className={
          addSubject ? "add-subject-form-after-hidden" : "subject-wrapper"
        }
      >
        <div className="subject-wrapper-header">
          <h3>Subjects for {props.id}</h3>
        </div>
        <div className="subject-wrapper-body">
          {yearList.length === 0 ? (
            <div className="empty-year-subjects">
              <p>There's currently no subject.</p>
              <input
                onClick={() => setAddSubject(true)}
                type="submit"
                value="Add"
                className="add-subject-btn"
              />
            </div>
          ) : (
            <>
              <div className="yearlist-body-wrapper">
                {yearList.map((value) => {
                  return (
                    <div
                      key={value._id}
                      className="yearlist-body-wrapper-subject"
                    >
                      {value.subjectName}
                    </div>
                  );
                })}
                <input
                  onClick={() => setAddSubject(true)}
                  type="submit"
                  value="Add"
                  className="add-subject-btn-front"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;
