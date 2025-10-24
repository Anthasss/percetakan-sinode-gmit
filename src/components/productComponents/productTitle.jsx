import { Star, Share2 } from "lucide-react";
import { useState } from "react";
import productsData from "../../json/products.json";

export default function ProductTitle({ productId }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Find product by ID
  const product = productsData.products.find(p => p.id === parseInt(productId));

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product?.title || "Product Title"}</h1>
          {/* <div className="flex">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="ml-2">4.5 (10 Ulasan)</span>
          </div> */}
        </div>

        <div className="flex items-center px-4 relative">
          <button 
            onClick={handleShare}
            className="btn btn-ghost btn-circle"
            aria-label="Share product"
          >
            <Share2 />
          </button>
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-base-300 text-sm rounded-lg shadow-lg whitespace-nowrap">
              Link copied!
            </div>
          )}
        </div>
      </div>
      <div className="divider divider-neutral m-0"></div>
    </>
  );
}
