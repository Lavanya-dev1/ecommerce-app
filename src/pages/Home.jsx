// Import necessary hooks and libraries
import { useEffect, useState } from "react";
import axios from "axios";

// Import ProductCard component to display each product
import ProductCard from "../components/ProductCard";

function Home() {
  // Store all fetched products
  const [products, setProducts] = useState([]);

  // Store filtered/search results
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Store all available categories (like electronics, jewelry, etc.)
  const [categories, setCategories] = useState([]);

  // Store the selected category for filtering
  const [filter, setFilter] = useState("");

  // Store the user's search text
  const [search, setSearch] = useState("");

  // Fetch all products when the component first loads
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") // Fake Store API endpoint
      .then((response) => {
        setProducts(response.data); // Save all products
        setFilteredProducts(response.data); // Show all initially
      })
      .catch((error) => console.error("Error Fetching Products:", error));
  }, []);

  // Fetch categories from API
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories") // Get categories list
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error Fetching Categories:", error));
  }, []);

  // Filter and search whenever products, search text, or category changes
  useEffect(() => {
    let filtered = products;

    // Filter by category if selected
    if (filter) {
      filtered = filtered.filter((p) => p.category === filter);
    }

    // Filter by search text (case-insensitive)
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered); // Update the displayed list
  }, [products, search, filter]);

  // Render UI
  return (
    <div className="p-6">
      {/* Page heading */}
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // update search text
          className="border p-2 rounded w-full md:w-1/3"
        />

        {/* Category dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // update selected category
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {/* Map each category option */}
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* capitalize */}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
