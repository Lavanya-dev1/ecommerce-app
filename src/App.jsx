import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart"; 
function App()
{
  return (
     <CartProvider>
    <Router>
         <Navbar />
    <Routes>
    <Route path="/" element= {<Home/>} />
    <Route path="/product/:id" element={<ProductDetail />}/>
  <Route path="/cart" element={<Cart />} /> 
   </Routes>
   </Router>
   </CartProvider>
  );
}
export default App;