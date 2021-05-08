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
import Message from "./Pages/Admin/Message/Message";
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

//Student Pages
import StudentProfile from "./Pages/Student/StudentProfile/StudentProfile";

function App() {
  const [studentUser, setStudentUser] = useState([]);
  const [teacherUser, setTeacherUser] = useState([]);
  const [classData, setClassData] = useState([]);
  const [yearId, setYearId] = useState([]);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/student-list").then(
      (response) => {
        if (response.data.length === 0) {
          setStudentUser([]);
        } else {
          setStudentUser(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/teacher-list").then(
      (response) => {
        if (response.data.length === 0) {
          setTeacherUser([]);
        } else {
          setTeacherUser(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/class/classroom-list").then(
      (response) => {
        if (response.data.length === 0) {
          setClassData([]);
        } else {
          setClassData(response.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://ecplcsms.herokuapp.com/year/create").then((response) => {
      if (response.data.length === 0) {
        setYearId([]);
      } else {
        setYearId(response.data);
      }
    });
  }, []);

  return (
    <>
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

                        <Route
                          path="/admin/message"
                          exact
                          component={Message}
                        />

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
                              id={value._id}
                              exact
                              component={UserStudent}
                            />
                          );
                        })}

                        <Route
                          path="/admin/students"
                          exact
                          component={Students}
                        />

                        <Route
                          path="/admin/admission"
                          exact
                          component={Admission}
                        />

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
                              <EditYear id={value._id} />
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

                        <Route
                          path="/user/student/"
                          exact
                          component={StudentProfile}
                        />

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

                        {classData.map((key, value) => {
                          return (
                            <Route
                              key={key._id}
                              path={"/teacher-class/" + key._id}
                              exact
                            >
                              <ClassTeacher
                                id={key._id}
                                name={key.className}
                                adviser={key.adviser_id}
                              />
                            </Route>
                          );
                        })}

                        {classData.map((value) => {
                          return (
                            <Route
                              key={value._id}
                              path={"/teacher-class/" + value._id + "/subjects"}
                              exact
                            >
                              <SubjectClass id={value._id} />
                            </Route>
                          );
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
    </>
  );
}

export default App;
