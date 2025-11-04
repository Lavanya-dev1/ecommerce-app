// Import necessary hooks and libraries
import { useEffect, useState } from "react"; // React hooks for state and lifecycle logic
import axios from "axios"; // Library to make API requests
import { useSearchParams } from "react-router-dom"; // Hook to manage query parameters in URL

// Import ProductCard component to display each individual product
import ProductCard from "../components/ProductCard";

function Home() {
  // State to store all fetched products from the API
  const [products, setProducts] = useState([]);

  // State to store products after applying filter or search
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State to store all available product categories
  const [categories, setCategories] = useState([]);

  //  Hook for working with URL query parameters (like ?category=electronics&search=shirt)
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize local states based on values present in the URL (for back-navigation support)
  const [filter, setFilter] = useState(searchParams.get("category") || ""); // selected category
  const [search, setSearch] = useState(searchParams.get("search") || ""); // search text


  //  useEffect → Fetch all products from the API when component first loads
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") // API endpoint to get all products
      .then((response) => {
        setProducts(response.data);           // Store all fetched products
        setFilteredProducts(response.data);   // Show all products initially
      })
      .catch((error) => console.error("Error Fetching Products:", error));
  }, []); // [] → run only once when component mounts


  //  useEffect → Fetch list of categories (like electronics, jewelry, etc.)
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories") // API endpoint for categories
      .then((response) => setCategories(response.data))     // Save all categories
      .catch((error) => console.error("Error Fetching Categories:", error));
  }, []); // Runs only once at mount


  //  useEffect → Whenever products, search text, or category changes,
  // filter the products accordingly
  useEffect(() => {
    let filtered = products; // start with all products

    // If a category filter is active, keep only products matching that category
    if (filter) {
      filtered = filtered.filter((p) => p.category === filter);
    }

    // If a search text is entered, keep only products whose title includes that text
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Finally update the filtered products state
    setFilteredProducts(filtered);
  }, [products, search, filter]); // Runs whenever any of these dependencies change


  // useEffect → Keep the browser URL updated with current filter/search
  // Example: ?category=electronics&search=shirt
  useEffect(() => {
    const params = {};
    if (filter) params.category = filter; // add category param if selected
    if (search) params.search = search;   // add search param if entered

    setSearchParams(params); // update the URL with new params
  }, [filter, search, setSearchParams]);


  //  useEffect → Restore the filter/search from URL when user presses Back button
  useEffect(() => {
    const category = searchParams.get("category") || ""; // read category from URL
    const query = searchParams.get("search") || "";      // read search from URL

    setFilter(category); // restore category in dropdown
    setSearch(query);    // restore search text in input
  }, [searchParams]); // Runs whenever URL params change


  //  Render the UI (JSX)
  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search input box */}
        <input
          type="text"
          placeholder="Search products..."
          value={search} // controlled input → value is tied to state
          onChange={(e) => {
            setSearch(e.target.value); // update search text
            setFilter("");             // clear category when searching
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        {/* Dropdown for category filter */}
        <select
          value={filter} // controlled select → value tied to state
          onChange={(e) => {
            setFilter(e.target.value); // update selected category
            setSearch("");             // clear search when choosing category
          }}
          className="border p-2 rounded w-full md:w-1/4"
        >
          {/* Default option */}
          <option value="">All Categories</option>

          {/* Dynamically render category options from API */}
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {/* Capitalize first letter for display */}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          //  Show filtered products
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
         ): (
          search && ( // show message only if user searched something
            <p className="text-gray-500 col-span-full text-center">
              ❌ No products found. Try a different search or category.
            </p>
          )
        )}
        
      </div>
    </div>
  );
}

// Export the Home component so it can be used in routes
export default Home;
