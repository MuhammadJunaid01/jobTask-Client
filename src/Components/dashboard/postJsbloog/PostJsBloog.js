import React from "react";
import { useForm } from "react-hook-form";
import "./postBloog.css";
const PostJsBloog = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("js data post", data);
    reset();
    fetch("https://young-falls-28843.herokuapp.com/jsPost", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json)
      .then((data) => {
        console.log("post bloog succes", data);
      });
  };
  return (
    <div>
      <div className="postBloogInfo">
        <h1>Post Your Javascript Bloog</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="BloogPostInfutFeild"
          type="text"
          {...register("name")}
          placeholder="Enter Bloog Name:"
          required
        />
        <input
          className="BloogPostInfutFeild"
          type="text"
          {...register("image")}
          placeholder="Enter Bloog image:"
          required
        />
        <textarea
          style={{ padding: "20px" }}
          className="BloogPostInfutFeild"
          {...register("content")}
          placeholder="Enter Bloog Content:"
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default PostJsBloog;
