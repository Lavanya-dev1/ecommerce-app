// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

function AppInner() {
  const [homeClickKey, setHomeClickKey] = useState(0);

  const handleHomeClick = () => {
    // this will force Home to remount cleanly
    setHomeClickKey((prev) => prev + 1);
  };


  return (
    <CartProvider>
      <Navbar onHomeClick={handleHomeClick} />
      <Routes>
        {/* key causes remount when resetTrigger changes */}
        <Route index element={<Home key={homeClickKey} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

// Router must wrap where useNavigate is used
export default function App() {
  return (
    <Router basename="/ecommerce-app">
      <AppInner />
    </Router>
  );
}
