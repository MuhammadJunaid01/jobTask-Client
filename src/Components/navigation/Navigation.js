import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";
const Navigation = () => {
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
              className="ms-auto my-2 my-lg-0"
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
              <Link className="linkNav" to="/login">
                LOGIN
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
