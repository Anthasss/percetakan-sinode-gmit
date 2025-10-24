import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function QuantityPicker() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  return (
    <div className="w-full border-2 border-neutral rounded-md p-4">
      <h1 className="font-bold mb-2">Product Title</h1>
      <div className="join flex justify-center">
        <button 
          className="btn join-item" 
          onClick={decrement}
          disabled={quantity === 0}
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
