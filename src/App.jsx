import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart"; 
function App()
{
    // 🔹 State used to trigger Home reset
  const [resetTrigger, setResetTrigger] = useState(0);

  // 🔹 Function called when Home or Logo clicked
  const handleHomeClick = () => {
    // Increment the value — changes the key for Home component
    setResetTrigger(prev => prev + 1);
  };
  return (
     <CartProvider>
    <Router basename="/ecommerce-app">
     {/* Navbar gets the reset function */}
         <Navbar  onHomeClick={handleHomeClick}  />
    <Routes>
        {/* 
            Key is changed whenever handleHomeClick is called 
            → forces Home to re-render (reset search & filter)
          */}
     <Route index element={<Home key={resetTrigger}  />} />
    <Route path="/product/:id" element={<ProductDetail />}/>
  <Route path="/cart" element={<Cart />} /> 
   </Routes>
   </Router>
   </CartProvider>
  );
}
export default App;