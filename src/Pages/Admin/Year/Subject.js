import React, { useState, useContext } from "react";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const Subject = (props) => {
  const [subject, setSubject] = useState([]);
  const { valueAllYear } = useContext(StudentListContext);
  const [yearList, setYearList] = valueAllYear;
  const [addSubject, setAddSubject] = useState(false);
  const [subjectName, setSubjectName] = useState([]);

  const submitAdd = () => {
    Axios.put(`https://ecplcsms.herokuapp.com/year/add/${props.id}`, {
      subjectName: subjectName,
    }).then((response) => {
      if (response) {
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
          <div className="add-subject-div">
            <label>Subject Name</label>
            <input
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              type="text"
            />
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
              className="add-subject-btn"
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
        <div className="add-subject-response"></div>
        <div className="subject-wrapper-body">
          {!yearList.subjects ? (
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
              {yearList.map((value) => {
                return (
                  <div key={value._id} className="yearlist-body-wrapper">
                    {value.subjects}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;
