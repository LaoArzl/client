import React, { useState, useEffect } from "react";
import Axios from "axios";

const NavStudProfile = () => {
  const [userState, setUserState] = useState({});
  const tempId = window.location.pathname.replace("/admin/edit-user/", "");

  useEffect(() => {
    Axios.get(`http://localhost:3001/${tempId}`).then((response) => {
      if (response.data.length === 0) {
        setUserState({});
      } else {
        let user = response.data;
        setUserState({
          id: user._id,
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          gender: user.gender,
          contact: user.contact,
          address: user.address,
          email: user.email,
        });
      }
    });
  }, []);

  const updateSubmit = () => {
    Axios.put(`http://localhost:3001/${tempId}`, {
      lastname: userState.lastname,
      firstname: userState.firstname,
      middlename: userState.middlename,
      fullname:
        userState.firstname +
        " " +
        userState.middlename[0] +
        " " +
        userState.lastname,
      gender: userState.gender,
      email: userState.email,
      contact: userState.contact,
      address: userState.address,
    }).then((response) => {
      console.log(response);
    });
  };
  Axios.defaults.withCredentials = true;

  const [image, setImage] = useState([]);

  const upload = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ayivjexe");

    Axios.post(
      "https://api.cloudinary.com/v1_1/defutech-inc/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <div className="user-nav-wrapper">
        <div className="user-nav-wrapper-header">
          <h2>User Profile </h2>
        </div>
        <div className="user-nav-wrapper-profile-body">
          <div className="user-nav-wrapper-sub-header">
            <p>Personal Information</p>
          </div>
          <div className="user-profile-photo">
            <img src="https://res.cloudinary.com/defutech-inc/image/upload/v1621536900/pv54oaklyjoxyftnuufv.jpg" />
          </div>
          <div className="create-stream-post-divs">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="custom-file-input"
            />
          </div>
          <button onClick={upload}>Upload</button>
          <div className="update-user-profile">
            <label>Last Name</label>
            <input
              value={userState.lastname}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: value,
                  firstname: userState.firstname,
                  middlename: userState.middlename,
                  gender: userState.gender,
                  contact: userState.contact,
                  email: userState.email,
                  address: userState.address,
                });
              }}
              type="text"
            />
          </div>
          <div className="update-user-profile">
            <label>First Name</label>
            <input
              type="text"
              value={userState.firstname}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: value,
                  middlename: userState.middlename,
                  gender: userState.gender,
                  contact: userState.contact,
                  email: userState.email,
                  address: userState.address,
                });
              }}
            />
          </div>

          <div className="update-user-profile">
            <label>Middle Name</label>
            <input
              type="text"
              value={userState.middlename}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: userState.firstname,
                  middlename: value,
                  gender: userState.gender,
                  contact: userState.contact,
                  email: userState.email,
                  address: userState.address,
                });
              }}
            />
          </div>

          <div className="update-user-profile">
            <label>Gender</label>
            <select
              value={userState.gender}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: userState.firstname,
                  middlename: userState.middlename,
                  gender: value,
                  contact: userState.contact,
                  email: userState.email,
                  address: userState.address,
                });
              }}
            >
              <option disabled value="">
                -Select Gender-
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="user-nav-wrapper-sub-header-2">
            <p>Contact Information</p>
          </div>
          <div className="update-user-profile">
            <label>Contact #</label>
            <input
              type="text"
              value={userState.contact}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: userState.firstname,
                  middlename: userState.middlename,
                  gender: userState.gender,
                  contact: value,
                  email: userState.email,
                  address: userState.address,
                });
              }}
            />
          </div>

          <div className="update-user-profile">
            <label>Email</label>
            <input
              type="email"
              value={userState.email}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: userState.firstname,
                  middlename: userState.middlename,
                  gender: userState.contact,
                  contact: userState.contact,
                  email: value,
                  address: userState.address,
                });
              }}
            />
          </div>

          <div className="update-user-profile">
            <label>Complete Address</label>
            <textarea
              value={userState.address}
              onChange={(e) => {
                let value = e.target.value;
                setUserState({
                  lastname: userState.lastname,
                  firstname: userState.firstname,
                  middlename: userState.middlename,
                  gender: userState.contact,
                  contact: userState.contact,
                  email: userState.email,
                  address: value,
                });
              }}
            ></textarea>
          </div>

          <div className="update-user-profile-submit">
            <input onClick={updateSubmit} type="submit" value="Update" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavStudProfile;
