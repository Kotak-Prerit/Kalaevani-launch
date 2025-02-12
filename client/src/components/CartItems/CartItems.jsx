import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import "./CartItems.css";

const CartItems = ({ increaseQty, decreaseQty, deleteCartItems, item }) => {
  return (
    <div className="cartItems">
      <div className="cartProductList align-center">
        <div className="cProduct">
          <img
            src={item.image}
            alt={item.name}
            className="cartProductImg"
            height={50}
            width={50}
          />
          <article>
            <Link
              to={`/product/${item.product}`}
              className="productName futuraLt white"
            >
              {item.name}
            </Link>
            <p className="stockRemaining poppins">Size : {item.size}</p>
          </article>
        </div>
        <div className="counter align-center">
          <button
            type="button"
            className="minus white"
            onClick={() => decreaseQty(item.product, item.quantity, item.size)}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="quantity white poppins"
          />
          <button
            type="button"
            className="plus white"
            onClick={() => increaseQty(item.product, item.quantity, item.size)}
          >
            +
          </button>
        </div>
        <div className="cartPrice-remove white align-center">
          <p className="cartPrice futuraLt">₹{item.quantity * item.price}</p>
          <IoTrash
            className="trash"
            onClick={() => deleteCartItems(item.product, item.size)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
