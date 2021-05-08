import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../../ContextFiles/LoginContext";
import Axios from "axios";

const Login = () => {
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const { loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;

  // useEffect(() => {
  //   Axios.get("https://ecplcsms.herokuapp.com/user-login").then((response) => {
  //     if(response.data.loggedIn === false) {
  //       setRole("")
  //     } else {
  //       setRole(response.data.user)
  //     }
  //   })
  // }, [])

  const id = localStorage.getItem("id");


  const submitLogin = () => {
    Axios.post("https://ecplcsms.herokuapp.com/user-login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.wrong) {
        setErrMsg(response.data.wrong);
      } else if (response.data.empty) {
        setErrMsg(response.data.empty);
      } else if (response.data.nouser) {
        setErrMsg(response.data.nouser);
      } else if (!response.data.auth) {
        console.log("Error Logging in");
      } else if (response.data.auth) {
        localStorage.setItem("id", response.data._id);
        setRole(response.data.userType);
        setPassword("");
      }
    });
  };

  return (
    <>
      {role === "Admin" && <Redirect to="/admin/dashboard" />}
      {role === "Teacher" && <Redirect to={"/user/teacher/" + id} />}
      {role === "Student" && <Redirect to={"/user/student/" + id} />}
      <div data-testid="login" className="login-wrapper">
        <div className="login-wrapper-left">
          <div className="login-after-wrapper">
            <div className="first-login-div">
              <b>ECPLC</b>
              <p> LMS</p>
            </div>

            <div className="second-login-div">
              <p>
                The ECPLC LMS is an online web based application that intends to
                administer the studies of the student and provides an
                educational school related materials.
              </p>
            </div>
            <div className="third-login-div">
              <p>Learn More</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="login-wrapper-right"
        >
          <div className="login-input-header">
            <h2>Sign in to ECPLC LMS</h2>
            <p>Input your user credentials given by the school.</p>
          </div>
          <div className={errMsg === "" ? "error-msg-hidden" : "error-msg"}>
            {errMsg}
          </div>
          <div className="login-input">
            <label>Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" />
          </div>

          <div className="login-input">
            <label>Password</label>
            <div className="login-password-wrapper">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
              />
              <div onClick={() => setShowPassword(!showPassword)}>Show</div>
            </div>
          </div>

          <div className="login-input-login">
            <input className={username === "" && password === "" ? "login-btn-disabled" : "login-btn"} disabled={username === "" && password === "" ? true : false} onClick={submitLogin} type="submit" value="Sign In" />
          </div>
          <span>Forgot your password?</span>
        </form>
      </div>
    </>
  );
};

export default Login;
