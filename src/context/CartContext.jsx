// Import React functions we need: createContext to create a context,
// useContext to read the context from components, and useState to hold state.
import { createContext, useContext, useState } from "react";

// Create a Context object for the cart.
// This is the shared container that holds cart state and actions.
// Initially it has no default value; provider will supply it.
const CartContext = createContext();

// Create and export a Provider component that wraps parts of the app
// that need access to cart state. It accepts `children` (the wrapped UI).
export function CartProvider({ children }) {
  // useState holds the current cart items array.
  // Each item in cartItems is expected to be an object with at least:
  // { id, ...productProperties, quantity }
  const [cartItems, setCartItems] = useState([]);

  // addToCart: Add a product to the cart. If product already exists,
  // increase its quantity by 1. Otherwise append a new item with quantity 1.
  const addToCart = (product) => {
    // Use functional state update to avoid stale closures and to base the
    // new state on the previous state value (prevItems).
    setCartItems((prevItems) => {
      // Check whether an item with same id already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If it exists, return a new array where that item's quantity is incremented.
        // We use map to return a new array (immutability) and spread item to copy other fields.
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If not present, create a new item object with quantity set to 1
        // and return a new array with the new item appended.
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // removeFromCart: Decrease quantity by 1 for the item with given id.
  // If quantity becomes 0, remove the item from the array entirely.
  const removeFromCart = (id) => {
    // Functional update to compute new items based on previous items.
    setCartItems((prevItems) =>
      prevItems
        // First, map: if item matches id, create a new object with quantity - 1,
        // otherwise return item unchanged.
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        // Then filter out any items whose quantity is now 0 or less.
        .filter((item) => item.quantity > 0)
    );
  };

  // (set cartItems to an empty array)
  const clearCart = () => setCartItems([]);

  // Return the provider component. The `value` prop exposes the state and actions
  // so consuming components can read items and call add/remove/clear functions.
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for consuming the CartContext easily in components:
// const { cartItems, addToCart } = useCart();
export function useCart() {
  return useContext(CartContext);
}
