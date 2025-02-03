import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import "./ProductImages.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { motion } from "framer-motion";

const ProductImages = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error } = useSelector((state) => state.productDetails);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= product.images.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return product.images.length - 1;
      }
      return prevIndex - 1;
    });
  };

  // useEffect(() => {
  //   const preventDoubleTapZoom = (event) => {
  //     if (event.touches.length > 1) {
  //       event.preventDefault();
  //     }
  //   };

  //   const container = document.querySelector(".productImagesWrapper");
  //   container.addEventListener("touchstart", preventDoubleTapZoom, {
  //     passive: false,
  //   });

  //   return () => {
  //     container.removeEventListener("touchstart", preventDoubleTapZoom);
  //   };
  // }, []);

  return (
    <div className="productImagesWrapper">
      <button onClick={handleGoBack} className="gobackButton flex-center">
        <IoMdClose />
      </button>
      <div className="carouselWrapper">
        <button className="leftArrow" onClick={handlePrev}>
          <BsArrowLeftShort />
        </button>
        <motion.img
          src={product.images[currentIndex].url}
          alt={`${currentIndex} Slide`}
          className="image"
          draggable="false"
        />

        <button className="rightArrow" onClick={handleNext}>
          <BsArrowRightShort />
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
