import React, { Fragment, useState } from "react";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../Meta/metaData";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import CartItems from "../../components/CartItems/CartItems";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = shippingInfo.state === "Gujarat" ? 0 : 0;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.houseNo}, ${shippingInfo.street}, ${shippingInfo.info}, ${shippingInfo.zipCode}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.country}`;
  const phoneNo = shippingInfo.phoneNo;

  const [quantity, setQuantity] = useState(1);

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const DecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const deleteCartItems = (id) => {
    toast.error("Cannot delete product in confirm order page");
  };

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      {!user ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Confirm Order" />
          <div className="confirmContainer">
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage poppins flex p-i-2_5">
              <div className="ShippingInfoContainer">
                <div className="confirmshippingArea">
                  <Typography
                    style={{
                      fontSize: "25px",
                      fontWeight: 400,
                      fontFamily: "Poppins",
                      marginBottom: "25px",
                    }}
                  >
                    Shipping Info :
                  </Typography>
                  <div className="confirmshippingAreaBox">
                    <div className="align-center gap">
                      <p>Name : {user.name}</p>
                    </div>
                    <div className="align-center gap">
                      <p>Phone : {phoneNo}</p>
                    </div>
                    <div className="align-center gap">
                      <p>Address : {address}</p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography
                    style={{
                      fontSize: "25px",
                      fontWeight: 400,
                      fontFamily: "Poppins",
                      marginBottom: "25px",
                    }}
                  >
                    Your Cart Items:
                  </Typography>
                  <div className="confirmCartItemsContainer ">
                    {cartItems &&
                      cartItems.map((item, idx) => (
                        <CartItems
                          key={idx}
                          item={item}
                          currentquantity={quantity}
                          increaseQty={IncreaseQuantity}
                          decreaseQty={DecreaseQuantity}
                          deleteCartItems={deleteCartItems}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="orderConfirmContainer">
                <div className="orderSummary01">
                  <Typography
                    style={{
                      padding: "0 1vmax 1vmax",
                      fontSize: "25px",
                      fontWeight: 400,
                      fontFamily: "Poppins",
                      marginBottom: "25px",
                      textAlign: "start",
                    }}
                  >
                    Order Summary
                  </Typography>
                  <div>
                    <div>
                      <p>Subtotal : </p>
                      <span>₹{subtotal}</span>
                    </div>
                    <div>
                      <p>Shipping Charges :</p>
                      <span>{shippingCharges}</span>
                    </div>
                    <div>
                      <p>GST :</p>
                      <span>included</span>
                    </div>
                  </div>

                  <div className="orderSummaryTotal">
                    <p>
                      <b>Total :</b>
                    </p>
                    <span>₹{subtotal + shippingCharges}</span>
                  </div>

                  <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
