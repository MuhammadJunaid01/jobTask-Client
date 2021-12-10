import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./dashboard.css";
const DashBoard = () => {
  const [email, setEmail] = useState("");
  const handlesubmit = (e) => {};
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <Container>
        <h1>make admin</h1>
        <form onSubmit={handlesubmit}>
          <input onBlur={handleEmail} type="email" required />
          <input type="button" value="Make Admin" />
        </form>
      </Container>
    </div>
  );
};

export default DashBoard;
