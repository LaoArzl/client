import React, { useState } from "react";
import "./Subject.css";
import Axios from "axios";
import "./Quiz.css";

const Quiz = (props) => {
  const [questionType, setQuestionType] = useState("Multiple");
  const [question, setQuestion] = useState([]);
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create Quiz</h3>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="quiz-body">
          <input
            onClick={() =>
              setQuestion([
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
              ])
            }
            type="submit"
            value="Create Quiz Form"
            className={question.length === 0 ? "create-quiz-btn" : "hidden"}
          />

          <div className="add-another-question">
            <input type="submit" value="Add question" />
          </div>

          {question.length !== 0 && (
            <>
              {question.map((value) => {
                return (
                  <>
                    <div className="quiz-wrapper">
                      <div className="quiz-question-number">
                        No. {value.number}
                      </div>
                      <div className="quiz-question-questionType">
                        <label>Type of question:</label>
                        <select>
                          <option
                            onChange={(e) =>
                              setQuestion({ questionType: e.target.value })
                            }
                            value="Multiple Choice"
                          >
                            Multiple Choice
                          </option>
                          <option value="Identification">Identification</option>
                          <option value="Short Answer">Short Answer</option>
                          <option value="Essay">Essay</option>
                        </select>
                      </div>
                      <div className="quiz-question-quest">
                        <label>Question</label>
                        <input
                          type="text"
                          value={value.question}
                          onChange={(e) => setQuestion()}
                        />
                      </div>

                      <div className="quiz-question-answer">
                        <label>Answer</label>
                        {value.questionType === "Multiple Choice" && (
                          <>
                            <p>Multiple</p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Quiz;
