import PropTypes from 'prop-types';
import { X } from "lucide-react";

export default function OrderDetailModal({ order }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "Sedang Diproses": "badge-warning",
      "Selesai": "badge-success",
      "Menunggu Pembayaran": "badge-info",
      "Dibatalkan": "badge-error"
    };
    return statusColors[status] || "badge-ghost";
  };

  if (!order) return null;

  return (
    <dialog id="order_detail_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X />
          </button>
        </form>
        <div>
          <h3 className="font-bold text-2xl mb-4">Detail Pesanan #{order.id}</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Produk:</div>
              <div>{order.productTitle}</div>
              
              <div className="font-semibold">Kuantitas:</div>
              <div>{order.quantity}</div>
              
              <div className="font-semibold">Harga:</div>
              <div>{formatCurrency(order.price)}</div>
              
              <div className="font-semibold">Status:</div>
              <div>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="font-semibold">Tanggal Pesan:</div>
              <div>{new Date(order.orderDate).toLocaleDateString('id-ID')}</div>
            </div>

            <div className="divider"></div>
            
            <h4 className="font-bold text-lg">Spesifikasi Pesanan</h4>
            <div className="bg-base-200 p-4 rounded-lg space-y-2">
              {Object.entries(order.details).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-2">
                  <div className="font-semibold">{key}:</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

OrderDetailModal.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productTitle: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
  }),
};
