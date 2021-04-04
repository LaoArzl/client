import React, { useEffect, useState } from "react";
import "./Class.css";
import Axios from "axios";

const AddPeople = (props) => {
  return (
    <>
      <div className="addpeople-wrapper">
        {props.studentState.map((d) => {
          return (
            <>
              <div key={d.id} className="people-wrapper-add-student-body">
                <input
                  id="input-checkbox"
                  type="checkbox"
                  checked={d.select}
                  onChange={(e) => {
                    let value = e.target.checked;
                    props.setStudentState(
                      props.studentState.map((sd) => {
                        if (sd.id === d.id) {
                          sd.select = value;
                        }
                        return sd;
                      })
                    );
                  }}
                />
                {d.name}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AddPeople;
