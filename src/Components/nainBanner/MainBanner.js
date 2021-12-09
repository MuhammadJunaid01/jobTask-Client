import React from "react";
import "./mainBanner.css";
import Typical from "react-typical";

const MainBanner = () => {
  return (
    <div className="mainbannerContainer">
      <div className="typicalContent">
        <h1>
          <Typical
            steps={[
              "Hello! I'm Ark!",
              2000,
              "Learn Javascript",
              2000,
              "Learn React",
              2000,
              "Learn Hooks",
              2000,
              "Learn Context Api",
              2000,
              "Learn Node.js",
              2000,
              "Learn Express.js",
              2000,
            ]}
            loop={Infinity}
            wrapper="p"
          />
        </h1>
      </div>
    </div>
  );
};

export default MainBanner;
