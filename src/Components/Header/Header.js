import React from "react";
import { useState } from "react";
import "./Header.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import DropdownAdmission from "../Dropdown/DropdownAdmission";
import DropdownAdmin from "../Dropdown/DropdownAdmin";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const click = () => setShowMenu(!showMenu);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  const onMouseEnter1 = () => {
    if (window.innerWidth > 850) {
      setDropdown1(true);
    } else {
      setDropdown1(false);
    }
  };
  const onMouseEnter2 = () => {
    if (window.innerWidth > 850) {
      setDropdown2(true);
    } else {
      setDropdown2(false);
    }
  };

  const onMouseLeave1 = () => {
    if (window.innerWidth > 850) {
      setDropdown1(false);
    } else {
      setDropdown1(false);
    }
  };

  const onMouseLeave2 = () => {
    if (window.innerWidth > 850) {
      setDropdown2(false);
    } else {
      setDropdown2(false);
    }
  };

  const somethingClick1 = () => {
    if (window.innerWidth < 850) {
      setDropdown1(!dropdown1);
    } else {
      setDropdown1(false);
    }
  };

  const somethingClick2 = () => {
    if (window.innerWidth < 850) {
      setDropdown2(!dropdown2);
    } else {
      setDropdown2(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <div className="school-name">
            <Link to="/" className="brand-link route-link">
              <img src={Logo} alt="Logo" />
              <h1>ECPLC</h1>
            </Link>
          </div>
          <div className="icon-link">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fas fa-envelope"></i>
            </a>
            <Link to="/contact" className="route-link">
              <i className="fas fa-phone-alt"></i>
            </Link>
          </div>
          <div className="menu-icon">
            <i
              onClick={click}
              className={showMenu ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <ul className={showMenu ? "navlinks active" : "navlinks"}>
            <li>
              <Link
                to="/"
                className={
                  window.location.pathname === "/"
                    ? "active-route-links"
                    : "route-links"
                }
              >
                Home{" "}
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={
                  window.location.pathname === "/about"
                    ? "active-route-links"
                    : "route-links"
                }
              >
                About
              </Link>
            </li>

            <li
              onMouseEnter={onMouseEnter1}
              onMouseLeave={onMouseLeave1}
              onClick={somethingClick1}
            >
              <Link
                className={
                  window.location.pathname === "/enrollment-procedure" ||
                  window.location.pathname === "/tuition-fees"
                    ? "active-route-links"
                    : "route-links"
                }
              >
                Admission <i className="fas fa-chevron-down"></i>
              </Link>
              {dropdown1 && <DropdownAdmission />}
            </li>

            <li
              onMouseEnter={onMouseEnter2}
              onMouseLeave={onMouseLeave2}
              onClick={somethingClick2}
            >
              <Link
                className={
                  window.location.pathname === "/board-of-trustees" ||
                  window.location.pathname ===
                    "/teaching-and-non-teaching-staff"
                    ? "active-route-links"
                    : "route-links"
                }
              >
                Administration <i className="fas fa-chevron-down"></i>
              </Link>
              {dropdown2 && <DropdownAdmin />}
            </li>

            <li>
              <Link
                to="/contact"
                className={
                  window.location.pathname === "/contact"
                    ? "active-route-links"
                    : "route-links"
                }
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="portal">
            <Link to="/login" className="portal-route-link" target="_blank">
              <i className="fas fa-graduation-cap"></i>LOGIN
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
