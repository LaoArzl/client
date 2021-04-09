import React from "react";
import "./NavStudentGrades.css";

const NavStudentGrades = () => {
  const id = window.location.pathname.replace("/admin/edit-user/", "");
  return (
    <>
      <div className="user-nav-wrapper">
        <div className="user-nav-wrapper-header">
          <h2>ECPLC Report Card</h2>
        </div>
        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Kinder 1</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Values</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Kinder 2</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Values</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 1</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Values</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 2</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Values</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 3</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Science</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 4</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Science</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 5</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Science</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>

        <div className="report-card-wrapper">
          <div className="report-card-wrapper-header">
            <b>Grade 6</b>
            <p>{id}</p>
          </div>
          <div className="report-card-wrapper-body-header">
            <div className="card-subject">Subject Name</div>
            <div className="card-q">Q1</div>
            <div className="card-q">Q2</div>
            <div className="card-q">Q3</div>
            <div className="card-q">Q4</div>
            <div className="card-final">Final</div>
            <div className="card-remarks">Remarks</div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">English</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Math</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Science</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Filipino</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
          <div className="report-card-wrapper-body">
            <div className="card-subject">Makabayan</div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-q"></div>
            <div className="card-final"></div>
            <div className="card-remarks"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavStudentGrades;
