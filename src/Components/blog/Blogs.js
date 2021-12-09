import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import "./blogs.css";
import javascript from "../../images/logo/download.png";
import reactLogo from "../../images/logo/react.png";
import hooks from "../../images/logo/hooks.png";
import context from "../../images/logo/context.png";
import Javascript from "./js/Javascript";
const Blogs = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="blogsContainer">
      <Container>
        <Row>
          <Col sm={12} md={4} lg={4}>
            <div className="nestedItemMenu">
              <div className="nestedDetail">
                <div className="nestedImage">
                  <img src={javascript} alt="" />
                </div>
                <Link className="nestedLink" to={`${url}/javascript`}>
                  Javascript
                </Link>
              </div>
              <div className="nestedDetail">
                <div className="nestedImage">
                  <img src={reactLogo} alt="" />
                </div>
                <Link className="nestedLink" to={`${url}/react`}>
                  React
                </Link>
              </div>
              <div className="nestedDetail">
                <div className="nestedImage">
                  <img src={hooks} alt="" />
                </div>
                <Link className="nestedLink" to={`${url}/hooks`}>
                  Hooks
                </Link>
              </div>
              <div className="nestedDetail">
                <div className="nestedImage">
                  <img src={context} alt="" />
                </div>
                <Link className="nestedLink" to={`${url}/context`}>
                  Context
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={12} md={8} lg={8}>
            <Switch>
              <Route exact path={path}>
                <Javascript />
              </Route>
              <Route path={`${path}/javascript`}>
                <Javascript />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
