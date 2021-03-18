import React, { useState, createContext } from "react";

export const LogoutContext = createContext();

export const LogoutState = (props) => {
  const [logout, setLogout] = useState(false);

  return (
    <LogoutContext.Provider value={[logout, setLogout]}>
      {props.children}
    </LogoutContext.Provider>
  );
};
