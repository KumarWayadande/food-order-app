import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { items } = cartCtx;

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  }

  const handleCheckout = () => {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={handleClose}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCheckout}>Go to checkout</Button>
      </p>
    </Modal>
  );
}
