import React, { useState, useEffect, useContext } from "react";
import "./Admission.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Axios from "axios";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const StudentAdmission = (props) => {
  const { value00 } = useContext(StudentListContext);
  const [students, setStudents] = value00;

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
    city: "",
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
    Axios.get("http://ecplcsms.herokuapp.com/year/create").then((response) => {
      if (response.data.length === 0) {
        setGradeLevel([]);
      } else {
        setGradeLevel(response.data);
      }
    });
  }, []);

  const submitStudent = () => {
    Axios.post("https://ecplcsms.herokuapp.com/register-student", {
      id: account.id,
      password: account.password,
      year: account.year,
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
      parentFullname: parent.parentFullname,
      relation: parent.relation,
      parentEmail: parent.parentEmail,
      parentContact: parent.parentContact,
    }).then((response) => {
      if (response.data.err) {
        props.setStudentMsg(response.data.err);
      } else {
        props.setStudentMsg(response.data.success);
        setTimeout(() => props.setStudentMsg(""), 10000);
        setAccount({
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
        setAdress({
          street: "",
          barangay: "",
          city: "",
          postal: "",
          email: "",
          contact: "",
        });
        setParent({
          parentFullname: "",
          relation: "",
          parentEmail: "",
          parentContact: "",
        });
      }
    });
  };

  return (
    <>
      {/* Account details*/}
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
          <div className="admission-div">
            <label>
              Student I.D. <div>*</div>
            </label>
            <input
              value={account.id}
              onChange={(e) => {
                let value = e.target.value;
                setAccount({
                  id: value,
                  password: account.password,
                  year: account.year,
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
            <label>
              Password <div>*</div>
            </label>

            <input
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
              type="password"
            />
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
              <label>
                M.I. <div>*</div>
              </label>
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
                  year: account.year,
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
              <option value="Other">Others</option>
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
                  year: account.year,
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
                  year: account.year,
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
              <label>
                Street <div>*</div>
              </label>
              <input
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
              <label>
                Brgy. <div>*</div>
              </label>
              <input
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

            <div className="dual-admission-div-div">
              <label>
                Postal Code <div>*</div>
              </label>
              <input
                value={address.postal}
                onChange={(e) => {
                  let value = e.target.value;
                  setAdress({
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
              value={address.contact}
              onChange={(e) => {
                let value = e.target.value;
                setAdress({
                  street: address.street,
                  barangay: address.barangay,
                  city: address.city,
                  postal: address.postal,
                  email: address.email,
                  contact: value,
                });
              }}
              type="text"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Guardian information */}
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Guardian/Parent Information</h3>
        </div>
        <div className="personal-info-body">
          <div className="admission-div">
            <label>
              Fullname<div>*</div>
            </label>
            <input
              value={parent.parentFullname}
              onChange={(e) => {
                let value = e.target.value;
                setParent({
                  parentFullname: value,
                  relation: parent.relation,
                  parentEmail: parent.parentEmail,
                  parentContact: parent.parentContact,
                });
              }}
              type="text"
            />
          </div>

          <div className="admission-div">
            <label>
              Relation<div>*</div>
            </label>
            <select value={parent.relation} onChange={(e) => {
                let value = e.target.value;
                setParent({
                  parentFullname: parent.parentFullname,
                  relation: value,
                  parentEmail: parent.parentEmail,
                  parentContact: parent.parentContact,
                });
              }}>
              <option value="" disabled>Select Option</option>
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
              value={parent.parentContact}
              onChange={(e) => {
                let value = e.target.value;
                setParent({
                  parentFullname: parent.parentFullname,
                  relation: parent.relation,
                  parentEmail: parent.parentEmail,
                  parentContact: value,
                });
              }}
              type="text"
            />
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
  );
};

export default StudentAdmission;
