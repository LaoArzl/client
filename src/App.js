import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

/*Components */
import My404ErrorComponent from "./Components/My404Component/My404Component";
import NoPermisison from "./Components/My404Component/NoPermission";

//landing Page
import Login from "./Pages/Login/Login";

//Admin Components and Pages
import DashboardHome from "./Pages/Admin/DashboardHome/DashboardHome";
import Classroom from "./Pages/Admin/Classroom/Class";
import Students from "./Pages/Admin/Students/Students";
import Teachers from "./Pages/Admin/Teachers/Teachers";
import UserTeacher from "./Pages/Admin/Teachers/UserTeacher";
import UserStudent from "./Pages/Admin/Students/UserStudent";
import EditClass from "./Pages/Admin/Classroom/EditClass";
import Year from "./Pages/Admin/Year/Year";
import EditYear from "./Pages/Admin/Year/EditYear";
import Admission from "./Pages/Admin/Admission/Admission";
import SchoolYear from "./Pages/Admin/SchoolYear/SchoolYear";

//Context Files
import { DashboardStatus } from "./ContextFiles/DashboardContext";
import { LogoutState } from "./ContextFiles/LogoutContext";
import { LoginProvider } from "./ContextFiles/LoginContext";
import { CreateStudentState } from "./ContextFiles/CreateStudentContext";
import { StudentListProvider } from "./ContextFiles/StudentListContext";
import { CreateTeacherState } from "./ContextFiles/CreateTeacherContext";

//Teacher Pages
import TeacherProfile from "./Pages/Teacher/TeacherProfile/TeacherProfile";
import ClassTeacher from "./Pages/ClassComponents/ClassTeacher";
import SubjectClass from "./Pages/ClassComponents/SubjectClass/SubjectClass";
import People from "./Pages/ClassComponents/People/People";
import Subjects from "./Pages/ClassComponents/SubjectClass/Subjects";
import Activity from "./Pages/ClassComponents/Activity/Activity";
import Lecture from "./Pages/ClassComponents/Lecture/Lecture";
import Grades from "./Pages/ClassComponents/Grades/Grades";
import MaterialLecture from "./Pages/ClassComponents/Activity/MaterialLecture";
import Draft from "./Pages/ClassComponents/SubjectClass/Draft";

//Student Pages
import StudentProfile from "./Pages/Student/StudentProfile/StudentProfile";
import StudentClass from "./Pages/Student/StudentClass/StudentClass";
import Prototype from "./Components/Prototype";
import StudentSubject from "./Pages/Student/StudentClass/StudentSubject";
import StudentPeople from "./Pages/Student/StudentPeople/StudentPeople";
import StudentActivity from "./Pages/Student/StudentActivity/StudentActivity";
import StudentLecture from "./Pages/Student/StudentLecture/StudentLecture";
import StudentActualActivity from "./Pages/Student/StudentActivity/StudentActualActivity";
import StudentLectureActual from "./Pages/Student/StudentLecture/StudentLectureActual";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [studentUser, setStudentUser] = useState([]);
  const [teacherUser, setTeacherUser] = useState([]);
  const [classData, setClassData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [yearId, setYearId] = useState([]);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/student-list").then(
      (response) => {
        if (response.data.length === 0) {
          setStudentUser([]);
        } else {
          setStudentUser(response.data);
        }
      }
    );

    return console.log("Unmounting");
  }, [initial]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/teacher-list").then(
      (response) => {
        if (response.data.length === 0) {
          setTeacherUser([]);
        } else {
          setTeacherUser(response.data);
        }
      }
    );

    return console.log("Unmounting");
  }, [initial]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/class/populate-teacher").then(
      (response) => {
        if (response.data.length === 0) {
          setClassData([]);
        } else {
          setClassData(response.data);
        }
      }
    );

    return () => console.log("Unmounting");
  }, [initial]);

  useEffect(() => {
    Axios.get("https://ecplc2021.herokuapp.com/year/create").then(
      (response) => {
        if (response.data.length === 0) {
          setYearId([]);
        } else {
          setYearId(response.data);
        }
      }
    );
  }, []);

  const [message, setMessage] = useState("");
  return (
    <>
      <AnimatePresence>
        <div className="app">
          <CreateTeacherState>
            <StudentListProvider>
              <CreateStudentState>
                <LoginProvider>
                  <LogoutState>
                    <DashboardStatus>
                      <Router>
                        <Switch>
                          <Route
                            path="/access-denied"
                            exact={true}
                            component={NoPermisison}
                          />
                          <Route path="/" exact component={Login} />
                          <Route
                            path="/admin/dashboard"
                            exact
                            component={DashboardHome}
                          />
                          <Route path="/admin/class" exact>
                            <Classroom />
                          </Route>

                          {teacherUser.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/admin/edit-user/" + value._id}
                                id={value._id}
                                exact
                                component={UserTeacher}
                              />
                            );
                          })}
                          {studentUser.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/admin/edit-user/" + value._id}
                                exact
                              >
                                <UserStudent id={value._id} />
                              </Route>
                            );
                          })}
                          <Route path="/admin/students" exact>
                            <Students
                              initial={initial}
                              setInitial={setInitial}
                            />
                          </Route>

                          <Route
                            path="/prototype"
                            exact
                            component={Prototype}
                          />
                          <Route path="/admin/admission" exact>
                            <Admission
                              initial={initial}
                              setInitial={setInitial}
                            />
                          </Route>
                          <Route
                            path="/admin/teachers"
                            exact
                            component={Teachers}
                          />
                          <Route path="/admin/year" exact component={Year} />
                          <Route
                            path="/admin/school-year"
                            exact
                            component={SchoolYear}
                          />
                          {yearId.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/admin/edit-year/" + value._id}
                                exact
                              >
                                <EditYear
                                  id={value._id}
                                  initial={initial}
                                  setInitial={setInitial}
                                />
                              </Route>
                            );
                          })}
                          {studentUser.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/user/student/" + value._id}
                                exact
                              >
                                <StudentProfile id={value._id} />
                              </Route>
                            );
                          })}

                          {teacherUser.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/user/teacher/" + value._id}
                                exact
                              >
                                <TeacherProfile id={value._id} />
                              </Route>
                            );
                          })}

                          {/* <Route
                            path="/user/student/"
                            exact
                            component={StudentProfile}
                          /> */}
                          {classData.map((value) => {
                            return (
                              <Route
                                key={value._id}
                                path={"/admin/class/edit/" + value._id}
                                exact
                              >
                                <EditClass id={value._id} />
                              </Route>
                            );
                          })}
                          {classData === null ? null : (
                            <>
                              {classData.map((value) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={"/teacher-class/" + value._id}
                                    exact
                                  >
                                    <ClassTeacher
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      adviserId={value.adviser_id._id}
                                      name={value.className}
                                      setInitial={setInitial}
                                      initial={initial}
                                    />
                                  </Route>
                                );
                              })}
                            </>
                          )}

                          {classData.map((value) => {
                            return value.students.map((stud) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={"/student-class/" + value._id}
                                  exact
                                >
                                  <StudentClass
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    adviserId={value.adviser_id._id}
                                    name={value.className}
                                    initial={initial}
                                    setInitial={setInitial}
                                    picture={stud.picture}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={
                                    "/teacher-class/" + value._id + "/subjects"
                                  }
                                  exact
                                >
                                  <SubjectClass
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    // activityLink={
                                    //   "/teacher-class/" +
                                    //   value._id +
                                    //   "/subjects/" +
                                    //   sub.subjectName +
                                    //   "/activities"
                                    // }
                                    activeLink={
                                      "/teacher-class/" +
                                      value._id +
                                      "/subjects"
                                    }
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/student-class/" +
                                      value._id +
                                      "/subjects/"
                                    }
                                    exact
                                  >
                                    <StudentSubject
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      activityLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                      activeLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/teacher-class/" +
                                      value._id +
                                      "/subjects/" +
                                      sub.subjectName +
                                      "/activities"
                                    }
                                    exact
                                  >
                                    <Subjects
                                      message={message}
                                      setMessage={setMessage}
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      subject={sub.subjectName}
                                      setInitial={setInitial}
                                      initial={initial}
                                      activityLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/activities"
                                      }
                                      lectureLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/lectures"
                                      }
                                      gradeLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/grades"
                                      }
                                      goBack={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/student-class/" +
                                      value._id +
                                      "/subjects/" +
                                      sub.subjectName +
                                      "/activities"
                                    }
                                    exact
                                  >
                                    <StudentActivity
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      subject={sub.subjectName}
                                      setInitial={setInitial}
                                      initial={initial}
                                      activityLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/activities"
                                      }
                                      lectureLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/lectures"
                                      }
                                      goBack={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/teacher-class/" +
                                      value._id +
                                      "/subjects/" +
                                      sub.subjectName +
                                      "/lectures"
                                    }
                                    exact
                                  >
                                    <Lecture
                                      message={message}
                                      setMessage={setMessage}
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      subject={sub.subjectName}
                                      setInitial={setInitial}
                                      initial={initial}
                                      activityLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/activities"
                                      }
                                      lectureLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/lectures"
                                      }
                                      gradeLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/grades"
                                      }
                                      goBack={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/student-class/" +
                                      value._id +
                                      "/subjects/" +
                                      sub.subjectName +
                                      "/lectures"
                                    }
                                    exact
                                  >
                                    <StudentLecture
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      subject={sub.subjectName}
                                      setInitial={setInitial}
                                      initial={initial}
                                      activityLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/activities"
                                      }
                                      lectureLink={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/lectures"
                                      }
                                      goBack={
                                        "/student-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return key.subjects.map((sub) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={
                                      "/teacher-class/" +
                                      value._id +
                                      "/subjects/" +
                                      sub.subjectName +
                                      "/grades"
                                    }
                                    exact
                                  >
                                    <Grades
                                      message={message}
                                      setMessage={setMessage}
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      name={value.className}
                                      subject={sub.subjectName}
                                      setInitial={setInitial}
                                      initial={initial}
                                      activityLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/activities"
                                      }
                                      lectureLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/lectures"
                                      }
                                      gradeLink={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects/" +
                                        sub.subjectName +
                                        "/grades"
                                      }
                                      goBack={
                                        "/teacher-class/" +
                                        value._id +
                                        "/subjects"
                                      }
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.activity.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={"/activity/" + key._id}
                                  exact
                                >
                                  <Activity
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    subject={key.subject}
                                    topic={key.topic}
                                    activityType={key.activityType}
                                    points={key.points}
                                    instructions={key.instructions}
                                    due={key.due}
                                    time={key.time}
                                    activityId={key._id}
                                    active={key.active}
                                    setInitial={setInitial}
                                    quarter={key.quarter}
                                    filename={key.file}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.students.map((stud) => {
                              return value.activity.map((key) => {
                                return (
                                  <Route
                                    key={value._id}
                                    path={"/student/activity/" + key._id}
                                    exact
                                  >
                                    <StudentActualActivity
                                      id={value._id}
                                      adviser={value.adviser_id.fullname}
                                      fullname={stud.fullname}
                                      name={value.className}
                                      subject={key.subject}
                                      topic={key.topic}
                                      activityType={key.activityType}
                                      points={key.points}
                                      instructions={key.instructions}
                                      due={key.due}
                                      time={key.time}
                                      activityId={key._id}
                                      active={key.active}
                                      setInitial={setInitial}
                                      quarter={key.quarter}
                                      filename={key.file}
                                    />
                                  </Route>
                                );
                              });
                            });
                          })}

                          {classData.map((value) => {
                            return value.activity.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={"/draft/" + key._id}
                                  exact
                                >
                                  <Draft
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    subject={key.subject}
                                    topic={key.topic}
                                    activityType={key.activityType}
                                    points={key.points}
                                    instructions={key.instructions}
                                    due={key.due}
                                    time={key.time}
                                    activityId={key._id}
                                    active={key.active}
                                    setInitial={setInitial}
                                    message={message}
                                    setMessage={setMessage}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.lecture.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={"/lecture/" + key._id}
                                  exact
                                >
                                  <MaterialLecture
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    subject={key.subject}
                                    topic={key.topic}
                                    activityType={key.activityType}
                                    points={key.points}
                                    instructions={key.instructions}
                                    due={key.due}
                                    time={key.time}
                                    activityId={key._id}
                                    active={key.active}
                                    setInitial={setInitial}
                                    initial={initial}
                                    filename={key.file}
                                    message={message}
                                    setMessage={setMessage}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.lecture.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={"/student/lecture/" + key._id}
                                  exact
                                >
                                  <StudentLectureActual
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    subject={key.subject}
                                    topic={key.topic}
                                    activityType={key.activityType}
                                    points={key.points}
                                    instructions={key.instructions}
                                    due={key.due}
                                    time={key.time}
                                    activityId={key._id}
                                    active={key.active}
                                    setInitial={setInitial}
                                    initial={initial}
                                    filename={key.file}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={
                                    "/teacher-class/" + value._id + "/people"
                                  }
                                  exact
                                >
                                  <People
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    year={key._id}
                                    initial={initial}
                                    setInitial={setInitial}
                                  />
                                </Route>
                              );
                            });
                          })}

                          {classData.map((value) => {
                            return value.year.map((key) => {
                              return (
                                <Route
                                  key={value._id}
                                  path={
                                    "/student-class/" + value._id + "/people"
                                  }
                                  exact
                                >
                                  <StudentPeople
                                    id={value._id}
                                    adviser={value.adviser_id.fullname}
                                    name={value.className}
                                    year={key._id}
                                    initial={initial}
                                    setInitial={setInitial}
                                  />
                                </Route>
                              );
                            });
                          })}

                          <Route
                            path="*"
                            exact={true}
                            component={My404ErrorComponent}
                          />
                        </Switch>
                      </Router>
                    </DashboardStatus>
                  </LogoutState>
                </LoginProvider>
              </CreateStudentState>
            </StudentListProvider>
          </CreateTeacherState>
        </div>
      </AnimatePresence>
    </>
  );
}

export default App;
