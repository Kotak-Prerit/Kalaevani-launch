import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { createOrder, clearErrors } from "../../actions/orderAction";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItems from "../../components/CartItems/CartItems";
import axios from "axios";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const navigate = useNavigate();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const increaseQauntity = () => {
    toast.error("cannot change quantity while payment");
  };

  const decreaseQauntity = () => {
    toast.error("cannot change quantity while payment");
  };

  const deleteCartItems = () => {
    toast.error("Cannot delete Item while payment");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (paymentMethod === "online") {
        setLoading(true);

        // Creating Razorpay Order
        const paymentResponse = await axios.post(
          "http://localhost:4000/api/v1/process/payment",
          { amount: orderInfo.totalPrice },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const { order_id, amount, currency } = await paymentResponse.data;

        // Get Razorpay API Key
        const apiKeyResponse = await axios.get(
          "http://localhost:4000/api/v1/razorpayapikey",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { razorpayApiKey } = apiKeyResponse.data;

        // Open Razorpay Checkout
        const options = {
          key: razorpayApiKey,
          amount: amount,
          currency: currency,
          name: "Kalaevani",
          description: "Wear your Emotions",
          order_id: order_id,
          handler: async (response) => {
            // Verify Payment
            const verifyRes = await axios.post(
              "http://localhost:4000/api/v1/verify",
              response,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (verifyRes.data.success) {
              // Creating Order with Complete Payment Info
              const paymentInfo = {
                razor_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                status: "Paid",
              };

              dispatch(
                createOrder({
                  ...order,
                  paymentInfo,
                  paymentMethod: "Online",
                  paymentStatus: "Paid",
                  amountPaid: orderInfo.totalPrice,
                })
              ).then(() => {
                navigate("/success");
              });
            } else {
              alert("Payment Verification Failed!");
            }
            setLoading(false);
          },
          prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
            contact: shippingInfo?.phoneNo || "9999999999",
          },
          modal: {
            ondismiss: () => {
              // User closed the modal without payment
              toast.error("Payment cancelled.");
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Handle Cash on Delivery (COD)
        const fakeOrderId = `order_${Math.random().toString(36).substr(2, 9)}`;
        const paymentInfo = {
          razor_order_id: fakeOrderId,
          razorpay_payment_id: `COD-order_pay_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          razorpay_signature: `COD-order_sig_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          status: "Pending",
        };

        dispatch(
          createOrder({
            ...order,
            paymentInfo,
            paymentMethod: "COD",
            paymentStatus: "Pending",
            amountPaid: 0,
          })
        ).then(() => {
          navigate("/success");
        });
      }
    } catch (error) {
      toast.error("An error occurred during payment processing");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const address = `${shippingInfo.houseNo}, ${shippingInfo.street}, ${shippingInfo.info}, ${shippingInfo.zipCode}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.country}`;
  return (
    <Fragment>
      <MetaData title={"Payment Process"} />
      <div className="payment-container flex-center">
        <CheckoutSteps activeStep={2} />
        <div className="app-container">
          {/* Top Box */}
          <div className="top-box">
            <h1 className="futuraLt">PAYMENT</h1>
          </div>

          {/* Middle Box */}
          <div className="middle-box">
            <h1 className="Apercu">
              <span>₹</span>
              {orderInfo && orderInfo.totalPrice}
            </h1>
          </div>

          {/* Bottom Box */}
          <div className="bottom-box flex-center">
            <div
              className={`payment_method ${
                paymentMethod === "cod" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                className="payment-radio"
                id="cod"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={(e) => e.target.checked && setPaymentMethod("cod")}
              />
              <label htmlFor="cod" className="payment-option-btn montserrat">
                Cash on delivery
              </label>
            </div>
            <div
              className={`payment_method ${
                paymentMethod === "cod" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                className="payment-radio"
                id="online"
                name="payment"
                checked={paymentMethod === "online"}
                onChange={(e) => e.target.checked && setPaymentMethod("online")}
              />
              <label htmlFor="online" className="payment-option-btn montserrat">
                Pay Online
              </label>
            </div>
          </div>
          <form id="paymentForm">
            <div className="card-details white">
              <h3 className="poppins">You details is mentioned below</h3>
              <p className="poppins">Name : {user.name}</p>
              <p className="poppins">Contact : {shippingInfo.phoneNo}</p>
              <p className="poppins">Address : {address}</p>
              {cartItems &&
                cartItems.map((item, idx) => (
                  <CartItems
                    key={idx}
                    item={item}
                    quantity={item.quantity}
                    stock={item.stock}
                    increaseQty={increaseQauntity}
                    decreaseQty={decreaseQauntity}
                    deleteCartItems={deleteCartItems}
                    styles={"borderBottom:1px solid #fff;"}
                  />
                ))}
              <div className="GT-check flex-center poppins">
                <div>
                  <p>Subtotal : </p>
                  <span>₹{orderInfo.subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charges :</p>
                  <span>₹{orderInfo.shippingCharges}</span>
                </div>
                <div>
                  <p>GST :</p>
                  <span>included</span>
                </div>
              </div>
              <div className="GT flex Apercu">
                <p>Grand Total : ₹{orderInfo.totalPrice}</p>
              </div>
            </div>
            <input
              type="submit"
              disabled={loading}
              value={
                paymentMethod === "online"
                  ? "Pay with Razorpay"
                  : "Reserve Order via Cash on Delivery"
              }
              className="paymentBtn poppins"
              onClick={(e) => submitHandler(e)}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
