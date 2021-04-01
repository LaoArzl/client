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

//Login Page
import PortalLogin from "./Pages/PortalLogin/PortalLogin";

//Admin Components and Pages
import DashboardHome from "./Pages/Admin/DashboardHome/DashboardHome";
import Announcement from "./Pages/Admin/Announcement/Announcement";
import Classroom from "./Pages/Admin/Classroom/Class";
import Message from "./Pages/Admin/Message/Message";
import Students from "./Pages/Admin/Students/Students";
import Teachers from "./Pages/Admin/Teachers/Teachers";
import UserTeacher from "./Pages/Admin/Teachers/UserTeacher";
import UserStudent from "./Pages/Admin/Students/UserStudent";
import AdminFees from "./Pages/Admin/Fees/AdminFees";

//Context Files
import { DashboardStatus } from "./ContextFiles/DashboardContext";
import { LogoutState } from "./ContextFiles/LogoutContext";
import { LoginProvider } from "./ContextFiles/LoginContext";
import { CreateStudentState } from "./ContextFiles/CreateStudentContext";
import { StudentListProvider } from "./ContextFiles/StudentListContext";
import { CreateTeacherState } from "./ContextFiles/CreateTeacherContext";

//Protected Routes
import ProtectedAdmin from "./ProtectedRoutes/ProtectedAdmin";

//Teacher Pages
import TeacherProfile from "./Pages/Teacher/TeacherProfile/TeacherProfile";
import TeacherGrades from "./Pages/Teacher/TeacherGrades/TeacherGrades";
import TeacherClass from "./Pages/Teacher/TeacherClass/TeacherClass";
import TeacherMessage from "./Pages/Teacher/TeacherMessage/TeacherMessage";

//Student Pages
import StudentProfile from "./Pages/Student/StudentProfile/StudentProfile";
import StudentGrades from "./Pages/Student/StudentGrades/StudentGrades";
import StudentClass from "./Pages/Student/StudentClass/StudentClass";
import StudentMessage from "./Pages/Student/StudentMessage/StudentMessage";
import Fees from "./Pages/Student/Fees/Fees";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/user-login").then((response) => {
      if (response.data.loggedIn && response.data.user === "Admin") {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const [studentUser, setStudentUser] = useState([]);
  const [teacherUser, setTeacherUser] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/student-list").then((response) => {
      if (response.data) {
        setStudentUser(response.data);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/teacher-list").then((response) => {
      if (response.data) {
        setTeacherUser(response.data);
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
                        <Route path="/" exact component={HomePage} />
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

                        {/* <ProtectedAdmin
                            path="/admin/dashboard"
                            isAuth={isAuth}
                            exact
                            component={DashboardHome}
                          /> */}

                        <Route
                          path="/admin/dashboard"
                          exact
                          component={DashboardHome}
                        />

                        <Route
                          path="/admin/class"
                          exact
                          component={Classroom}
                        />
                        <Route
                          path="/admin/announcement"
                          exact
                          component={Announcement}
                        />
                        <Route
                          path="/admin/message"
                          exact
                          component={Message}
                        />

                        {/* <ProtectedAdmin
                            path={studentUser.map((value) => {
                              return (
                                "/admin/users/student-profile/" + value.user_id
                              );
                            })}
                            exact
                            component={UserStudent}
                            isAuth={isAuth}
                          />  */}

                        {teacherUser.map((value) => {
                          return (
                            <Route
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
                          path="/admin/teachers"
                          exact
                          component={Teachers}
                        />

                        <Route path="/admin/fees" exact component={AdminFees} />

                        <Route
                          path="/user/teacher/"
                          exact
                          component={TeacherProfile}
                        />

                        <Route
                          path="/user/teacher/grades"
                          exact
                          component={TeacherGrades}
                        />
                        <Route
                          path="/user/teacher/class"
                          exact
                          component={TeacherClass}
                        />
                        <Route
                          path="/user/teacher/message"
                          exact
                          component={TeacherMessage}
                        />

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
