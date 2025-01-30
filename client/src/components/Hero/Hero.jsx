import React, { useEffect, useRef, useState } from "react";
import Spheres1Background from "threejs-components/build/backgrounds/spheres1.cdn.min.js";
import "./Hero.css";
import { IoIosColorFill } from "react-icons/io";

const Hero = () => {
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => loadBackground());
    } else {
      setTimeout(() => loadBackground(), 200);
    }
  }, []);

  const loadBackground = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      bgRef.current = Spheres1Background(canvas, {
        count: 90,
        minSize: 0.5,
        maxSize: 0.7,
        gravity: 0,
      });
      setIsLoaded(true);
    }
  };

  return (
    <div id="hero-wrapper">
      <div className="hero">
        <h1 className="heroText">Wear your</h1>
        <h2 className="heroText">Emotions</h2>
      </div>
      <div className="hero-buttons">
        <button type="button" id="colors-btn">
          <IoIosColorFill className="colorIcon" />
        </button>
      </div>
      {!isLoaded && (
        <img src="/fallback-hero.jpg" alt="Hero" className="hero-fallback" />
      )}{" "}
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Hero;
