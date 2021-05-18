import React, { useState, useEffect } from "react";
import "./Admission.css";
import Axios from "axios";

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
      picture: "",
    });
  }, []);

  useEffect(() => {
    setAddress({
      street: "",
      barangay: "",
      city: "",
      postal: "",
      email: "",
      contact: "",
    });
  }, []);

  const submitTeacher = () => {
    Axios.post("https://ecplcsms.herokuapp.com/register-teacher", {
      id: account.id,
      password: account.password,
      lastname: account.lastname,
      firstname: account.firstname,
      middlename: account.middlename,
      fullname:
        account.firstname +
        " " +
        account.middlename[0] +
        "." +
        " " +
        account.lastname,
      gender: account.gender,
      birthday: account.birthday,
      picture: account.picture,
      street: address.street,
      barangay: address.barangay,
      city: address.city,
      postal: address.postal,
      email: address.email,
      contact: address.contact,
    }).then((response) => {
      if (response.data.err) {
        props.setTeacherMsg(response.data.err);
      } else {
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
          city: "",
          postal: "",
          email: "",
          contact: "",
        });
      }
    });
  };

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
          <div className="admission-div">
            <label>
              Teacher I.D.<div>*</div>
            </label>
            <input
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

          <div className="admission-div admission-div-password">
            <label>
              Password<div>*</div>
            </label>
            <input
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
              type="password"
            />
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
              <label>
                M.I <div>*</div>
              </label>
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
            <label>
              Gender <div>*</div>
            </label>
            <select
              value={account.gender}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  password: account.password,
                  lastname: account.lastname,
                  firstname: account.firstname,
                  middlename: account.middlename,
                  gender: value,
                  birthday: account.birthday,
                  picture: account.picture,
                });
              }}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
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

          <div className="admission-div">
            <label>Profile Picture</label>
            <input
              value={account.picture}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  password: account.password,
                  lastname: account.lastname,
                  firstname: account.firstname,
                  middlename: account.middlename,
                  gender: account.gender,
                  birthday: account.birthday,
                  picture: value,
                });
              }}
              type="file"
              id="file-upload"
            ></input>
          </div>
        </div>
      </div>
      {/* Contact Address*/}
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Contact Address </h3>
        </div>
        <div className="personal-info-body">
          <div className="dual-admission-div">
            <div className="dual-admission-div-div">
              <label>
                Street <div>*</div>
              </label>
              <input
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

            <div className="dual-admission-div-div">
              <label>
                Brgy. <div>*</div>
              </label>
              <input
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
                type="text"
              ></input>
            </div>
          </div>
          <div className="dual-admission-div">
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

            <div className="dual-admission-div-div">
              <label>
                Postal Code<div>*</div>
              </label>
              <input
                value={address.postal}
                onChange={(e) => {
                  let value = e.target.value;
                  setAddress({
                    street: address.street,
                    barangay: address.barangay,
                    city: address.city,
                    postal: value,
                    email: address.email,
                    contact: address.contact,
                  });
                }}
                type="number"
              ></input>
            </div>
          </div>

          <div className="admission-div">
            <label>Email Address</label>
            <input
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
              value={address.contact}
              onChange={(e) => {
                let value = e.target.value;
                setAddress({
                  street: address.street,
                  barangay: address.barangay,
                  city: address.city,
                  postal: address.postal,
                  email: address.email,
                  contact: value,
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
