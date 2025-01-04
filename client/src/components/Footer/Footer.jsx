import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { BiLogoPinterestAlt } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import "./footer.css";
import Logo from "../../assets/kalaevaniWhite.png";
// import Tilt from 'react-parallax-tilt'

export default function footer() {
  return (
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
              <Link className="anchor" to="/orders">
                Track Order
              </Link>
              <Link className="anchor" to="/shipping-policy">
                Shipping Policy
              </Link>
              <Link className="anchor" to="/contact">
                Contact Us
              </Link>
              <Link className="anchor" to="/">
                Size Chart
              </Link>
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
          <div className="others">
            <p className="heading">Catch Up</p>
            <div className="details">
              <Link className="anchor" to="/">
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
        <img src={Logo} alt="" className="footerLogo" />
        <p className="copyright">© 2024 Kalaevani-Clothing, Inc.</p>
      </div>
    </div>
  );
}
