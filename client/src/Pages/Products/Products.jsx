import React, { useState, useEffect, Fragment } from "react";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/ProductCard/ProductCard";
import { motion } from "framer-motion";
import MetaData from "../../Meta/MetaData";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "./Products.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoWhite from "../../assets/kalaevaniWhite.png";
import { Slider } from "@mui/material";
import { LuSearch } from "react-icons/lu";
// import Loader from "../../components/Loader/Loader";

function Products() {
  const dispatch = useDispatch();
  const { error, productCount, products, perPage } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([500, 10000]);
  // const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();
  const [keywords, setkeyword] = useState("");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo(0, 0);
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, error, price]);

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keywords.trim()) {
      navigate(`/products/${keywords}`);
    } else {
      navigate("/products");
    }
  };

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
    },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 150,
      y: mousePosition.y - 150,
      backgroundColor: "#6969697a",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <>
        <MetaData title="All Products" />
        <div className="allProductWrapper">
          <Navbar />
          <Link to={"/"} className="productLogo">
            <img src={logoWhite} alt="logo" />
          </Link>
          <div className="filterBox-container flex-center">
            <div className="filterBox">
              <div className="filter_FHETQW">Filters</div>
              <div className="filters">
                <div className="priceRange">
                  <p className="priceRange-Text poppins">Select Price Range</p>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay={window.innerWidth < 600 ? "on" : "auto"}
                    aria-labelledby="range-slider"
                    // defaultValue={500}
                    min={500}
                    max={10000}
                    color="#000"
                  ></Slider>
                </div>
              </div>
            </div>
          </div>
          <form className="searchBox" onSubmit={searchSubmitHandler}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setkeyword(e.target.value)}
                value={keyword}
                className="poppins"
              />
              <LuSearch className="search-icon flex-center" />
              <input type="submit" value=" o " />
            </div>
          </form>
          <div
            className="products_container"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>

        {perPage < productCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
        />

        <Footer />
      </>
      {/* )} */}
    </Fragment>
  );
}

export default Products;
