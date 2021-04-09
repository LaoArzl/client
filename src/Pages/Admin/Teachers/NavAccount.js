import React, { useEffect, useContext, useState } from "react";
import "../Teachers/UserProfile.css";
import Axios from "axios";
import Loader from "../../../Components/Loader/Loader";

const NavAccount = () => {
  const tempId = window.location.pathname.replace("/admin/edit-user/", "");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [changeConfirm, setChangeConfirm] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [changeError, setChangeError] = useState("");

  useEffect(() => {
    Axios.get(`https://ecplcsms.herokuapp.com/student/${tempId}`).then(
      (response) => {
        if (response.data.length == 0) {
          setStudentUsername("");
          setStudentPassword("");
        } else {
          setStudentUsername(response.data.username);
          setStudentPassword(response.data.password);
        }
      }
    );
  }, []);

  const changingPassword = () => {
    if (changePassword !== changeConfirm) {
      setChangeError("Password did not match");
    } else if (changePassword === "" && changeConfirm === "") {
      setChangeError("Input empty field");
    } else {
      Axios.post(`http://localhost:3001/change-password/${tempId}`, {
        changePassword: changePassword,
      }).then((response) => {
        if (response.data.result) {
          setChangeError("Succesfully change password");
          setChangePassword("");
          setChangeConfirm("");
        } else {
          setChangeError("Error changing password");
        }
      });
    }
  };

  return (
    <>
      {studentUsername === "" ? (
        <Loader />
      ) : (
        <div className="user-nav-wrapper">
          <div className="user-nav-wrapper-header">
            {showUserAccount === false ? (
              <h2>Security and Password</h2>
            ) : (
              <h2>Change Password</h2>
            )}
          </div>
          <div className="user-nav-wrapper-body">
            {showUserAccount === false ? (
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
                  <span onClick={() => setShowUserAccount(true)}>
                    Change Password
                  </span>
                </div>
              </form>
            ) : (
              <form className="user-nav-wrapper-form-after">
                <div
                  className={
                    changeError === ""
                      ? ""
                      : changeError === "Succesfully change password"
                      ? "div-green"
                      : "div-red"
                  }
                >
                  {changeError}
                </div>
                <div className="div">
                  <label>Password</label>
                  <input
                    type="text"
                    value={changePassword}
                    className="div-input-password"
                    onChange={(e) => setChangePassword(e.target.value)}
                  ></input>
                </div>
                <div className="div">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    value={changeConfirm}
                    className="div-input-password"
                    onChange={(e) => setChangeConfirm(e.target.value)}
                  ></input>
                </div>
                <div className="change-password-submit">
                  <span
                    onClick={changingPassword}
                    className="change-password-span1"
                  >
                    Save
                  </span>
                  <span
                    onClick={() => setShowUserAccount(false)}
                    className="change-password-span2"
                  >
                    Close
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavAccount;
