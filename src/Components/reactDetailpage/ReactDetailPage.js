import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseFirebase from "./../../hooks/usefirebase/UseFirebase";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactTooltip from "react-tooltip";

const ReactDetailPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [loader, setLoader] = useState(true);
  const [readMore, setReadMore] = useState(true);
  const [comment, setComment] = useState();
  const [showComment, setShowComment] = useState();
  const [counter, setCounter] = useState(0);
  const [like, setLike] = useState([]);
  const { user } = UseFirebase();
  // let commentId;
  // showComment?.map((findId) => {
  //   // console.log(findId);
  //   commentId = findId.id;
  // });
  useEffect(() => {
    fetch(`https://young-falls-28843.herokuapp.com/react/${id}`)
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
  const handleLike = () => {
    const data = {
      ...counter,
      id,
    };
    setCounter(counter + 1);
    fetch("https://young-falls-28843.herokuapp.com/like", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {});
  };
  useEffect(() => {
    fetch(`https://young-falls-28843.herokuapp.com/like/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLike(data);
      });
  }, [counter]);
  console.log("like ", counter);
  return (
    <div>
      <Container>
        <Card>
          <Card.Img variant="top" src={detail?.image} />
          <Card.Body>
            <Card.Title>{detail?.name}</Card.Title>
            <Card.Text>{detail?.content}</Card.Text>
            {readMore ? (
              <div className="reaction">
                <span onClick={handleLike} className="lkeIcon">
                  <i className="far fa-thumbs-up"></i>
                  {like?.length}
                </span>
                <span onClick={handlereadMore} className="commentIcon">
                  <i className="far fa-comment-alt"></i>{" "}
                </span>
                <span className="shareIcon">
                  <i className="far fa-share-square"></i>
                </span>
                {/* <input
                  className="commentinput"
                  type="text"
                  placeholder="write your comment here:"
                /> */}
              </div>
            ) : (
              <div className="formFilled">
                <div className="commenterInfo">
                  <img
                    className="commentImage"
                    src={`${user.photoURL}`}
                    alt=""
                  />
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

                  <ReactTooltip />
                  <div className="flex-formIcon">
                    <span
                      data-tip="Close Comment Box"
                      className="colapseIcon"
                      onClick={handlereadMore}
                    >
                      <i className="fas fa-angle-double-up"></i>{" "}
                    </span>
                    <input type="submit" value="Comment" />
                  </div>
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

export default ReactDetailPage;
