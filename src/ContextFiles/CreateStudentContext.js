import React, { useState, useEffect, createContext } from "react";

export const CreateStudentContext = createContext();

export const CreateStudentState = (props) => {
  const [studentNumber, setStudentNumber] = useState("");
  const [userStudent, setUserStudent] = useState("");
  const [usernameStudent, setUsernameStudent] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [rePasswordStudent, setRePasswordStudent] = useState("");
  const [lastnameStudent, setLastnameStudent] = useState("");
  const [middlenameStudent, setMiddlenameStudent] = useState("");
  const [firstnameStudent, setFirstnameStudent] = useState("");
  const [genderStudent, setGenderStudent] = useState("");
  const [registerStatusStud, setRegisterStatusStud] = useState("");
  const [pickButton, setPickButton] = useState(false);
  const [studFullname, setStudFullname] = useState("");
  return (
    <CreateStudentContext.Provider
      value={{
        value1: [userStudent, setUserStudent],
        value2: [studentNumber, setStudentNumber],
        value3: [usernameStudent, setUsernameStudent],
        value4: [passwordStudent, setPasswordStudent],
        value5: [rePasswordStudent, setRePasswordStudent],
        value6: [lastnameStudent, setLastnameStudent],
        value7: [middlenameStudent, setMiddlenameStudent],
        value8: [firstnameStudent, setFirstnameStudent],
        value9: [genderStudent, setGenderStudent],
        value10: [registerStatusStud, setRegisterStatusStud],
        value11: [pickButton, setPickButton],
        value12: [studFullname, setStudFullname],
      }}
    >
      {props.children}
    </CreateStudentContext.Provider>
  );
};
