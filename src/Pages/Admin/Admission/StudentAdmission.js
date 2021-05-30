import React, { useState, useEffect, useContext } from "react";
import "./Admission.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";
import { Barangay } from "./Barangay";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const StudentAdmission = (props) => {
  const { value1, loginRole } = useContext(LoginContext);
  const { value00 } = useContext(StudentListContext);
  const [role, setRole] = loginRole;
  const [radio, setRadio] = useState("");

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

  const [gradeLevel, setGradeLevel] = useState([]);

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

  const submitStudent = () => {
    props.setLoader(true);
    Axios.post("https://ecplc2021.herokuapp.com/register-student", {
      id: account.id,
      password: account.password,
      year: account.year,
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
      relation: parent.relation,
      parentEmail: parent.parentEmail,
      parentContact: parent.parentContact,
      home: home,
      work: work,
      parentMiddlename: parentMiddlename,
      parentLastname: parentLastname,
      parentFirstname: parentFirstname,
      landmark: landmark,
    }).then((response) => {
      if (response.data.err) {
        props.setLoader(false);
        props.setStudentMsg(response.data.err);
      } else {
        props.setLoader(false);
        props.setStudentMsg(response.data.success);
        props.setInitial([]);
        setHome("");
        setWork("");
        setParentMiddlename("");
        setParentFirstname("");
        setParentLastname("");
        setLandmark("");
        setTimeout(() => props.setStudentMsg(""), 10000);
        setRadio("");
        setAccount({
          id: "",
          password: "",
          year: "",
          lastname: "",
          firstname: "",
          middlename: "",
          gender: "",
          birthday: "",
        });
        setAdress({
          street: "",
          barangay: "",
          email: "",
          contact: "",
        });
        setParent({
          relation: "",
          parentEmail: "",
          parentContact: "",
        });
      }
    });
  };

  const [landmark, setLandmark] = useState("");
  const [parentFirstname, setParentFirstname] = useState("");
  const [parentMiddlename, setParentMiddlename] = useState("");
  const [parentLastname, setParentLastname] = useState("");
  const [home, setHome] = useState("");
  const [work, setWork] = useState("");

  /*Function to generate random ID string */
  const generateId = () => {
    let result1 = [];
    let result2 = [];

    let characters1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let characters2 = "0123456789";
    let charactersLength1 = characters1.length;
    let charactersLength2 = characters2.length;

    for (var i = 0; i < 2; i++) {
      result1.push(
        characters1.charAt(Math.floor(Math.random() * charactersLength1))
      );
    }

    for (var i = 0; i < 3; i++) {
      result2.push(
        characters2.charAt(Math.floor(Math.random() * charactersLength2))
      );
    }

    const dateNow = new Date();
    const getDateNow = dateNow.getFullYear();

    setAccount({
      id: getDateNow + "-" + result1.join("") + result2.join(""),
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

  return (
    <>
      {role !== "Admin" ? (
        <BrokenPage />
      ) : (
        <>
          <div
            className={
              props.studentMsg === "" ||
              props.studentMsg === "Successfully created."
                ? "teacher-admission-err-msg-hidden"
                : "teacher-admission-err-msg"
            }
          >
            {props.studentMsg}
            <i
              onClick={() => props.setStudentMsg("")}
              className={props.studentMsg === "" ? "" : "fas fa-times"}
            ></i>
          </div>
          <div className="user-admission-personal">
            <div className="personal-info-header">
              <h3>Student Account Details</h3>
            </div>
            <div className="personal-info-body">
              <div className="admission-div-user-id">
                <label>Student I.D *</label>
                <div className="user-id-div-input">
                  <input onClick={generateId} value={account.id} type="text" />
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
                        year: account.year,
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
                      className={
                        showpassword ? "far fa-eye" : "far fa-eye-slash"
                      }
                    ></i>
                  </div>
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
          </div>

          {/* Guardian information */}
          <div className="user-admission-personal">
            <div className="personal-info-header">
              <h3>Parent Information</h3>
            </div>
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
                  <Tippy
                    content={
                      "Contact address from parents or guardians is important. All information of the student including username and password will be sent via email and text messages."
                    }
                    placement="top"
                  >
                    <i class="fas fa-info-circle"></i>
                  </Tippy>
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
                  <Tippy
                    content={
                      "Contact address from parents or guardians is important. All information of the student including username and password will be sent via email and text messages."
                    }
                    placement="top"
                  >
                    <i class="fas fa-info-circle"></i>
                  </Tippy>
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
          </div>

          <div className="admission-div-submit">
            <input
              onClick={submitStudent}
              type="submit"
              className="admission-submit-btn"
              value="Create"
            />
          </div>
        </>
      )}
    </>
  );
};

export default StudentAdmission;
