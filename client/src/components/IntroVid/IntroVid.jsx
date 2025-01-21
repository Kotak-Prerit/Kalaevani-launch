import React from "react";
import "./IntroVid.css";

const IntroVid = () => {
  return (
    <div className="container">
      {/* Add the 'controls' attribute when the video is playing */}
      <div className="productVidWrapper">
        <video autoPlay className="productVid" loop controls>
          <source
            src="https://res.cloudinary.com/dqzqrsuli/video/upload/v1736501628/productVid_v0cf8p.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default IntroVid;
