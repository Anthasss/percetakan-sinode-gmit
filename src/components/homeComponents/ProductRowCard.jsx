import { Link } from "react-router-dom";

export default function ProductRowCard({ product }) {
  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure>
        <img
          src={product.image}
          alt={product.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${product.id}`}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
