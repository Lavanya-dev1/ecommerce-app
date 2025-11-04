// Import useCart hook to access cart data and actions
import { useCart } from "../context/CartContext";

function Cart() {
  // Get cart data and functions from context
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  // If the cart is empty, show this message
  if (cartItems.length === 0) {
    return <p className="p-6 text-gray-500">Your cart is empty.</p>;
  }

  // Calculate the total price of all items in the cart
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Loop through each item in the cart */}
      {cartItems.map((item) => (
        <div
          key={item.id} // unique key for React
          className="border rounded p-4 mb-4 flex justify-between items-center"
        >
          {/* Left side - product details */}
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p>Price: ${item.price}</p>

            {/* Quantity controls */}
            <div className="flex items-center gap-3 mt-2">
              {/* Decrease quantity button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                –
              </button>

              {/* Show quantity */}
              <span className="font-semibold">{item.quantity}</span>

              {/* Increase quantity button */}
              <button
                onClick={() => addToCart(item)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Right side - item total price */}
          <div className="text-right">
            {/* Total for this item (price × quantity) */}
            <p className="font-semibold">
              ${ (item.price * item.quantity).toFixed(2) }
            </p>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Cart total section */}
      <div className="border-t pt-4 mt-4 text-right">
        <h3 className="text-xl font-bold">
          Total: ${ totalAmount.toFixed(2) }
        </h3>

        {/* clear cart button */}
        <button
          onClick={clearCart}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
