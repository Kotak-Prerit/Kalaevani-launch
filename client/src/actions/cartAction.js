import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart =
  (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    const existingCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItem = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[5].url,
      stock: data.product.Stock,
      size,
      quantity,
    };

    const mergedCartItems = [...existingCartItems, newCartItem];

    dispatch({
      type: ADD_TO_CART,
      payload: newCartItem,
    });

    localStorage.setItem("cartItems", JSON.stringify(mergedCartItems));
  };

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
