import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext, { CartContextProvider } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./UI/Error";
let requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { items } = cartCtx;
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // userProgressCtx.hideCheckout();

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" onClick={handleCloseCheckout} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending your request</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        Success!
        <p>Your order was places successfully</p>
        <p>Your order will get delivered in next 10 minutes...</p>
        <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input type="text" label="Full Name" id="name" />
        <Input type="email" label="E-Mail Address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-flow">
          <Input type="text" label="Postal Code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>
        {error && (
          <Error title="Failed to send meal data" message={error.message} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
