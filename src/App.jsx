// App.jsx
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
function App() {
   return (
    <CartProvider>
       <Navbar />
      <Routes>
      <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}
export default App;
