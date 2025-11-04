// Import necessary hooks and libraries
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
// useParams → get product ID from URL (example: /product/3 → id = 3)
// useNavigate → allows going back or navigating programmatically

import axios from "axios"; // for fetching product data from API
import { useCart } from "../context/CartContext"; // custom hook to access cart context

function ProductDetail() {
  // 🔹 Extract 'id' parameter from the current URL
  const { id } = useParams();

  // 🔹 Hook to navigate programmatically (used for Back button)
  const navigate = useNavigate();

  // 🔹 State to store one product’s details
  const [product, setproduct] = useState(null);

  // 🔹 Get addToCart function from global CartContext
  const { addToCart } = useCart();

  // 🔹 Fetch product data whenever 'id' changes
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`) // API call using product ID
      .then((response) => setproduct(response.data))  // save response data to product state
      .catch((error) => console.error("error fetching product", error)); // log if any error
  }, [id]); // runs again only if the product ID changes

  // 🔹 While product data is still being fetched, show loading message
  if (!product) return <p className="p-6 text-gray-500">Loading...</p>;

  // 🔹 Once product data is available, render its details
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {/* Product title */}
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

      {/* Product image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-contain mb-4"
      />
      {/* w-64 h-64 → set width & height
          object-contain → fit image properly inside box
          mb-4 → margin below image */}

      {/* Product description */}
      <p className="text-gray-700 mb-2">{product.description}</p>

      {/* Product price */}
      <p className="text-lg font-bold text-green-600">${product.price}</p>

      {/* Buttons section */}
      <div className="flex gap-4 mt-4">
        {/* Back button → navigates one step back */}
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate(-1)} // go back to previous page
        >
          ⬅ Back
        </button>

        {/* Add to Cart button */}
        <button
          onClick={() => addToCart(product)} // add current product to cart
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Export this component so it can be used in routing (App.jsx)
export default ProductDetail;
