import React, { useState, useEffect } from "react";
import "./Admission.css";
import Axios from "axios";
import { Barangay } from "./Barangay";

const TeacherAdmission = (props) => {
  const [account, setAccount] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAccount({
      id: "",
      password: "",
      lastname: "",
      firstname: "",
      middlename: "",
      gender: "",
      birthday: "",
    });
  }, []);

  useEffect(() => {
    setAddress({
      street: "",
      barangay: "",
      city: "Zamboanga City",
      email: "",
      contact: "",
    });
  }, []);

  const submitTeacher = () => {
    props.setLoader(true);
    Axios.post("https://ecplc2021.herokuapp.com/register-teacher", {
      id: account.id,
      password: account.password,
      lastname: account.lastname,
      firstname: account.firstname,
      middlename: account.middlename,
      fullname: account.firstname + " " + account.lastname,
      gender: radio,
      birthday: account.birthday,
      street: address.street,
      barangay: address.barangay,
      city: address.city,
      email: address.email,
      contact: address.contact,
      landmark: landmark,
    }).then((response) => {
      if (response.data.err) {
        props.setLoader(false);
        props.setTeacherMsg(response.data.err);
      } else {
        setLandmark("");
        setRadio("");
        props.setLoader(false);
        props.setInitial(response.data.success);
        props.setTeacherMsg(response.data.success);
        setTimeout(() => props.setTeacherMsg(""), 10000);
        setAccount({
          id: "",
          password: "",
          lastname: "",
          firstname: "",
          middlename: "",
          gender: "",
          birthday: "",
          picture: "",
        });
        setAddress({
          street: "",
          barangay: "",
          postal: "",
          email: "",
          contact: "",
        });
      }
    });
  };

  /*Function to generate random ID string */
  const generateId = () => {
    let result1 = [];
    let result2 = [];

    let characters1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let characters2 = "0123456789";
    let charactersLength1 = characters1.length;
    let charactersLength2 = characters2.length;

    for (var i = 0; i < 4; i++) {
      result2.push(
        characters2.charAt(Math.floor(Math.random() * charactersLength2))
      );
    }

    let strDate = new Date(); // By default Date empty constructor give you Date.now
    let shortYear = strDate.getFullYear();
    // Add this line
    let twoDigitYear = shortYear.toString().substr(-2);

    setAccount({
      id: "ECPLC" + "-" + result1.join("") + result2.join(""),
      password: account.password,
      year: account.year,
      lastname: account.lastname,
      firstname: account.firstname,
      middlename: account.middlename,
      gender: account.gender,
      birthday: account.birthday,
      picture: account.picture,
    });
  };

  /*Function to generate random password string */
  const generatePassword = () => {
    let result1 = [];

    let characters1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let charactersLength1 = characters1.length;

    for (var i = 0; i < 6; i++) {
      result1.push(
        characters1.charAt(Math.floor(Math.random() * charactersLength1))
      );
    }

    setAccount({
      id: account.id,
      password: result1.join(""),
      year: account.year,
      lastname: account.lastname,
      firstname: account.firstname,
      middlename: account.middlename,
      gender: account.gender,
      birthday: account.birthday,
      picture: account.picture,
    });
  };

  const [showpassword, setShowpassword] = useState(false);

  const [radio, setRadio] = useState("");
  const [landmark, setLandmark] = useState("");

  return (
    <>
      {/* Account details*/}
      <div
        className={
          props.teacherMsg === "" ||
          props.teacherMsg === "Successfully created."
            ? "teacher-admission-err-msg-hidden"
            : "teacher-admission-err-msg"
        }
      >
        {props.teacherMsg}{" "}
        <i
          onClick={() => props.setTeacherMsg("")}
          className={props.teacherMsg === "" ? "" : "fas fa-times"}
        ></i>
      </div>
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Teacher Account Details</h3>
        </div>
        <div className="personal-info-body">
          <div className="admission-div-user-id">
            <label>Teacher I.D *</label>
            <div className="user-id-div-input">
              <input
                onClick={generateId}
                value={account.id}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: value,
                    password: account.password,
                    lastname: account.lastname,
                    firstname: account.firstname,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
                type="text"
              />
            </div>
          </div>

          <div className="admission-div-user-id">
            <label>Password *</label>
            <div className="user-id-div-input">
              <input
                onClick={generatePassword}
                value={account.password}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    password: value,
                    lastname: account.lastname,
                    firstname: account.firstname,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
                type={showpassword ? "text" : "password"}
              />
              <div
                onClick={() => setShowpassword(!showpassword)}
                className="user-id-div-input-div"
              >
                <i
                  className={showpassword ? "far fa-eye" : "far fa-eye-slash"}
                ></i>
              </div>
            </div>
          </div>

          <div className="multi-admission-div">
            <div className="one-multi-admission-div">
              <label>
                Last Name<div>*</div>
              </label>
              <input
                value={account.lastname}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    password: account.password,
                    lastname: value,
                    firstname: account.firstname,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
                type="text"
              />
            </div>
            <div className="two-multi-admission-div">
              <label>
                First Name<div>*</div>
              </label>
              <input
                value={account.firstname}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    password: account.password,
                    lastname: account.lastname,
                    firstname: value,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
                type="text"
              />
            </div>
            <div className="three-multi-admission-div">
              <label>M.I</label>
              <input
                value={account.middlename}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    password: account.password,
                    lastname: account.lastname,
                    firstname: account.firstname,
                    middlename: value,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
                min="1"
                type="text"
              />
            </div>
          </div>

          <div className="admission-div">
            <label>Gender *</label>
            <div className="gender-radio-btn">
              <div>
                <input
                  checked={radio === "Male"}
                  value="Male"
                  onChange={(e) => {
                    setRadio(e.target.value);
                    console.log(radio);
                  }}
                  type="radio"
                />
                <label>Male</label>
              </div>

              <div>
                <input
                  checked={radio === "Female"}
                  value="Female"
                  onChange={(e) => {
                    setRadio(e.target.value);
                    console.log(radio);
                  }}
                  type="radio"
                />
                <label>Female</label>
              </div>
            </div>
          </div>

          <div className="admission-div">
            <label>
              Birth Date <div>*</div>
            </label>
            <input
              value={account.birthday}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  password: account.password,
                  lastname: account.lastname,
                  firstname: account.firstname,
                  middlename: account.middlename,
                  gender: account.gender,
                  birthday: value,
                  picture: account.picture,
                });
              }}
              type="date"
            />
          </div>
        </div>
      </div>
      {/* Contact Address*/}
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Contact Address </h3>
        </div>
        <div className="personal-info-body">
          <div className="admission-div">
            <label>Street</label>
            <input
              placeholder="Optional"
              value={address.street}
              onChange={(e) => {
                let value = e.target.value;

                setAddress({
                  street: value,
                  barangay: address.barangay,
                  city: address.city,
                  postal: address.postal,
                  email: address.email,
                  contact: address.contact,
                });
              }}
              type="text"
            ></input>
          </div>

          <div className="dual-admission-div">
            <div className="dual-admission-div-div">
              <label>Brgy. *</label>
              <select
                value={address.barangay}
                onChange={(e) => {
                  let value = e.target.value;
                  setAddress({
                    street: address.street,
                    barangay: value,
                    city: address.city,
                    postal: address.postal,
                    email: address.email,
                    contact: address.contact,
                  });
                }}
              >
                {Barangay.map((e) => {
                  return <option value={e.name}>{e.name}</option>;
                })}
              </select>
            </div>

            <div className="dual-admission-div-div">
              <label>
                City <div>*</div>
              </label>
              <input
                value={address.city}
                onChange={(e) => {
                  let value = e.target.value;
                  setAddress({
                    street: address.street,
                    barangay: address.barangay,
                    city: value,
                    postal: address.postal,
                    email: address.email,
                    contact: address.contact,
                  });
                }}
                type="text"
              ></input>
            </div>
          </div>

          <div className="admission-div">
            <label>Email Address</label>
            <input
              placeholder="teacher@email.com"
              value={address.email}
              onChange={(e) => {
                let value = e.target.value;
                setAddress({
                  street: address.street,
                  barangay: address.barangay,
                  city: address.city,
                  postal: address.postal,
                  email: value,
                  contact: address.contact,
                });
              }}
              type="text"
            />
          </div>

          <div className="admission-div">
            <label>Contact No.</label>
            <input
              maxLength="14"
              placeholder="0987 6543 210"
              value={address.contact}
              onChange={(e) => {
                let value = e.target.value;
                let newValue = value
                  .replace(/\W/gi, "")
                  .replace(/(.{4})/g, "$1 ");
                setAddress({
                  street: address.street,
                  barangay: address.barangay,
                  city: address.city,
                  postal: address.postal,
                  email: address.email,
                  contact: newValue,
                });
              }}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="admission-div-submit">
        <input
          onClick={submitTeacher}
          type="submit"
          className="admission-submit-btn"
          value="Create"
        />
      </div>
    </>
  );
};

export default TeacherAdmission;
