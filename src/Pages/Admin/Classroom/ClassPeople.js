import React, { useEffect, useState } from "react";
import Axios from "axios";

const ClassPeople = (props) => {
  const [studentData, setStudentData] = useState([]);
  const [adviser, setAdviser] = useState([]);
  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/class/class/${props.id}`).then(
      (response) => {
        if (response.data.length === 0) {
          setStudentData([]);
        } else {
          setStudentData(response.data[0].students);
          setAdviser(response.data[0].adviser_id);
        }
      }
    );
  }, [props.initial]);
  return (
    <>
      <div className="people-info">
        <div className="people-header">
          <h4>Teachers</h4>
        </div>
        <div className="people-body">
          <div className="people-body-body">
            <p>1.</p>
            {adviser.fullname}
          </div>
        </div>
      </div>

      <div className="people-info">
        <div className="people-header">
          <h4>Students</h4>
          <div className="add-student-btn">Add Student</div>
        </div>
        <div className="people-body">
          {studentData.map((e, key) => {
            return (
              <div key={e._id} className="people-body-body">
                <p>{key + 1}.</p>
                {e.fullname}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ClassPeople;
