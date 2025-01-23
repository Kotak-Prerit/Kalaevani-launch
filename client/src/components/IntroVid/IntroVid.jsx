import React from "react";
import "./IntroVid.css";

const IntroVid = () => {
  return (
    <div className="Vidcontainer">
      {/* Add the 'controls' attribute when the video is playing */}
      <div className="productVidWrapper">
        <video
          muted
          autoPlay
          className="productVid"
          loop
          controls
          preload="auto"
        >
          <source
            src="https://ik.imagekit.io/okvmlnlrf8/assets/productVid.mp4?updatedAt=1737631606304"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default IntroVid;
