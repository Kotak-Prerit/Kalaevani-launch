import React from "react";
import "./IntroVid.css";
import productVid from "../../assets/productVid.mp4";

const IntroVid = () => {
  return (
    <div className="container">
      {/* Add the 'controls' attribute when the video is playing */}
      <div className="productVidWrapper">
        <video muted autoPlay className="productVid" loop controls>
          <source src={productVid} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default IntroVid;
