import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Spinner, Button, Card } from "react-bootstrap";
import "./js.css";
const Javascript = () => {
  const [jsBlogs, setJsBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/jsPost")
      .then((res) => res.json())
      .then((data) => {
        setJsBlogs(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  console.log(jsBlogs);
  return loader ? (
    <div className="loader">
      <h1>
        <Spinner animation="border" variant="warning" />
      </h1>
    </div>
  ) : (
    <div>
      <div className="jsBlogsInfo">
        <h2>Learn Javascript With ARK</h2>
      </div>
      <Row className="gy-3">
        {jsBlogs.map((jsblog) => (
          <Col sm={12} md={4} lg={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={jsblog?.image} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text style={{ color: "black" }}>
                  {jsblog?.content.slice(0, 50)}....
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Javascript;
