import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Barangay } from "../../../Pages/Admin/Admission/Barangay";
import Loader from "../../../Components/Loader/Loader";

const NavProfile = (props) => {
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [gradeLevel, setGradeLevel] = useState([]);

  const updateSubmit = () => {
    setLoader(true);
    Axios.put(`http://localhost:3001/update/teacher/${props.id}`, {
      barangay: students.barangay,
      birthday: students.birthday,
      city: students.city,
      email: students.email,
      firstname: students.firstname,
      gender: students.gender,
      home: students.home,
      idNumber: students.idNumber,
      lastname: students.lastname,
      middlename: students.middlename,
      parentContact: students.parentContact,
      parentEmail: students.parentEmail,
      parentFirstname: students.parentFirstname,
      parentLastname: students.parentLastname,
      parentMiddlename: students.parentMiddlename,
      relation: students.relation,
      street: students.street,
      work: students.work,
      year: students.year,
      contact: students.contact,
    }).then((response) => {
      if (response.data.err) {
        props.setMessage(response.data.err);
        setLoader(false);
      } else {
        setLoader(false);
        props.setMessage(response.data.success);
        props.setInitial([]);
        setTimeout(() => props.setMessage(""), 5000);
      }
    });
  };
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/teacher/${props.id}`).then(
      (response) => {
        let e = response.data;
        console.log(e);
        setStudents({
          barangay: e.barangay,
          birthday: e.birthday,
          city: e.city,
          email: e.email,
          firstname: e.firstname,
          gender: e.gender,
          idNumber: e.idNumber,
          lastname: e.lastname,
          middlename: e.middlename,
          street: e.street,
          year: e.year,
          contact: e.contact,
        });
      }
    );
  }, [props.initial]);

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

  return (
    <>
      {loader && <Loader />}
      <div className="user-nav-wrapper">
        <div className="user-nav-wrapper-profile-body">
          <div className="personal-info-body">
            <div className="user-nav-wrapper-sub-header">
              Personal Infomation
            </div>
            <div className="admission-div-user-id">
              <label>Student I.D *</label>
              <div className="user-id-div-input">
                <input value={students.idNumber} type="text" />
              </div>
            </div>

            <div className="multi-admission-div">
              <div className="one-multi-admission-div">
                <label>
                  Last Name <div>*</div>
                </label>
                <input
                  value={students.lastname}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: value,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
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
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: value,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  value={students.firstname}
                  type="text"
                />
              </div>
              <div className="three-multi-admission-div">
                <label>M.I.</label>
                <input
                  value={students.middlename}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: value,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
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
                    checked={students.gender === "Male"}
                    value="Male"
                    onChange={(e) => {
                      let value = e.target.value;
                      setStudents({
                        barangay: students.barangay,
                        birthday: students.birthday,
                        city: students.city,
                        email: students.email,
                        firstname: students.firstname,
                        gender: value,
                        home: students.home,
                        idNumber: students.idNumber,
                        lastname: students.lastname,
                        middlename: students.middlename,
                        parentContact: students.parentContact,
                        parentEmail: students.parentEmail,
                        parentFirstname: students.parentFirstname,
                        parentLastname: students.parentLastname,
                        parentMiddlename: students.parentMiddlename,
                        relation: students.relation,
                        street: students.street,
                        work: students.work,
                        year: students.year,
                        contact: students.contact,
                      });
                    }}
                    type="radio"
                  />
                  <label>Male</label>
                </div>

                <div>
                  <input
                    checked={students.gender === "Female"}
                    onChange={(e) => {
                      let value = e.target.value;
                      setStudents({
                        barangay: students.barangay,
                        birthday: students.birthday,
                        city: students.city,
                        email: students.email,
                        firstname: students.firstname,
                        gender: value,
                        home: students.home,
                        idNumber: students.idNumber,
                        lastname: students.lastname,
                        middlename: students.middlename,
                        parentContact: students.parentContact,
                        parentEmail: students.parentEmail,
                        parentFirstname: students.parentFirstname,
                        parentLastname: students.parentLastname,
                        parentMiddlename: students.parentMiddlename,
                        relation: students.relation,
                        street: students.street,
                        work: students.work,
                        year: students.year,
                        contact: students.contact,
                      });
                    }}
                    value="Female"
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
                value={students.birthday}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: value,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="date"
              />
            </div>
          </div>

          <div className="user-nav-wrapper-sub-header">Contact Address</div>

          <div className="personal-info-body">
            <div className="admission-div">
              <label>Street</label>
              <input
                value={students.street}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: value,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="text"
              ></input>
            </div>

            <div className="dual-admission-div">
              <div className="dual-admission-div-div">
                <label>Brgy. *</label>
                <select
                  value={students.barangay}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: value,
                      birthday: students.birthday,
                      city: students.city,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
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
                  value={students.city}
                  onChange={(e) => {
                    let value = e.target.value;
                    setStudents({
                      barangay: students.barangay,
                      birthday: students.birthday,
                      city: value,
                      email: students.email,
                      firstname: students.firstname,
                      gender: students.gender,
                      home: students.home,
                      idNumber: students.idNumber,
                      lastname: students.lastname,
                      middlename: students.middlename,
                      parentContact: students.parentContact,
                      parentEmail: students.parentEmail,
                      parentFirstname: students.parentFirstname,
                      parentLastname: students.parentLastname,
                      parentMiddlename: students.parentMiddlename,
                      relation: students.relation,
                      street: students.street,
                      work: students.work,
                      year: students.year,
                      contact: students.contact,
                    });
                  }}
                  type="text"
                ></input>
              </div>
            </div>

            <div className="admission-div">
              <label>Email Address</label>
              <input
                value={students.email}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: value,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: students.contact,
                  });
                }}
                type="text"
                placeholder="Optional"
              />
            </div>

            <div className="admission-div">
              <label>Contact No.</label>

              <input
                value={students.contact}
                onChange={(e) => {
                  let value = e.target.value;
                  setStudents({
                    barangay: students.barangay,
                    birthday: students.birthday,
                    city: students.city,
                    email: students.email,
                    firstname: students.firstname,
                    gender: students.gender,
                    home: students.home,
                    idNumber: students.idNumber,
                    lastname: students.lastname,
                    middlename: students.middlename,
                    parentContact: students.parentContact,
                    parentEmail: students.parentEmail,
                    parentFirstname: students.parentFirstname,
                    parentLastname: students.parentLastname,
                    parentMiddlename: students.parentMiddlename,
                    relation: students.relation,
                    street: students.street,
                    work: students.work,
                    year: students.year,
                    contact: value,
                  });
                }}
                maxLength="14"
                type="text"
                placeholder="0987 6543 210 (Optional)"
              />
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

export default NavProfile;
