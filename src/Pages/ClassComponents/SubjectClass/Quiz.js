import React, { useState } from "react";
import "./Subject.css";
import Axios from "axios";

const Quiz = (props) => {
  const [question, setQuestion] = useState([]);
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create Quiz</h3>
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

export default Quiz;
