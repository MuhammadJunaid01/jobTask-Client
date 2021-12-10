import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./login.css";
import loginImage from "../../images/logo/login.png";
import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const Login = () => {
  const { googleSign, user, setUser, setError, error, loginWithEmailAndPass } =
    UseFirebase();
  const location = useLocation();
  const history = useHistory();
  const redirect = location.state?.from || "/";
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    loginWithEmailAndPass(data.email, data.password);
    console.log(data);
    history.push(redirect);
    reset();
  };

  // const loginWithGoogle = () => {
  //   googleSign()

  // };
  console.log("user", user);
  return (
    <div className="loginContainer">
      <Container>
        <Row className="RowContainer">
          <Col sm={12} md={5} lg={7}>
            <img src={loginImage} alt="" />
          </Col>
          <Col sm={12} md={5} lg={5}>
            <div className="loginWithEmail">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="inputFeild"
                  type="email"
                  {...register("email")}
                  required
                  placeholder="Enter Your Email"
                />
                <input
                  className="inputFeild"
                  type="password"
                  {...register("password")}
                  required
                  placeholder="Enter Your password"
                />
                <input type="submit" />
              </form>
              <Button
                onClick={googleSign}
                style={{
                  marginTop: "10px",
                }}
                variant="warning"
              >
                <i className="fab fa-google"></i>
                Login With Google
              </Button>
              <br />
              <Link style={{ color: "white" }} to="/regester">
                are You New User?
              </Link>
            </div>
            <h5>{error}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
