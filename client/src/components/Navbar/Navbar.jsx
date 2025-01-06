import LogoWhite from "../../assets/kalaevaniWhite.png";
import cartSvg from "../../assets/cart.svg";
import accountSvg from "../../assets/account.svg";
import shopSvg from "../../assets/shop.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import sizeChart from "../../assets/sizechart.png";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const [sizeChartIsOpen, setSizeChartIsOpen] = useState(false);

  const openSizeChart = () => {
    setSizeChartIsOpen(true);
  };

  const closeSizeChart = () => {
    setSizeChartIsOpen(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <StrictMode>
      <div className={clicked ? "menuOpen" : "menuClose"}>
        <div className="logoWrapper">
          <Link to="/">
            <img
              src={props.props}
              className={clicked ? "menuLogo" : "logo"}
              alt="logo"
              height={200}
              width={200}
            />
          </Link>
          <Link to="/">
            <img
              src={LogoWhite}
              className={clicked ? "logoOpen" : "menuLogo"}
              alt=""
              height={200}
            />
          </Link>
        </div>
        <div>
          <div className="navBarRight">
            <div className="search">
              <Link
                to={"/products"}
                className={clicked ? "menuSearchBar" : "searchBar"}
              >
                <LuSearch />
              </Link>
            </div>
            <div className={clicked ? "menuFixed" : "Fixed"}>
              <Link className="cartLink" to={"/cart"}>
                <img
                  src={cartSvg}
                  alt=""
                  className={clicked ? "menuCart" : "cart"}
                />
                <span className="addedToCart white poppins">
                  {cartItems.length}
                </span>
              </Link>
              <Link to="/login" className="profile">
                <img
                  src={accountSvg}
                  alt=""
                  onClick={handleClick}
                  className="account"
                />
              </Link>
              <Link to="/products" className="shopLink">
                <img
                  src={shopSvg}
                  alt=""
                  onClick={handleClick}
                  className="shop"
                />
              </Link>

              <div className="menu" onClick={handleClick}>
                <i className={clicked ? "active" : "inactive"}></i>
                <i className={clicked ? "active" : "inactive"}></i>
              </div>
            </div>
          </div>
          <div className="menuLinksContainer">
            <div className="menu-socials">
              <h1 className={clicked ? "menuSocialActive" : "vanish"}>
                Connect with us
              </h1>
              <div className="socialLinks flex">
                <Link
                  to="https://www.instagram.com/kalaevani"
                  target="_blank"
                  className={clicked ? "menuSocialActive" : "vanish"}
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={"https://www.facebook.com/profile.php?id=61562478641808"}
                  className={clicked ? "menuSocialActive" : "vanish"}
                >
                  <FaFacebook />
                </Link>
                <Link
                  to="https://wa.me/+918160936541"
                  target="_blank"
                  className={clicked ? "menuSocialActive" : "vanish"}
                >
                  <FaWhatsapp />
                </Link>

                <Link
                  to={"https://www.youtube.com/@Kalaevani"}
                  className={clicked ? "menuSocialActive" : "vanish"}
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
            <div className="menuLinks">
              <Link to="/" className={clicked ? "menuLinksActive" : "vanish"}>
                <p className="linksActive">Home</p>
              </Link>
              <Link
                to="/About"
                className={clicked ? "menuLinksActive" : "vanish"}
              >
                <p className="links">About</p>
              </Link>
              <Link
                to="/contact"
                className={clicked ? "menuLinksActive" : "vanish"}
              >
                <p className="links">Contact</p>
              </Link>
              <Link
                to="/products"
                className={clicked ? "menuLinksActive" : "vanish"}
              >
                <p className="links">Products</p>
              </Link>
              <Link
                to="/login"
                className={clicked ? "menuLinksActive" : "vanish"}
              >
                <p className="links">Account</p>
              </Link>
              <button
                className={clicked ? "menuLinksActive sizeBtn" : "vanish"}
                onClick={openSizeChart}
              >
                <p className="links">SIZE CHART</p>
              </button>
              <Link
                to="/privacy"
                className={clicked ? "menuLinksActive" : "vanish"}
              >
                <p className="links">Privacy Policy</p>
              </Link>
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
          </div>
        </div>
      </div>
    </StrictMode>
  );
};
export default Navbar;
