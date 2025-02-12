import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Meta/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !order) {
    return <QuoteLoader />;
  }
  return (
    <Fragment>
      <Fragment>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage poppins">
          <div className="orderDetailsContainer">
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                height={60}
                className="order_mainlogo"
              />
            </Link>
            <h1>Order #{order && order.paymentInfo.razor_order_id}</h1>
            <h3>Shipping Info</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.houseNo}, ${order.shippingInfo.street}, ${order.shippingInfo.info}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <h3>Payment</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Payment Method : </p>
                <span>
                  {order.paymentMethod
                    ? order.paymentMethod
                    : " Your order might be older and made before v1.0 is launched"}
                </span>
              </div>

              <div>
                <p>order Amount :</p>
                <span>
                  ₹
                  {order.totalPrice
                    ? order.totalPrice
                    : " Your order might be older and made before v1.0 is launched"}
                </span>
              </div>

              <div>
                <p>Payment Status :</p>
                <span
                  className={`${
                    order.paymentStatus === "Paid" ? "green" : "red"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            <h3>Order Status</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <h3>Ordered Item :</h3>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product} className="cart-card">
                    <div className="img-name-size">
                      <img src={item.image} alt="Product" height={60} />
                      <div className="name_size">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                        <p> Size : {item.size}</p>
                      </div>
                    </div>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="printBtn-wrapper flex-center">
            <button className="printBtn Apercu" onClick={handlePrint}>
              Download Invoice
            </button>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default OrderDetails;
