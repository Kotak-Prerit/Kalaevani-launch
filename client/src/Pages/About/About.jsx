import React, { Fragment, Suspense, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./About.css";
import about01 from "../../assets/d01.webp";
import about02 from "../../assets/d02.webp";
import aboutVid from "../../assets/about-vid.mp4";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Fragment>
      <MetaData title={"About Kalaevani"} />
      <Navbar props={logo} />
      <div className="aboutContainer p-i-2_5 poppins">
        <div className="content">
          <div className="content-n">
            <div className="contentOne">
              <Suspense fallback={<QuoteLoader />}>
                <video className="about-content" muted autoPlay loop>
                  <source src={aboutVid} type="video/mp4" />
                </video>
              </Suspense>
            </div>
            <div className="contentTwo">
              <p>
                With <span className="gradient">KALAEVANI</span> we have
                embarked on the journey of a venture that will give us
                learnings, success, failures, prosperity and hundreds of reasons
                to laugh and cry. KALAEVANI is a beautiful association of art
                and an idea. One step closer to our mission to motivate artists
                to capitalise on their skills and make it the source of their
                bread and butter. This idea set in when we saw how underrated
                artistic skills are. We realised how about a community that
                completely revolutionises the thought process of people
                regarding art. Discussed it with people who resonate with the
                idea and that is when KALAEVANI, a lifestyle was born. We were
                sure of our goal but still unclear how to serve it in plates.
              </p>
            </div>
          </div>
          <hr />
          <div className="content-n">
            <div className="contentOne">
              <img src={about01} alt="about-image" className="about-image" />
            </div>
            <div className="contentTwo">
              <p>
                Since we were curious to find out ways in which we can create
                this community, we came across a trend of street style wearing
                and that's where it felt like everything had fallen in place
                naturally. Sounds bombastic, here our horses of imagination,
                manifestation seemed no control and we named the community{" "}
                <span className="gradient">FRESCO</span> which is going to
                co-exist with KALAEVANI. Let's make it more vivid for you guys,
                KALAEVANI is business, where we make high quality street style
                wearing for you and FRESCO is the community of artists which
                includes artists from all the fields. KALAEVANI is a lifestyle
                and FRESCO is the creator of this lifestyle. We get you the best
                art pieces printed on the wearables we are selling, from our
                artists involved in fine arts.
              </p>
            </div>
          </div>
          <hr />
          <div className="content-n">
            <div className="contentOne">
              <img src={about02} alt="about-image" className="about-image" />
            </div>
            <div className="contentTwo">
              <p>
                These art pieces are vivid presentation of how an artist feels
                or what emotions the person as an artist has gone through. As we
                kick start this journey, we want our audience to respect art as
                a profession and art pieces as a creation. Calling out all those
                people who want to lend their hand to these artists and back
                them so that they come up with flying colours and also feel
                somewhere connected to the roots of art to buy street wear style
                from our website and spread a word around you about it. Cloth
                becomes the canvas, threads become the paints, this amalgamation
                would never be seen again! Presenting to you all our whole heart
                - KALAEVANI.
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default About;
