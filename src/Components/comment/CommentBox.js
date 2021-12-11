import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./commentbox.css";
import Swal from "sweetalert2";
import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
const CommentBox = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  console.log("detail", detail);
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(true);
  const [comment, setComment] = useState();
  const [showComment, setShowComment] = useState();
  const { user } = UseFirebase();
  // let commentId;
  // showComment?.map((findId) => {
  //   // console.log(findId);
  //   commentId = findId.id;
  // });
  useEffect(() => {
    fetch(`https://young-falls-28843.herokuapp.com/jsPost/${id}`)
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
  };
  const handleComment = (e) => {
    const name = user?.displayName;
    e.preventDefault();

    const data = {
      name,
      comment,
      id,
    };
    fetch("https://young-falls-28843.herokuapp.com/commentPostJs", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          console.log("post bloog succes", data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully comment",
            showConfirmButton: false,
            timer: 1500,
          });
          setComment("");
        }
      });
    console.log(data);
  };
  const commentValue = (e) => {
    setComment(e.target.value);
  };
  useEffect(() => {
    fetch(`https://young-falls-28843.herokuapp.com/commentPostJs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShowComment(data);
      });
  }, [id]);

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
                    required
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
                <div className="">
                  {showComment?.map((showcomment) => (
                    <div className="commenshow" key={showcomment._id}>
                      <h5>{showcomment.name}</h5>
                      <p>{showcomment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CommentBox;
