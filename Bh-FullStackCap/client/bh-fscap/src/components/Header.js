import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink, useParams } from "react-router-dom";
import { logout } from "../Managers/UserProfileManager";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem("userProfile");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } else {
      setCurrentUser(null);
    }
  }, [isLoggedIn]);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
  };

  return (
    <div className="headerContainer">
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink}>GitFit</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to={`/userProfile/${currentUser?.id}`}>
                  Home
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/WorkoutSplit">
                    Splits
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavLink} to="/info">
                    Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
