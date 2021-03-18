import React, { useState, createContext } from "react";

export const DashboardContext = createContext();

export const DashboardStatus = (props) => {
  const [showName, setShowName] = useState(false);

  return (
    <DashboardContext.Provider value={[showName, setShowName]}>
      {props.children}
    </DashboardContext.Provider>
  );
};
