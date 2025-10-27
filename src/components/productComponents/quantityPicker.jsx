import { ChevronLeft, ChevronRight } from "lucide-react";
import productsData from "../../json/products.json";
import { useOrder } from "../../context/OrderContext";

export default function QuantityPicker({ productId }) {
  const { quantity, updateQuantity } = useOrder();

  // Find product by ID
  const product = productsData.products.find(p => p.id === parseInt(productId));

  const increment = () => {
    updateQuantity(quantity + 1);
  };

  const decrement = () => {
    updateQuantity(Math.max(1, quantity - 1));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQuantity(value);
    } else if (e.target.value === '') {
      updateQuantity(1);
    }
  };

  return (
    <div className="w-full border-2 border-neutral rounded-md p-4">
      <h1 className="font-bold mb-2">Kuantitas {product?.title || "Product Title"}</h1>
      <div className="join flex justify-center">
        <button 
          className="btn join-item" 
          onClick={decrement}
          disabled={quantity === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <input 
          type="text" 
          placeholder="Quantity" 
          className="input join-item text-center w-24" 
          value={quantity}
          onChange={handleInputChange}
        />
        <button 
          className="btn join-item" 
          onClick={increment}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
