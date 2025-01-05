import React, { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  getProduct,
  newReview,
} from "../../actions/productAction";
import { useParams, Link, useLocation } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MaterialPopup from "../../components/Popup/MaterialPopup";
import ReactStars from "react-stars";
import ReviewCard from "../../components/Reviews/ReviewCard";
import { toast } from "react-toastify";
import MetaData from "../../Meta/metaData";
import Loader from "../../components/Loader/Loader";
import { addItemsToCart } from "../../actions/cartAction";
import Product from "../../components/ProductCard/ProductCard";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import logo from "../../assets/kalaevaniBlack.png";
import sizeChart from "../../assets/sizechart.png";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { products } = useSelector((state) => state.products);
  const [size, setSize] = useState();
  const location = useLocation();

  const carousel = useRef();

  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetailRef = useRef(null);
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const updateMaxQuantity = (selectedSize) => {
    if (selectedSize) {
      setMaxQuantity(selectedSize.quantity);
      if (quantity > selectedSize.quantity) {
        setQuantity(selectedSize.quantity);
      }
    }
  };

  const handleSizeChange = (e) => {
    const selectedSizeName = e.target.value;
    setSize(selectedSizeName);
    const selectedSize = product.sizes.find((s) => s.name === selectedSizeName);
    updateMaxQuantity(selectedSize);
  };

  const increaseQuantity = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    if (quantity >= maxQuantity) {
      toast.error("Maximum quantity reached for this size");
      return;
    }

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [sizeChartIsOpen, setSizeChartIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const openPopup = (material) => {
    setSelectedMaterial(material);
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  const openSizeChart = () => {
    setSizeChartIsOpen(true);
  };

  const closeSizeChart = () => {
    setSizeChartIsOpen(false);
  };

  const addToCartHandler = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }

    dispatch(addItemsToCart(id, quantity, size));
    toast.success("Item Added to cart");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review submitted successfully 🥳");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
    dispatch(getProduct());
  }, [dispatch, error, id, reviewError, success]);

  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  const showcaseImage = product.images[4] ? product.images[4].url : null;
  const productImage = product.images[5] ? product.images[5].url : null;

  const scrollToProductDetail = () => {
    productDetailRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const options = {
    edit: false,
    color1: "#777",
    color2: "#FFD700",
    value: product.ratings,
    half: true,
  };

  const stockStatus = () => {
    if (product.Stock < 5 && product.Stock < 0) {
      return <p className="red">Last 5 left</p>;
    } else if (product.Stock > 5) {
      return <p className="green">InStock</p>;
    } else if (product.Stock === 0) {
      return <p className="red">Out of stock</p>;
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={` ${product.name} `} />
          <Navbar props={logo} />
          <div className="sp-details poppins">
            <div className="navigator">
              <p className="productTitle bebas">{product.name}</p>
            </div>
            <p className="stock-check">{stockStatus()}</p>
            <div className="pdRatings flex-center" style={{ gap: "5px" }}>
              <ReactStars
                {...options}
                size={window.innerWidth < 400 ? 15 : 20}
              />{" "}
              <span className="sp-ratings">
                ({product.numberOfReviews} Reviews)
              </span>
            </div>
            <div className="sizeImage">
              <button onClick={openSizeChart}>size chart</button>
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
          <section className="sp_Hero">
            <div className="showcase_img_Container">
              <div className="showcase_img">
                {showcaseImage && (
                  <img
                    src={showcaseImage}
                    alt={product.name}
                    className="product_img"
                  />
                )}
                <h1 className="product_title futuraLt">{product.name}</h1>
              </div>
              <div className="btns">
                <div className="priceAndSize Apercu">
                  <div className="priceContainer">
                    <p className="price ">&#8377; {product.price}</p>
                  </div>
                  <div className="pdCounter">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <div className="sizeContainer">
                    <select
                      className="size black poppins"
                      value={size}
                      onChange={handleSizeChange}
                    >
                      <option className="size-option" value="">
                        Size
                      </option>
                      {product.sizes.map((size, i) => (
                        <option
                          key={i}
                          className="size-option"
                          value={size.name}
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                    <span className="dropdown-btn"></span>
                  </div>
                </div>
                <div className="atc-bn poppins">
                  <div className="atc">
                    <button
                      className="atc-btn link white"
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      {product.Stock > 0 ? "Add to cart" : "Not available"}
                    </button>
                  </div>
                  <div className="bn">
                    <button
                      className="detailsButton black poppins"
                      onClick={scrollToProductDetail}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="slider">
            <div className="slider-header">
              <h1 className="h1 futuraLt"> Close look 👀</h1>
              <MdOutlineDoubleArrow className="drag-arrow" />
            </div>
            <motion.div className="draggable-carousel" ref={carousel}>
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -1600 }}
                className="inner-carousel"
              >
                {product.images &&
                  product.images.slice(0, 4).map((item, i) => (
                    <motion.div className="item" key={i}>
                      <img
                        src={item.url}
                        alt={`${i} Slide`}
                        className="image"
                        draggable="false"
                      />
                      <Link
                        to={`/product/${product._id}/images`}
                        className="td-none"
                      >
                        <HiOutlinePlusCircle className="productZoom" />
                      </Link>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </section>
          <section className="product-Detail" ref={productDetailRef}>
            <h1 className="fcc futuraLt">fabric / care & Artwork Meaning</h1>
            <div className="details-container flex-center">
              <img src={productImage} alt="" className="three-dimensional" />
              <Fragment>
                <div className="materials poppins">
                  <p onClick={() => openPopup("fabric")}></p>
                  <p onClick={() => openPopup("care")}></p>
                  <p onClick={() => openPopup("artwork")}></p>
                </div>
                <MaterialPopup
                  isOpen={popupIsOpen}
                  onClose={closePopup}
                  materialName={selectedMaterial}
                />
              </Fragment>
            </div>
          </section>
          <hr />

          <Fragment>
            <div className="darkTheme">
              <header className="displayHeader padding-inline">
                <h1 className="buyArt">you may also like</h1>
                <Link to={"/products"} className="wearArt">
                  See all
                </Link>
              </header>
              <div className="hpWrapper align-center">
                <div className="productContainer" id="container">
                  {products &&
                    products.map((product, i) => (
                      <Product key={i} product={product} />
                    ))}
                </div>
              </div>
              <div className="allProducts flex-center poppins">
                <Link to={"/products"} className="moreProducts">
                  more products
                </Link>
              </div>
            </div>
          </Fragment>
          <p className="reviewHeading">Customer Reviews </p>

          <section className="reviews-container">
            <div className="review-container">
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  <div className="review-ratings flex-center poppins">
                    <p className="overallRating">
                      {product.ratings.toFixed(1)}
                    </p>
                    <div className="reviewRatings ">
                      <ReactStars
                        {...options}
                        size={window.innerWidth < 600 ? 15 : 40}
                      />
                      <span className="num-ratings">
                        Based on {product.numberOfReviews} Reviews
                      </span>
                    </div>
                    <button
                      className="reviewBtn Apercu"
                      onClick={submitReviewToggle}
                    >
                      Write a review
                    </button>
                  </div>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                    className="reviewDialog"
                  >
                    <DialogTitle className="t-a-c futuraLt">
                      Share your thoughts
                    </DialogTitle>
                    <DialogContent className="submitDialog ">
                      <p className="experience Apercu pb-10">
                        Rate your experience*
                      </p>
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        precision={0.5}
                        sx={{
                          color: "#000",
                          fontSize: "40px",
                        }}
                        required
                      />
                      <p className="writeReview Apercu">Write a review*</p>
                      <textarea
                        className="submitDialogTextArea"
                        cols={20}
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewToggle}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {product.reviews &&
                    product.reviews.map((review, i) => (
                      <ReviewCard review={review} key={i} />
                    ))}
                </div>
              ) : (
                <div className="noReview-container">
                  <p className="noReviews poppins white"> No Reviews Yet </p>
                  <div className="submit-btn-wrapper flex-center ">
                    <button
                      className="submit-review Apercu flex"
                      onClick={submitReviewToggle}
                    >
                      Be the First One to Review
                    </button>
                  </div>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                    className="reviewDialog"
                  >
                    <DialogTitle className="t-a-c futuraLt">
                      Share your thoughts
                    </DialogTitle>
                    <DialogContent className="submitDialog ">
                      <p className="experience Apercu pb-10">
                        Rate your experience*
                      </p>
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        precision={0.5}
                        sx={{
                          color: "#000",
                          fontSize: "40px",
                        }}
                      />
                      <p className="writeReview Apercu">Write a review*</p>
                      <textarea
                        className="submitDialogTextArea"
                        cols={20}
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewToggle}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </div>
          </section>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
