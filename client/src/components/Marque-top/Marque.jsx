import React from "react";
import Marquee from "react-fast-marquee";
import "./Marquee.css";

function Sale({ dataArray, speed, direction }) {
  return (
    <div className="marquee">
      <Marquee autoFill>
        <p className="poppins dst">free delivery for first month</p>
      </Marquee>
    </div>
  );
}

export default Sale;
