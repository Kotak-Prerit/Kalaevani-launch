import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Global.css";
import Shery from "sheryjs";

function title() {
  Shery.makeMagnet(".shopping" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  return (
    <div className="contentWrapper">
      <div className="bigtxt align-center">
        <h1 className="threeLines">
          Three Lines of Content, Will go here. create that.
        </h1>
      </div>
      <div className="para flex-center">
        <p className="content">
          Everything we do is designed to rebuild self worth and independence,
          in order to break free from the cycle of disadvantage.
        </p>
        <p className="content">
          With every purchase you make with us, you're helping to change the
          course of someone's life; you're walking alongside vulnerable women as
          they find their way home again.
        </p>
        <div className="shopping">
          <Link to="/products" className="shopNow">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default title;
