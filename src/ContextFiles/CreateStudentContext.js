import React, { useState, createContext } from "react";

export const CreateStudentContext = createContext();

export const CreateStudentState = (props) => {
  const [regStudent, setRegStudent] = useState({});
  const [buttonState, setButtonState] = useState(false);
  return (
    <CreateStudentContext.Provider
      value={{
        valueRegStudent: [regStudent, setRegStudent],
        btnState: [buttonState, setButtonState],
      }}
    >
      {props.children}
    </CreateStudentContext.Provider>
  );
};
