// Import the Link component from react-router-dom for navigation between routes
import { Link } from "react-router-dom";

// Import the custom hook useCart from CartContext to access cart data
import { useCart } from "../context/CartContext";

// Define the Navbar component
function Navbar({onHomeClick}) {
  // Destructure cartItems from the useCart hook (comes from CartContext)
  const { cartItems } = useCart();

  // Calculate total number of items in the cart by summing all item quantities
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Return the JSX structure for the navigation bar
  return (
    // Navigation bar container with Tailwind CSS classes:
    // flex → horizontal layout
    // justify-between → space between logo and menu items
    // items-center → vertically center items
    // bg-blue-600 → background color
    // text-white → text color
    // p-4 → padding
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4">

      {/* Brand or logo area — clicking it goes to home page */}
      <Link to="/" onClick={onHomeClick} className="text-lg font-bold">
        🏬 MyStore
      </Link>

      {/* Container for navigation links */}
      <div className="flex items-center gap-4">
        
        {/* Home link with hover underline effect */}
        <Link to="/" onClick={onHomeClick} className="hover:underline">
          Home
        </Link>

        {/* Cart link with cart icon and item count badge */}
        <Link to="/cart" className="relative hover:underline">
          🛒 Cart

          {/* Show the red count badge only if totalCount > 0 */}
          {totalCount > 0 && (
            <span
              className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold rounded-full px-2 py-0.5"
            >
              {/* Display number of items in cart */}
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

// Export the Navbar component so it can be used in other files (like App.jsx)
export default Navbar;
