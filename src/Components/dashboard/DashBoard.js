import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./dashboard.css";
const DashBoard = () => {
  const [email, setEmail] = useState("");
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log("admin success", data);
          setEmail("");
        }
      });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <Container>
        <h1>make admin</h1>
        <form onSubmit={handleAdminSubmit}>
          <input onBlur={handleEmail} type="email" required />
          <input type="submit" value="Make Admin" />
        </form>
      </Container>
    </div>
  );
};

export default DashBoard;
