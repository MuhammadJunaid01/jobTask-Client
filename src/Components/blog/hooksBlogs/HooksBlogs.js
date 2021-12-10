import React, { useEffect, useState } from "react";
import { Row, Card, Col, Spinner } from "react-bootstrap";
import "./hooksBlogs.css";
const HooksBlogs = () => {
  const [hooksBlogs, setHooksBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/hooksPost")
      .then((res) => res.json())
      .then((data) => {
        setHooksBlogs(data);
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
        <h2>Learn Hooks With ARK</h2>
      </div>
      <Row className="gy-3">
        {hooksBlogs.map((hooksBlog) => (
          <Col key={hooksBlog?._id} sm={12} md={4} lg={4}>
            <Card>
              <Card.Img variant="top" src={hooksBlog?.image} />
              <Card.Body>
                <Card.Title style={{ color: "black" }}>
                  {hooksBlog?.name}
                </Card.Title>
                {readMore ? (
                  <Card.Text style={{ color: "black" }}>
                    {hooksBlog?.content.slice(0, 50)}....
                    <span onClick={handlereadMore} className="readmoreIcon">
                      <i className="fas fa-angle-double-right"></i>
                      <i className="fas fa-angle-double-right"></i>
                    </span>
                  </Card.Text>
                ) : (
                  <Card.Text style={{ color: "black" }}>
                    {hooksBlog?.content} {""}
                    <span onClick={handlereadMore} className="readmoreIcon">
                      <i className="fas fa-chevron-circle-up"></i>
                      <i className="fas fa-chevron-circle-up"></i>
                    </span>
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

export default HooksBlogs;
