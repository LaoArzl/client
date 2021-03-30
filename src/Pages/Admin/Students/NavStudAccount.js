import React, { useEffect, useContext, useState } from "react";
import "../Teachers/UserProfile.css";
import Axios from "axios";
import Loader from "../../../Components/Loader/Loader";

const NavStudAccount = () => {
  const tempId = window.location.pathname.replace("/admin/edit-user/", "");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/student/${tempId}`).then((response) => {
      if (response.data.length == 0) {
        setStudentUsername("");
        setStudentPassword("");
      } else {
        setStudentUsername(response.data.username);
        setStudentPassword(response.data.password);
      }
    });
  }, []);

  return (
    <>
      {studentUsername === "" ? (
        <Loader />
      ) : (
        <div className="user-nav-wrapper">
          <div className="user-nav-wrapper-header">
            <h2>Security and Password</h2>
          </div>
          <form className="user-nav-account-body-form">
            <div className="div">
              <label>Username</label>
              <input
                type="text"
                value={studentUsername}
                className="div-input-password"
              ></input>
            </div>
            <div className="div">
              <label>Password</label>
              <input
                type="password"
                value={studentPassword}
                className="div-input-password"
              ></input>
            </div>
            <div className="div">
              <span>Change Password</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NavStudAccount;
