import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Barangay } from "../../../Pages/Admin/Admission/Barangay";

const NavStudProfile = (props) => {
  const [radio, setRadio] = useState("");
  const [landmark, setLandmark] = useState("");
  const [home, setHome] = useState("");
  const [work, setWork] = useState("");
  const [parentFirstname, setParentFirstname] = useState("");
  const [parentLastname, setParentLastname] = useState("");
  const [parentMiddlename, setParentMiddlename] = useState("");

  const [account, setAccount] = useState({
    id: "",
    password: "",
    year: "",
    lastname: "",
    firstname: "",
    middlename: "",
    gender: "",
    birthday: "",
    picture: "",
  });
  const [address, setAdress] = useState({
    street: "",
    barangay: "",
    city: "Zamboanga City",
    postal: "",
    email: "",
    contact: "",
  });
  const [parent, setParent] = useState({
    parentFullname: "",
    relation: "",
    parentEmail: "",
    parentContact: "",
  });

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/year/create").then(
      (response) => {
        if (response.data.length === 0) {
          setGradeLevel([]);
        } else {
          setGradeLevel(response.data);
        }
      }
    );
  }, []);

  const [gradeLevel, setGradeLevel] = useState([]);
  const [userState, setUserState] = useState({});
  const tempId = window.location.pathname.replace("/admin/edit-user/", "");

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/${tempId}`).then((response) => {
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
    Axios.put(`https://ecplc2021.herokuapp.com/${tempId}`, {
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

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/student/${props.id}`).then(
      (response) => {
        setLandmark(response.data.landmark);
        setHome(response.data.home);
        setWork(response.data.work);
        console.log(response.data.landmark);
      }
    );
  }, []);

  return (
    <>
      <div className="user-nav-wrapper">
        <div className="user-nav-wrapper-profile-body">
          <div className="personal-info-body">
            <div className="user-nav-wrapper-sub-header">
              Personal Infomation
            </div>
            <div className="admission-div-user-id">
              <label>Student I.D *</label>
              <div className="user-id-div-input">
                <input value={account.id} type="text" />
              </div>
            </div>

            <div className="admission-div">
              <label>
                Grade <div>*</div>
              </label>
              <select
                value={account.year}
                onChange={(e) => {
                  let value = e.target.value;
                  setAccount({
                    id: account.id,
                    password: account.password,
                    year: value,
                    lastname: account.lastname,
                    firstname: account.firstname,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: account.birthday,
                    picture: account.picture,
                  });
                }}
              >
                <option value="" disabled>
                  Select Option
                </option>
                {gradeLevel.map((value) => {
                  return (
                    <option key={value._id} value={value._id}>
                      {value._id}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="multi-admission-div">
              <div className="one-multi-admission-div">
                <label>
                  Last Name <div>*</div>
                </label>
                <input
                  value={account.lastname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setAccount({
                      id: account.id,
                      password: account.password,
                      year: account.year,
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
                  First Name <div>*</div>
                </label>
                <input
                  value={account.firstname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setAccount({
                      id: account.id,
                      password: account.password,
                      year: account.year,
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
                <label>M.I.</label>
                <input
                  value={account.middlename}
                  onChange={(e) => {
                    let value = e.target.value;
                    setAccount({
                      id: account.id,
                      password: account.password,
                      year: account.year,
                      lastname: account.lastname,
                      firstname: account.firstname,
                      middlename: value,
                      gender: account.gender,
                      birthday: account.birthday,
                      picture: account.picture,
                    });
                  }}
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
                    year: account.year,
                    lastname: account.lastname,
                    firstname: account.firstname,
                    middlename: account.middlename,
                    gender: account.gender,
                    birthday: value,
                    picture: account.picture,
                  });
                  console.log(value);
                }}
                type="date"
              />
            </div>
          </div>

          <div className="user-nav-wrapper-sub-header">Contact Address</div>

          <div className="personal-info-body">
            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Street</label>
                <input
                  placeholder="Optional"
                  value={address.street}
                  onChange={(e) => {
                    let value = e.target.value;
                    setAdress({
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
                <label>Landmark</label>
                <input
                  placeholder="Optional"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.vale)}
                  type="text"
                ></input>
              </div>
            </div>
            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Brgy. *</label>
                <select
                  value={address.barangay}
                  onChange={(e) => {
                    let value = e.target.value;
                    setAdress({
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
                    setAdress({
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
                value={address.email}
                onChange={(e) => {
                  let value = e.target.value;
                  setAdress({
                    street: address.street,
                    barangay: address.barangay,
                    city: address.city,
                    postal: address.postal,
                    email: value,
                    contact: address.contact,
                  });
                }}
                type="text"
                placeholder="Optional"
              />
            </div>

            <div className="admission-div">
              <label>Contact No.</label>

              <input
                maxlength="14"
                value={address.contact}
                onChange={(e) => {
                  let value = e.target.value;
                  let newValue = value
                    .replace(/\W/gi, "")
                    .replace(/(.{4})/g, "$1 ");
                  setAdress({
                    street: address.street,
                    barangay: address.barangay,
                    city: address.city,
                    postal: address.postal,
                    email: address.email,
                    contact: newValue,
                  });
                }}
                type="text"
                placeholder="0987 6543 210 (Optional)"
              />
            </div>
          </div>

          <div className="user-nav-wrapper-sub-header">Parent Infomation</div>

          <div className="personal-info-body">
            <div className="multi-admission-div">
              <div className="one-multi-admission-div">
                <label>
                  Last Name <div>*</div>
                </label>
                <input
                  value={parentLastname}
                  onChange={(e) => setParentLastname(e.target.value)}
                  type="text"
                />
              </div>
              <div className="two-multi-admission-div">
                <label>
                  First Name <div>*</div>
                </label>
                <input
                  value={parentFirstname}
                  onChange={(e) => setParentFirstname(e.target.value)}
                  type="text"
                />
              </div>
              <div className="three-multi-admission-div">
                <label>M.I.</label>
                <input
                  value={parentMiddlename}
                  onChange={(e) => setParentMiddlename(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div className="admission-div">
              <label>
                Relation<div>*</div>
              </label>
              <select
                value={parent.relation}
                onChange={(e) => {
                  let value = e.target.value;
                  setParent({
                    parentFullname: parent.parentFullname,
                    relation: value,
                    parentEmail: parent.parentEmail,
                    parentContact: parent.parentContact,
                  });
                }}
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Grand Mother">Grand Mother</option>
                <option value="Grand Father">Grand Father</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Older Brother">Older Brother</option>
                <option value="Older Sister">Older Sister</option>
                <option value="Cousin">Cousin</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="admission-div">
              <label>
                Email Address <div>*</div>
              </label>
              <input
                placeholder="parent@email.com (Required)"
                value={parent.parentEmail}
                onChange={(e) => {
                  let value = e.target.value;
                  setParent({
                    parentFullname: parent.parentFullname,
                    relation: parent.relation,
                    parentEmail: value,
                    parentContact: parent.parentContact,
                  });
                }}
                type="text"
              />
            </div>

            <div className="admission-div">
              <label>
                Contact No.<div>*</div>
              </label>
              <input
                placeholder="0987 6543 210 (Required)"
                value={parent.parentContact}
                onChange={(e) => {
                  let value = e.target.value;
                  let newValue = value
                    .replace(/\W/gi, "")
                    .replace(/(.{4})/g, "$1 ");
                  setParent({
                    parentFullname: parent.parentFullname,
                    relation: parent.relation,
                    parentEmail: parent.parentEmail,
                    parentContact: newValue,
                  });
                }}
                type="text"
              />
            </div>

            <div className="label-div">
              <h4>Other contact no.</h4>
            </div>

            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Home no.</label>
                <input
                  value={home}
                  onChange={(e) => setHome(e.target.value)}
                  type="text"
                />
              </div>

              <div className="dual-admission-div-div">
                <label>Work no.</label>
                <input
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  type="text"
                ></input>
              </div>
            </div>
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
