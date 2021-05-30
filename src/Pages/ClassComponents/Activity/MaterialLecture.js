import React, { useState, useEffect, useContext } from "react";
import "./Activity.css";
import TeacherDashboard from "../../Teacher/TeacherDashboard/TeacherDashboard";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Axios from "axios";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import BrokenPage from "../../../Components/My404Component/BrokenPage";
import { LoginContext } from "../../../ContextFiles/LoginContext";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { motion } from "framer-motion";
import Loader from "../../../Components/Loader/Loader";

const MaterialLecture = (props) => {
  const [loader, setLoader] = useState(false);
  const [option, setOption] = useState(false);
  const [del, setDel] = useState(false);
  const { value1, loginRole } = useContext(LoginContext);
  const [role, setRole] = loginRole;
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const downloadFile = () => {
    window.open(
      `https://ecplc2021.herokuapp.com/file/filename/${props.filename}`,

      "_blank"
    );
  };

  useEffect(() => {
    Axios.get(
      `https://ecplc2021.herokuapp.com/file/filename/${props.filename}`
    ).then((response) => {
      console.log(response);
    });
  }, [props.initial]);

  const dropdownVariants = {
    visible: {
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 1,
    },
    initial: {
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    },
  };

  const submitDiscard = () => {
    Axios.put(
      `https://ecplc2021.herokuapp.com/class/delete-lecture/${props.id}/${props.activityId}`
    ).then((response) => {
      if (response.data.err) {
        setLoader(false);
      } else {
        setLoader(false);
        history.goBack();
        props.setMessage(response.data.success);
        setTimeout(() => props.setMessage(""), 5000);
        props.setInitial(response.data.success);
      }
    });
  };

  return (
    <>
      {loader && <Loader />}
      {role !== "Teacher" ? (
        <BrokenPage />
      ) : (
        <div className="actual-activity-wrapper">
          <div
            className={del ? "actual-activity-wrapper-afters" : "hidden"}
          ></div>
          <div className={del ? "show-discard" : "hidden"}>
            <div className="show-discard-header">
              <p>Are you really sure you want to delete this lecture?</p>
            </div>

            <div className="show-discard-body">
              <div onClick={() => setDel(false)} className="cancel-discard-btn">
                Cancel
              </div>
              <div
                onClick={() => {
                  setLoader(true);
                  submitDiscard();
                }}
                className="confirm-discard-btn"
              >
                Confirm
              </div>
            </div>
          </div>
          <TeacherDashboard />
          <div className="actual-activity-content">
            <DashboardHeader />
            <div className="actual-activity-header">
              <div className="go-back-btn" onClick={goBack}>
                <i className="fas fa-angle-left"></i>Back
              </div>
            </div>
            <div className="actual-activity-body">
              <div className="actual-activity-body-left">
                <div onClick={() => setOption(!option)} className="option-menu">
                  <motion.div
                    variants={dropdownVariants}
                    initial="initial"
                    animate={option ? "visible" : ""}
                    transition={{ duration: 0.1 }}
                    className="option-menu-after"
                  >
                    <div className="option-menu-item">
                      <p>Edit</p>
                    </div>
                    <div className="option-menu-item">
                      <p onClick={() => setDel(true)}>Delete</p>
                    </div>
                  </motion.div>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className="actual-activity-body-left-header">
                  <h3>{props.topic}</h3>
                  <p>Lecture</p>
                </div>
                <div
                  className={
                    props.instructions === ""
                      ? "hidden"
                      : "actual-activity-body-left-body"
                  }
                >
                  <p> {props.instructions}</p>
                </div>
                <div className="actual-activity-body-left-attach">
                  <p>Attached file</p>
                </div>
                <div className="actual-activity-body-left-footer">
                  <p className="footer-add-word">
                    <InsertDriveFileOutlinedIcon
                      className="material-document"
                      fontSize="small"
                    />
                    <i>{props.filename}</i>
                  </p>
                  <div onClick={downloadFile}>
                    Download <i className="fas fa-download"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialLecture;
