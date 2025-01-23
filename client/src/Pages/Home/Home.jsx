import React, { Fragment, useEffect, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Home.css";
import MetaData from "../../Meta/MetaData";
import logo from "../../assets/kalaevaniBlack.png";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Product from "../../components/ProductCard/ProductCard.jsx";
import Newsletter from "../../components/Newsletter/Newsletter.jsx";
import Footer from "../../components/Footer/Footer";
import Marque from "../../components/Marque-top/Marque.jsx";

const IntroVid = lazy(() => import("../../components/IntroVid/IntroVid"));
const Display = lazy(() => import("../../components/display/Display.jsx"));

const Home = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 7.5,
      y: mousePosition.y - 7.5,
      backgroundColor: "#6969697a",
      opacity: 1,
    },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 150,
      y: mousePosition.y - 150,
      backgroundColor: "#6969697a",
      opacity: 1,
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <Fragment>
      <>
        <MetaData title="Kalaevani" />
        <Marque />
        <Navbar props={logo} />
        {/* <motion.div className="draggable-el" drag>
            <img
              src="https://i.pinimg.com/originals/90/af/ef/90afef86af7e227ca0b8fda5312c0534.gif"
              height={200}
              style={{ pointerEvents: "none" }}
              alt="draggable element"
            />
          </motion.div> */}
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <Display />
        </Suspense>
        <Fragment>
          <div className="darkTheme">
            <header className="displayHeader padding-inline">
              <h1 className="buyArt">Latest products</h1>
              <Link to={"/products"} className="wearArt">
                See all
              </Link>
            </header>
            <div
              className="hpWrapper align-center"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <div className="productContainer" id="container">
                {products &&
                  products
                    .slice(0, 8)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>

              <motion.div
                className="cursor"
                variants={variants}
                animate={cursorVariant}
              />
            </div>
            <div className="allProducts flex-center poppins">
              <Link to={"/products"} className="moreProducts">
                more products
              </Link>
            </div>
          </div>
        </Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <IntroVid />
        </Suspense>
        <Newsletter />
        <Footer />
      </>
    </Fragment>
  );
};

export default Home;
