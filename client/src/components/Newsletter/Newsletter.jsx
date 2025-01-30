import React, { Fragment, Suspense } from "react";
import "./Newsletter.css";
import Earth from "./earth/earth";
import Projects from "./projects/Projects";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const Newsletter = () => {
  return (
    <Suspense fallback={<QuoteLoader />}>
      <Fragment>
        <div className="Nl-container" id="newsletter">
          <main className="Nl-main">
            <Earth />
            <Projects />
          </main>
        </div>
      </Fragment>
    </Suspense>
  );
};

export default Newsletter;
