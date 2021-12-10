import React from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
import "./regester.css";
import { Container } from "react-bootstrap";
const Regester = () => {
  const location = useLocation();
  const { regesterWithEmail } = UseFirebase();
  const history = useHistory();
  const redirect = location.state?.from || "/";
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    regesterWithEmail(data.email, data.password, data.name);
    history.push(redirect);
    reset();
    console.log(data.name);
  };
  return (
    <div className="regesterContainer">
      <Container>
        <div className="regesterForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="regesterFeild"
              type="text"
              {...register("name")}
              placeholder="Enter Your Name:"
            />
            <input
              className="regesterFeild"
              type="text"
              {...register("address")}
              placeholder="Enter Your Address:"
            />
            <input
              className="regesterFeild"
              type="email"
              {...register("email")}
              placeholder="Enter Your Email:"
            />
            <input
              className="regesterFeild"
              type="password"
              {...register("password")}
              placeholder="Type Your Strong Password:"
            />
            <input className="subbtn" type="submit" />
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Regester;
