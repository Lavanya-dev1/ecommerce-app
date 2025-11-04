// Import necessary hooks and libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// Import ProductCard component
import ProductCard from "../components/ProductCard";

function Home() {
  // Store all fetched products
  const [products, setProducts] = useState([]);

  // Store filtered/search results
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Store categories
  const [categories, setCategories] = useState([]);

  // URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL
  const [filter, setFilter] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // ✅ STEP 1: Sync state when URL changes (for browser back/forward)
  useEffect(() => {
    const newCategory = searchParams.get("category") || "";
    const newSearch = searchParams.get("search") || "";

    // only update if different — prevents infinite loop
    if (newCategory !== filter) setFilter(newCategory);
    if (newSearch !== search) setSearch(newSearch);
  }, [searchParams]);

  // ✅ STEP 2: Fetch all products
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error Fetching Products:", error));
  }, []);

  // ✅ STEP 3: Fetch categories
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error Fetching Categories:", error));
  }, []);

  // ✅ STEP 4: Filter and search whenever products, search, or filter changes
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

  // ✅ STEP 5: Keep URL parameters in sync with state
  useEffect(() => {
    const params = {};
    if (filter) params.category = filter;
    if (search) params.search = search;
    setSearchParams(params);
  }, [filter, search, setSearchParams]);

  // ✅ UI rendering
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setFilter(""); // Clear category if typing search
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        {/* Category dropdown */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSearch(""); // Clear search when changing category
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

      {/* Product List */}
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
