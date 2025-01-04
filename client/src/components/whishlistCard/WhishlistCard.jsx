import { Link } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import "./CartItems.css";

const CartItems = ({
  currentquantity,
  increaseQty,
  decreaseQty,
  deleteCartItems,
  item,
}) => {
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
            <p className="stockRemaining poppins">Stock : {item.Stock}</p>
          </article>
        </div>
        <div className="cartPrice-remove white align-center">
          <p className="cartPrice futuraLt">
            ₹{item.price * item.currentquantity}
          </p>
          <IoTrash className="trash" onClick={() => deleteCartItems(item)} />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
