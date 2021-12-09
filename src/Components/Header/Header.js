import React from "react";
import { Container } from "react-bootstrap";
import "./header.css";
const Header = () => {
  return (
    <div className="headerContainer">
      <Container>
        <div className="headerContent">
          <div className="location">
            <span>
              <i className="fas fa-map-marker-alt"></i>
              <span>120,Banani,Dhaka,Bangladesh</span>
            </span>
          </div>
          <div className="followIconSocial">
            <span>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
