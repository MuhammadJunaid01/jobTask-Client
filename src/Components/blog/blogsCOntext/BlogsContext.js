import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const BlogsContext = () => {
  const [contextBlogs, setContextBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/contextPost")
      .then((res) => res.json())
      .then((data) => {
        setContextBlogs(data);
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
        <h2>Learn Context With ARK</h2>
      </div>
      <Row className="gy-3">
        {contextBlogs.map((hooksBlog) => (
          <Col key={hooksBlog?._id} sm={12} md={4} lg={4}>
            <Card style={{ width: "18rem" }}>
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

export default BlogsContext;
