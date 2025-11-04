// Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar({ onHomeClick }) {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
      {/* Use a button for the logo to ensure we call onHomeClick which clears the URL */}
      <Link to="/"
        className="text-lg font-bold focus:outline-none"
        aria-label="Go to Home"
      >
        🏬 MyStore
      </Link>

      <div className="flex items-center gap-4">
        {/* Keep normal Link for Home text if you want, but make sure it calls onHomeClick too */}
        <Link  to="/"  className="hover:underline">
          Home
        </Link> 

        <Link to="/cart" className="relative hover:underline">
          🛒 Cart
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold rounded-full px-2 py-0.5">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
