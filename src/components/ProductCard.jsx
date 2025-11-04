import { Link } from "react-router-dom";


// Define the ProductCard component
// It receives one prop: 'product' (the individual product data)
function ProductCard({product}){
  
    return (
        <Link to={`/product/${product.id}`}>
         {/* Outer container with Tailwind styles: border, padding, shadow, hover effect*/}
         <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
             {/* Product image */}
             <img
        src={product.image}  // Image URL
        alt={product.title}      // Alternate text for accessibility
        className="w-full h-40 object-contain mb-3"
      />
          {/* Product title */}
            <h3 className="text-sm font-semibold">{product.title}</h3>
             {/* Product price */}
      <p className="text-gray-600 font-bold mt-2">${product.price}</p>
         </div>
         </Link>
    );
}
//Export ProductCard so it can be used in Home.jsx
export default ProductCard;