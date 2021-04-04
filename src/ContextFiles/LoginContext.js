import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/user-login").then((response) => {
      if (response.data.length == 0) {
        console.log("No User");
        setRole("");
        setAccessToken("MockValueToken");
      } else if (response.data.loggedIn) {
        setRole(response.data.user);
        setAccessToken(response.data.token);
      }
    });
  }, []);

  return (
    <LoginContext.Provider
      value={{
        value1: [accessToken, setAccessToken],
        loginRole: [role, setRole],
        valueID: [userID, setUserID],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
