import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuAdmission } from "./MenuAdmission";
import "./Dropdown.css";

const DropdownAdmission = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown active" : "dropdown"}
      >
        {MenuAdmission.map((items, key) => {
          return (
            <li key={key}>
              <Link className={items.cName} to={items.path}>
                {items.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DropdownAdmission;
