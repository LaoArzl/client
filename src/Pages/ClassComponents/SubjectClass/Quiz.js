import React from "react";

const Quiz = (props) => {
  return (
    <>
      <div className="assignment-wrapper">
        <div className="assignment-header">
          <h3 onClick={() => props.setQuiz(false)}>Create Quiz</h3>
        </div>
      </div>
    </>
  );
};

export default Quiz;
