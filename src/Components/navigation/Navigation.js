import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";
import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
const Navigation = () => {
  const { user, logOut, admin } = UseFirebase();
  return (
    <div className="navigationContainer">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand
            style={{ color: "white" }}
            className="brandName"
            href="#"
          >
            Ark- a m
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 d-flex align-items-center"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="linkNav" to="/home">
                HOME
              </Link>
              <Link className="linkNav" to="/about">
                ABOUT
              </Link>
              <Link className="linkNav" to="/blog">
                BLOG
              </Link>
              <Link className="linkNav" to="/contact">
                CONTACT
              </Link>
              {admin && (
                <Link className="linkNav" to="/dashboard">
                  DASHBOARD
                </Link>
              )}
              {user?.email ? (
                <Link onClick={logOut} className="linkNav" to="/login">
                  LOGOUT
                </Link>
              ) : (
                <Link className="linkNav" to="/login">
                  LOGIN
                </Link>
              )}

              {user?.email && (
                <img
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                  src={user?.photoURL}
                  alt=""
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
