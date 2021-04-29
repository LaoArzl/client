import React, { useState, useEffect } from "react";
import "./Admission.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Axios from "axios";

const TeacherAdmission = () => {
  const [account, setAccount] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAccount({
      id: "",
      username: "",
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

  return (
    <>
      {/* Account details*/}
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Account Details</h3>
        </div>
        <div className="personal-info-body">
          <div className="admission-div">
            <label>Teacher I.D.</label>
            <input
              value={account.id}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: value,
                  username: account.username,
                  pasword: account.password,
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

          <div className="admission-div">
            <label>Username</label>
            <input
              value={account.username}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  username: value,
                  pasword: account.password,
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
            <label>Password</label>
            <input
              value={account.password}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  username: account.username,
                  pasword: value,
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
              <label>Last Name</label>
              <input
                value={account.lastname}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    username: account.username,
                    pasword: account.password,
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
              <label>First Name</label>
              <input
                value={account.firstname}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    username: account.username,
                    pasword: account.password,
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
              <label>Middle Name</label>
              <input
                value={account.middlename}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    username: account.username,
                    pasword: account.password,
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
            <label>Gender</label>
            <select
              value={account.gender}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  username: account.username,
                  pasword: account.password,
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
            <label>Birth Date</label>
            <input
              value={account.birthday}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: account.id,
                  username: account.username,
                  pasword: account.password,
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
                  username: account.username,
                  pasword: account.password,
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
          <h3>Contact Address</h3>
        </div>
        <div className="personal-info-body">
          <div className="dual-admission-div">
            <div className="dual-admission-div-div">
              <label>Street</label>
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
              <label>Brgy.</label>
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
              <label>City</label>
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
              <label>Postal Code</label>
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
        <input type="submit" className="admission-submit-btn" value="Create" />
      </div>
    </>
  );
};

export default TeacherAdmission;
