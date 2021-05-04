import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [firstname, setFirstname] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
      if (response.data.length === 0) {
        console.log("No User");
        setRole("");
        setAccessToken("MockValueToken");
      } else if (response.data.loggedIn) {
        setRole(response.data.user);
        setUserID(response.data.id);
        setAccessToken(response.data.token);
        setFirstname(response.data.firstname);
      }
    });
  }, []);

  return (
    <LoginContext.Provider
      value={{
        value1: [accessToken, setAccessToken],
        loginRole: [role, setRole],
        valueID: [userID, setUserID],
        valueFirstname: [firstname, setFirstname],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
