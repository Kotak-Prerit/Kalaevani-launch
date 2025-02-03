// import React, { useRef, useState } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";
// import introvid from "../../assets/productVid.mp4";
import "./IntroVid.css";

const IntroVid = () => {
  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // const handlePlayPause = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.muted = false; // Unmute when playing
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  return (
    <div className="Vidcontainer">
      <div className="productVidWrapper">
        {/* <video ref={videoRef} className="productVid" loop preload="auto" muted>
          <source src={introvid} type="video/mp4" />
        </video>

        {!isPlaying && (
          <button className="playButton" onClick={handlePlayPause}>
            <FaPlay />
          </button>
        )}

        {isPlaying && (
          <button className="pauseButton" onClick={handlePlayPause}>
            <FaPause />
          </button>
        )} */}
        <div className="productVid">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/h_tBRIcGw7Q?si=zpBXB7AGmvV6YGDd&modestbranding=1&rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default IntroVid;
