import React, { useState } from "react";
import "./Subject.css";
import Axios from "axios";

const Material = (props) => {
  const [question, setQuestion] = useState([]);
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create lecture</h3>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="quiz-body">
          <input type="submit" value="Add Item" className="create-quiz-btn" />
          {question.map(() => {
            return <div></div>;
          })}
        </form>
      </div>
    </>
  );
};

export default Material;
