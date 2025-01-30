import React, { Fragment, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import "./ProductCard.css";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";
// import { toast } from "react-toastify";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color1: "#ccc",
    color2: "#000",
    value: product.ratings,
    half: true,
    size: 16,
  };

  const wrapper = useRef();
  const pressed = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  // const [isFilled, setIsFilled] = useState(false);

  const handleMouseDown = (e) => {
    pressed.current = true;
    startX.current = e.clientX;
    if (wrapper.current) {
      scrollLeft.current = wrapper.current.scrollLeft;
      wrapper.current.style.cursor = "grabbing";
    }
  };

  const handleMouseUp = () => {
    pressed.current = false;
    if (wrapper.current) {
      wrapper.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!pressed.current) return;
    const x = e.clientX - startX.current;
    if (wrapper.current) {
      wrapper.current.scrollLeft = scrollLeft.current - x;
    }
  };

  const handleMouseLeave = () => {
    pressed.current = false;
  };

  // const toggleCart = () => {
  //   setIsFilled((prevState) => {
  //     if (prevState) {
  //       toast.error("Item removed from your whishlist!");
  //     } else {
  //       toast.success("Item added to your Whishlist 💖");
  //     }
  //     return !prevState; // Toggle the state
  //   });
  // };

  return (
    <Fragment>
      <div className="productCard">
        <Link to={`/product/${product._id}`} className="linkRemove">
          <div className="pc-carousel" ref={wrapper}>
            {product.images.map((image, i) => (
              <div
                key={i}
                className="pc-innerCarousel"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Suspense fallback={<QuoteLoader />}>
                  <img
                    src={image.url}
                    alt={`${product.name}`}
                    className="pcImg poppins"
                    style={{
                      color: "#fff",
                      textTransform: "lowercase",
                      fontWeight: 300,
                    }}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchpriority={i === 0 ? "high" : "auto"}
                  />
                </Suspense>
              </div>
            ))}
          </div>
          <div className="name-mrp">
            <div className="product-Name">
              <p className="productName futuraLt">{product.name}</p>
            </div>
            <div className="price-wrapper">
              <p className="productPrice futuraLt">₹{product.price}</p>
            </div>
          </div>
          <div className="ratings">
            <ReactStars {...options} />
            <span className="users-review poppins">
              ({" "}
              {product.numberOfReviews === 0
                ? "No reviews"
                : product.numberOfReviews === 1
                ? `${product.numberOfReviews} review`
                : `${product.numberOfReviews} reviews`}{" "}
              )
            </span>
          </div>
        </Link>
        {/* <div className="product-cart align-center">
          <button onClick={toggleCart}>
            {isFilled ? (
              <img src={cartFill} alt="Filled Cart" className="cartFill" />
            ) : (
              <img
                src={cartOutline}
                alt="Outline Cart"
                className="cartOutline"
              />
            )}
          </button>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Product;
