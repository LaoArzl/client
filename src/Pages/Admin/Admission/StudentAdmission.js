import React, { useState } from "react";
import "./Admission.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Axios from "axios";

const StudentAdmission = () => {
  const [account, setAccount] = useState({});
  const [personal, setPersonal] = useState({});
  const [address, setAdress] = useState({});
  const [parent, setParent] = useState({});
  const [gradeLevel, setGradeLevel] = useState([]);

  Axios.get("http://ecplcsms.herokuapp.com/year/create").then((response) => {
    if (response.data.length === 0) {
      setGradeLevel([]);
    } else {
      setGradeLevel(response.data);
    }
  });
  return (
    <>
      {/* Account details*/}
      <div className="user-admission-personal">
        <div className="personal-info-header">
          <h3>Account Details</h3>
        </div>
        <div className="personal-info-body">
          <div className="admission-div">
            <label>Student I.D.</label>
            <input type="text" />
          </div>

          <div className="admission-div">
            <label>Grade</label>
            <select>
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

          <div className="admission-div">
            <label>Username</label>
            <input type="text" />
          </div>

          <div className="admission-div">
            <label>Password</label>
            <input type="password" />
          </div>

          <div className="multi-admission-div">
            <div className="one-multi-admission-div">
              <label>Last Name</label>
              <input type="text" />
            </div>
            <div className="two-multi-admission-div">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="three-multi-admission-div">
              <label>Middle Name</label>
              <input type="text" />
            </div>
          </div>

          <div className="admission-div">
            <label>Gender</label>
            <select>
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
            <input type="date" />
          </div>
        </div>

        <div className="admission-div">
          <label>Profile Picture</label>
          <input type="file" id="file-upload"></input>
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
              <input type="text"></input>
            </div>

            <div className="dual-admission-div-div">
              <label>Brgy.</label>
              <input type="text"></input>
            </div>
          </div>
          <div className="dual-admission-div">
            <div className="dual-admission-div-div">
              <label>City</label>
              <input type="text"></input>
            </div>

            <div className="dual-admission-div-div">
              <label>Postal Code</label>
              <input type="number"></input>
            </div>
          </div>

          <div className="admission-div">
            <label>Email Address</label>
            <input type="text" placeholder="Optional" />
          </div>

          <div className="admission-div">
            <label>Contact No.</label>
            <input type="text" placeholder="Optional" />
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
            <label>Fullname</label>
            <input type="text" />
          </div>

          <div className="admission-div">
            <label>Relation</label>
            <input
              type="text"
              placeholder="Mother, Father, Relatives, etc..."
            />
          </div>

          <div className="admission-div">
            <label>
              Email Address
              <Tippy
                content={
                  "Contact information from parents or guardians is important. All information of the student including username and password will be sent via email or text messages."
                }
                placement="top"
              >
                <i class="fas fa-info-circle"></i>
              </Tippy>
            </label>
            <input type="text" />
          </div>

          <div className="admission-div">
            <label>
              Contact No.{" "}
              <Tippy
                content={
                  "Contact information from parents or guardians is important. All information of the student including username and password will be sent via email or text messages."
                }
                placement="top"
              >
                <i class="fas fa-info-circle"></i>
              </Tippy>
            </label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div className="admission-div-submit">
        <input type="submit" className="admission-submit-btn" value="Create" />
      </div>
    </>
  );
};

export default StudentAdmission;
