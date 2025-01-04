import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/metaData";
import { createOrder, clearErrors } from "../../actions/orderAction";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItems from "../../components/CartItems/CartItems";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

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
      const payment = "succeeded";
      if (payment === "succeeded") {
        order.paymentInfo = {
          id: Math.floor(100000 + Math.random() * 900000),
          status: payment,
        };

        dispatch(createOrder(order));

        navigate("/success");
      } else {
        toast.error("There's some issue while processing payment ");
      }
    } catch (error) {
      toast.error("Some issur occured");
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
            <p className="poppins">
              We currently only provide cash on delivery services as it is the
              safest option.
            </p>
          </div>

          {/* Bottom Box */}
          <div className="bottom-box flex-center">
            <input
              type="radio"
              className="payment-radio"
              id="cod"
              name="payment"
              checked
              readOnly
            />
            <label htmlFor="cod" className="payment-option-btn montserrat">
              Cash on delivery (COD)
            </label>
          </div>
          <form onSubmit={(e) => submitHandler(e)} id="paymentForm">
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
                  />
                ))}
              <div className="GT-check flex-center Apercu">
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
              value="Reserve Order via Cash on Delivery"
              className="paymentBtn poppins"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
