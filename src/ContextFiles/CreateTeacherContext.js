import React, { useState, createContext } from "react";

export const CreateTeacherContext = createContext();

export const CreateTeacherState = (props) => {
  const [teacherNumber, setTeacherNumber] = useState("");
  const [userTeacher, setUserTeacher] = useState("");
  const [usernameTeacher, setUsernameTeacher] = useState("");
  const [passwordTeacher, setPasswordTeacher] = useState("");
  const [rePasswordTeacher, setRePasswordTeacher] = useState("");
  const [lastnameTeacher, setLastnameTeacher] = useState("");
  const [middlenameTeacher, setMiddlenameTeacher] = useState("");
  const [firstnameTeacher, setFirstnameTeacher] = useState("");
  const [genderTeacher, setGenderTeacher] = useState("");
  const [registerStatusTeac, setRegisterStatusTeac] = useState("");
  const [regTeacher, setRegTeacher] = useState({});
  return (
    <CreateTeacherContext.Provider
      value={{
        value1: [userTeacher, setUserTeacher],
        value2: [teacherNumber, setTeacherNumber],
        value3: [usernameTeacher, setUsernameTeacher],
        value4: [passwordTeacher, setPasswordTeacher],
        value5: [rePasswordTeacher, setRePasswordTeacher],
        value6: [lastnameTeacher, setLastnameTeacher],
        value7: [middlenameTeacher, setMiddlenameTeacher],
        value8: [firstnameTeacher, setFirstnameTeacher],
        value9: [genderTeacher, setGenderTeacher],
        value10: [registerStatusTeac, setRegisterStatusTeac],
        valueRegTeacher: [regTeacher, setRegTeacher],
      }}
    >
      {props.children}
    </CreateTeacherContext.Provider>
  );
};
