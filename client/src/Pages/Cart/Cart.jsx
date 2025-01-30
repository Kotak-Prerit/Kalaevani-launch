import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import CartItems from "../../components/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import logoWhite from "../../assets/kalaevaniWhite.webp";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const increaseQauntity = (id, quantity, size) => {
    const newQty = quantity + 1;
    const product = products.find((item) => item._id === id);
    if (product) {
      const sizeData = product.sizes.find((item) => item.name === size);
      if (sizeData) {
        if (quantity >= sizeData.quantity) {
          toast.error("Maximum quantity reached for this size");
          return;
        }
        dispatch(addItemsToCart(id, newQty, size));
      }
    }
  };

  const decreaseQauntity = (id, quantity, size) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id, size) => {
    dispatch(removeItemsFromCart(id, size));
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Cart"} />
      <div className="cartContainer">
        <Navbar props={logoWhite} />
        <div className="productAddedWrapper">
          <main>
            {cartItems.length === 0 ? (
              <div className="emptyCartWrapper">
                <div className="cartEmptyContainer">
                  <p className="cartEmpty white Apercu">Your cart is empty.</p>
                  <div className="gotoProducts flex-center">
                    <Link
                      to="/products"
                      className="productPageBtn white poppins"
                    >
                      explore wearables
                    </Link>
                  </div>
                </div>
                <div className="marqueeContainer flex-center">
                  <Marquee autoFill>
                    <p className="futuraLt cartemptyText white pb-10">cart</p>
                  </Marquee>
                </div>
                <div className="marqueeContainer flex-center bb-light">
                  <Marquee autoFill direction="right">
                    <p className="futuraLt cartemptyText white ">empty</p>
                  </Marquee>
                </div>
                <div className="ThanksMsg">
                  <p className="appreciate-N poppins p-i-2_5">
                    Keep Exploring... <br /> We've got amazing wearables for
                    you. <br /> Click on{" "}
                    <strong>
                      <Link to={"/products"}>Explore wearables</Link>
                    </strong>{" "}
                    button above <br />
                    to buy your first product
                  </p>
                </div>
              </div>
            ) : (
              <div className="cartActive p-i-2_5">
                <div className="cartTitle align-center">
                  <div className="cartHeadWrapper align-center">
                    <p className="cartHead padauk">cart</p>
                  </div>
                  <div className="cartQuantityWrapper align-center">
                    <p className="QuantityWrapper padauk">quantity</p>
                  </div>
                  <div className="cartSubtotalWrapper align-center">
                    <p className="SubtotalWrapper padauk">subtotal</p>
                  </div>
                </div>

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

                <div className="ProductsAdded white montserrat align-center">
                  <div className="beforeCheckout">
                    <div className="delivery align-center">
                      <p className="deliveryTxt">delivery</p>
                      <p className="later">shipping calculated at check-out.</p>
                    </div>

                    <div className="subtotal align-center">
                      <p className="subtotalTxt">Gross Total</p>{" "}
                      <p className="subamount"> ₹{subtotal}</p>
                    </div>
                    <div className="checkout">
                      <button
                        onClick={checkoutHandler}
                        className="checkoutBtn poppins"
                      >
                        checkout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ThanksMsg">
                  <p className="appreciate futuraLt">
                    Thank you for embracing our artistry! Your style inspires us
                    to create more uniqueness
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
