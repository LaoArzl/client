import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StudentListContext } from "../../../ContextFiles/StudentListContext";

const TeacherList = () => {
  const { value01, value03 } = useContext(StudentListContext);
  const [teachers, setTeachers] = value01;
  const [searchItem, setSearchItem] = value03;
  return (
    <>
      <div className="user-studentlist-separate">
        <div className="user-studentlist-header">
          <div className="studentlist-header-number">#</div>
          <div className="studentlist-header-id">Teacher ID</div>
          <div className="studentlist-header-name">Name</div>
          <div className="studentlist-header-gender">Gender</div>
          <div className="studentlist-header-grade">Advising</div>
          <div className="studentlist-header-action">Action</div>
        </div>
        <div className="user-studentlist-body">
          {teachers
            .filter((val) => {
              if (searchItem === "") {
                return val;
              } else if (val.user_id.includes(searchItem)) {
                return val;
              } else if (
                val.fullName.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return val;
              }
            })
            .map((value, key) => {
              return (
                <>
                  <div key={key + 1} className="user-studentlist-body-wrapper">
                    <div className="studentlist-header-number-span">
                      {key + 1}
                    </div>
                    <div
                      className="studentlist-header-id-span"
                      to={"/admin/users/student-profile/" + value.user_id}
                    >
                      {value.user_id}
                    </div>
                    <div
                      className="studentlist-header-name-span"
                      to={"/admin/users/teacher-profile/" + value.user_id}
                    >
                      {value.fullName}
                    </div>
                    <div className="studentlist-header-gender-span">
                      {value.gender}
                    </div>
                    <div className="studentlist-header-grade-span"> </div>
                    <Link
                      className="studentlist-header-action-span"
                      to={"/admin/users/teacher-profile/" + value.user_id}
                    >
                      <div>
                        <i class="fas fa-edit"></i>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TeacherList;
