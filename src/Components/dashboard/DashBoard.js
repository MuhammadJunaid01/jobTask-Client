import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import PostJsBloog from "./postJsbloog/PostJsBloog";
import MakeAnAdmin from "./makeAnAdmin/MakeAnAdmin";
import PostReactBloog from "./postReactBloog/PostReactBloog";
import PostContextBloog from "./postContextBloog/PostContextBloog";
import PostHooksBloog from "./postHooksBloogs/PostHooksBloog";
import ControlAllBloog from "./controlAllBloog/ControlAllBloog";
const DashBoard = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="dashBoardContainer">
      <Container>
        <Row>
          <Col sm={12} md={3} lg={3}>
            <div className="dashboard">
              <Link className="dashBoardLink" to={`${url}/makeAdmin`}>
                Make Admin
              </Link>
              <Link className="dashBoardLink" to={`${url}/javascriptBloog`}>
                Post Javascript Bloog
              </Link>
              <Link className="dashBoardLink" to={`${url}/reactBloog`}>
                Post React Bloog
              </Link>
              <Link className="dashBoardLink" to={`${url}/contextBloog`}>
                Post Context Bloog
              </Link>
              <Link className="dashBoardLink" to={`${url}/hooksBloog`}>
                Post Hooks Bloog
              </Link>
              <Link className="dashBoardLink" to={`${url}/controlAllBloog`}>
                Control All Bloog
              </Link>
            </div>
          </Col>
          <Col sm={12} md={9} lg={9}>
            <Switch>
              <Route exact path={path}>
                <PostJsBloog />
              </Route>
              <Route path={`${path}/javascriptBloog`}>
                <PostJsBloog />
              </Route>
              <Route path={`${path}/reactBloog`}>
                <PostReactBloog />
              </Route>
              <Route path={`${path}/hooksBloog`}>
                <PostHooksBloog />
              </Route>
              <Route path={`${path}/contextBloog`}>
                <PostContextBloog />
              </Route>
              <Route path={`${path}/makeAdmin`}>
                <MakeAnAdmin />
              </Route>
              <Route path={`${path}/controlAllBloog`}>
                <ControlAllBloog />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashBoard;
