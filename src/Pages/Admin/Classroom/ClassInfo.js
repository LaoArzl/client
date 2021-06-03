import React from "react";
import Axios from "axios";

const ClassInfo = (props) => {
  const updateClass = () => {
    props.setLoader(true);
    Axios.put(
      `https://ecplc2021.herokuapp.com/class/update-class/${props.id}`,
      {
        classname: props.classess.classname,
        years: props.classess.years,
        year: props.classess.year,
        capacity: props.classess.capacity,
        section: props.classess.section,
      }
    ).then((response) => {
      if (response.data.err) {
        props.setLoader(false);
        props.setMessage(response.data.err);
      } else {
        console.log(response.data);
        props.setLoader(false);
        props.setMessage(response.data.success);
        props.setInitial(response.data.success);
        setTimeout(() => {
          props.setInitial("");
          props.setMessage("");
        }, 5000);
      }
    });
  };
  return (
    <>
      <div className="class-info">
        <div className="admission-div">
          <label>School year</label>
          <input value={props.classess.years} readOnly type="text"></input>
        </div>
        <div className="admission-div">
          <label>Class Name</label>
          <input
            value={props.classess.year + " - " + props.classess.section}
            readOnly
            type="text"
          ></input>
        </div>

        <div className="admission-div">
          <label>Grade Year</label>
          <select
            value={props.classess.year}
            onChange={(e) => {
              let value = e.target.value;
              props.setClassess({
                classname: props.classess.year + " - " + props.classess.section,
                years: props.classess.years,
                capacity: props.classess.capacity,
                section: props.classess.section,
                year: value,
              });
            }}
          >
            <option disabled value="">
              Select Option
            </option>
            <option value="Kinder 1">Kinder 1</option>
            <option value="Kinder 2">Kinder 2</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>

        <div className="admission-div">
          <label>Section</label>
          <input
            value={props.classess.section}
            onChange={(e) => {
              let value = e.target.value;
              props.setClassess({
                classname: props.classess.year + " - " + props.classess.section,
                years: props.classess.years,
                capacity: props.classess.capacity,
                section: value,
                year: props.classess.year,
              });
            }}
            type="text"
          ></input>
        </div>

        <div className="admission-div">
          <label>Size</label>
          <input
            value={props.classess.capacity}
            onChange={(e) => {
              let value = e.target.value;
              props.setClassess({
                classname: props.classess.year + " - " + props.classess.section,
                years: props.classess.years,
                capacity: value,
                section: props.classess.section,
                year: props.classess.year,
              });
            }}
            type="number"
            min="1"
            max="40"
          ></input>
        </div>

        <div className="submit-btn-update-class">
          <input onClick={updateClass} type="submit" value="Update" />
        </div>
      </div>
    </>
  );
};

export default ClassInfo;
