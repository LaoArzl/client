import React, { useState, useEffect } from "react";
import Axios from "axios";

const NavStudProfile = () => {
  const [userState, setUserState] = useState({});
  const tempId = window.location.pathname.replace("/admin/edit-user/", "");

  useEffect(() => {
    Axios.get(`http://localhost:3001/teacher/${tempId}`).then((response) => {
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
            <span>
              <i className="fas fa-pen"></i>
            </span>
          </div>
          <div className="update-user-profile">
            <label>Last Name</label>
            <input value={userState.lastname} type="text" />
          </div>
          <div className="update-user-profile">
            <label>First Name</label>
            <input type="text" />
          </div>

          <div className="update-user-profile">
            <label>Middle Name</label>
            <input type="text" />
          </div>

          <div className="update-user-profile">
            <label>Gender</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavStudProfile;
