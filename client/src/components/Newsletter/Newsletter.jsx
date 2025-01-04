import React, { Fragment } from "react";
import "./Newsletter.css";
import Earth from "./earth/earth";
import Projects from "./projects/Projects";

const Newsletter = () => {
  return (
    <Fragment>
      <div className="Nl-container" id="newsletter">
        <main className="Nl-main">
          <Earth />
          <Projects />
        </main>
      </div>
    </Fragment>
  );
};

export default Newsletter;
