import React, { useState, useContext, useEffect } from "react";
import "./PortalLogin.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../../ContextFiles/LoginContext";

const PortalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Data from LoginContext
  const { value2 } = useContext(LoginContext);
  const [role, setRole] = value2;

  Axios.defaults.withCredentials = true;

  const submitLogin = () => {
    Axios.post("http://localhost:3001/user-login", {
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
        window.location.reload();
        localStorage.setItem("token", response.data.user[0].token);
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
    Axios.get("http://localhost:3001/student-list").then((response) => {
      if (response.data) {
        setTempData(response.data);
      }
    });
  }, []);

  return (
    <>
      {role === "Admin" && <Redirect to="/admin/dashboard" />}
      {role === "Teacher" && <Redirect to="/user/teacher" />}
      <div className="portal-login">
        <div className="portal-login-wrapper">
          <div className="portal-login-header">
            <p>User Login</p>
          </div>
          <div
            className={
              error === ""
                ? "login-error-messages-hidden"
                : "login-error-messages"
            }
          >
            <i className="fas fa-times-circle"></i> {error}
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
              <input type="submit" value="LOGIN" onClick={submitLogin} />
            </div>

            <div className="portal-login-forgot">
              <span>Forgot password?</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PortalLogin;
