import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./IntroVid.css";
import introvid from "../../assets/productVid.mp4";

const IntroVid = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false; // Unmute when playing
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="Vidcontainer">
      <div className="productVidWrapper">
        <video ref={videoRef} className="productVid" loop preload="auto" muted>
          <source src={introvid} type="video/mp4" />
        </video>

        {/* Big Play Button (Initially Visible) */}
        {!isPlaying && (
          <button className="playButton" onClick={handlePlayPause}>
            <FaPlay />
          </button>
        )}

        {/* Pause Button (Bottom Left, Visible After Playing) */}
        {isPlaying && (
          <button className="pauseButton" onClick={handlePlayPause}>
            <FaPause />
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroVid;
