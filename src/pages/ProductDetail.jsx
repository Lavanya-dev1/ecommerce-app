import { useEffect,useState } from "react";
import { useParams , useNavigate } from "react-router-dom"; // useParams = to get the product ID from the URL , useNavigate to go back to one index
import axios from "axios";
import { useCart } from "../context/CartContext";
function ProductDetail()
{
   
     // Extract the 'id' from the URL (example: /product/3 → id = 3)
    const {id}=useParams();
    const navigate = useNavigate();
// Create a state variable 'product' to hold product details (initially null)
    const [product,setproduct]=useState(null);
    const { addToCart } = useCart();
// Fetch the product details whenever 'id' changes
    useEffect(()=> {
        axios
         // Make a GET request to fetch one product using the ID
        .get(`https://fakestoreapi.com/products/${id}`)
        // On success, store the response data in 'product'
        .then((response)=>setproduct    (response.data))
         // On failure, show the error in console
        .catch((error)=>console.error("error fetching product", error));
},[id]);  // Dependency array → runs only when 'id' changes
// If product is not yet loaded, show loading message
if(!product) return <p className="p-6 text-gray-500">Loading...</p>
 // Once product is fetched, render the details below
return (
 <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
             {/*thin rounded border ,padding inside bbox,*/} {/* Product title */}
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
       {/* Product image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-contain mb-4"
      />{/*width height of img, img fit properly inside,add margin blow img}
        {/* Product description */}
      <p className="text-gray-700 mb-2">{product.description}</p>
      {/* Product price */}
      <p className="text-lg font-bold text-green-600">${product.price}</p>
      <div className="flex gap-4 mt-4">
  <button
    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
    onClick={() => navigate(-1)}
  >
    ⬅ Back
  </button>
{/*px padding left, py padding top*/}
  <button   onClick={() => addToCart(product)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Add to Cart
  </button>
</div>
    </div>
  );
}
export default ProductDetail;