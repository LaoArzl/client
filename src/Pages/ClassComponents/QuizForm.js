import React, { useState } from "react";
import "./Class.css";

const QuizForm = () => {
  const [number, setNumber] = useState(1);
  const [question, setQuestion] = useState("");
  const [multiple, setMultiple] = useState({});
  const [essay, setEssay] = useState("");

  const [quiz, setQuiz] = useState([
    {
      question: "",
    },
  ]);
  const [typeAnswer, setTypeAnswer] = useState("multiple");
  return (
    <>
      <div className="create-stream-post-header">
        <h3>Create Quiz</h3>
      </div>
      <div className="create-stream-post-body">
        <div className="quiz-form-div">
          <div className="quiz-form-div-header">
            <h4> #{number} Question</h4>
          </div>
          <div className="quiz-form-div-body">
            <div className="quiz-form-div-questions">
              <label>Question</label>
              <input type="text" />
            </div>

            <div className="quiz-form-div-questions">
              <label>Answer</label>
              <select onChange={(e) => setTypeAnswer(e.target.value)}>
                <option value="multiple">Multiple Choice</option>
                <option value="essay">Essay Paragraph</option>
              </select>
            </div>
            <div className="quiz-form-div-answer">
              {typeAnswer === "essay" ? (
                <textarea disabled></textarea>
              ) : (
                <>
                  <input type="text" placeholder="Option 1" />
                  <input type="text" placeholder="Option 2" />
                  <input type="text" placeholder="Option 3" />
                </>
              )}
            </div>

            <div className="quiz-form-div-questions-submit">
              <input type="submit" value="Add" />
            </div>
          </div>
        </div>
      </div>

      {quiz.map((value) => {
        return (
          <div className="create-stream-post-body">
            <div className="quiz-form-div">
              <div className="quiz-form-div-header">
                <h4> #{number} Question</h4>
              </div>
              <div className="quiz-form-div-body">
                <div className="quiz-form-div-questions">
                  <label>Question</label>
                  <input type="text" />
                </div>

                <div className="quiz-form-div-questions">
                  <label>Answer</label>
                  <select onChange={(e) => setTypeAnswer(e.target.value)}>
                    <option value="multiple">Multiple Choice</option>
                    <option value="essay">Essay Paragraph</option>
                  </select>
                </div>
                <div className="quiz-form-div-answer">
                  {typeAnswer === "essay" && <textarea disabled></textarea>}
                  {typeAnswer === "multiple" && (
                    <>
                      <label></label> <input type="radio" />
                    </>
                  )}
                </div>

                <div className="quiz-form-div-questions-submit">
                  <input type="submit" value="Add" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default QuizForm;
