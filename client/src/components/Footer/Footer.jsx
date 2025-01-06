import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { BiLogoPinterestAlt } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import "./footer.css";
import Logo from "../../assets/kalaevaniWhite.png";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import sizeChart from "../../assets/sizechart.png";

export default function Footer() {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const [sizeChartIsOpen, setSizeChartIsOpen] = useState(false);

  const openSizeChart = () => {
    setSizeChartIsOpen(true);
  };

  const closeSizeChart = () => {
    setSizeChartIsOpen(false);
  };

  const authenticate = () => {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper poppins">
          <div>
            <div className="Info">
              <div className="rs">
                <p className="heading">Uff Stuff</p>
                <div className="rsLinks">
                  <Link className="anchor" to="/products">
                    Clothing
                  </Link>
                  <Link className="anchor" to="/about">
                    About Us
                  </Link>
                  <Link className="anchor" to="/account">
                    Account
                  </Link>
                  <Link className="anchor" to="/cart">
                    Cart
                  </Link>
                </div>
              </div>
              <div className="os">
                <p className="heading">Ordinary Stuff</p>
                <div className="osLinks">
                  <button className="anchorBtn" onClick={authenticate}>
                    Track Order
                  </button>
                  <Link className="anchor" to="/shipping-policy">
                    Shipping Policy
                  </Link>
                  <Link className="anchor" to="/contact">
                    Contact Us
                  </Link>
                  <button className="anchorBtn" to="" onClick={openSizeChart}>
                    Size Chart
                  </button>
                  <Link className="anchor" to="/privacy">
                    Privacy Policy
                  </Link>
                  <Link className="anchor" to="/terms">
                    Terms & Condition
                  </Link>
                  <Link className="anchor" to="/return-refund">
                    Return & Refund Policy
                  </Link>
                </div>
              </div>
              {sizeChartIsOpen && (
                <div className="sizeChartPopup">
                  <div className="popupOverlay" onClick={closeSizeChart}></div>
                  <div className="popupContent">
                    <button className="closeButton" onClick={closeSizeChart}>
                      X
                    </button>
                    <img src={sizeChart} alt="Size Chart" />
                  </div>
                </div>
              )}
              <div className="others">
                <p className="heading">Catch Up</p>
                <div className="details">
                  <Link className="anchor" to="mailto:kalaevanii@gmail.com">
                    kalaevani@gmail.com
                  </Link>
                  <Link className="anchor" to="/faqs">
                    FAQs
                  </Link>
                  <p className="helpingHours">11am to 6pm Mon-Sun</p>
                  <p className="ph">except on public holidays</p>
                  <div className="socials">
                    <Link
                      target="_blank"
                      to="https://www.instagram.com/kalaevani"
                      className="icons"
                    >
                      {" "}
                      <AiOutlineInstagram />
                    </Link>
                    <Link
                      target="_blank"
                      to="https://www.youtube.com"
                      className="icons"
                    >
                      <BsYoutube />
                    </Link>
                    <Link
                      target="_blank"
                      to="https://www.twitter.com"
                      className="icons"
                    >
                      <AiOutlineTwitter />
                    </Link>
                    <Link
                      target="_blank"
                      to="https://www.pinterest.com"
                      className="icons"
                    >
                      <BiLogoPinterestAlt />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="otherLinks">
                <p className="heading">For Business</p>
                <div className="details">
                  <Link className="anchor" to="/collab">
                    Collab
                  </Link>
                  <Link className="anchor" to="/wholesale">
                    Whole Sale Enquiry
                  </Link>
                </div>
              </div>
            </div>
            <div className="etc"></div>
          </div>
          <div className="footerEnd">
            <Link to={"/"}>
              <img src={Logo} alt="" className="footerLogo" />
            </Link>
            <p className="copyright">© 2024 Kalaevani-Clothing, Inc.</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
