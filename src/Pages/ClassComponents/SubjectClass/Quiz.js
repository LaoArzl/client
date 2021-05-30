import React, { useState } from "react";
import "./Subject.css";
import Axios from "axios";
import "./Quiz.css";
import { motion } from "framer-motion";

const Quiz = (props) => {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState([]);
  const [counter, setCounter] = useState(1);
  const [dropdown, setDropdown] = useState({
    dropdown: false,
  });

  const dropdownVariants = {
    visible: {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 1,
    },
    initial: {
      y: -50,
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    },
  };

  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create Quiz</h3>
        </div>

        <div
          className={question.length !== 0 ? "add-another-question" : "hidden"}
        >
          <input
            onClick={() => {
              setQuestion([
                ...question,
                {
                  number: counter,
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
              setCounter(counter + 1);
            }}
            type="submit"
            value="Add question"
          />
        </div>

        <input
          onClick={() => {
            setQuestion([
              {
                number: counter,
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
            setCounter(counter + 1);
          }}
          type="submit"
          value="Create Quiz Form"
          className={question.length === 0 ? "create-quiz-btn" : "hidden"}
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className={question.length === 0 ? "hidden" : "quiz-body"}
        >
          {question.length !== 0 && (
            <>
              {question.map((value) => {
                return (
                  <>
                    <div className="quiz-wrapper">
                      <div className="quiz-question-number">
                        Item no. {value.number}
                      </div>
                      <div className="quiz-question-questionType">
                        <div className="questiontype-dropdown">
                          <p
                            onClick={() =>
                              setDropdown({
                                dropdown: true,
                              })
                            }
                          >
                            Type of Question: {questionType}
                          </p>
                          <motion.div
                            variants={dropdownVariants}
                            initial="initial"
                            animate={dropdown.dropdown ? "visible" : ""}
                            transition={{ duration: 0.1 }}
                            className="questiontype-dropdown-after"
                          >
                            <div>Multiple Choice</div>
                            <div>Identification</div>
                            <div>Short Answer</div>
                            <div>Essay</div>
                          </motion.div>
                        </div>
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
