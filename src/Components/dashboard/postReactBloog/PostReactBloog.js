import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PostReactBloog = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:5000/reactPost", {
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
          position: "top",
          icon: "success",
          title: "Successfully Posted",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      });
  };
  return (
    <div>
      <div className="postBloogInfo">
        <h1>Post Your React Bloog</h1>
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

export default PostReactBloog;
