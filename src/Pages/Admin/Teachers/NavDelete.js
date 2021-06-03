import React, { useEffect, useState, useContext } from "react";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { PulseLoader } from "react-spinners";
import { LoginContext } from "../../../ContextFiles/LoginContext";

const NavDelete = (props) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [key, setKey] = useState(null);

  const [loader, setLoader] = useState(false);

  const { valueTeacherPicture, valueTeachername } = useContext(LoginContext);
  const [teachername, setTeachername] = valueTeachername;
  const [teacherPicture, setTeacherPicture] = valueTeacherPicture;

  const upload = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ayivjexe");
    formData.append("cloud_name", "defutech-inc");

    fetch("https://api.cloudinary.com/v1_1/defutech-inc/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        Axios.put(
          `https://ecplc2021.herokuapp.com/upload-picture/${props.id}`,
          {
            picture: data.url,
          }
        ).then((response) => {
          if (response.data.err) {
            props.setMessage(response.data.err);
            console.log(response);
            setLoader(false);
          } else {
            setLoader(false);
            setFilename(null);
            props.setMessage(response.data.success);
            props.setInitial([]);
            setTimeout(() => {
              props.setMessage("");
            }, 5000);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Axios.get(`https://ecplc2021.herokuapp.com/teacher/${props.id}`).then(
      (response) => {
        setTeacherPicture(response.data.picture);
        setTeachername(response.data.fullname);
      }
    );
  }, [props.initial]);
  return (
    <>
      {/* {loader && <Loader />} */}
      <div className="profile-info">
        <div className="user-nav-wrapper-sub-header">
          Upload profile picture
        </div>

        <div className="profile-picture">
          <img src={teacherPicture} alt="Profile picture" />
        </div>

        <div className="profile-picture-name">
          <h2>{teachername}</h2>
        </div>

        <div className={filename === null ? "hidden" : "actuals"}>
          <p className="footer-add-word">
            <InsertDriveFileOutlinedIcon
              className="material-document"
              fontSize="small"
            />
            <i>{filename}</i>
          </p>
          <span
            onClick={() => {
              setFilename(null);
              setFile(null);
              setKey(null);
            }}
          >
            <i className="far fa-times-circle"></i>
          </span>
        </div>

        <div className="custom-file-div">
          {" "}
          <input
            key={key}
            onChange={(e) => {
              setFilename(e.target.files[0].name);
              setFile(e.target.files[0]);
              setKey(e.target.files[0].name);
            }}
            type="file"
            className={filename !== null ? "hidden" : "custom-file-input"}
          />
        </div>

        <div
          onClick={upload}
          className={filename === null ? "hidden" : "actuals-btn"}
        >
          {loader ? (
            <PulseLoader color={`#fff`} size={6} margin={2} loading />
          ) : (
            "UPLOAD"
          )}
        </div>
      </div>
    </>
  );
};

export default NavDelete;
