import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContext, { CartContextProvider } from "./store/CartContext";
function App() {
  
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
