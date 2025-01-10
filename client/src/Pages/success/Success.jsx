import React, { useEffect } from "react";
import "./Success.css";
import MetaData from "../../Meta/MetaData";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const toOrders = () => {
    navigate("/orders");
    localStorage.removeItem("cartItems");
    sessionStorage.clear();
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="success-wrapper">
      <MetaData title={"Kalaevani - Payment succeed"} />
      <div className="screen un">
        <div className="border-top"></div>

        <svg width="166" height="150" id="topIcon">
          <g id="Shot" fill="none" fillRule="evenodd">
            <g id="shot2" transform="translate(-135 -157)">
              <g id="success-card" transform="translate(48 120)">
                <g id="Top-Icon" transform="translate(99.9 47.7)">
                  <g id="Bubbles" fill="#12C06A">
                    <g id="bottom-bubbles" transform="translate(0 76)">
                      <ellipse
                        id="Oval-Copy-3"
                        cx="12.8571429"
                        cy="13.2605405"
                        rx="12.8571429"
                        ry="12.8432432"
                      />
                      <ellipse
                        id="Oval-Copy-4"
                        cx="25.0714286"
                        cy="34.4518919"
                        rx="8.35714286"
                        ry="8.34810811"
                      />
                      <ellipse
                        id="Oval-Copy-6"
                        cx="42.4285714"
                        cy="31.2410811"
                        rx="7.71428571"
                        ry="7.70594595"
                      />
                    </g>
                    <g id="top-bubbles" transform="translate(92)">
                      <ellipse
                        id="Oval"
                        cx="13.4285714"
                        cy="23.76"
                        rx="12.8571429"
                        ry="12.8432432"
                      />
                      <ellipse
                        id="Oval-Copy"
                        cx="37.8571429"
                        cy="25.0443243"
                        rx="5.14285714"
                        ry="5.1372973"
                      />
                      <ellipse
                        id="Oval-Copy-2"
                        cx="30.1428571"
                        cy="7.70594595"
                        rx="7.71428571"
                        ry="7.70594595"
                      />
                    </g>
                  </g>
                  <g id="Circle" transform="translate(18.9 11.7)">
                    <ellipse
                      id="blue-color"
                      cx="56.341267"
                      cy="54.0791109"
                      fill="#12C06A"
                      rx="51.2193336"
                      ry="51.5039151"
                    />
                    <ellipse
                      id="border"
                      cx="51.2283287"
                      cy="51.5039151"
                      stroke="#12C06A"
                      strokeWidth="5"
                      rx="51.2193336"
                      ry="51.5039151"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div className="check-gif"></div>
        <h3 className="montserrat">SUCCESS!</h3>
        <p className="poppins">Your order has been placed successfully.</p>

        <button id="btnClick" onClick={toOrders}>
          VIEW ORDERS
        </button>
      </div>
    </div>
  );
};

export default Success;
