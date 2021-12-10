import React, { useState } from "react";

const MakeAnAdmin = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const user = { email };
    fetch("https://young-falls-28843.herokuapp.com/users/admin", {
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
  return (
    <div>
      <h1>make admin</h1>
      <form onSubmit={handleAdminSubmit}>
        <input onBlur={handleEmail} type="email" required />
        <input type="submit" value="Make Admin" />
      </form>
    </div>
  );
};

export default MakeAnAdmin;
