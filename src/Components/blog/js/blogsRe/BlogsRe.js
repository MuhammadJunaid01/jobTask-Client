import React, { useEffect, useState } from "react";
import { Row, Spinner, Col, Card } from "react-bootstrap";

const BlogsRe = () => {
  const [reactBlogs, setReactBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/reactPost")
      .then((res) => res.json())
      .then((data) => {
        setReactBlogs(data);
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
        <h2>Learn React With ARK</h2>
      </div>
      <Row className="gy-3">
        {reactBlogs.map((reactBlog) => (
          <Col key={reactBlog?._id} sm={12} md={4} lg={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={reactBlog?.image} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                {readMore ? (
                  <Card.Text style={{ color: "black" }}>
                    {reactBlog?.content.slice(0, 50)}....
                    <span onClick={handlereadMore} className="readmoreIcon">
                      <i className="fas fa-angle-double-right"></i>
                      <i className="fas fa-angle-double-right"></i>
                    </span>
                  </Card.Text>
                ) : (
                  <Card.Text style={{ color: "black" }}>
                    {reactBlog?.content} {""}
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

export default BlogsRe;
