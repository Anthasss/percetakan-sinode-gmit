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
      "pending": "badge-info",
      "processing": "badge-warning",
      "completed": "badge-success",
      "cancelled": "badge-error",
      // Legacy Indonesian status
      "Sedang Diproses": "badge-warning",
      "Selesai": "badge-success",
      "Menunggu Pembayaran": "badge-info",
      "Dibatalkan": "badge-error"
    };
    return statusColors[status] || "badge-ghost";
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      "pending": "Menunggu Pembayaran",
      "processing": "Sedang Diproses",
      "completed": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return statusLabels[status] || status;
  };

  if (!order) return null;

  const specifications = order.orderSpecifications || order.details || {};
  const productTitle = order.productTitle || order.product?.title || `Product #${order.productId}`;
  const quantity = order.orderSpecifications?.quantity || order.quantity || '-';
  const orderDate = order.createdAt || order.orderDate;

  return (
    <dialog id="order_detail_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X />
          </button>
        </form>
        <div>
          <h3 className="font-bold text-2xl mb-4">Detail Pesanan</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Order ID:</div>
              <div className="text-sm break-all">{order.id}</div>
              
              <div className="font-semibold">Produk:</div>
              <div>{productTitle}</div>
              
              <div className="font-semibold">Kuantitas:</div>
              <div>{quantity}</div>
              
              <div className="font-semibold">Harga:</div>
              <div>{order.price ? formatCurrency(order.price) : 'Belum ditentukan'}</div>
              
              <div className="font-semibold">Status:</div>
              <div>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              <div className="font-semibold">Tanggal Pesan:</div>
              <div>{orderDate ? new Date(orderDate).toLocaleDateString('id-ID') : '-'}</div>
            </div>

            {Object.keys(specifications).length > 0 && (
              <>
                <div className="divider"></div>
                
                <h4 className="font-bold text-lg">Spesifikasi Pesanan</h4>
                <div className="bg-base-200 p-4 rounded-lg space-y-2">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <div className="font-semibold capitalize">{key}:</div>
                      <div>{typeof value === 'object' ? JSON.stringify(value) : value}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
