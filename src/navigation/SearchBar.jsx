import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../json/products.json";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = productsData.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsDropdownOpen(filtered.length > 0);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex-1 px-4 flex relative" ref={dropdownRef}>
      <div className="join w-full">
        <label className="input join-item flex-1">
          <Search className="h-[1em] opacity-50" />
          <input
            type="search"
            placeholder="Telusuri"
            className="grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (filteredProducts.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
          />
        </label>
      </div>

      {/* Dropdown with search results */}
      {isDropdownOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-base-100 shadow-lg rounded-lg border border-base-300 z-50 max-h-96 overflow-y-auto">
          <ul className="menu p-2 w-full">
            {filteredProducts.map((product) => (
              <li key={product.id} className="w-full">
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center gap-3 w-full text-left hover:bg-base-300 rounded-lg p-3"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm opacity-60 capitalize">{product.category}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
