// Import necessary hooks and libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// Import ProductCard component to display each product
import ProductCard from "../components/ProductCard";

function Home({ resetTrigger }) {
  // Store all fetched products
  const [products, setProducts] = useState([]);

  // Store filtered/search results
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Store all available categories (like electronics, jewelry, etc.)
  const [categories, setCategories] = useState([]);

  // Read parameters from the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial values come from the URL (if present)
  const [filter, setFilter] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // ✅ Reset logic when Home/Logo is clicked
  useEffect(() => {
    if (resetTrigger > 0) {
      // Reset states & URL only when Home clicked
      setFilter("");
      setSearch("");
      setSearchParams({});
    }
  }, [resetTrigger, setSearchParams]);

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

    if (filter) {
      filtered = filtered.filter((p) => p.category === filter);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, search, filter]);

  // Keep URL parameters in sync with filter/search state
  useEffect(() => {
    const params = {};
    if (filter) params.category = filter;
    if (search) params.search = search;

    setSearchParams(params);
  }, [filter, search, setSearchParams]);

  // ✅ Restore filter/search from URL when navigating Back
  useEffect(() => {
    // only when navigating back, re-read from URL (no reset)
    const category = searchParams.get("category") || "";
    const query = searchParams.get("search") || "";

    setFilter(category);
    setSearch(query);
  }, [searchParams]);

  // Render UI
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setFilter("");
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSearch("");
          }}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : search ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            🔍 No products found for "
            <span className="font-semibold">{search}</span>"
          </p>
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            ❌ No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
