import React, { useState, useContext, useEffect } from "react";
import "./PortalLogin.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../../ContextFiles/LoginContext";
import { StudentListContext } from "../../ContextFiles/StudentListContext";
import Login from "./login.png";

const PortalLogin = () => {
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Data from LoginContext
  const { loginRole, valueID } = useContext(LoginContext);
  const [userID, setUserID] = valueID;
  const { value01 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [role, setRole] = loginRole;
  const [loadingLog, setLoadingLog] = useState(false);

  const submitLogin = () => {
    Axios.post("https://ecplcsms.herokuapp.com/user-login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.wrong) {
        setError(response.data.wrong);
      } else if (response.data.empty) {
        setError(response.data.empty);
      } else if (response.data.nouser) {
        setError(response.data.nouser);
      } else if (!response.data.auth) {
        console.log("Error Logging in");
      } else if (response.data.auth) {
        localStorage.setItem("id", response.data._id);

        localStorage.setItem("token", response.data.token);
        setRole(response.data.userType);
      }
    });
  };

  // const experiment = () => {
  //   Axios.get("http://localhost:3001/items", {
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/student-list").then(
      (response) => {
        if (response.data) {
          setTempData(response.data);
        }
      }
    );
  }, []);

  const id = localStorage.getItem("id");

  return (
    <>
      {role === "Teacher" ? (
        <>
          <Redirect to={"/user/teacher/" + id} />;
        </>
      ) : role === "Student" ? (
        <>
          <Redirect to="/user/student" />
        </>
      ) : role === "Admin" ? (
        <Redirect to="/admin/dashboard" />
      ) : (
        <div className="portal-login">
          <div className="portal-left-wrapper">
            <img src={Login} alt="School Logo" />
          </div>
          <div className="portal-right-wrapper">
            <div className="portal-login-wrapper">
              <div className="portal-login-header">
                <h3>User Login</h3>
              </div>
              <div
                className={
                  error === ""
                    ? "login-error-messages-hidden"
                    : "login-error-messages"
                }
              >
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
              <form
                className="portal-login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="portal-login-label">
                  <label>Username</label>
                </div>
                <div className="portal-login-input">
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="portal-login-label">
                  <label>Password</label>
                </div>
                <div className="portal-login-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePassword}
                    className={
                      password === ""
                        ? "portal-login-input-span-hidden"
                        : "portal-login-input-span"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                <div className="portal-login-login">
                  <input
                    onClick={submitLogin}
                    type="submit"
                    value="LOGIN"
                  ></input>
                </div>

                <div className="portal-login-forgot">
                  <span>Forgot password?</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortalLogin;
