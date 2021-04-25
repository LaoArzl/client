import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

/*Components */
import My404ErrorComponent from "./Components/My404Component/My404Component";
import NoPermisison from "./Components/My404Component/NoPermission";

//Public Pages
import HomePage from "./Pages/Portal/HomePage/HomePage";
import About from "./Pages/Portal/About/About";
import EnrollmentProcedure from "./Pages/Portal/Admission/EnrollmentProcedure";
import TuitionFess from "./Pages/Portal/Admission/TuitionFees";
import BoardTrustees from "./Pages/Portal/Administration/BoardTrustees";
import TeachersStaff from "./Pages/Portal/Administration/TeachersStaff";
import Contact from "./Pages/Portal/Contact/Contact";

//landing Page
import Login from "./Pages/Login/Login";

//Login Page
import PortalLogin from "./Pages/PortalLogin/PortalLogin";

//Admin Components and Pages
import DashboardHome from "./Pages/Admin/DashboardHome/DashboardHome";
import Classroom from "./Pages/Admin/Classroom/Class";
import Message from "./Pages/Admin/Message/Message";
import Students from "./Pages/Admin/Students/Students";
import Teachers from "./Pages/Admin/Teachers/Teachers";
import UserTeacher from "./Pages/Admin/Teachers/UserTeacher";
import UserStudent from "./Pages/Admin/Students/UserStudent";
import CreateUser from "./Pages/Admin/CreateUser/CreateUser";
import EditClass from "./Pages/Admin/Classroom/EditClass";
import Subject from "./Pages/Admin/Subject/Subject";
import Year from "./Pages/Admin/Year/Year";

//Context Files
import { DashboardStatus } from "./ContextFiles/DashboardContext";
import { LogoutState } from "./ContextFiles/LogoutContext";
import { LoginProvider } from "./ContextFiles/LoginContext";
import { CreateStudentState } from "./ContextFiles/CreateStudentContext";
import { StudentListProvider } from "./ContextFiles/StudentListContext";
import { CreateTeacherState } from "./ContextFiles/CreateTeacherContext";

//Teacher Pages
import TeacherProfile from "./Pages/Teacher/TeacherProfile/TeacherProfile";
import TeacherMessage from "./Pages/Teacher/TeacherMessage/TeacherMessage";
import ClassTeacher from "./Pages/ClassComponents/ClassTeacher";

//Student Pages
import StudentProfile from "./Pages/Student/StudentProfile/StudentProfile";
import StudentGrades from "./Pages/Student/StudentGrades/StudentGrades";
import StudentClass from "./Pages/Student/StudentClass/StudentClass";
import StudentMessage from "./Pages/Student/StudentMessage/StudentMessage";
import Fees from "./Pages/Student/Fees/Fees";

function App() {
  const [studentUser, setStudentUser] = useState([]);
  const [teacherUser, setTeacherUser] = useState([]);
  const [classData, setClassData] = useState([]);
  const [username, setUsername] = useState("");

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
                        <Route path="/about" exact component={About} />
                        <Route
                          path="/enrollment-procedure"
                          exact
                          component={EnrollmentProcedure}
                        />
                        <Route
                          path="/tuition-fees"
                          exact
                          component={TuitionFess}
                        />
                        <Route
                          path="/board-of-trustees"
                          exact
                          component={BoardTrustees}
                        />
                        <Route
                          path="/teaching-and-non-teaching-staff"
                          exact
                          component={TeachersStaff}
                        />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/login" exact component={PortalLogin} />

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
                          component={CreateUser}
                        />

                        <Route
                          path="/admin/teachers"
                          exact
                          component={Teachers}
                        />

                        <Route
                          path="/admin/year"
                          exact
                          component={Year}
                        />

                        <Route
                          path="/admin/subject"
                          exact
                          component={Subject}
                        />

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

                        {teacherUser.map((value) => {
                          return (
                            <Route
                              key={value._id}
                              path={"/user/teacher/message/" + value._id}
                              exact
                            >
                              <TeacherMessage />
                            </Route>
                          );
                        })}

                        <Route
                          path="/user/student/"
                          exact
                          component={StudentProfile}
                        />
                        <Route
                          path="/user/student/grades"
                          exact
                          component={StudentGrades}
                        />
                        <Route
                          path="/user/student/class"
                          exact
                          component={StudentClass}
                        />
                        <Route
                          path="/user/student/message"
                          exact
                          component={StudentMessage}
                        />

                        <Route
                          path="/user/student/fees"
                          exact
                          component={Fees}
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
