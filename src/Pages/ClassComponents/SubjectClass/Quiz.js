import React, { useState } from "react";
import "./Subject.css";
import Axios from "axios";

const Quiz = (props) => {
  const [questionType, setQuestionType] = useState("Multiple");
  const [question, setQuestion] = useState([
    {
      number: 1,
      points: "",
      type: questionType,
      question: "",
      essayAnswer: "",
      identificationAnswer: "",
      multipleAnswer: {
        multipleOne: "",
        multipleTwo: "",
        multipleThree: "",
        multipleFour: "",
      },
      totalItems: "",
    },
  ]);
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create Quiz</h3>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="quiz-body">
          <input type="submit" value="Add Item" className="create-quiz-btn" />
          {question.map((value) => {
            return (
              <>
                <div className="quiz-question">
                  <div className="quiz-question-number">No. {value.number}</div>
                  <div className="quiz-question-questionType">
                    <label>Type of question:</label>
                    <select>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Identification">Identification</option>
                    </select>
                  </div>
                  <div className="quiz-question-question">
                    Question:{" "}
                    <input
                      type="text"
                      value={value.question}
                      onChange={(e) => setQuestion()}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default Quiz;
