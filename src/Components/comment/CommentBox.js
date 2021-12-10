import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./commentbox.css";
import Swal from "sweetalert2";

import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
const CommentBox = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(true);
  const [comment, setComment] = useState();
  const { user } = UseFirebase();
  useEffect(() => {
    fetch(`http://localhost:5000/jsPost/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);
  const handlereadMore = () => {
    setReadMore((prevCheck) => !prevCheck);
    console.log("more", readMore);
  };
  const handleComment = (e) => {
    const name = user?.displayName;
    e.preventDefault();

    const data = {
      ...detail,
      name,
      comment,
    };
    fetch("http://localhost:5000/commentPostJs", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json)
      .then((data) => {
        console.log("post bloog succes", data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully comment",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    console.log(data);
  };
  const commentValue = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Img variant="top" src={detail?.image} />
          <Card.Body>
            <Card.Title>{detail?.name}</Card.Title>
            <Card.Text>{detail?.content}</Card.Text>
            {readMore ? (
              <input
                onClick={handlereadMore}
                className="commentinput"
                type="text"
                placeholder="write your comment here:"
              />
            ) : (
              <div className="formFilled">
                <div className="commenterInfo">
                  <img className="commentImage" src={user.photoURL} alt="" />
                  <p className="userName"> {user?.displayName}</p>
                </div>
                <form onSubmit={handleComment}>
                  <textarea
                    className="commentText"
                    onBlur={commentValue}
                    placeholder="write Your Comment Here:"
                  ></textarea>
                  <br />
                  <span className="colapseIcon" onClick={handlereadMore}>
                    <i className="fas fa-angle-double-up"></i>{" "}
                  </span>
                  <input type="submit" value="Comment" />
                </form>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CommentBox;
