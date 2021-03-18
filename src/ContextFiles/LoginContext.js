import React, { useState, createContext, useEffect } from "react";
import Axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/user-login").then((response) => {
      if (response.data.loggedIn) {
        setRole(response.data.user[0].userType);
        setAccessToken(response.data.token);
      } else {
        console.log("No User");
        setRole("");
        setAccessToken("MockValueToken");
      }
    });
  }, []);

  return (
    <LoginContext.Provider
      value={{
        value1: [accessToken, setAccessToken],
        value2: [role, setRole],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
