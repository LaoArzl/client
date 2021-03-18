import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ProfileHeader.css";
import Logo from "./logo.png";

const ProfileHeader = () => {
  const submitLogout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      if (response) {
        window.location.reload();
        localStorage.clear();
      }
    });
  };
  return (
    <>
      <header className="user-header"></header>
    </>
  );
};

export default ProfileHeader;
