import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Spinner, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./js.css";
const Javascript = () => {
  const [jsBlogs, setJsBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(true);
  useEffect(() => {
    fetch("https://young-falls-28843.herokuapp.com/jsPost")
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
  const handlereadMore = () => {
    setReadMore((prevCheck) => !prevCheck);
    console.log("more", readMore);
  };
  return loader ? (
    <div className="loader">
      <h1>
        <Spinner animation="border" variant="warning" />
      </h1>
    </div>
  ) : (
    <div>
      <div className="BlogsInfo">
        <h2>Learn Javascript With ARK</h2>
      </div>
      <Row className="g-3">
        {jsBlogs.map((jsblog) => (
          <Col key={jsblog?._id} sm={12} md={4} lg={4}>
            <Card>
              <Card.Img
                variant="top"
                className="jsbloogImage"
                src={jsblog?.image}
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                {readMore ? (
                  <Card.Text style={{ color: "black" }}>
                    {jsblog?.content.slice(0, 50)}....
                    <span onClick={handlereadMore} className="readmoreIcon">
                      <i className="fas fa-angle-double-right"></i>
                      <i className="fas fa-angle-double-right"></i>
                    </span>
                  </Card.Text>
                ) : (
                  <Card.Text style={{ color: "black" }}>
                    {jsblog?.content} {""}
                    <span onClick={handlereadMore} className="readmoreIcon">
                      <i className="fas fa-chevron-circle-up"></i>
                      <i className="fas fa-chevron-circle-up"></i>
                    </span>
                    <Link to={`coment/${jsblog?._id}`}>
                      <span className="commenbox">
                        <i className="far fa-comment-alt"></i>
                      </span>
                    </Link>
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Javascript;
